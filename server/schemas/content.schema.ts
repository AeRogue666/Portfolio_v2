import { z } from "zod";
import { blockSchema } from "./block.schema";

const responsiveSourceSchema = z.object({
  mobile: z.string().optional().default(""),
  desktop: z.string().optional().default(""),
  tablet: z.string().optional(),
});

const responsiveImageSchema = z.object({
  alt: z.string(),
  sources: z
    .object({
      feed: responsiveSourceSchema.optional(),
      detail: responsiveSourceSchema.optional(),
    })
    .optional(),
});

const translationSchema = z.object({
  title: z.string(),
  description: z.string(),

  feedTitle: z.string().optional().default(""),
  feedSummary: z.string().optional().default(""),

  blocks: z.array(blockSchema).default([]),

  role: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  technicalChoices: z.string().optional(),
  accessibility: z.string().optional(),

  learnings: z.string().optional(),

  customerName: z.string().optional(),
  customerJob: z.string().optional(),
  customerCity: z.string().optional(),
  customerEnterpriseName: z.string().optional(),

  testimony: z.string().optional(),

  packages: z
    .array(
      z.object({
        title: z.string().default(""),
        children: z.array(
          z
            .object({
              title: z.string().default(""),
              price: z.string().default(""),
              ttc: z.boolean().default(false),
              features: z.array(z.string()),
            })
            .optional(),
        ),
      }),
    )
    .optional(),
});

export const contentSchema = z.object({
  slug: z.string(),
  kind: z.string(),

  pinned: z.boolean().optional(),
  highlighted: z.boolean().optional(),

  tags: z.array(z.string()).optional(),
  stack: z.array(z.string()).optional(),

  github: z.string().optional(),
  demo: z.string().optional(),
  website: z.string().optional(),

  previewUrl: z.string().optional(),
  image: responsiveImageSchema.optional(),

  translations: z.object({
    fr: translationSchema,
    en: translationSchema,
  }),
});
