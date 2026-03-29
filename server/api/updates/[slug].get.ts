import type { Locale } from "@/types/i18n";

// Deviendra prisma.update.findUnique({ where: { slug } })
export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      slug = event.context.params?.slug,
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    // update: Update | any = updates.find((u) => u.slug === slug);

    const update = await queryCollection(event, "updates")
      .where("slug", "=", slug)
      .where("locale", "=", locale)
      .first();

    if (!update)
      throw createError({
        statusCode: 404,
        statusMessage: "Update unavailable",
      });

    return update;
    
    /* const t = update.translations[locale];
    if (!t) throw createError({ statusCode: 404 });

    return resolveWithLocale(update, locale); */
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const slug = event.context.params?.slug;
      const locale = getQuery(event).locale ?? "en";
      return `update-${slug}-${locale}`;
    },
  },
);
