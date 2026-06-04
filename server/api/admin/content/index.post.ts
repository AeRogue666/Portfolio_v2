import { prisma } from "~~/server/db/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return prisma.post.create({
    data: {
      slug: body.slug,
      kind: body.kind,

      pinned: false,
      highlighted: false,

      translations: {
        create: [
          {
            locale: "fr",
            title: "",
          },
          {
            locale: "en",
            title: "",
          },
        ],
      },
    },
    include: {
      translations: true,
    },
  });
});
