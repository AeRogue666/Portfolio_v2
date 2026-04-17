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
        exclude: ["projects/**", "experiments/**", "clients/**"],
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
        title: z.string().default(""),
        description: z.string().default(""),
        feed_title: z.string().default(""),
        feed_summary: z.string().default(""),
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

    experiments: defineCollection({
      type: "page",
      source: "experiments/**/*.md",
      schema: z.object({
        slug: z.string(),
        locale: z.enum(["fr", "en"]),
        kind: z.literal("experiment"),
        pinned: z.boolean().optional().default(false),
        previewUrl: z.string().optional(),
        created_at: z.string(),
        updated_at: z.string().optional(),
        title: z.string().default(""),
        description: z.string().default(""),
        feed_title: z.string().default(""),
        feed_summary: z.string().default(""),
        tags: z.array(z.string()).optional().default([]),
        image: responsiveImageSchema.optional(),
      }),
    }),

    about: defineCollection({
      type: "page",
      source: "about/**/*.md",
      schema: z.object({
        slug: z.string(),
        locale: z.enum(["fr", "en"]),
        kind: z.literal("about"),
        pinned: z.boolean().optional().default(false),
        previewUrl: z.string().optional(),
        created_at: z.string(),
        updated_at: z.string().optional(),
        title: z.string().default(""),
        description: z.string().default(""),
        feed_title: z.string().default(""),
        feed_summary: z.string().default(""),
        tags: z.array(z.string()).optional().default([]),
        image: responsiveImageSchema.optional(),
      }),
    }),

    clients: defineCollection({
      type: "page",
      source: "clients/**/*.md",
      schema: z.object({
        slug: z.string(),
        locale: z.enum(["fr", "en"]),
        previewUrl: z.string().optional(),
        created_at: z.string(),
        updated_at: z.string().optional(),
        title: z.string().default(""),
        description: z.string().default(""),
        feed_title: z.string().default(""),
        feed_summary: z.string().default(""),
        testimony: z.string().optional().default(""),
        customer_name: z.string().optional().default(""),
        links: z
          .object({
            website: z.string().optional(),
          })
          .optional(),
        image: responsiveImageSchema.optional(),
      }),
    }),

    services: defineCollection({
      type: "page",
      source: "services/**/*.md",
      schema: z.object({
        slug: z.string(),
        locale: z.enum(["fr", "en"]),
        previewUrl: z.string().optional(),
        created_at: z.string(),
        updated_at: z.string().optional(),
        date: z.string().optional(),
        title: z.string().default(""),
        description: z.string().default(""),
        feed_title: z.string().default(""),
        feed_summary: z.string().default(""),
        features: z.array(z.string()).optional(),
        image: responsiveImageSchema.optional(),
      }),
    }),

    // Landing page
    problems: defineCollection({
      type: "page",
      "source": "index/problem_section/*.md",
      schema: z.object({
        locale: z.enum(["fr", "en"]),
        tag: z.string().optional(),
        title: z.string(),
        description: z.string(),
        highlighted: z.boolean().default(false),
      }),
    }),
  },
});
