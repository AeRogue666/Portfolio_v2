import { Resend } from "resend";
import { ContactFormSchema } from "~~/lib/schemas/contact";
import { contactTemplate } from "#server/templates/contactEmail";
import { qualifiedContactTemplate } from "../templates/structuredEmail";
import { logEvent } from "#server/lib/logger";
import { containsSpam } from "#server/lib/spamFilter";
import dayjs from "dayjs";

/* HANDLER */
export default defineEventHandler(async (event) => {
  const ip =
    getHeader(event, "x-forwarded-for")?.split(",")[0] ??
    event.node.req.socket.remoteAddress ??
    "unknown";

  const body = await readBody(event),
    parsed = ContactFormSchema.safeParse(body);

  if (!parsed.success) {
    logEvent("contact_invalid_payload", { ip });

    throw createError({
      statusCode: 400,
      statusMessage: "Invalid form data",
    });
  }

  const data = parsed.data;
  const logMessage = `${ip} - ${data.email}`;
  const isQualified = "qualification" in data;
  const diff = dayjs().diff(dayjs(data.startedAt), "second");

  // Honeypot triggered (bot filled hidden field)
  if (data.website || diff < 5) {
    return { success: true }; // pretend success silently
  }

  if (containsSpam(data.message ?? "")) {
    logEvent("contact_spam_detected", { logMessage });

    throw createError({
      statusCode: 400,
      statusMessage: "Spam detected",
    });
  }

  const config = useRuntimeConfig(),
    resend = new Resend(config.resendApiKey);

  function autoTag(data: any) {
    const tags = [];

    if (data.type === "qualified") {
      const q = data.qualification;

      if (q.leadTier === "high") tags.push("Valeur forte");
      if (q.leadTier === "medium") tags.push("Valeur moyenne");
      if (q.leadTier === "low") tags.push("Valeur faible");
      if (q.projectType === "creation") tags.push("Nouveau build");
      if (q.projectType === "refonte") tags.push("Redesign");
      if (q.projectType === "optimisation") tags.push("Optimisation");
      if (q.projectType === "audit_a11y") tags.push("Audit Accessibilité");
      if (q.projectType === "audit_seo") tags.push("Audit SEO")
      if (q.projectType === "formation") tags.push("Formation");
      if (q.budgetRange === "8k+") tags.push("Premium budget");
      if (q.deadline === "urgent") tags.push("Urgent");
    }
    return tags;
  }

  const tags = autoTag(data).join(" | ");

  const subject =
    data.type === "qualified"
      ? `[${tags}] New Project - ${data.qualification.projectType}`
      : `New message - Website Contact`;

  const emailFrom = "Resend <onboarding@resend.dev>"; // verified domain
  const emailTo = ["contact@aureldev.com"];
  const emailBCC = ["contact@codekorico.com"]; // CCI / Copie conforme invisible / Blind carbon copy

  if (isQualified && data.type === "qualified") {
    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      bcc: emailBCC,
      subject: subject,
      html: qualifiedContactTemplate(data),
    });

    logEvent("contact_success", { logMessage });
    return { success: true };
  } else {
    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      bcc: emailBCC,
      subject: subject,
      html: contactTemplate(data),
    });

    logEvent("contact_success", { logMessage });
    return { success: true };
  }
});
