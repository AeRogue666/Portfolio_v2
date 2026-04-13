import type { Locale } from "@/types/i18n";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      slug = event.context.params?.slug,
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    // client = clients.find((p) => p.slug === slug);

    const client = await queryCollection(event, "clients")
      .where("slug", "=", slug)
      .where("locale", "=", locale)
      .first();

    if (!client)
      throw createError({
        statusCode: 404,
        statusMessage: "Client unavailable",
      });

    return client;

    /* const t = client.translations[locale];
  if (!t) throw createError({ statusCode: 404 });

  return resolveWithLocale(client, locale); */
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const slug = event.context.params?.slug;
      const locale = getQuery(event).locale ?? "en";
      return `client-${slug}-${locale}`;
    },
  },
);
