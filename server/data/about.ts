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
      "Je suis développeur full-stack, passionné par l'accessibilité et la qualité produit. J'aime concevoir des interfaces claires, robustes et robustes et utiles, avec une attention particulière portée à l'expérience utiloisateur et aux détails.",
      feed_title: "A propos",
      feed_summary:
        "Développeur full-stack passionné par l'accessibilité et la qualité produit. Je crée des interfaces claires, robustes et utiles.",
    },
    en: {
      title: "About",
      summary:
      "Full-stack developer passionate about accessibiity and product quality. I design clear, robust, and useful intefaces, paying close attention to user experience and details.",
      feed_title: "About",
      feed_summary:
        "Full-stack developer focused on accessibility and produt quality. I enjoy building robust, and useful interfaces.",
    },
  },
};
