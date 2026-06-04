import { prisma } from "~~/server/db/prisma";
import { FeedKind, Locale } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const kind = getRouterParam(event, "kind") as FeedKind;
  const query = getQuery(event);
  const locale = (query.locale as string) === "en" ? "en" : ("fr" as Locale);

    const page = await prisma.post.findFirst({
        where: {
            kind: kind,
        },
        include: {
            translations: {
                where: { locale },
                take: 1,
            },
        },
    });

    if(!page) {
        throw createError({
            statusCode: 404,
            statusMessage: `Page ${kind} not found`,
        });
    }

    const t = page.translations.find((tr) => tr.locale === locale);

    return {
        id: page.id,
        slug: page.slug,
        updatedAt: page.updatedAt,
        title: t?.title ?? "",
        description: t?.description ?? "",
        content: t?.content ?? "",
    };
});
