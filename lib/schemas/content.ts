import { z } from "zod";
import { metadataSchema } from "./common";

export const contentSchema = z.object({
  ...metadataSchema,
  title: z.string().default(""),
  description: z.string().optional().default(""),
});
