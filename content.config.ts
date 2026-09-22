import { defineContentConfig, defineCollection } from "@nuxt/content";
import { contentRegistry } from "./lib/schemas/registry"

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: {
        include: "**/*.md",
        exclude: [
          "projects/**",
          "experiments/**",
          "clients/**",
          "about/**",
          "services/**",
          "landing/**"
        ],
      },
      schema: contentRegistry.content.schema
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/**/*.md",
      schema: contentRegistry.projects.schema,
    }),

    experiments: defineCollection({
      type: "page",
      source: "experiments/**/*.md",
      schema: contentRegistry.experiments.schema,
    }),

    about: defineCollection({
      type: "page",
      source: "about/**/*.md",
      schema: contentRegistry.about.schema,
    }),

    clients: defineCollection({
      type: "page",
      source: "clients/**/*.md",
      schema: contentRegistry.clients.schema,
    }),

    services: defineCollection({
      type: "page",
      source: "services/**/*.md",
      schema: contentRegistry.services.schema,
    }),

    landing: defineCollection({
      type: "page",
      source: "landing/**/*.md",
      schema: contentRegistry.landing.schema,
    }),
  },
});
