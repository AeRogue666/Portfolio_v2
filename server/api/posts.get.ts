import { prisma } from "../db/prisma";
import type { Locale, FeedKind, Prisma } from "@prisma/client";
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
    // Build Prisma WHERE clause with filters
    const where: Prisma.PostWhereInput = {
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
    const total = await prisma.post.count({ where });

    // Build ORDER BY clause
    const orderBy: Prisma.PostOrderByWithRelationInput[] = [];

    // Always pin pinned items first
    orderBy.push({ pinned: "desc" });

    // Then apply requested sort
    switch (sortBy) {
      case "oldest":
        orderBy.push({ date: "asc" });
        break;
      case "alpha":
        orderBy.push({
          translations: {
            _count: "desc",
          },
        });
        break;
      case "alpha-desc":
        orderBy.push({
          translations: {
            _count: "desc",
          },
        });
        break;
      case "recent":
      default:
        orderBy.push({ date: "desc" });
        break;
    }

    const shouldSortInMemory = sortBy === "alpha" || sortBy === "alpha-desc";

    // Fetch paginated results
    const items = await prisma.post.findMany({
      where,
      orderBy: [
        { pinned: "desc" },
        { date: sortBy === "oldest" ? "asc" : "desc" },
      ],
      ...(shouldSortInMemory
        ? {}
        : {
            take: limit,
            skip: offset,
          }),
      include: {
        translations: {
          where: { locale },
          take: 1,
        },
      },
    });

    // Extract all unique tags for filter UI
    const allTagsResult = await prisma.post.findMany({
      select: { tags: true },
    });

    const availableTags = Array.from(
      new Set(allTagsResult.flatMap((item: { tags: any }) => item.tags)),
    ).sort();

    // Transform to FeedItem format (map Prisma model to frontend type)
    const transformedItems = items.map((item) => {
      const t = item.translations[0]; // item.translations.find(tr => tr.locale === locale);

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
      ignorePunctuation: false,
    });

    const normalize = (s: string) =>
      s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    if (sortBy === "alpha") {
      transformedItems.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        return collator.compare(
          normalize(a.title),
          normalize(b.title),
        );
      });
    }

    if (sortBy === "alpha-desc") {
      transformedItems.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;

        return collator.compare(
          normalize(b.title),
          normalize(a.title),
        );
      });
    }

    // Calculate pagination info
    const sortedItems = shouldSortInMemory ? transformedItems : transformedItems;
    const paginatedItems = sortedItems.slice(offset, offset + limit);

    return {
      items: paginatedItems,
      total: sortedItems.length,
      hasMore: offset + limit < sortedItems.length,
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
