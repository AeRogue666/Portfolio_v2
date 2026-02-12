import type { FeedKind } from "./feed";
import type { Locale } from "./i18n";
import type { ResponsiveImage } from "./media";

interface ProjectLinks {
  github?: string;
  demo?: string;
}

interface ProjectTechnicalChoices {
  title: string;
  description: string;
};

export interface Project {
  slug: string;
  kind: FeedKind;
  date: string;
  pinned?: boolean;
  image?: ResponsiveImage;
  tags?: string[];
  stack?: string[];
  links: ProjectLinks;
  translations: Record<Locale, ProjectTranslation>;
}

export interface ProjectTranslation {
  title: string;
  summary: string;
  feed_title: string;
  feed_summary: string;
  role: string;
  context: string;
  problem: string;
  solution: string;
  technicalChoices: ProjectTechnicalChoices[];
  accessibility: string;
  learnings: string[];
}

export interface ProjectResolved extends ProjectTranslation {
  slug: string;
  kind: FeedKind;
  date: string;
  pinned?: boolean;
  image?: ResponsiveImage;
  tags?: string[];
  stack?: string[];
  links?: ProjectLinks;
}
