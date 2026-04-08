import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const responsiveSourceSchema = z.object({
  mobile: z.string().optional().default(""),
  desktop: z.string().optional().default(""),
  tablet: z.string().optional(),
});

const responsiveImageSchema = z.object({
  alt: z.string(),
  sources: z
    .object({
      feed: responsiveSourceSchema,
      detail: responsiveSourceSchema,
    })
    .optional(),
});

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: {
        include: "**/*.md",
        exclude: ["projects/**", "updates/**"],
      },
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/**/*.md",
      schema: z.object({
        slug: z.string(),
        locale: z.enum(["fr", "en"]),
        kind: z.literal("project"),
        pinned: z.boolean().optional().default(false),
        previewUrl: z.string().optional(),
        created_at: z.string(),
        updated_at: z.string().optional(),
        title: z.string().optional().default(""),
        description: z.string().optional().default(""),
        feed_title: z.string().optional().default(""),
        feed_summary: z.string().optional().default(""),
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
      }),
    }),

    updates: defineCollection({
      type: "page",
      source: "updates/**/*.md",
      schema: z.object({
        slug: z.string(),
        locale: z.enum(["fr", "en"]),
        kind: z.literal("update"),
        pinned: z.boolean().optional().default(false),
        previewUrl: z.string().optional(),
        created_at: z.string(),
        updated_at: z.string().optional(),
        title: z.string().optional().default(""),
        description: z.string().optional().default(""),
        feed_title: z.string().optional().default(""),
        feed_summary: z.string().optional().default(""),
        tags: z.array(z.string()).optional().default([]),
        image: responsiveImageSchema.optional(),
      }),
    }),
  },
});
