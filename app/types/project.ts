import type { FeedKind } from "@prisma/client";
import type { ResponsiveImage } from "./media";

interface technicalChoices {
  title: string;
  description: string;
}

export interface Project {
  id: string;

  slug: string;
  kind: FeedKind;

  title: string;
  description: string;
  content: string;
  
  date: string;
  createdAt: string | Date;
  updatedAt?: string | Date;

  pinned: boolean;

  tags: string[];

  image?: ResponsiveImage;
  previewUrl?: string;

  stack?: string[];

  github?: string;
  demo?: string;

  role?: string;
  problem?: string;
  solution?: string;

  technicalChoices?: technicalChoices;

  accessibility?: string;

  learnings?: string[];
}