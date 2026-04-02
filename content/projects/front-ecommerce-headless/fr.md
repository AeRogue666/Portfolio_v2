---
title: Boutique asiatique en ligne - Nuxt 4 + Directus
created_at: 2025-06-20
description: Une boutique ligne multilingue qui propose une sélection de produits asiatiques, réalisée avec Nuxt et Directus.
feed_summary: Une boutique asiatique headless multilingue développée avec les technologies Nuxt et Directus
feed_title: Boutique asiatique headless
image:
  alt: Capture d'écran de la boutique asiatique en ligne
  sources:
    feed:
      mobile: /images/project/front-ecommerce-headless/mobile.PNG
      desktop: /images/project/front-ecommerce-headless/desktop.PNG
      tablet: /images/project/front-ecommerce-headless/mobile.PNG
    detail:
      mobile: /images/project/front-ecommerce-headless/mobile.PNG
      desktop: /images/project/front-ecommerce-headless/desktop.PNG
      tablet: /images/project/front-ecommerce-headless/mobile.PNG
kind: project
links:
  github: https://github.com/AeRogue666/Epices-du-monde
locale: fr
pinned: false
previewUrl: /projects/front-ecommerce-headless
role: Développeur full-stack
slug: front-ecommerce-headless
stack:
  - Nuxt
  - TypeScript
  - Directus
  - Pinia
tags:
  - Nuxt
  - TypeScript
  - E-commerce
  - Directus
  - Pinia
---

Cette histoire a commencée par une frustration.

Un jour, alors que je naviguais sur internet en quête d'un je ne sais quoi, je suis tombé sur une boutique en ligne de produits asiatiques, epices-du-monde.com et je me suis vite rendu compte d'un décalage.
Le site remplit son rôle, les produits sont là.. mais l'expérience, elle, appartient clairement à une autre époque.

Un design veilissant.
Une base Bootstrap rigide.
Et surtout, une accessibilité largement perfectible, voire absente à certains endroits clés (comme les textes alternatifs sur certaines images ou les textes sur les boutons, qui d'ailleurs n'ont pour signal visuel qu'un icône).

Comme si je m'étais trouvé face à une porte Torii qui n'était plus entretenue, qui avait perdue ce lien entre esprits et humains.

Plutôt que de simplement critiquer comme j'apprécie tant faire, j'ai eu envie de faire mieux.

``Et si je reconstruisais cette boutique, mais avec les standards actuels ?``

## Moderniser sans dénaturer

L'objectif n'était pas de réinventer la boutique, mais de la faire évoluer.

Conserver son identité.
Respecter son intention.
Mais repenser entièrement la manière dont elle est utilisée.

Très vite, une approche s'est imposée : passer sur une architecture headless.

Séparer clairement la gestion des données de l'expérience utilisateur, afin de gagner en flexibilité et surtout, préparer le terrain pour des évolutions futures.

## Repenser l'architecture

J'ai construit le projet autour de deux briques principales :

- **Directus + PostgreSQL** pour gérer les produits, les contenus et les permissions
- **Nuxt 2** pour le front, avec une approche moderne, performante et évolutive (qui a d'ailleurs évolué au cours du temps de Nuxt 2 à Nuxt 3 puis Nuxt 4)

Côté interface, je me suis appuyé sur **Nuxt UI (Reka UI)** pour poser des bases solides, tout en gardant une liberté totale sur le design.

Puis je me suis attaque à l'essentiel : le parcours d'achat.

J'ai mis en place :

- La sélection du nombre d'articles
- La mise à jour dynamique du prix
- L'ajout au panier
- La persistance via Pinia et des cookies

Des mécaniques simples, mais cruciales.
Parce qu'un site e-commerce ne se juge pas sur son apparence uniquement mais sur sa fluidité aussi.

Le projet est encore en cours, notamment sur l'authentification et le panel administrateur, mais l'expérience utilisateur est déjà au coeur du système.

## Une refonte centrée sur l'usage

Ce projet est avant tout une refonte UX/UI complète.

J'ai repris chaque écran avec une question en tête :

``Est-ce que c'est clair, rapide et compréhensible sans effort ?``

J'ai travaillé sur :

- La hiérarchie visuelle
- La lisibilité des contenus
- La navigation entre les produits
- La mise en avant des actions clés

L'objectif : simplifier au maximum le parcours utilisateur.

Moins de friction, plus d'évidence.

## Corriger un angle mort : l'accessibilité

L'un des points les plus marquants du site d'origine était l'absence de bonnes pratiques d'accessibilité.

Impossible de l'ignorer dans une refonte, sinon comment oserais-je me dire "Développeur full-stack spécialiste en Accessibilité" ?

J'ai donc intégré dès le départ :

- Des textes alternatifs pertinents (pas de "Une bouteille")
- Des labels clairs pour les éléments interactifs
- Une navigation clavier fonctionnelle
- Des contrastes vérifiés
- Des retours visuels et textuels cohérents

Ce travail n'est pas un "petit truc en plus", il fait partie du produit.
[Qu'est-ce que l'on dit au développeur ?](https://tenor.com/fr/view/fdp-chauffeur-artus-un-ptit-truc-en-plus-qu'est-ce-qu'on-dit-au-chauffeur-gif-14920102969982686065)

## Ce que ce projet m'a appris

Ce projet m'a permis de passer un cap.

Pas seulement techniquement, mais dans ma manière de concevoir un produit.

J'y ai approfondi :

- La mise en place d'une architecture headless complète
- Les logiques réelles d'un parcours e-commerce
- La gestion d'état avec Pinia dans un contexte concret
- L'importance de l'UX et de l'accessibilité dans des cas d'usages réels

Mais surtout, il m'a rappelé quelque chose d'essentiel :

```Moderniser, ce n'est pas repartir de zéro, c'est comprendre ce qui existe déjà.. et décider ce qui mérite d'évoluer.``

## Le mot de la fin

Aujourd'hui le projet continue d'avancer, et comme souvent, ce n'est pa seulement une refonte.
C'est une transition.
