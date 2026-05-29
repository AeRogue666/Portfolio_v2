import type { Locale } from "@/types/i18n";
import { prisma } from "../db/prisma";
import { ClientListSchema } from "../schemas/client.schema";

export default defineEventHandler(async (event) => {
  const query = getQuery(event),
    locale = (query.locale as string) === "en" ? "en" : ("fr" as Locale);

  const clients = await prisma.post.findMany({
    where: {
      kind: "client",
      
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

  const normalizedClient = clients.map((client) => {
    const t = client.translations?.[0];

    return {
      ...client,
      locale,
      title: t?.title ?? "",
      description: t?.description ?? "",
      content: t?.content ?? "",

      feedTitle: t?.feedTitle ?? "",
      feedSummary : t?.feedSummary ?? "",

      customerName: t?.customerName ?? "",
      customerJob: t?.customerJob ?? "",
      customerCity: t?.customerCity ?? "",
      customerEnterpriseName: t?.customerEnterpriseName ?? "",
      testimony: t?.testimony ?? "",

      highlighted: client.tags?.includes("highlighted") ?? false,

      tag: client.tags?.[0],
    };
  });

  const parsed = ClientListSchema.safeParse(normalizedClient);

  if (!parsed.success) {
    console.error(parsed.error);
    throw createError({
      statusCode: 500,
      statusMessage: "Invalid clients data shape",
    });
  }

  return parsed.data;
});
