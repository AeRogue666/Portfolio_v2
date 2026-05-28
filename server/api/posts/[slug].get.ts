import { prisma } from "~~/server/db/prisma";
import type { Locale } from "@/types/i18n";

export default defineEventHandler(async (event) => {
  const query = getQuery(event),
    slug = event.context.params?.slug,
    locale: Locale = query.locale === "fr" ? "fr" : "en";

  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      translations: {
        where: { locale },
        take: 1,
      },
    },
  });

  if (!post)
    throw createError({
      statusCode: 404,
      statusMessage: "Post unavailable",
    });

  const t = post.translations[0];

  return {
    id: post.id,
    slug: post.slug,
    kind: post.kind,
    pinned: post.pinned,

    date: post.date,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,

    tags: post.tags,
    image: post.image,
    previewUrl: post.previewUrl,

    github: post.github,
    demo: post.demo,
    website: post.website,

    stack: post.stack,

    title: t?.title,
    description: t?.description,
    content: t?.content,

    feedTitle: t?.feedTitle,
    feedSummary: t?.feedSummary,

    role: t?.role,
    problem: t?.problem,
    solution: t?.solution,
    technicalChoices: t?.technicalChoices,
    accessibility: t?.accessibility,
    learnings: t?.learnings,

    customerName: t?.customerName,
    customerJob: t?.customerJob,
    customerCity: t?.customerCity,
    customerEnterpriseName: t?.customerEnterpriseName,
    testimony: t?.testimony,
  };
});
