import { z } from "zod";
import { metadataSchema } from "./common";
import { responsiveImageSchema } from "./image";

export const landingSchema = z.object({
  ...metadataSchema,
  title: z.string().default(""),
  description: z.string().default(""),

  feed_title: z.string().default(""),
  feed_summary: z.string().default(""),

  features: z.array(z.string()).optional(),
  tag: z.string().default(""),
  tags: z.array(z.string()).optional().default([]),
  image: responsiveImageSchema.optional(),
  highlighted: z.boolean().default(false),
});
