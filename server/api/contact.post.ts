import { Resend } from "resend";
import { ContactFormSchema } from '@/utils/schemas/contact';
import { contactTemplate } from "#server/templates/contactEmail";
import { rateLimit } from "#server/lib/rateLimit";
import { logEvent } from "#server/lib/logger";
import { containsSpam } from "#server/lib/spamFilter";

/* HANDLER */

export default defineEventHandler(async (event) => {
  const ip =
    getHeader(event, "x-forwarded-for")?.split(",")[0] ??
    event.node.req.socket.remoteAddress ??
    "unknown";

  if (await rateLimit(ip)) {
    logEvent("contact_rate_limited", { ip });

    throw createError({
      statusCode: 429,
      statusMessage: "Too many reports. Please try again later.",
    });
  }

  const body = await readBody(event),
    parsed = ContactFormSchema.safeParse(body);

  if (!parsed.success) {
    logEvent("contact_invalid_payload", { ip });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
    });
  }

  const { email, message, website } = parsed.data;

  // Honeypot triggered (bot filled hidden field)
  if (website) {
    return { success: true }; // pretend success silently
  }

  if (containsSpam(message)) {
    logEvent("contact_spam_detected", { ip, email });

    throw createError({
      statusCode: 400,
      statusMessage: "Spam detected",
    });
  }

  const config = useRuntimeConfig(),
    resend = new Resend(config.resendApiKey);

  await resend.emails.send({
    from: "Resend <onboarding@resend.dev>", // verified domain
    to: ["contact@aureldev.com"],
    subject: `[New Contact] - ${email}`,
    html: contactTemplate(email, message),
  });

  logEvent("contact_success", { ip, email });

  return { success: true };
});
