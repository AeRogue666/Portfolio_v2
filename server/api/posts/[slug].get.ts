import { prisma } from "~~/server/db/prisma";
import type { Locale } from "@/types/i18n";
import { toPostDTO } from "~~/server/transformers/post";

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

  return toPostDTO(post, locale);
});
