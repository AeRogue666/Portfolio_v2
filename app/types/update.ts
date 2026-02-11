import type { FeedKind } from "./feed";
import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

export interface Update {
  slug: string;
  date: string;
  kind: FeedKind;
  pinned?: boolean;
  tags: string[];
  image: ResponsiveImage;
  translations: Record<Locale, UpdateTranslation>;
}

export interface UpdateTranslation {
  title: string;
  summary: string;
  content: string;
}

export interface UpdateResolved extends UpdateTranslation {
  slug: string;
  date: string;
  kind: FeedKind;
  pinned?: boolean;
  tags: string[];
  image: ResponsiveImage;
}
