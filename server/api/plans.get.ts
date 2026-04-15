import type { Locale } from "@/types/i18n";
import { toPlanItem } from "../lib/toPlanItem";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    
    const plans = await queryCollection(event, "plans")
      .where("locale", "=", locale)
      .all();

    let feed = [
      ...plans.map((p) => toPlanItem({ ...p }))
    ];

    return {
      total: feed.length,
      items: feed,
    };
  },
  {
    maxAge: 600, // 10 minutes
    getKey: (event) => {
      const q = getQuery(event);
      return `plans-${q.locale ?? "en"}-${q.offset ?? 0}-${q.limit ?? 10}`;
    },
  },
);
