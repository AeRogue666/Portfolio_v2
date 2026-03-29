import type { Locale } from "@/types/i18n";
import { about } from "#server/data/about";
import { toFeedItem } from "#server/lib/toFeedItem";

// deviendra prisma.post.findMany({ where: { kind: { in: ['about','project','update'] } } })

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      /* limit = Number(query.limit ?? 5), A conserver, pour le jour où le portfolio contiendra 1000+ posts
      offset = Number(query.offset ?? 0), */
      locale: Locale = query.locale === "fr" ? "fr" : "en";

    const allProjects = await queryCollection(event, "projects").all();
    console.log("ALL projects:", allProjects.length);
    console.log('Premier projet:', JSON.stringify(allProjects[0], null, 2));

    const [projects, updates] = await Promise.all([
      queryCollection(event, "projects").where("locale", "=", locale).all(),
      queryCollection(event, "updates").where("locale", "=", locale).all(),
    ]);

    console.log("projects found:", projects.length);

    const aboutItem = about.translations[locale];
    const aboutFeedSource = {
      ...aboutItem,
      slug: about.slug,
      created_at: about.created_at,
      pinned: about.pinned ?? false,
      tags: about.tags,
      kind: "about" as const,
    };

    const feed = [
      ...projects.map((p) =>
        toFeedItem({ ...p, kind: "project" as const }),
      ),
      ...updates.map((u) =>
        toFeedItem({ ...u, kind: "update" as const }),
      ),
      toFeedItem(aboutFeedSource),
    ];

    feed.sort((a, b) => {
      if (a.kind === "pinned" && b.kind !== "pinned") return -1;
      if (a.kind !== "pinned" && b.kind === "pinned") return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return {
      total: feed.length,
      items: feed, // On renvoit tout au lieu d'utiliser feed.slice(offset, offset + limit),
    };
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const q = getQuery(event);
      return `posts-${q.locale ?? "en"}`; // -${q.offset ?? 0}-${q.limit ?? 5}
    },
  },
);
