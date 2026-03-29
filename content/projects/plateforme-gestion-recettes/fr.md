---
slug: plateforme-gestion-recettes
locale: fr
created_at: 2024-03-12
kind: project
pinned: true
tags:
    - Express
    - Directus
    - PostgreSQL
    - Recettes
    - Permissions
    - Rôles
stack:
    - Express
    - Directus
    - PostgreSQL
links:
    github: https://github.com/AeRogue666/Project1-Recipes-Website
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
role: Développeur full-stack
title: Plateforme de gestions de recettes multi-rôles
summary: Une plateforme de gestion de recettes culinaires avec rôles utilisateurs, création et modification de recettes et gestion complète des autorisations développée avec Express et Directus.
feed_title: Plateforme de recettes multi-rôles
feed_summary: Plateforme de gestion de recettes multi-rôles développé avec Express et Directus
---

Conçu à l'issue d'une formation web, ce projet a été initié dans le but d'expérimenter un projet full-stack dans son intégralité et de gérer un système d'autorisations avancé inspiré de Discord.
Le principal défi consistait à gérer plusieurs rôles avec des autorisations granulaires, permettant à chaque type d'utilisateur d'accéder uniquement aux actions autorisées sur le site et sur le panel (lecture, création, modification, suppression de recettes, gestion des rôles).
La solution que j'ai développée consistait à créer un système d'autorisations unique. Ce système impliquait d'encoder numériquement chaque autorisation, de les combiner en une longue chaîne représentant le rôle, puis de les décoder dynamiquement pour les afficher et les modifier dans le panneau d'administration.
