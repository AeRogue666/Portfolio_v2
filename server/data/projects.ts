import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "plateforme-gestion-contenu",
    date: "2024-03-12",
    kind: "project",
    pinned: true,
    image: {
      alt: "",
      sources: {
        feed: {
          mobile: `/images/project/plateforme-gestion-contenu/mobile.png`,
          desktop: `/images/project/plateforme-gestion-contenu/desktop.png`,
          tablet: `/images/project/plateforme-gestion-contenu/mobile.png`,
        },
        detail: {
          mobile: `/images/project/plateforme-gestion-contenu/mobile.png`,
          desktop: `/images/project/plateforme-gestion-contenu/desktop.png`,
          tablet: `/images/project/plateforme-gestion-contenu/mobile.png`,
        },
      },
    },
    tags: ["Express", "PostgreSQL"],
    stack: ["Express", "PostgreSQL"],
    links: {
      github: "",
      demo: "",
    },
    translations: {
      fr: {
        title: "Plateforme de gestion de contenu",
        summary:
          "Application web back-end développé avec Express et PostgreSQL",
        role: "Backend developer",
        context: "",
        problem: "",
        solution: "",
        technicalChoices: [
          {
            title: "",
            description: "",
          },
        ],
        accessibility: "",
        learnings: ["", ""],
      },
      en: {
        title: "Plateforme de gestion de contenu",
        summary:
          "Application web back-end développé avec Express et PostgreSQL",
        role: "Backend developer",
        context: "",
        problem: "",
        solution: "",
        technicalChoices: [
          {
            title: "",
            description: "",
          },
        ],
        accessibility: "",
        learnings: ["", ""],
      },
    },
  },
  {
    slug: "front-ecommerce-headless",
    kind: "project",
    date: "2025-05-06",
    pinned: false,
    image: {
      alt: "",
      sources: {
        feed: {
          mobile: `/images/project/front-ecommerce-headless/mobile.png`,
          desktop: `/images/project/front-ecommerce-headless/desktop.png`,
          tablet: `/images/project/front-ecommerce-headless/mobile.png`,
        },
        detail: {
          mobile: `/images/project/front-ecommerce-headless/mobile.png`,
          desktop: `/images/project/front-ecommerce-headless/desktop.png`,
          tablet: `/images/project/front-ecommerce-headless/mobile.png`,
        },
      },
    },
    stack: ["Nuxt", "TypeScript", "Directus", "Pinia"],
    tags: ["Nuxt", "TypeScript", "E-commerce", "Directus", "Pinia"],
    links: {
      github: "",
      demo: "",
    },
    translations: {
      fr: {
        title: "Front e-commerce Nuxt avec CMS headless",
        summary:
          "Application web back-end développé avec Express et PostgreSQL",
        role: "Backend developer",
        context: "",
        problem: "",
        solution: "",
        technicalChoices: [
          {
            title: "",
            description: "",
          },
        ],
        accessibility: "",
        learnings: ["", ""],
      },
      en: {
        title: "Front e-commerce Nuxt avec CMS headless",
        summary:
          "Application web back-end développé avec Express et PostgreSQL",
        role: "Backend developer",
        context: "",
        problem: "",
        solution: "",
        technicalChoices: [
          {
            title: "",
            description: "",
          },
        ],
        accessibility: "",
        learnings: ["", ""],
      },
    },
  },
];
