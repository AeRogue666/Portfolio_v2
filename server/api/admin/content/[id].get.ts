import { prisma } from "~~/server/db/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 404,
      statusMessage: "Missing id",
    });
  }

  return prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      translations: true,
    },
  });
});
