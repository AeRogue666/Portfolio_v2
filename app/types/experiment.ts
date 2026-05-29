import type { FeedKind } from "@prisma/client";
import type { ResponsiveImage } from "./media";

export interface Experiment {
  id: string;

  slug: string;
  kind: FeedKind;

  title: string;
  description?: string;
  content: string;

  feedTitle?: string;
  feedSummary?: string;

  date: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  
  pinned: boolean;

  tags: string[];

  image: ResponsiveImage;
  previewUrl?: string;
}