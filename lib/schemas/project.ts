import { z } from "zod";
import { metadataSchema } from "./common";
import { responsiveImageSchema } from "./image";

export const projectSchema = z.object({
  ...metadataSchema,
  kind: z.literal("project"),
  pinned: z.boolean().optional().default(false),

  title: z.string().default(""),
  description: z.string().default(""),

  feed_title: z.string().default(""),
  feed_summary: z.string().default(""),

  role: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  stack: z.array(z.string()).optional().default([]),
  links: z
    .object({
      github: z.string().optional(),
      demo: z.string().optional(),
    })
    .optional(),
  image: responsiveImageSchema.optional(),
});
