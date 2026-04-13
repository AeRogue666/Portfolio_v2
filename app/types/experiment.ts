import type { FeedKind } from "./feed";
import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

export interface Experiment {
  slug: string;
  created_at: string;
  updated_at?: string;
  kind: FeedKind;
  pinned?: boolean;
  previewUrl?: string;
  tags: string[];
  image: ResponsiveImage;
  translations: Record<Locale, ExperimentTranslation>;
}

export interface ExperimentTranslation {
  title: string;
  description: string;
  feed_title: string;
  feed_summary: string;
  content: string;
}

export interface ExperimentResolved extends ExperimentTranslation {
  slug: string;
  created_at: string;
  updated_at?: string;
  kind: FeedKind;
  pinned?: boolean;
  previewUrl?: string;
  tags: string[];
  image: ResponsiveImage;
}
