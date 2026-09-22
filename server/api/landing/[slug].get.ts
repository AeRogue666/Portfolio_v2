import type { Locale } from "@/types/i18n";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      slug = event.context.params?.slug,
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    // landing = services.find((p) => p.slug === slug);

    const landing = await queryCollection(event, "landing")
      .where("slug", "=", slug)
      .where("locale", "=", locale)
      .first();

    if (!landing)
      throw createError({
        statusCode: 404,
        statusMessage: "Landing page unavailable",
      });

    return landing;

    /* const t = service.translations[locale];
  if (!t) throw createError({ statusCode: 404 });

  return resolveWithLocale(service, locale); */
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const slug = event.context.params?.slug;
      const locale = getQuery(event).locale ?? "en";
      return `landing-${slug}-${locale}`;
    },
  },
);
