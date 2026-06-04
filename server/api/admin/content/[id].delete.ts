import { prisma } from "~~/server/db/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  return prisma.post.delete({
    where: {
      id,
    },
  });
});
