import type { Locale } from "@/types/i18n";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      slug = event.context.params?.slug,
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    // article = articles.find((p) => p.slug === slug);

    const article = await queryCollection(event, "articles")
      .where("slug", "=", slug)
      .where("locale", "=", locale)
      .first();

    if (!article)
      throw createError({
        statusCode: 404,
        statusMessage: "Articles unavailable",
      });

    return article;

    /* const t = article.translations[locale];
  if (!t) throw createError({ statusCode: 404 });

  return resolveWithLocale(article, locale); */
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const slug = event.context.params?.slug;
      const locale = getQuery(event).locale ?? "en";
      return `article-${slug}-${locale}`;
    },
  },
);
