import type { ResponsiveImage } from "./media";

export type FeedKind = "project" | "update" | "about" | "pinned"; 
// Futurs kinds :
// Note - courte réflexion, pensée du moment, microblog (idéal pour du contenu fréquent et léger)
// Talk - présentation, conférence, intervention publique
// Experiment - side project, proof of concept, exploration technique sans objectif de production
// Reading - livre, article, ressource qui m'a marqué avec mon avis
// Job - expérience professionnelle, mission, poste occupé

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
  created_at: string;
  updated_at?: string;
  tags?: string[];
  pinned?: boolean;
  image?: ResponsiveImage;
}

export interface FeedResponse {
  total: number;
  items: FeedItem[];
}
