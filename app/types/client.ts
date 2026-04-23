import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

interface ClientLinks {
  website?: string;
}

export interface Client {
  id: string;
  slug: string;
  date: string;
  customer_name: string;
  customer_job?: string;
  customer_city?: string;
  customer_enterprise_name?: string;
  created_at: string;
  updated_at?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  links?: ClientLinks;
  translations: Record<Locale, ClientTranslation>;
}

export interface ClientTranslation {
  title: string;
  description: string;
  testimony: string;
}

export interface ClientResolved extends ClientTranslation {
  id: string;
  slug: string;
  date: string;
  customer_name: string;
  customer_job?: string;
  customer_city?: string;
  customer_enterprise_name?: string;
  created_at: string;
  updated_at?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  links?: ClientLinks;
}

export interface ClientResponse {
  total: number;
  items: ClientResolved[];
}
