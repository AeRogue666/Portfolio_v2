// import { Resend } from 'resend';

type Issues = "accessibility" | "issue" | "bug" | "feedback" | "other";

type ReportBody = {
  issue: Issues;
  description: string;
  email?: string | null;
  honeypot?: any;
};

// RATE LIMIT

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3;

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  entry.count++;

  return entry.count > RATE_LIMIT_MAX;
}

// HANDLER

export default defineEventHandler(async (event) => {
  const ip =
    getHeader(event, "x-forwarded-for")?.split(",")[0] ??
    event.node.req.socket.remoteAddress ??
    "unknown";

  if (isRateLimited(ip)) {
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

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Report <report@aureldev.dev>",
    to: ["pro@aureldev.dev"],
    subject: `[Report] ${body.issue.toUpperCase()}`,
    text: `
        Issue: ${body.issue}
        Email: ${body.email ?? "N/A"}
        Description: ${body.description}`.trim(),
  });

  return { success: true };
});
