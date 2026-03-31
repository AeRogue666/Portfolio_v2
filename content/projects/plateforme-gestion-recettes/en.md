---
title: Multi-role recipe management platform
created_at: 2024-03-12
description: Culinary recipe management platform with users roles, recipe creation and modification, and comprehensive permissions management developed with Express and Directus.
feed_summary: Multi-role recipe management platform developed with Express and Directus
feed_title: Multi-role recipe platform
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
kind: project
links:
  github: https://github.com/AeRogue666/Project1-Recipes-Website
locale: en
pinned: true
previewUrl: /projects/plateforme-gestion-recettes
role: Full-stack developer
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
  - Roles
---

Managin recipes is simple. Managing *who can do what* with those recipes - creating, editing, deleting, or assigning roles and permissions - that's where it gets interesting.
This project was born after the end of a professionnal web developer training program and after the required final project, with a specific goal: to build something comprehensive, from start to finish, and to tackle the real complexity of an authorization system inspired by Discord.

## The underlying issue

Most role system encountered in training or, in some cases, on actual websites, are binary: admin or non-admin (that's the question).
It's simple, clear, and concise, but it's not what the vast majority of real-world applications require.

On Discord, for example, a moderator should be able to ban a user and delete their messages, but not delete the server, whereas the server creator should be able to do so.
On a recipe platform, a contributor can create a recipe in the form of an article and think they have published it by clicking the "Publish" button, but in realty they do not have permission to do so and should not have itn as all publications are subject to staff review before being published.

So I designed a system where each permission is digitally encoded, combined into a string representing the complete role, and then dynamically decoded in the dashboard, whether on the administrator side.

## Used technologies

**Express.js** for the frontend and backend - a delibate choice for simplicity.
**Directus + PostgreSQL** for headless content and permission management.
The logic for mapping JSON : numeric codes for permissions.

## And Accessibility?

In order to enhance the web's accessibility and improve the user experience, I oversaw the design of the interfaces to ensure they were accessible.
This includes the use of keyboard navigation, clear labels and user feedback for all critical actions, to ensure a smooth and intuitive experience for all users.

## What I learned most

Not the technical implementation but the modeling that comes first.
Spending a few days digitally mapping out the possible states of a role, the website design, the workflows, and types of permissions required, before writing a single line of code.
