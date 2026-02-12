import { Locale } from "~/types/i18n";
import { about } from "../data/about";
import { projects } from "../data/projects";
import { updates } from "../data/updates";
import { toFeedItem } from "../utils/toFeedItem";

// deviendra prisma.post.findMany({ where: { kind: { in: ['about','project','update'] } } })

export default cachedEventHandler(
  (event) => {
    const query = getQuery(event),
      limit = Number(query.limit ?? 5),
      offset = Number(query.offset ?? 0),
      locale: Locale = query.locale === "fr" ? "fr" : "en";

    const feed = [
      ...projects.map((p) => toFeedItem({ ...p, kind: "project" }, locale)),
      ...updates.map((u) => toFeedItem({ ...u, kind: "update" }, locale)),
      toFeedItem({ ...about, kind: "about" }, locale),
    ];
    
    feed.sort((a, b) => {
      if (a.kind === "pinned" && b.kind !== "pinned") return -1;
      if (a.kind !== "pinned" && b.kind === "pinned") return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return {
      total: feed.length,
      items: feed.slice(offset, offset + limit),
    };
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const q = getQuery(event);
      return `posts-${q.locale ?? "en"}-${q.offset ?? 0}-${q.limit ?? 5}`;
    },
  },
);
