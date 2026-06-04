import type { Block } from "./blocks";

export interface PostTranslation {
  title: string;
  description?: string;
  blocks: Block[];
}

export interface PostContent {
  id: string;
  slug: string;
  kind: string;

  tags: string[];

  translations: {
    fr: PostTranslation;
    en: PostTranslation;
  };
}
