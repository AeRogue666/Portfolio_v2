import type { ResponsiveImage } from "./media";

export type FeedKind = "project" | "experiment" | "about" | "pinned" | "note" | "read" | "client" | "talk" | "job";
// Kinds :
// Project - Projet personnel
// Experiment - side project, proof of concept, exploration technique sans objectif de production
// About - A propos
// Pinned - Post épinglé
// Note - courte réflexion, pensée du moment, microblog (idéal pour du contenu fréquent et léger)
// Talk - présentation, conférence, intervention publique
// Reading - livre, article, ressource qui m'a marqué avec mon avis
// Job - expérience professionnelle, mission, poste occupé

interface FeedLinks {
  github?: string;
  demo?: string;
  website?: string;
}

export interface FeedItem {
  id: string;
  kind: FeedKind;
  kindFallback?: FeedKind; // if kind is pinned, show the real post type
  title: string;
  description?: string;
  feed_title?: string;
  feed_summary?: string;
  slug?: string;
  date: string;
  created_at: string;
  updated_at?: string;
  tags?: string[];
  pinned?: boolean;
  image?: ResponsiveImage;
  previewUrl?: string;
  client_links?: string;
  links: FeedLinks;
  customer_name?: string;
  testimony?: string;
}

export interface FeedResponse {
  total: number;
  items: FeedItem[];
  hasMore: boolean,
  availableTags: string[];
}
