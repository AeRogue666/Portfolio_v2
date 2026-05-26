import type { FeedItem } from "@/types/feed";

type FeedSource = {
  slug?: string;
  kind: Exclude<FeedItem["kind"], "pinned">;
  title?: string | null;
  description?: string | null;
  feed_title?: string | null;
  feed_summary?: string | null;
  created_at: string | Date;
  updated_at?: string | Date | null;
  pinned?: boolean;
  tags?: string[];
  image?: any;
  customer_name?: string;
  customer_job?: string;
  customer_city?: string;
  customer_enterprise_name?: string;
  testimony?: string;
  previewUrl?: string;
  links?: {
    github?: string;
    demo?: string;
    website?: string;
  };
};

export function toFeedItem(source: FeedSource): FeedItem {
  const kind: FeedItem["kind"] = source.pinned ? "pinned" : source.kind;
  const normalizedDate = (value?: string | Date | null): string => {
    if (!value) {
      return new Date().toISOString();
    }

    return value instanceof Date ? value.toISOString() : value;
  };
  const effectiveDate = normalizedDate(source.updated_at ?? source.created_at);

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
    created_at: normalizedDate(source.created_at),
    updated_at: source.updated_at ? normalizedDate(source.updated_at) : undefined,
    pinned: source.pinned,
    tags: source.tags,
    image: source.image ? structuredClone(source.image) : undefined,
    customer_name: source.customer_name ?? "",
    customer_job: source.customer_job,
    customer_city: source.customer_city,
    customer_enterprise_name: source.customer_enterprise_name,
    testimony: source.testimony,
    previewUrl: source.previewUrl,
    links: source.links ?? {},
  };
}
