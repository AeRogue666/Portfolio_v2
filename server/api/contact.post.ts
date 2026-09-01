import { Resend } from "resend";
import { ContactFormSchema } from "~~/lib/schemas/contact";
import { contactTemplate } from "#server/templates/contactEmail";
import { qualifiedContactTemplate } from "../templates/structuredEmail";
import { logEvent } from "#server/lib/logger";
import { containsSpam } from "#server/lib/spamFilter";

/* HANDLER */
export default defineEventHandler(async (event) => {
  const ip =
    getHeader(event, "x-forwarded-for")?.split(",")[0] ??
    event.node.req.socket.remoteAddress ??
    "unknown";

  const body = await readBody(event),
    parsed = ContactFormSchema.safeParse(body),
    started = getCookie(event, "contact_started");

  if (!started) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing form session",
    });
  }

  if (!parsed.success) {
    console.error(parsed.error, body);
    logEvent("contact_invalid_payload", { ip });

    throw createError({
      statusCode: 400,
      statusMessage: `Invalid form data: ${JSON.stringify(parsed.error)}`,
    });
  }

  const data = parsed.data;
  const logMessage = `${ip} - ${data.email}`;
  const isQualified = "qualification" in data;
  const diff = (Date.now() - Number(started)) / 1000;
  const storage = useStorage();
  const rateLimitKey = `contact-rate-limit:${ip}`;
  const emailKey = `contact-email:${data.email}`;
  const lastSubmissionRateLimit = await storage.getItem<number>(rateLimitKey);
  const lastSubmissionEmail = await storage.getItem<string>(emailKey);

  if (
    (lastSubmissionRateLimit &&
      Date.now() - lastSubmissionRateLimit < 600000) ||
    lastSubmissionEmail
  ) {
    logEvent("contact_rate_limited", { ip });

    return { success: true };
  }

  await storage.setItem(rateLimitKey, Date.now());

  // Honeypot triggered (bot filled hidden field)
  if (data.website_bot || diff < 5) {
    logEvent("contact_too_fast", { ip });

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

      // Tiers de valeur
      if (q.leadTier === "high") tags.push("Valeur forte");
      if (q.leadTier === "medium") tags.push("Valeur moyenne");
      if (q.leadTier === "low") tags.push("Valeur faible");

      // Types de projets
      if (q.projectType === "creation") tags.push("Nouveau build");
      if (q.projectType === "refonte") tags.push("Redesign");
      if (q.projectType === "formation") tags.push("Formation");

      // Audits basés sur le subType
      if (q.projectType === "audit") {
        if (q.subType?.includes("audit-accessibilite")) tags.push("Audit Accessibilité");
        if (q.subType?.includes("audit-seo")) tags.push("Audit SEO & Performance");
        if (q.subType?.includes("audit-securite")) tags.push("Audit Sécurité");
        if (q.subType?.includes("audit-all")) tags.push("Audit Global");
        if (q.subType?.includes("audit-flash")) tags.push("Flash Audit");
      }

      if (q.projectType === "optimisation") {
        if (q.subType?.includes("accessibilite")) tags.push("Optimisation Accessibilité");
        if (q.subType?.includes("seo")) tags.push("Optimisation SEO & Performance");
        if (q.subType?.includes("securite")) tags.push("Optimisation Sécurité");
        if (q.subType?.includes("all")) tags.push("Optimisation Global");
      }
      
      // Cas spécifiques d'alertes
      if (q.budgetRange === "8k+") tags.push("Premium budget");

      // Tag Alerte : petit budget et pressé
      if ((q.deadline === "urgent" || q.deadline === "1m") && (q.budgetRange === "<1k" || q.budgetRange === "1-3k")) {
        tags.push("Risque : Urgent & Petit Budget");
      } else if (q.deadline === "urgent") {
        tags.push("Urgent");
      }
    }
    return tags;
  }

  const tags = autoTag(data).join(" | ");

  const subject =
    data.type === "qualified"
      ? `[${tags}] New Project - ${data.qualification.projectType}`
      : `New message - Website Contact`;

  const emailFrom = "Resend <onboarding@resend.dev>"; // verified domain
  const emailTo = ["contact@codekorico.com"];
  const emailBCC = ["contact@aureldev.com"]; // CCI / Copie conforme invisible / Blind carbon copy

  if (isQualified && data.type === "qualified") {
    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      bcc: emailBCC,
      subject: subject,
      html: qualifiedContactTemplate(data),
    });

    logEvent("contact_success", { logMessage });
    deleteCookie(event, "contact_started");
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
    deleteCookie(event, "contact_started");
    return { success: true };
  }
});
