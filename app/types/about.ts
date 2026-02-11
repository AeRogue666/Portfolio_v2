import type { FeedKind } from "./feed";
import type { Locale } from "./i18n";

export interface About {
  slug: string;
  kind: FeedKind;
  date: string;
  pinned?: boolean;
  tags?: string[];
  translations: Record<Locale, AboutTranslation>;
}

export interface AboutTranslation {
  title: string;
  summary: string;
}

export interface AboutResolved extends AboutTranslation {
  slug: string;
  date: string;
  kind: FeedKind;
  pinned?: boolean;
  tags?: string[];
}
