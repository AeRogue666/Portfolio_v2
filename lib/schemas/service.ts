import { z } from "zod";
import { metadataSchema } from "./common";
import { responsiveImageSchema } from "./image";

export const serviceSchema = z.object({
  ...metadataSchema,
  title: z.string().default(""),
  description: z.string().default(""),

  feed_title: z.string().default(""),
  feed_summary: z.string().default(""),

  features: z.array(z.string()).optional(),
  tag: z.string().default(""),
  tags: z.array(z.string()).optional().default([]),
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
  image: responsiveImageSchema.optional(),
  highlighted: z.boolean().default(false),
});
