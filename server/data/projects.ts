import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "plateforme-gestion-recettes",
    date: "2024-03-12",
    kind: "project",
    pinned: true,
    image: {
      alt: "",
      sources: {
        feed: {
          mobile: `/images/project/plateforme-gestion-recettes/mobile.png`,
          desktop: `/images/project/plateforme-gestion-recettes/desktop.png`,
          tablet: `/images/project/plateforme-gestion-recettes/mobile.png`,
        },
        detail: {
          mobile: `/images/project/plateforme-gestion-recettes/mobile.png`,
          desktop: `/images/project/plateforme-gestion-recettes/desktop.png`,
          tablet: `/images/project/plateforme-gestion-recettes/mobile.png`,
        },
      },
    },
    tags: [
      "Express",
      "Directus",
      "PostgreSQL",
      "Recettes",
      "Permissions",
      "Rôles",
    ],
    stack: ["Express", "Directus", "PostgreSQL"],
    links: {
      github: "",
      demo: "",
    },
    translations: {
      fr: {
        title: "Plateforme de gestions de recettes multi-rôles",
        summary:
          "Plateforme de gestion de recettes culinaires avec rôles utilisateurs, création et modification de recettes et gestion complète des permissions développé avec Express et Directus",
        feed_title: "Plateforme de recettes multi-rôles",
        feed_summary:
          "Plateforme de gestion de recettes multi-rôles développé avec Express et Directus",
        role: "Backend developer",
        context:
          "Créé en sortie de formation web, pour expérimenter un projet full-stack complet et gérer un système avancé de permissions inspiré de Discord",
        problem:
          "Le défi principal était de gérer des rôles multiples avec des permissions granulaires, permettant à chaque type d'utilisateur d'accéder uniquement aux actions autorisées sur le site et sur le panel (lecture, création, modification, suppression de recettes, gestion des rôles).",
        solution:
          "J'ai développé un système de permissions unique : chaque permission était codée numériquement, combinée en une longue chaîne représentant le rôle, et décodée dynamiquement pour l'affichage et l'édition dans le panel admin.",
        technicalChoices: [
          {
            title: "Express.js",
            description:
              "Framework backend et frontend pour sa simplicité et son efficacité.",
          },
          {
            title: "Directus + PostgreSQL",
            description:
              "CMS headless et base de données relationnelle pour gérer les contenus et permissions",
          },
          {
            title: "JSON & mapping numérique",
            description:
              "Conversion des permissions textuelles en codes numériques pour un système flexible et inspiré de Discord.",
          },
        ],
        accessibility:
          "J'ai veillé à ce que les interfaces soient accessibles : navigation clavier, labels clairs, et retour utilisateur pour toutes les actions critiques.",
        learnings: [
          "Conception d'un systèmpe comploexe de gestion de permissions multi-rôles",
          "Gestion full-stack d'un projet web complet (backend + frontend) avec CMS headless",
          "Expérience dans la planification et l'implémentation d'une logique complexe inspirée de systèmes réels.",
        ],
      },
      en: {
        title: "Multi-role recipe management platform",
        summary:
          "Culinary recipe management platform with users roles, recipe creation and modification, and comprehensive permission management developed with Express and Directus",
        feed_title: "Multi-role recipe platform",
        feed_summary:
          "Multi-role recipe management platform developed with Express and Directus",
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
        title: "Boutique asiatique en ligne - Nuxt 4 + Directus",
        summary:
          "Boutique en ligne pour produits asiatiques multi-langues, gestion du catalogue, panier, commandes et interface admin via CMS développée avec Nuxt 4, Pinia et Directus",
        feed_title: "Boutique asiatique headless",
        feed_summary:
          "Boutique asiatique headless multi-langues développée avec Nuxt et Directus",
        role: "Backend developer",
        context:
          "Inspiré du site epices-du-monde.fr, j'ai voulu moderniser l'UI/UX d'une boutique en ligne pour produits asiatiques et expérimenter une architecture headless avec Nuxt 4 et Directus.",
        problem:
          "Le site original avait un design dépassé, des icônes mal utilisées, des textes alternatifs inexistants. le défi était de créer une interface moderne et fonctionnelle tout en conservant une structure back-end solide.",
        solution:
          "J'ai mis en place une base de données avec Directus + PostgreSQL, un frontend Nuxt 4 avec Pinia pour la gestion du panier et des produits, et des interactions complètes (sélection du nombre d'articles, affichage du prix, ajout au panier). Le projet est encore en cours, notamment pour l'authentification et le panel administrateur.",
        technicalChoices: [
          {
            title: "Nuxt 4",
            description:
              "Framework front-end moderne, performant et extensible.",
          },
          {
            title: "Directus + PostgreSQL",
            description:
              "CMS headless et base de données relationnelle pour gérer produits et contenu.",
          },
          {
            title: "Pinia + Cookies",
            description:
              "Gestion de l'état du panier et des préférences utilisateurs côté client.",
          },
          {
            title: "UI/UX moderne",
            description:
              "Refonte complète de l'interface pour une expérience utilisateur complète fluide et accessible.",
          },
        ],
        accessibility:
          "Navigation clavier et labels accessibles sur les éléments interactifs, vérification des contrastes et des retours visuels lors des actions.",
        learnings: [
          "Conception d'une architecture front-end moderne connectée à un CMS headless.",
          "Gestion du panier côté client avec Pinia et cookies.",
          "Réflexion sur l'UX et l'accessibilité dans un projet e-commerce.",
        ],
      },
      en: {
        title: "Asian online store - Nuxt 4 + Directus",
        summary:
          "Multi-language online store for Asian products, catalogue management, shopping cart, orders, and admin interface via CMS developed with Nuxt 4, Pinia and Directus",
        feed_title: "Headless Asian store",
        feed_summary:
          "Multi-language headless Asian store developed with Nuxt and Directus",
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
