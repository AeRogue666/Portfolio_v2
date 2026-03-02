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
          "Une plateforme de gestion de recettes culinaires avec rôles utilisateurs, création et modification de recettes et gestion complète des autorisations développée avec Express et Directus.",
        feed_title: "Plateforme de recettes multi-rôles",
        feed_summary:
          "Plateforme de gestion de recettes multi-rôles développé avec Express et Directus",
        role: "Développeur full-stack",
        context:
          "Conçu à l'issue d'une formation web, ce projet a été initié dans le but d'expérimenter un projet full-stack dans son intégralité et de gérer un système d'autorisations avancé inspiré de Discord.",
        problem:
          "Le principal défi consistait à gérer plusieurs rôles avec des autorisations granulaires, permettant à chaque type d'utilisateur d'accéder uniquement aux actions autorisées sur le site et sur le panel (lecture, création, modification, suppression de recettes, gestion des rôles).",
        solution:
          "La solution que j'ai développée consistait à créer un système d'autorisations unique. Ce système impliquait d'encoder numériquement chaque autorisation, de les combiner en une longue chaîne représentant le rôle, puis de les décoder dynamiquement pour les afficher et les modifier dans le panneau d'administration.",
        technicalChoices: [
          {
            title: "Express.js",
            description:
              "Un framework backend qui se distingue par sa simplicité et son efficacité. Il est également utilisé pour le frontend dans le cadre de ce projet.",
          },
          {
            title: "Directus + PostgreSQL",
            description:
              "Une solution headless CMS, associée à une base de données relationnelle, optimise la gestion des contenus et des autorisations.",
          },
          {
            title: "JSON & mapping numérique",
            description:
              "Conversion des autorisations textuelles en codes numériques pour un système flexible et inspiré de Discord.",
          },
        ],
        accessibility:
          "Afin d'améliorer l'accessibilité du site web et l'expérience utilisateur, je me suis assuré que les interfaces soient conçues de manière accessible. Cela inclut l'utilisation de la navigation au clavier, d'étiquettes clairs et de retours utilisateurs pour toutes les actions critiques, afin de garantir une utilisation fluide et intuitive pour tous les utilisateurs.",
        learnings: [
          "Conception d'un système de gestion des autorisations à plusieurs niveaux et à multiples rôles.",
          "Expérience avérée dans la gestion complète de projets web, couvrant à la fois les composants front-end et back-end.",
          "Expertise dans la mise en œuvre d'un CMS headless, garantissant une intégration transparente et une fonctionnalité optimale.",
          "Maîtrise de la démonstration de méthodologies de planification et de mise en œuvre rigoureuses et innovantes pour des modèles logiques complexes inspirés de systèmes réels.",
        ],
      },
      en: {
        title: "Multi-role recipe management platform",
        summary:
          "Culinary recipe management platform with users roles, recipe creation and modification, and comprehensive permissions management developed with Express and Directus",
        feed_title: "Multi-role recipe platform",
        feed_summary:
          "Multi-role recipe management platform developed with Express and Directus",
        role: "Full-stack developer",
        context:
          "This was created following the completion of a web training programme, with the aime of experimenting with a full-stack project in its entirety and managing an advanced permissions system inspired by Discord.",
        problem:
          "The primary challenge was to manage multiple roles with granular permissions, allowing each user type to access only authorized actions on the site and on the panel (reading, creating, updating, deleting recipes, managing roles)?",
        solution:
          "The solution I developed was to create a unique permissions system. This system involved encoding each permission digitally, combining them into a long string representing the role, and dynamically decoding them for display and editing in the admin panel.",
        technicalChoices: [
          {
            title: "Express.js",
            description:
              "A backend framework that is distinguished by its simplicity and efficiency. This software is also used for the front-end in this project.",
          },
          {
            title: "Directus + PostgreSQL",
            description:
              "A headless CMS solution combined with a relational database optimises content and permission management.",
          },
          {
            title: "JSON & digital mapping",
            description:
              "Conversion of textual permissions into numerical codes for a flexible system inspired by Discord.",
          },
        ],
        accessibility:
          "In order to enhance the web's accessibility and improve the user experience, I oversaw the design of the interfaces to ensure they were accessible. This includes the use of keyboard navigation, clear labels and user feedback for all critical actions, to ensure a smooth and intuitive experience for all users.",
        learnings: [
          "Design of a multi-level, multi-role authorisation management system.",
          "Proven experience in full-stack management of web projects, covering both front-end and back-end components.",
          "Expertise in implementing a headless CMS, ensuring seamless integration and optimal functionality.",
          "Proficiency in demonstrating rigorous and innovative planning and implementation methodologies for complex logic models inspired by real-world systems.",
        ],
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
          "Une boutique ligne qui propose une sélection de produits asiatiques dans plusieurs langues. Elle est dotée d'un catalogue, d'un panier, d'un système de gestion des commandes et d'une interface administrable via un CMS développé avec Nuxt 4, Pinia et Directus.",
        feed_title: "Boutique asiatique headless",
        feed_summary:
          "Une boutique asiatique headless multilingue développée avec les technologies Nuxt et Directus",
        role: "Développeur full-stack",
        context:
          "En m'inspirant du site epices-du-monde.fr, j'ai eu pour objectif de moderniser l'UI/UX d'une boutique en ligne dédiée aux produits asiatiques. J'ai également souhaité expérimenter une architecture headless avec Nuxt 4 et Directus.",
        problem:
          "Le site d'origine présentait plusieurs lacunes en matière de design, d'utilisation des icônes et de présence de textes alternatifs. L'enjeu était donc de créer une interface moderne et efficace tout en préservant une structure back-end fiable et performante.",
        solution:
          "J'ai implémenté une base de données avec Directus + PostgreSQL, un frontend Nuxt 4, Nuxt UI (Reka UI) avec Pinia pour la estion du panier et des produits, et des interactions complètes (sélection du nombren d'articles, affichage du prix, ajout au panier). Le projet est toujours en développement, notamment pour ce qui concerne l'authentification et le panel administrateur.",
        technicalChoices: [
          {
            title: "Nuxt 4",
            description:
              "Un framework front-end qui allie modernité, performance, évolutivité, et extensibilité pour répondre aux besoins actuels du marché.",
          },
          {
            title: "Directus + PostgreSQL",
            description:
              "Une solution headless CMS, associée à une base de données relationnelle, optimise la gestion des contenus et des autorisations.",
          },
          {
            title: "Pinia + Cookies",
            description:
              "Un framework de gestion d'état global offrant une approche de gestion plus légère, modulaire et intuitive, couplé aux cookies, permettant de gérer les préférences utilisateurs et l'état du panier de manière fluide et efficace.",
          },
          {
            title: "UI/UX moderne",
            description:
              "Une stratégie UX/UI moderne s'articulant autour d'une refonte complète de l'interface pour garantir une expérience utilisateur optimiale, fluide et accessible.",
          },
        ],
        accessibility:
          "Afin d'optimiser l'expérience utilisateur, il est essentiel de garantir l'accessibilité des éléments interactifs via la navigation, le clavier et les labels. En outre, je me suis assuré de la vérification des contrastes et des retours visuels et textuels lors des différentes actions, des éléments cruciaux pour assurer une navigation fluide et intuitive.",
        learnings: [
          "Conception d'une architecture front-end moderne et connectée à un CMS headless, dans un souci d'amélioration continue de l'expérience utilisateur.",
          "Optimisation du processus d'achat en ligne pour les clients, avec une gestion intégrée des paniers et des cookies, grâce à l'utilisation de Pinia.",
          "Analyse de l'expérience utilisateur (UX) et des aspects d'accessibilité numérique dans le cadre d'un projet de développement e-commerce.",
        ],
      },
      en: {
        title: "Asian online store - Nuxt 4 + Directus",
        summary:
          "An online shop offering a selection of Asian products with multilingual support available. It features a catalogue, a shopping basket, and an interface that can be managed via a CMS developed with Nuxt 4, Pinia, and Directus.",
        feed_title: "Headless Asian store",
        feed_summary:
          "A multilingual headless Asian online shop developed with Nuxt and Directus technologies.",
        role: "Full-stack developer",
        context:
          "Inspired by the website epices-du-monde.fr, my goal was to modernise the UI/UX of an online shop dedicated to Asian products. I also wanted to experiment with a headless architecture using Nuxt 4 and Directus.",
        problem:
          "The original website had several shortcomings in terms of design, use of icons and alternative text. The challenge was therefore to create a modern and efficient interface while maintaining a reliable and high-performance back-end structure.",
        solution:
          "I implemented a database with Directus + PostgreSQL, a Nuxt 4 frontend, Nuxt UI (Reka UI) with Pinia for shopping cart and product management, and complete interactions (selection of number of items, price display, addition to shopping cart). The project is still under development, particularly with regard to authentication and the administrator panel.",
        technicalChoices: [
          {
            title: "Nuxt 4",
            description:
              "A front-end framework that combines modernity, performance, scalability, and extensibility to meet current market needs.",
          },
          {
            title: "Directus + PostgreSQL",
            description:
              "A headless CMS solution, combined with a relational database, optimises content and permission management.",
          },
          {
            title: "Pinia + Cookies",
            description:
              "A global state management framework offering a lighter, modular and intuitive management approach, coupled with cookies, enabling user preferences and basket status to be managed smoothly and efficiently.",
          },
          {
            title: "UI/UX moderne",
            description:
              "A modern UX/UI strategy centred around a complete interface overhaul to ensure an optimal, smooth and accessible user experience.",
          },
        ],
        accessibility:
          "In order to optimise the user experience, it is essential to ensure that interactive elements are accessible via navigation, keyboard and labels. In addition, I made sure to check contrasts and visual and textual feedback during various actions, which are crucial elements for ensuring smooth and intuitive navigation.",
        learnings: [
          "Design of a modern front-end architecture connected to a headless CMS, with a view to continuously improving the user experience.",
          "Optimisation of the online purchasing process for customers, with integrated basket and cookie management, using Pinia.",
          "Analysis of user experience (UX) and digital accessibility aspects as part of an e-commerce development project.",
        ],
      },
    },
  },
];
