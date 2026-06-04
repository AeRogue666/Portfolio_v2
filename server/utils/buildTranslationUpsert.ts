import { Locale } from "@prisma/client";

export function buildTranslationUpsert(
  postId: string,
  locale: Locale,
  data: any
) {
  return {
    where: {
      postId_locale: {
        postId,
        locale,
      },
    },
    update: {
        ...data
    },

    create: {
      locale,
      ...data,
    },
  };
}
