import type { Locale } from "@/types/i18n";
import { about } from "#server/data/about";
import { toFeedItem } from "#server/lib/toFeedItem";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      limit = Math.min(Number(query.limit ?? 10), 30), // A conserver, pour le jour où le portfolio contiendra 1000+ posts
      offset = Math.max(Number(query.offset ?? 0), 0),
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    const selectedTags =
      (query.tags as string)?.split(",").filter(Boolean) ?? [];
    const selectedKinds =
      (query.kinds as string)?.split(",").filter(Boolean) ?? [];

    const sortBy = (query.sort as string) ?? "recent";

    const [projects, updates] = await Promise.all([
      queryCollection(event, "projects").where("locale", "=", locale).all(),
      queryCollection(event, "updates").where("locale", "=", locale).all(),
    ]);

    const aboutItem = about.translations[locale];
    const aboutFeedSource = {
      ...aboutItem,
      slug: about.slug,
      created_at: about.created_at,
      pinned: about.pinned ?? false,
      tags: about.tags,
      kind: "about" as const,
    };

    /* ======
      Feed complet
      ====== */
    let feed = [
      ...projects.map((p) => toFeedItem({ ...p, kind: "project" as const })),
      ...updates.map((u) => toFeedItem({ ...u, kind: "update" as const })),
      toFeedItem(aboutFeedSource),
    ];

    /* ======
      Extraire availableTags avant filtrage
      ====== */
    const allTags = new Set<string>();
    feed.forEach((item) => {
      item.tags?.forEach((tag) => allTags.add(tag));
    });
    const availableTags = Array.from(allTags).sort();

    /* ======
      Filtrage par tags
      (posts épinglés jamais filtrés)
      ====== */
    if (selectedTags.length > 0) {
      const nonPinnedFeed = feed.filter((item) => !item.pinned);
      const pinnedFeed = feed.filter((item) => item.pinned);

      const filteredNonPinned = nonPinnedFeed.filter((item) =>
        item.tags?.some((tag) => selectedTags.includes(tag)),
      );

      feed = [...pinnedFeed, ...filteredNonPinned];
    }

    /* ======
      Filtrage par kinds
      ====== */
    if (selectedKinds.length > 0) {
      const nonPinnedFeed = feed.filter((item) => !item.pinned);
      const pinnedFeed = feed.filter((item) => item.pinned);

      const filteredNonPinned = nonPinnedFeed.filter((item) =>
        selectedKinds.includes(item.kindFallback ?? item.kind),
      );

      feed = [...pinnedFeed, ...filteredNonPinned];
    }

    /* ======
      Tri (avant pagination)
      ====== */
    feed.sort((a, b) => {
      if (a.kind === "pinned" && b.kind !== "pinned") return -1;
      if (a.kind !== "pinned" && b.kind === "pinned") return 1;

      switch (sortBy) {
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "alpha":
          return a.title.localeCompare(b.title, locale);
        case "alpha-desc":
          return b.title.localeCompare(a.title, locale);
        case "recent":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    /* ======
      Pagination
      ====== */
    const totalFilteredItems = feed.length;
    const paginatedFeed = feed.slice(offset, offset + limit);
    const hasMore = offset + limit < totalFilteredItems;

    return {
      total: totalFilteredItems,
      items: paginatedFeed,
      hasMore,
      availableTags,
    };
  },
  {
    maxAge: 600, // 10 minutes
    getKey: (event) => {
      const q = getQuery(event);
      return `posts-${q.locale ?? "en"}-${q.offset ?? 0}-${q.limit ?? 10}-${q.tags ?? "all"}-${q.kinds ?? "all"}-${q.sort ?? "recent"}`;
    },
  },
);

// deviendra prisma.post.findMany({ where: { kind: { in: ['about','project','update'] } } })
