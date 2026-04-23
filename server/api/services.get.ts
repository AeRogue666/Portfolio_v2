import type { Locale } from "@/types/i18n";
import { toServiceItem } from "../lib/toServiceItem";

export default cachedEventHandler(
  async (event) => {
    const query = getQuery(event),
      locale: Locale = query.locale === "fr" ? "fr" : "en";
    
    const services = await queryCollection(event, "services")
      .where("locale", "=", locale)
      .all();

    let feed = [
      ...services.map((s) => toServiceItem({
        ...s,
        highlighted: false
      }))
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
      return `services-${q.locale ?? "en"}-${q.offset ?? 0}-${q.limit ?? 10}`;
    },
  },
);
