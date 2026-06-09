import { z } from "zod";
import { metadataSchema } from "./common";
import { responsiveImageSchema } from "./image";

export const clientSchema = z.object({
  ...metadataSchema,
  kind: z.literal("client"),
  pinned: z.boolean().optional().default(false),

  title: z.string().default(""),
  description: z.string().default(""),

  feed_title: z.string().default(""),
  feed_summary: z.string().default(""),

  testimony: z.string().optional().default(""),
  customer_name: z.string().default(""),
  customer_job: z.string().optional().default(""),
  customer_city: z.string().optional().default(""),
  customer_enterprise_name: z.string().optional().default(""),
  links: z
    .object({
      website: z.string().optional(),
    })
    .optional(),
  image: responsiveImageSchema.optional(),
});
