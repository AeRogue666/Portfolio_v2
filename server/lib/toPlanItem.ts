import type { PlanItem } from '@/types/planFeed';

type PlanSource = {
  title?: string;
  description?: string;
  feed_title?: string;
  feed_summary?: string;
  slug: string;
  date?: string;
  created_at: string;
  updated_at?: string;
  previewUrl?: string;
  image?: any;
  features?: string[];
  tags?: string[];
};

export function toPlanItem(source: PlanSource): PlanItem {
  const effectiveDate = source.updated_at ?? source.created_at;

  return {
    title: source.title ?? '',
    description: source.description,
    feed_title: source.feed_title,
    feed_summary: source.feed_summary,
    slug: source.slug,
    date: effectiveDate,
    created_at: source.created_at,
    updated_at: source.updated_at ?? undefined,
    previewUrl: source.previewUrl,
    image: source.image,
    features: source.features,
    tags: source.tags,
  };
}
