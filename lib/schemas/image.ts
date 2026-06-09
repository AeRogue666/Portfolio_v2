import { z } from "zod";

export const responsiveSourceSchema = z.object({
  mobile: z.string().optional().default(""),
  desktop: z.string().optional().default(""),
  tablet: z.string().optional(),
});

export const responsiveImageSchema = z.object({
  alt: z.string(),
  sources: z
    .object({
      feed: responsiveSourceSchema,
      detail: responsiveSourceSchema,
    })
    .optional(),
});
