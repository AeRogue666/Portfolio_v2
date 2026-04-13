import type { Locale } from "@/types/i18n";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      slug = event.context.params?.slug,
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    // plan = plans.find((p) => p.slug === slug);

    const plan = await queryCollection(event, "plans")
      .where("slug", "=", slug)
      .where("locale", "=", locale)
      .first();

    if (!plan)
      throw createError({
        statusCode: 404,
        statusMessage: "Plan unavailable",
      });

    return plan;

    /* const t = plan.translations[locale];
  if (!t) throw createError({ statusCode: 404 });

  return resolveWithLocale(plan, locale); */
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const slug = event.context.params?.slug;
      const locale = getQuery(event).locale ?? "en";
      return `plan-${slug}-${locale}`;
    },
  },
);
