import type { Locale } from "@/types/i18n";
import { prisma } from "../db/prisma";
import { ServiceListSchema } from "../schemas/service.schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event),
    locale = (query.locale as string) === "en" ? "en" : ("fr" as Locale);

  const services = await prisma.post.findMany({
    where: {
      kind: "service",
      
      translations: {
        some: {
          locale,
        },
      },
    },

    include: {
      translations: {
        where: {
          locale,
        }
      }
    },

    orderBy: {
      date: "desc",
    },
  });

  const normalizedServices = services.map((service) => {
    const t = service.translations?.[0];

    return {
      ...service,
      locale,
      title: t?.title ?? "",
      description: t?.description ?? "",
      content: t?.content ?? "",

      feedTitle: t?.feedTitle ?? "",
      feedSummary : t?.feedSummary ?? "",

      highlighted: service.tags?.includes("highlighted") ?? false,

      tag: service.tags?.[0],
    };
  });

  const parsed = ServiceListSchema.safeParse(normalizedServices);

  if (!parsed.success) {
    console.error(parsed.error);
    throw createError({
      statusCode: 500,
      statusMessage: "Invalid services data shape",
    });
  }

  return parsed.data;
});
