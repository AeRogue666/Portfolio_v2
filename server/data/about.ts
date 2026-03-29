import type { About } from "@/types/about";

export const about: About = {
  slug: "about",
  kind: "about",
  pinned: false,
  tags: ["profil", "parcours"],
  created_at: "2026-02-02",
  translations: {
    fr: {
      title: "A propos",
      summary:
        "Développeur full-stack passionné par l'accessibilité et la qualité produit. Je crée des interfaces claires, robustes et utiles.",
    },
    en: {
      title: "About",
      summary:
        "Full-stack developer focused on accessibility and produt quality. I enjoy building robust, and useful interfaces.",
    },
  },
};
