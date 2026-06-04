import { prisma } from "../db/prisma";
import type { Locale, FeedKind } from "@prisma/client";
import type { FeedResponse } from "~/types/feed";
import { ResponsiveImage } from "~/types/media";

export default defineEventHandler(async (event): Promise<FeedResponse> => {
  const query = getQuery(event);

  // Parse query parameters with validation
  const locale = (query.locale as string) === "en" ? "en" : ("fr" as Locale);
  const limit = Math.min(Number(query.limit ?? 10), 30);
  const offset = Math.max(Number(query.offset ?? 0), 0);
  const sortBy = (query.sort as string) ?? "recent";

  // Parse comma-separated filters
  const selectedTags = (query.tags as string)?.split(",").filter(Boolean) ?? [];
  const selectedKinds =
    (query.kinds as string)?.split(",").filter(Boolean) ?? [];

  try {
    // Basic clause filter
    const where: any = {
      translations: {
        some: {
          locale,
        },
      },
    };

    // Filters by kinds if provided
    if (selectedKinds.length > 0) {
      where.kind = {
        in: selectedKinds as FeedKind[],
      };
    }

    // Filter by tags (case-insensitive contains)
    if (selectedTags.length > 0) {
      where.tags = {
        hasSome: selectedTags, // PostgreSQL array contains ANY
      };
    }

    // Get total count BEFORE pagination
    const tagsRaw = await prisma.$queryRaw<{ tag: string }[]>`
    SELECT DISTINCT unnest(tags) as tag FROM "Post" WHERE tags IS NOT NULL`;

    const availableTags = tagsRaw.map((t) => t.tag).sort();

    // Fetch paginated results
    const items = await prisma.post.findMany({
      where,
      include: {
        translations: {
          where: { locale },
          take: 1,
        },
      },
    });

    // Transform to FeedItem format (map Prisma model to frontend type)
    const transformedItems = items.map((item) => {
      const t = item.translations.find((tr) => tr.locale === locale);

      return {
        id: item.id,
        kind: item.kind,
        slug: item.slug,

        title: t?.title ?? "",
        description: t?.description ?? undefined,
        feed_title: t?.feedTitle ?? undefined,
        feed_summary: t?.feedSummary ?? undefined,

        date: item.date.toISOString(),
        created_at: item.createdAt.toISOString(),
        updated_at: item.updatedAt?.toISOString(),

        tags: item.tags,
        pinned: item.pinned,

        image: item.image as unknown as ResponsiveImage,
        previewUrl: item.previewUrl ?? undefined,

        customer_name: t?.customerName || "",
        customer_job: t?.customerJob ?? undefined,
        customer_city: t?.customerCity ?? undefined,
        customer_enterprise_name: t?.customerEnterpriseName ?? undefined,
        testimony: t?.testimony ?? "",
      };
    });

    const collator = new Intl.Collator(locale, {
      sensitivity: "base",
      numeric: true,
    });

    const normalize = (s: string) =>
      s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    transformedItems.sort((a, b) => {
      // Absolute priority on pinned elements (pinned)
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      // Secondary sort by user choice
      if (sortBy === "alpha") {
        return collator.compare(normalize(a.title), normalize(b.title));
      } else if (sortBy === "alpha-desc") {
        return collator.compare(normalize(b.title), normalize(a.title));
      } else if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        // "recent" by default
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    // Calculate pagination info
    const total = transformedItems.length;
    const paginatedItems = transformedItems.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      total,
      hasMore: offset + limit < total,
      availableTags,
    };
  } catch (e) {
    console.error("Error fetching posts:", e);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch posts",
    });
  }
});
