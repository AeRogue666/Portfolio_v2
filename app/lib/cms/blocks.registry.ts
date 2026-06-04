import type { Component } from "vue";
import type { z } from "zod";

import HeroBlockEditor from "@/components/admin/components/cms/editors/blocks/HeroBlockEditor.vue";
import CtaBlockEditor from "@/components/admin/components/cms/editors/blocks/CtaBlockEditor.vue";
import ImageBlockEditor from "@/components/admin/components/cms/editors/blocks/ImageBlockEditor.vue";
import RichTextBlockEditor from "@/components/admin/components/cms/editors/blocks/RichTextBlockEditor.vue";
import PackagesBlockEditor from "@/components/admin/components/cms/editors/blocks/PackagesBlockEditor.vue";

import HeroBlockRenderer from "@/components/admin/components/cms/renderers/blocks/HeroBlockRenderer.vue";
import RichTextBlockRenderer from "@/components/admin/components/cms/renderers/blocks/RichTextBlockRenderer.vue";
import ImageBlockRenderer from "@/components/admin/components/cms/renderers/blocks/ImageBlockRenderer.vue";
import CtaBlockRenderer from "@/components/admin/components/cms/renderers/blocks/CtaBlockRenderer.vue";
import PackagesBlockRenderer from "@/components/admin/components/cms/renderers/blocks/PackagesBlockRenderer.vue";

import { heroSchema } from "#server/schemas/blocks/hero.schema";
import { richTextSchema } from "#server/schemas/blocks/richText.schema";
import { imageSchema } from "#server/schemas/blocks/image.schema";
import { ctaSchema } from "#server/schemas/blocks/cta.schema";
import { packagesSchema } from "#server/schemas/blocks/packages.schema";

type BlockRegistryEntry = {
  label: string;
  schema: z.ZodTypeAny;
  component: Component;
  renderer: Component;
};

export const blockRegistry = {
  hero: {
    label: "Hero",
    schema: heroSchema,
    component: HeroBlockEditor,
    renderer: HeroBlockRenderer,
  },
  richText: {
    label: "Texte",
    schema: richTextSchema,
    component: RichTextBlockEditor,
    renderer: RichTextBlockRenderer,
  },
  image: {
    label: "Image",
    schema: imageSchema,
    component: ImageBlockEditor,
    renderer: ImageBlockRenderer,
  },
  cta: {
    label: "CTA",
    schema: ctaSchema,
    component: CtaBlockEditor,
    renderer: CtaBlockRenderer,
  },
  packages: {
    label: "Packages",
    schema: packagesSchema,
    component: PackagesBlockEditor,
    renderer: PackagesBlockRenderer,
  },
} as const satisfies Record<string, BlockRegistryEntry>;

export type BlockType = keyof typeof blockRegistry;

export function getBlockConfig<T extends BlockType>(type: T) {
  return blockRegistry[type];
}
