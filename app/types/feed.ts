import type { ResponsiveImage } from "./media";
import type { FeedKind } from "@prisma/client";

// export type FeedKind = "project" | "experiment" | "about" | "pinned" | "note" | "read" | "client" | "talk" | "job";
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

  slug: string;
  kind: FeedKind;

  title: string;
  description?: string;

  feedTitle?: string;
  feedSummary?: string;
  
  date: string;
  createdAt: string | Date;
  updatedAt?: string | Date;

  tags?: string[];

  pinned: boolean;

  image?: ResponsiveImage;

  previewUrl?: string;

  links?: FeedLinks;
  
  customerName: string;
  customerJob?: string;
  customerCity?: string;
  customerEnterpriseName?: string;
  testimony?: string;
}

export interface FeedResponse {
  total: number;
  items: FeedItem[];
  hasMore: boolean,
  availableTags: string[];
}
