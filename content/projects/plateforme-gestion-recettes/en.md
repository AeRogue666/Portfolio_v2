---
slug: plateforme-gestion-recettes
locale: en
created_at: 2024-03-12
kind: project
pinned: true
tags:
    - Express
    - Directus
    - PostgreSQL
    - Recettes
    - Permissions
    - Roles
stack:
    - Express
    - Directus
    - PostgreSQL
links:
    github: https://github.com/AeRogue666/Project1-Recipes-Website
image:
    alt: Screenshot of the recipe management platform
    sources:
        feed:
            mobile: /images/project/plateforme-gestion-recettes/mobile.PNG
            desktop: /images/project/plateforme-gestion-recettes/desktop.PNG
            tablet: /images/project/plateforme-gestion-recettes/mobile.PNG
        detail:
            mobile: /images/project/plateforme-gestion-recettes/mobile.PNG
            desktop: /images/project/plateforme-gestion-recettes/desktop.PNG
            tablet: /images/project/plateforme-gestion-recettes/mobile.PNG
role: Full-stack developer
title: Multi-role recipe management platform
summary: Culinary recipe management platform with users roles, recipe creation and modification, and comprehensive permissions management developed with Express and Directus.
feed_title: Multi-role recipe platform
feed_summary: Multi-role recipe management platform developed with Express and Directus
---

This was created following the completion of a web training programme, with the aime of experimenting with a full-stack project in its entirety and managing an advanced permissions system inspired by Discord.
The primary challenge was to manage multiple roles with granular permissions, allowing each user type to access only authorized actions on the site and on the panel (reading, creating, updating, deleting recipes, managing roles)?
The solution I developed was to create a unique permissions system. This system involved encoding each permission digitally, combining them into a long string representing the role, and dynamically decoding them for display and editing in the admin panel.
