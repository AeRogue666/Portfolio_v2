import type { FeedItem } from "@/types/feed";

type FeedSource = {
  slug?: string;
  kind: Exclude<FeedItem["kind"], "pinned">;
  title?: string | null;
  description?: string | null;
  feed_title?: string | null;
  feed_summary?: string | null;
  created_at: string;
  updated_at?: string | null;
  pinned?: boolean;
  tags?: string[];
  image?: any;
  customer_name?: string;
  testimony?: string;
  previewUrl?: string;
  links?: any;
};

export function toFeedItem(source: FeedSource): FeedItem {
  const kind: FeedItem["kind"] = source.pinned ? "pinned" : source.kind;
  const effectiveDate = source.updated_at ?? source.created_at;

  return {
    id: source.slug ? `${source.kind}-${source.slug}` : source.kind,
    kind,
    kindFallback: source.pinned ? source.kind : undefined,
    title: source.title ?? "",
    description: source.description ?? undefined,
    feed_title: source.feed_title ?? undefined,
    feed_summary: source.feed_summary ?? undefined,
    slug: source.slug,
    date: effectiveDate,
    created_at: source.created_at,
    updated_at: source.updated_at ?? undefined,
    pinned: source.pinned,
    tags: source.tags,
    image: source.image,
    customer_name: source.customer_name,
    testimony: source.testimony,
    previewUrl: source.previewUrl,
    links: source.links,
  };
}
