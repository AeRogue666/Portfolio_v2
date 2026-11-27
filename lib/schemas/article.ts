import { z } from "zod";
import { metadataSchema } from "./common";
import { responsiveImageSchema } from "./image";

export const articleSchema = z.object({
  ...metadataSchema,
  kind: z.literal("article"),
  pinned: z.boolean().optional().default(false),

  title: z.string().default(""),
  description: z.string().default(""),

  feed_title: z.string().default(""),
  feed_summary: z.string().default(""),
  accessible_name: z.string().default(""),
  
  tags: z.array(z.string()).optional().default([]),
  image: responsiveImageSchema.optional(),
  links: z
    .object({
      linkedin: z.string().optional(),
      devto: z.string().optional(),
      medium: z.string().optional(),
    })
    .optional(),
});
