import type { About } from "@/types/about";

export const about: About = {
  slug: "about",
  kind: "about",
  pinned: false,
  tags: ["profil", "parcours"],
  date: "2026-02-02",
  translations: {
    fr: {
      title: "A propos",
      summary:
        "Développeur full-stack sensible à l'accessibilité et à la qualité produit. J'aime concevoir des interfaces claires, robustes et utiles, avec une attention particulière portée à l'expérience utiloisateur et aux détails.",
    },
    en: {
      title: "About",
      summary:
        "Full-stack developer focused on accessibility and produt quality. I enjoy building clear, robust, and useful interfaces, with strong attention to user experience and details.",
    },
  },
};
