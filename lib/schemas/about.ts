import { z } from "zod";
import { metadataSchema } from "./common";
import { responsiveImageSchema } from "./image";

export const aboutSchema = z.object({
  ...metadataSchema,
  kind: z.literal("about"),
  pinned: z.boolean().optional().default(false),

  title: z.string().default(""),
  description: z.string().default(""),

  feed_title: z.string().default(""),
  feed_summary: z.string().default(""),

  tags: z.array(z.string()).optional().default([]),
  image: responsiveImageSchema.optional(),
});
