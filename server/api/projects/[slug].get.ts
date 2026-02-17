import { Locale } from "~/types/i18n";
import { projects } from "~~/server/data/projects";
import { resolveWithLocale } from "~~/server/lib/resolve";

// Deviendra prisma.project.findUnique({ where: { slug } })
export default cachedEventHandler((event) => {
  const query = getQuery(event),
    slug = event.context.params?.slug,
    locale: Locale = query.locale === "fr" ? "fr" : "en",
    project = projects.find((p) => p.slug === slug);

  if (!project)
    throw createError({
      statusCode: 404,
      statusMessage: "Project unavailable",
    });

  const t = project.translations[locale];
  if (!t) throw createError({ statusCode: 404 });

  return resolveWithLocale(project, locale);
}, {
  maxAge: 60 * 10, // 10 minutes
  getKey: (event) => {
    const slug = event.context.params?.slug;
    const locale = getQuery(event).locale ?? 'en';
    return `project-${slug}-${locale}`
  }
});
