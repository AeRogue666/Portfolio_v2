import type { Locale } from "@/types/i18n";
import { about } from "#server/data/about";
import { toFeedItem } from "#server/lib/toFeedItem";

// DEMANDER A CLAUDE DE NETTOYER LE CODE DU COMPO useFeed CAR DUPLICATION DU FILTRAGE TAGS + KINDS

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      limit = Math.min(Number(query.limit ?? 10), 30), // A conserver, pour le jour où le portfolio contiendra 1000+ posts
      offset = Math.max(Number(query.offset ?? 0), 0),
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    const selectedTags = (query.tags as string)?.split(",").filter(Boolean) ?? [];
    const selectedKinds = (query.kinds as string)?.split(",").filter(Boolean) ?? [];

    /* const allProjects = await queryCollection(event, "projects").all();
    console.log("ALL projects:", allProjects.length);
    console.log('Premier projet:', JSON.stringify(allProjects[0], null, 2)); */

    const [projects, updates] = await Promise.all([
      queryCollection(event, "projects").where("locale", "=", locale).all(),
      queryCollection(event, "updates").where("locale", "=", locale).all(),
    ]);

    // console.log("projects found:", projects.length);

    const aboutItem = about.translations[locale];
    const aboutFeedSource = {
      ...aboutItem,
      slug: about.slug,
      created_at: about.created_at,
      pinned: about.pinned ?? false,
      tags: about.tags,
      kind: "about" as const,
    };

    let feed = [
      ...projects.map((p) => toFeedItem({ ...p, kind: "project" as const })),
      ...updates.map((u) => toFeedItem({ ...u, kind: "update" as const })),
      toFeedItem(aboutFeedSource),
    ];

    const allTags = new Set<string>();
    feed.forEach((item) => {
      item.tags?.forEach((tag) => allTags.add(tag));
    });
    const availableTags = Array.from(allTags).sort();

    if (selectedTags.length > 0) {
      const nonPinnedFeed = feed.filter((item) => !item.pinned);
      const pinnedFeed = feed.filter((item) => item.pinned);

      const filteredNonPinned = nonPinnedFeed.filter((item) =>
        item.tags?.some((tag) => selectedTags.includes(tag)),
      );

      feed = [...pinnedFeed, ...filteredNonPinned];
    }

    feed.sort((a, b) => {
      if (a.kind === "pinned" && b.kind !== "pinned") return -1;
      if (a.kind !== "pinned" && b.kind === "pinned") return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const paginatedFeed = feed.slice(offset, offset + limit);
    const hasMore = offset + limit < feed.length;

    return {
      total: feed.length,
      items: paginatedFeed,
      hasMore,
      availableTags,
    };
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const q = getQuery(event);
      return `posts-${q.locale ?? "en"}-${q.offset ?? 0}-${q.limit ?? 10}`;
    },
  },
);

// deviendra prisma.post.findMany({ where: { kind: { in: ['about','project','update'] } } })
