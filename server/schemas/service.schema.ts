import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string(),

  slug: z.string(),
  kind: z.string(),

  locale: z.enum(['fr', 'en']),

  title: z.string(),
  description: z.string().optional(),
  content: z.string(),

  feedTitle: z.string().optional(),
  feedSummary: z.string().optional(),

  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),

  pinned: z.boolean().optional(),

  image: z.any().optional(),
  previewUrl: z.string().optional(),

  tags: z.array(z.string()).optional(),
  tag: z.string().optional(),

  highlighted: z.boolean().optional(),

  packages: z
    .array(
      z.object({
        title: z.string(),
        children: z.array(
          z.object({
            title: z.string(),
            price: z.string(),
            ttc: z.boolean(),
            features: z.array(z.string()),
          }),
        ),
      }),
    )
    .optional(),
});

export const ServiceListSchema = z.array(ServiceSchema);

export type ServiceDTO = z.infer<typeof ServiceSchema>;
