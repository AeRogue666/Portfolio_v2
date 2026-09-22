import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

export interface Landing {
  slug: string;
  created_at: string;
  updated_at?: string;
  date?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  tags?: string[];
  tag?: string;
  highlighted: boolean;
  translations: Record<Locale, LandingTranslation>;
}

export interface LandingTranslation {
  title: string;
  description?: string;
  feed_title?: string;
  feed_summary?: string;
}

export interface LandingResolved extends LandingTranslation {
  slug: string;
  created_at: string;
  updated_at?: string;
  date?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  tag?: string;
  tags?: string[];
  highlighted: boolean;
}

export interface LandingResponse {
  total: number;
  items: LandingResolved[];
}
