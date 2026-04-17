import type { Locale } from "@/types/i18n";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      slug = event.context.params?.slug,
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    // service = services.find((p) => p.slug === slug);

    const service = await queryCollection(event, "services")
      .where("slug", "=", slug)
      .where("locale", "=", locale)
      .first();

    if (!service)
      throw createError({
        statusCode: 404,
        statusMessage: "Services unavailable",
      });

    return service;

    /* const t = service.translations[locale];
  if (!t) throw createError({ statusCode: 404 });

  return resolveWithLocale(service, locale); */
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const slug = event.context.params?.slug;
      const locale = getQuery(event).locale ?? "en";
      return `service-${slug}-${locale}`;
    },
  },
);
