import { Locale } from "@prisma/client";

export function toPostDTO(post: any, locale: Locale) {
  const t = post.translations?.[0];

  return {
    id: post.id,
    slug: post.slug,
    kind: post.kind,

    title: t?.title ?? "",
    description: t?.description ?? "",
    content: t?.content ?? "",
    
    feedTitle: t?.feedTitle ?? "",
    feedSummary: t?.feedSummary ?? "",

    date: post.date,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,

    pinned: post.pinned,
    image: post.image,
    previewUrl: post.previewUrl,

    tags: post.tags ?? [],

    github: post.github,
    demo: post.demo,
    website: post.website,

    stack: post.stack ?? [],

    role: t?.role,
    problem: t?.problem,
    solution: t?.solution,

    technicalChoices: t?.technicalChoices ?? [],
    accessibility: t?.accessibility,
    learnings: t?.learnings ?? [],

    customerName: t?.customerName,
    customerJob: t?.customerJob,
    customerCity: t?.customerCity,
    customerEnterpriseName: t?.customerEnterpriseName,
    testimony: t?.testimony,

    highlighted: post.highlighted ?? false,
    packages: t?.packages ?? [],
  };
}
