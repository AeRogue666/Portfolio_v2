---
title: Plateforme de gestions de recettes multi-rôles
created_at: 2024-03-12
description: Une plateforme de gestion de recettes culinaires avec rôles utilisateurs, création et modification de recettes et gestion complète des autorisations développée avec Express et Directus.
feed_summary: Plateforme de gestion de recettes multi-rôles développé avec Express et Directus
feed_title: Plateforme de recettes multi-rôles
image:
  alt: Capture d'écran de la plateforme de gestion de recettes
  sources:
    feed:
      mobile: /images/project/plateforme-gestion-recettes/mobile.PNG
      desktop: /images/project/plateforme-gestion-recettes/desktop.PNG
      tablet: /images/project/plateforme-gestion-recettes/mobile.PNG
    detail:
      mobile: /images/project/plateforme-gestion-recettes/mobile.PNG
      desktop: /images/project/plateforme-gestion-recettes/desktop.PNG
      tablet: /images/project/plateforme-gestion-recettes/mobile.PNG
kind: project
links:
  github: https://github.com/AeRogue666/Project1-Recipes-Website
locale: fr
pinned: true
previewUrl: /projects/plateforme-gestion-recettes
role: Développeur full-stack
slug: plateforme-gestion-recettes
stack:
  - Express
  - Directus
  - PostgreSQL
tags:
  - Express
  - Directus
  - PostgreSQL
  - Recettes
  - Permissions
  - Rôles
---

Gérer des recettes, c'est simple. Gérer *qui peut faire quoi* sur ces recettes - créer, modifier, supprimer ou attribuer des rôles et des permissions - c'est là que ça devient intéressant.
Ce projet est né à l'issue de la fin d'une formation professionnelle de développeur web et après le projet de fin de formation exigé, avec un objectif précis : construire quelque chose de complet, de bout en bout, et me confronter à la vraie complexité d'un système d'autorisations inspiré de Discord.

## Le problème de fond

La plupart des système de rôles que l'on croise en formation ou dans certains cas, dans de véritables sites internet, sont binaires : admin ou pas admin (telle est la question).
C'est simple, clair et concis, mais ce n'est pas ce que la grande majorité des applications réelles exigent.
Sur Discord notamment, un modérateur doit pouvoir bannir un joueur et supprimer ses messages, mais pas supprimer le serveur, alors que le créateur du serveur doit pouvoir le faire.
Sur une plateforme de recettes, un contributeur peut créer une recette sous la forme d'un article et pense l'avoir publier en cliquant sur le bouton "Publier" mais en réalité il n'en a pas la permission et ne doit pas l'avoir, toutes publications étant soumises à vérification du staff avant d'être publiée.

J'ai donc conçu un système où chaque permission est encodée numériquement, combinée en une chaîne représentant le rôle complet, puis décodée dynamiquement dans le panel, que cela soit côté administrateur.

## Les technologiques utilisées

**Express.js** pour le frontend et le backend - choix délibéré de simplicité.
**Directus + PostgreSQL** pour la gestion headless du contenu et des permissions.
La logique de mapping JSON : des codes numériques pour les autorisations.

## Et l'accessibilité ?

Afin d'améliorer l'accessibilité du site web et l'expérience utilisateur, je me suis assuré que les interfaces soient conçues de manière accessible.
Cela inclut l'utilisation de la navigation au clavier, d'étiquettes clairs et de retours utilisateurs pour toutes les actions critiques, afin de garantir une utilisation fluide et intuitive pour tous les utilisateurs.

## Ce qui m'a appris le plus

Pas l'implémentation technique, mais la **modélisation** en amont.
Passer quelques jours à dessiner numériquement les états possibles d'un rôle, le design du site internet, les routes, les types de permissions nécessaires, avant d'écrire la première ligne de code.
