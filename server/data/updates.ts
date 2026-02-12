import type { Update } from "~/types/update";

export const updates: Update[] = [
  {
    slug: "exploration-prisma",
    date: "2025-05-06",
    kind: "update",
    pinned: false,
    tags: ["Full-stack", "Fullstack", "Prisma", "Compétence"],
    image: {
      alt: "",
      sources: {
        feed: {
          mobile: `/images/update/exploration-prisma/mobile.png`,
          desktop: `/images/update/exploration-prisma/desktop.png`,
          tablet: `/images/update/exploration-prisma/mobile.png`,
        },
        detail: {
          mobile: `/images/update/exploration-prisma/mobile.png`,
          desktop: `/images/update/exploration-prisma/desktop.png`,
          tablet: `/images/update/exploration-prisma/mobile.png`,
        },
      },
    },
    translations: {
      fr: {
        title: "Exploration de Prisma",
        summary: "Montée en compétence sur une stack full-stack moderne",
        feed_title: "",
        feed_summary: "",
        content: "",
      },
      en: {
        title: "Exploring Prisma",
        summary: "Developing skills in a modern full-stack environment",
        feed_title: "",
        feed_summary: "",
        content: "",
      },
    },
  },
];
