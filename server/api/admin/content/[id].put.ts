import { prisma } from "~~/server/db/prisma";
import { FeedKind } from "@prisma/client";
import { contentSchema } from "~~/server/schemas/content.schema";
import { buildTranslationUpsert } from "~~/server/utils/buildTranslationUpsert";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = contentSchema.parse(await readBody(event));

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing content id",
    });
  }

  try {
    return await prisma.post.update({
      where: {
        id
      },
      data: {
        slug: body.slug,
        kind: body.kind as FeedKind,

        pinned: body.pinned ?? false,
        highlighted: body.highlighted ?? false,

        tags: body.tags ?? [],
        stack: body.stack ?? [],

        github: body.github,
        demo: body.demo,
        website: body.website,

        previewUrl: body.previewUrl,
        image: body.image,
        
        translations: {
          upsert: [
            buildTranslationUpsert(
              id,
              'fr',
              body.translations.fr ?? {}
            ),
            buildTranslationUpsert(
              id,
              'en',
              body.translations.en ?? {}
            )
          ]
        }
      },

      include: {
        translations: true
      }
    })
  } catch (e) {
    console.error(e);
    throw createError({
      statusCode: 500,
      statusMessage: `Erreur de mise à jour du contenu: ${e}`,
    });
  }
});
