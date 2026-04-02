---
title: Asian online store - Nuxt 4 + Directus
created_at: 2025-06-20
description: A multilanguage online shop offering a selection of Asian products, made with Nuxt and Directus.
feed_summary: A multilingual headless Asian online shop developed with Nuxt and Directus technologies
feed_title: Headless Asian store
image:
  alt: Screenshot of the asian online store
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
locale: en
pinned: false
previewUrl: /projects/front-ecommerce-headless
role: Full-stack developer
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

This story began with a sense of frustration.

One day, while browsing the internet in search of something—I’m not quite sure what, I stumbled upon an online store selling Asian products, epices-du-monde.com, and I quickly realized something was off.
The site serves its purpose the products are there but the experience clearly belongs to another era.

A dated design.
A rigid Bootstrap framework.
And above all, accessibility that leaves much to be desired, or is even absent in certain key areas (such as alt text for some images or text on buttons, which, incidentally, have only an icon as a visual cue).

It was as if I were standing before a Torii gate that had fallen into disrepair, having lost its connection between spirits and humans.

Rather than simply criticizing as I so often enjoy doing, I wanted to do better.

``What if I redesigned this store, but brought it up to today's standards?``

## Modernizing Without Losing the Essence

The goal wasn’t to reinvent the store, but to evolve it.

Preserve its identity.
Stay true to its purpose.
But completely rethink the way it’s used.

Very quickly, one approach stood out: switching to a headless architecture.

Clearly separating data management from the user experience, in order to gain flexibility and, above all, lay the groundwork for future developments.

## Rethinking the Architecture

I built the project around two main components:

- **Directus + PostgreSQL** to manage products, content, and permissions
- **Nuxt 2** for the front end, using a modern, high-performance, and scalable approach (which, incidentally, has evolved over time from Nuxt 2 to Nuxt 3 and then Nuxt 4)

For the interface, I relied on **Nuxt UI (Reka UI)** to lay a solid foundation, while maintaining complete freedom in the design.

Then I tackled the essentials: the checkout process.

I implemented:

- Selecting the number of items
- Dynamic price updates
- Adding to cart
- State persistence via Pinia and cookies

Simple, yet crucial mechanics.
Because an e-commerce site isn’t judged solely on its appearance, but also on its fluidity.

The project is still in progress, particularly regarding authentication and the admin panel, but the user experience is already at the heart of the system.

## A User-Centric Redesign

This project is, above all, a complete UX/UI redesign.

I reviewed each screen with one question in mind:

“Is it clear, fast, and effortlessly understandable?”

I focused on:

- Visual hierarchy
- Content readability
- Navigation between products
- Highlighting key actions

The goal: to simplify the user journey as much as possible.

Less friction, more clarity.

## Addressing a Blind Spot: Accessibility

One of the most glaring issues with the original site was the lack of best practices for accessibility.

I couldn’t ignore this during a redesign—otherwise, how could I call myself a “Full-Stack Developer specializing in Accessibility”?

So, from the very beginning, I incorporated:

- Relevant alt text (no “A bottle”)
- Clear labels for interactive elements
- Functional keyboard navigation
- Verified contrast ratios
- Consistent visual and textual feedback

This work isn’t just a “little extra”; it’s an integral part of the product.
[What should we tell the developer?](https://tenor.com/fr/view/fdp-chauffeur-artus-un-ptit-truc-en-plus-qu'est-ce-qu'on-dit-au-chauffeur-gif-14920102969982686065)

## What This Project Taught Me

This project helped me reach a new level.

Not just technically, but in how I approach product design.

I gained deeper insight into:

- Implementing a complete headless architecture
- The actual logic behind an e-commerce journey
- State management with Pinia in a real-world context
- The importance of UX and accessibility in real-world use cases

But above all, it reminded me of something essential:

```Modernizing isn’t about starting from scratch; it’s about understanding what already exists.. and deciding what deserves to evolve.```

## Final Thoughts

Today, the project continues to move forward, and as is often the case, it’s not just a redesign.
It’s a transition.
