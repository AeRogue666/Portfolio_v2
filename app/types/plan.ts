import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

export interface Plan {
  slug: string;
  created_at: string;
  updated_at?: string;
  date?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  tags?: string[];
  translations: Record<Locale, PlanTranslation>;
}

export interface PlanTranslation {
  title: string;
  description?: string;
  feed_title?: string;
  feed_summary?: string;
  features?: string[];
}

export interface PlanResolved extends PlanTranslation {
  slug: string;
  created_at: string;
  updated_at?: string;
  date?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  tags?: string[];
}
