import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

export interface Service {
  slug: string;
  created_at: string;
  updated_at?: string;
  date?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  tags?: string[];
  tag?: string;
  highlighted: boolean;
  translations: Record<Locale, ServiceTranslation>;
}

export interface ServiceTranslation {
  title: string;
  description?: string;
  feed_title?: string;
  feed_summary?: string;
}

export interface ServiceResolved extends ServiceTranslation {
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

export interface ServiceResponse {
  total: number;
  items: ServiceResolved[];
}
