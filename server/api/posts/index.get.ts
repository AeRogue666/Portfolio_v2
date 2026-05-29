import { Locale } from "@prisma/client";
import { prisma } from "~~/server/db/prisma";
import { toPostDTO } from "~~/server/transformers/post";

export default defineEventHandler(async (event) => {
  const query = getQuery(event),
    locale: Locale = query.locale === "fr" ? "fr" : "en",
    kind = query.kind;

  const posts = await prisma.post.findMany({
    where: {
      kind: kind as any,
      locale: locale as string,
    },
    include: {
      translations: {
        where: { locale },
        take: 1,
      },
    },

    orderBy: {
      date: "desc",
    },
  });

  return posts.map((p) => toPostDTO(p, locale));
});
