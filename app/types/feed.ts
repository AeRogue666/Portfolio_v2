import type { ResponsiveImage } from "./media";

export type FeedKind = "project" | "update" | "about" | "pinned"; // One day: Job, Talk, Note, etc.

export interface FeedItem {
  id: string;
  kind: FeedKind;
  kindFallback?: FeedKind; // if kind is pinned, show the real post type
  title: string;
  summary?: string;
  feed_title?: string;
  feed_summary?: string;
  slug?: string;
  date: string;
  tags?: string[];
  pinned?: boolean;
  image?: ResponsiveImage;
}

export interface FeedResponse {
  total: number;
  items: FeedItem[];
}
