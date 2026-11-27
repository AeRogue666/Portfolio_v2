import type { FeedKind } from "./feed";
import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

interface ArticleLinks {
  linkedin?: string;
  devto?: string;
  medium?: string;
}

export interface Article {
  slug: string;
  kind: FeedKind;
  created_at: string;
  updated_at?: string;
  date?: string;
  pinned?: boolean;
  previewUrl?: string;
  image?: ResponsiveImage;
  tags?: string[];
  links?: ArticleLinks;
  translations: Record<Locale, ArticleTranslation>;
}

export interface ArticleTranslation {
  title: string;
  description: string;
  feed_title: string;
  feed_summary: string;
}

export interface ArticleResolved extends ArticleTranslation {
  slug: string;
  kind: FeedKind;
  created_at: string;
  updated_at?: string;
  pinned?: boolean;
  previewUrl?: string;
  image?: ResponsiveImage;
  tags?: string[];
  links?: ArticleLinks;
}
