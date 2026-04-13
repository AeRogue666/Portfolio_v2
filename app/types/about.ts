import type { FeedKind } from "./feed";
import type { Locale } from "./i18n";

export interface About {
  slug: string;
  kind: FeedKind;
  created_at: string;
  updated_at?: string;
  pinned?: boolean;
  tags?: string[];
  translations: Record<Locale, AboutTranslation>;
}

export interface AboutTranslation {
  title: string;
  description: string;
}

export interface AboutResolved extends AboutTranslation {
  slug: string;
  created_at: string;
  updated_at?: string;
  kind: FeedKind;
  pinned?: boolean;
  tags?: string[];
}
