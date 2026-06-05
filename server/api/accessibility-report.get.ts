import type { Locale } from "@/types/i18n";
import { resolveWithLocale } from "#server/lib/resolve";
import { accessibilityReport } from "#server/data/accessibility";

export default cachedEventHandler(
  (event) => {
    const query = getQuery(event);
    const locale: Locale = query.locale === "fr" ? "fr" : "en";

    const resolved = resolveWithLocale(accessibilityReport, locale);

    return {
      ...resolved,
      // Statistiques calculées
      stats: {
        total: resolved.criteria.length,
        conformes: resolved.criteria.filter((c) => c.status === "C").length,
        nonConformes: resolved.criteria.filter((c) => c.status === "NC").length,
        nonApplicables: resolved.criteria.filter((c) => c.status === "NA")
          .length,
      },
    };
  },
  {
    maxAge: 60 * 10, // 10 minutes
    getKey: (event) => {
      const q = getQuery(event);
      return `accessibility-report-${q.locale ?? "en"}`;
    },
  },
);
