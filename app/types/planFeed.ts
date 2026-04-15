import type { ResponsiveImage } from "./media";

export interface PlanItem {
  title: string;
  description?: string;
  feed_title?: string;
  feed_summary?: string;
  slug: string;
  date?: string;
  created_at: string;
  updated_at?: string;
  previewUrl?: string;
  image?: ResponsiveImage;
  features?: string[];
  tags?: string[];
}

export interface PlanResponse {
  total: number;
  items: PlanItem[];
}
