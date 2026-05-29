import type { FeedKind } from "@prisma/client";
import type { ResponsiveImage } from "./media";

export interface Client {
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

  image?: ResponsiveImage;
  previewUrl?: string;

  website?: string;

  customerName?: string;
  customerJob?: string;
  customerCity?: string;
  customerEnterpriseName?: string;
  testimony?: string;
}