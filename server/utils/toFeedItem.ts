import { FeedItem } from "~/types/feed";
import { Locale } from "~/types/i18n";

// Deviendra ToFeedItem(prismaObject)

type FeedSource = {
  slug?: string;
  date: string;
  pinned?: boolean;
  tags?: string[];
  image?: any;
  kind: Exclude<FeedItem["kind"], "pinned">;
  translations: Record<
    Locale,
    {
      title: string;
      summary?: string;
    }
  >;
};

export function toFeedItem(source: FeedSource, locale: Locale): FeedItem {
  const r = resolveWithLocale(source, locale);

  const kind: FeedItem['kind'] = r.pinned ? 'pinned' : r.kind;

  return {
    id: r.slug ? `${r.kind}-${r.slug}` : r.kind,
    kind,
    kindFallback: r.pinned ? r.kind : undefined,
    title: r.title,
    summary: r.summary,
    slug: r.slug,
    date: r.date,
    pinned: r.pinned,
    tags: r.tags,
    image: r.image,
  };
}
