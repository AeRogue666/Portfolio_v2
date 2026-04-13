import type { Locale } from "@/types/i18n";

// Deviendra prisma.experiment.findUnique({ where: { slug } })
export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      slug = event.context.params?.slug,
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    // experiment: Experiment | any = experiments.find((u) => u.slug === slug);

    const experiment = await queryCollection(event, "experiments")
      .where("slug", "=", slug)
      .where("locale", "=", locale)
      .first();

    if (!experiment)
      throw createError({
        statusCode: 404,
        statusMessage: "Experiment unavailable",
      });

    return experiment;
    
    /* const t = experiment.translations[locale];
    if (!t) throw createError({ statusCode: 404 });

    return resolveWithLocale(experiment, locale); */
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const slug = event.context.params?.slug;
      const locale = getQuery(event).locale ?? "en";
      return `experiment-${slug}-${locale}`;
    },
  },
);
