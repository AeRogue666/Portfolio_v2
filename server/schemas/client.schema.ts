import { z } from "zod";

export const ClientSchema = z.object({
  id: z.string(),

  slug: z.string(),
  kind: z.string(),

  locale: z.enum(["fr", "en"]),

  title: z.string(),
  description: z.string().optional(),
  content: z.string(),

  feedTitle: z.string().optional(),
  feedSummary: z.string().optional(),

  testimony: z.string().optional().default(""),
  customerName: z.string().default(""),
  customerJob: z.string().optional().default(""),
  customerCity: z.string().optional().default(""),
  customerEnterpriseName: z.string().optional().default(""),

  image: z.any().optional(),
  alt: z.string().optional(),
});

export const ClientListSchema = z.array(ClientSchema);

export type ClientDTO = z.infer<typeof ClientSchema>;
