import { Resend } from "resend";
import { checkRateLimit } from "../lib/rateLimit";
import { logEvent } from "../lib/logger";

type Issues = "accessibility" | "issue" | "bug" | "other";

type ReportBody = {
  issue: Issues;
  description: string;
  email?: string | undefined;
  honeypot?: any;
};

// HANDLER
export default defineEventHandler(async (event) => {
  const ip =
    getHeader(event, "x-forwarded-for")?.split(",")[0] ??
    event.node.req.socket.remoteAddress ??
    "unknown";

  const { limited, remaining } = await checkRateLimit(ip, {
    windowSeconds: 600,
    maxRequests: 3,
  });

  if (limited) {
    logEvent("contact_rate_limited", { ip });
    throw createError({
      statusCode: 429,
      statusMessage: "Too many reports. Please try again later.",
    });
  }

  const body = await readBody<ReportBody>(event);

  if ((body as any).honeypot) {
    return { success: true };
  }

  if (!body.issue || !body.description) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid report payload",
    });
  }

  const config = useRuntimeConfig();
  const resend = new Resend(config.resendApiKey);

  await resend.emails.send({
    from: "Report <report@aureldev.dev>",
    to: ["pro@aureldev.dev"],
    subject: `[Report] ${body.issue.toUpperCase()}`,
    text: `
        Issue: ${body.issue}
        Email: ${body.email ?? "N/A"}
        Description: ${body.description}`.trim(),
  });

  logEvent("report_success", { ip });
  return { success: true };
});
