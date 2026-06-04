import { prisma } from "~~/server/db/prisma";

export default defineEventHandler(async () => {
  const posts = prisma.post.findMany({
    include: {
      translations: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (await posts).map((p) => ({
    ...p,
    title:
      p.translations.find((t) => t.locale === "fr")?.title ||
      p.translations.find((t) => t.locale === "en")?.title ||
      p.slug,
  }));
});
