import type { FeedKind } from "@prisma/client";
import type { ResponsiveImage } from "./media";

export interface Service {
  id: string;

  slug: string;
  kind: FeedKind;

  locale: "fr" | "en";

  title: string;
  description?: string;
  content: string;

  feedTitle?: string;
  feedSummary?: string;

  date: string;
  createdAt: string | Date;
  updatedAt?: string | Date;

  pinned: boolean;

  image?: ResponsiveImage;
  previewUrl?: string;
  
  tags: string[];
  tag?: string;

  highlighted: boolean;

  packages: Array<{
    title: string;
    children: Array<{
      title: string;
      price: string;
      ttc: boolean;
      features: string[];
    }>;
  }>;
}
