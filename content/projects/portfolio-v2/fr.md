---
title: Portfolio axé sur le contenu et centré sur l'utilisateur
created_at: 2026-02-11
description: Un portfolio centré sur l'utilisateur, l'accessibilité et le contenu réalisé avec Nuxt + Nuxt Content et Nuxt Studio
feed_summary: Version 2 de mon portfolio - Réalisé avec Nuxt et Nuxt Content dans une optique d'accessibilité et centré sur l'utilisateur avant tout
feed_title: Portfolio v2
image:
  alt: Capture d'écran de la page d'accueil du portfolio v2
  sources:
    feed:
      mobile: /images/project/portfolio-v2/mobile.png
      desktop: /images/project/portfolio-v2/desktop.png
      tablet: /images/project/portfolio-v2/mobile.png
    detail:
      mobile: /images/project/portfolio-v2/mobile.png
      desktop: /images/project/portfolio-v2/desktop.png
      tablet: /images/project/portfolio-v2/mobile.png
kind: project
links:
  github: https://github.com/AeRogue666/Portfolio_v2
  demo: https://www.aureldev.com
locale: fr
pinned: false
previewUrl: /projects/portfolio-v2/
role: Développeur full-stack
slug: portfolio-v2
stack:
  - Nuxt
  - TypeScript
  - Pinia
  - I18n
  - Focus-trap
  - Resend
  - Upstash/Redis
  - Markdown
  - Nuxt Studio
tags:
  - Nuxt
  - TypeScript
  - Pinia
  - I18n
  - Nuxt Studio
---

Il y a des projets que l'on termine.. et d'autres que l'on abandonne sans vraiment l'admettre. Mon premier portfolio faisait partie de cette seconde catégorie.

Sur le papier, il cochait toutes les cases mais en réalité, il ne me ressemblait plus.

Après mûre réflexion, j'ai pris une décision : repartir de zéro.

Pas pour faire "mieux", non.
Mais pour faire *juste*.

## Repartir d'une page blanche

C'est bien beau de repartir de zéro, mais qui dit tout refaire, dit page blanche.
Ce nouveau portfolio n'est pas né d'une envie de redesign, mais d'un constat : je n'avais plus les même besoins.

Je ne voulais pus d'un simple site vitrine.
Je voulais un lieu vivant.

Un espace où publier régulièrement, documenter mes projets, raconter mes choix techniques, m'exprimer librement, expérimenter et partager mes découvertes et surtout créer un lien direct avec les personnes qui le consultent.

C'est là que l'idée s'est imposée : construire un portfolio évolutif, pensé comme une plateforme de contenu, dédié aux utilisateurs et aux contenus.

## Le choix des fondations

Très vite, une stack s'est dessinée.

Sur le premier portfolio, j'avais employé Vue 3, je me devais d'employer Nuxt 4, le "grand frère".
N'y voyez pas là une forme d'obligation ou de "il me fallait un projet pour tester cette nouvelle technologie", car c'était déjà un outil présent dans mon bagage de développeur.
Je l'ai choisi pour sa capacité à concilier performance, flexibilité et vision moderne du développement full-stack, et parce qu'entre nous, Nuxt c'est le feu !

Autour de lui, j'ai construit un écosystème centré sur le contenu :

- **Nuxt Content**, pour structurer et servir les données.
- **Nuxt Studio**, comme interface d'édition.
- **Markdown**, comme langage unique.

Une seule source de vérité.
Lisible, versionnée, maîtrisée.

Côté expérience utilisateur et gestion des posts (le feed), **Pinia** m'a peris de gérer les préférences utilisateurs (thème, langue, accessibilité) avec une approche simple et modulaire, sans alourdir l'architecture.
Mais au fond, la technique n'était qu'un moyen, le véritable enjeu était ailleurs.

## Penser d'abord à l'utilisateur

Chaque choix de design, de navigation ou de structure a été guidé par une même question :

> Est-ce que cela aide vraiment l'utilisateur ?

J'ai construit une interface volontairement sobre, où le contenu prend le dessus.
Moins d'effets visuels "WOW", plus de clarté.
Moins de friction cognitive, plus de fluidité.

L'objectif : permettre une lecture naturelle, intuitive, presque invisible, comme si l'utilisateur se trouvait sur un réseau social ou un article d'un média en ligne.

## L'accessibilité comme exigence, pas comme option

Très tôt dans le projet, à vrai dire dès le concept, un autre chanter s'est ouvert : celui de l'accessibilité.

Pas une simple checklist, un vrai processus.
Et qui dit processus, dit règles, normes.

Pour cela, je me suis appuyé sur les standards **RGAA 4.2+** et **WCAG 2.1**, et j'ai mené un audit complet :

- Navigation clavier
- Tests avec lecteurs d'écran
- Gestion des contrastes
- Retours visuels et textuels
- Adaptation aux changements de thème et de langue

J'ai même conçu [une page dédiée au rapport d'accessibilité](/accessibility-report).

Parce qu'un site accessible, cela ne se déclare pas.
Cela se démontre.

## Ce que ce projet a changé

Ce portfolio est devenur bien plus qu'un projet technique.

Il m'a permis de :

- Repenser une architecture full-stack sans dépendance à des APIs externes
- Comprendre concrètement ce que signifie "rendre un site accessible"
- Approfondir ma réflexion sur l'expérience utilisateur, au-delà des interfaces

Mais surtout, il m'a appris une chose essentielle :

> Un bon projet ne se limite pas à ce qu'il montre.
> Il se mesure à la manière dont il est utilisée.

## Le mot de la fin

Aujourd'hui, ce portfolio continue d'évoluer.
Tel un laboratoire.
Tel un carnet de bord.

Et peut-être, comme le point de départ de quelque chose de plus grand.
