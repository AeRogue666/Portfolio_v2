import { z } from "zod";

export const localeSchema = z.enum(["fr", "en"]);

export const metadataSchema = {
  slug: z.string(),
  locale: localeSchema,
  previewUrl: z.string().optional(),
  created_at: z.union([z.string(), z.date()]),
  updated_at: z.union([z.string(), z.date()]).optional(),
};
