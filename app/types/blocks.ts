import type { BlockType } from "../lib/cms/blocks.registry";

export interface BaseBlock<T extends string = string> {
  id: string;
  type: T;
}

export interface HeroBlock extends BaseBlock<"hero"> {
  title: string;
  subtitle?: string;
}

export interface ImageBlock extends BaseBlock<"image"> {
  src: string;
  alt: string;
}

export interface CtaBlock extends BaseBlock<"cta"> {
  title: string;
  description?: string;

  buttonLabel: string;
  buttonHref: string;
}

export interface PackagesBlock extends BaseBlock<"packages"> {
  packages?: Package[];
}

interface Package {
  title: string;
  children?: PackageChildren[];
}

interface PackageChildren {
  title: string;
  price: string;
  ttc: boolean;
  features: string[];
}

export interface RichTextBlock extends BaseBlock<"richText"> {
  content: Record<string, any>;
}

export type InferBlock<T extends BlockType> = T extends "hero"
  ? HeroBlock
  : T extends "image"
    ? ImageBlock
    : T extends "cta"
      ? CtaBlock
      : T extends "packages"
        ? PackagesBlock
        : T extends "richText"
          ? RichTextBlock
          : never;

export type Block =
  | HeroBlock
  | ImageBlock
  | CtaBlock
  | PackagesBlock
  | RichTextBlock;
