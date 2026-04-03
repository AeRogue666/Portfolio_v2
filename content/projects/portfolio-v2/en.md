---
title: Content-driven & User-centered portfolio
created_at: 2026-02-11
description: An accessible, scalable, user-centered portfolio as a social feed developed with Nuxt and Markdown
feed_summary: Version 2 of my portfolio - Accessibility-first & user-centered portfolio developed with Nuxt and Nuxt content
feed_title: Portfolio v2
image:
  alt: Screenshot of the portfolio v2 index page
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
locale: en
pinned: false
previewUrl: /projects/portfolio-v2/
role: Full-stack developer
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

There are projects we finish... and others we abandon without really admitting it. My portfolio fell ino the latter category.

On paper, it checked all the boxes, but in reality, it no longer reflected who I was.

After careful consideration, I made a decision: to start from scratch.

Not to make it "better", no.
But to do it *right*.

## Starting with a blank page

It's all well and good to start from scratch, but starting over means a blank page.
This new portfolio wasn't born out of a desire to redesign, but from a realization: my needs had changed.

I no longer wanted a simple showcase site.
I wanted a living space.

A space where I could post regularly, document my projects, explain my technical choiuces, express myself freely, expriment, share my discoveries, and above all, create a direct connection with the people who visit it.

That's when the idea took hold: to build an evolving portfolio, designed as a content platform, dedicated to users and content.

## Choosing the Foundation

Very quickly, a tech stack took shape.

On my first portfolio, I had used Vue 3, so I had to use Nuxt 4, its "big brother".

Don't see this as some kind of obligation or a case of "I needed a project to test this new technology", because it was already a tool in my developer's toolkit.
I chose it for its ability to balance performance, flexibility, and a modern approach to full-stack development and, between you and me, Nuxt is awesome!

Around it, I built a content-centric ecosystem:

- **Nuxt Content,** for structuring and serving data.
- **Nuxt Studio**, as the editing surface.
- **Markdown**, as the sole markup language.

A single source of truth.
Readable, versioned, and controlled.

When it comes to users experience and post management (the feed), **Pinia** allowed me to manager user preferences (theme, language, accessibility) with a simple, modular approach, without weighing down the architecture.
But ultimately, the technology was just a means to an end; the real challenge lay elsewhere.

## Putting the user first

Every choice regarding design, navigation, or structure was guided by the same question:

> Does this truly help the user?

I designed an interface that is intentionnaly minimalist, allowing the content to take center stage.
Fewer "WOW" visual effects, more clarity.
Less cognitive friction, more fluidity.

The goal: to enable a natural, intuitive, almost invisible reading experience, as if the user were on a social media platform or reading an online news article.

## Accessibility as a Requirement, Not an Option

Very early in the project in fact, right from the concept phase another aspect came into focus: accessibility.

Not just a simple checklist, but a genuine process.
And where there's a process, there are rules and standards.

To that end, I relied on the **RGAA 4.2+** and **WCAG 2.1** standards, and I conducted a comprehensive audit:

- Keyboard navigation
- Testing with screen readers
- Contrast management
- Visual and textual feedback
- Adaptation to theme and language changes

I even designed [a page dedicated to the accessibility report](/accessibility-report).

Because an accessible website isn’t just something you claim.
It’s something you prove.

## What This Project Has Changed

This portfolio has become much more than a technical project.

It has allowed me to:

- Rethink a full-stack architecture without relying on external APIs
- Gain a concrete understanding of what it means to "make a website accessible"
- Deepen my thinking about user experience, beyond just interfaces

But above all, it taught me one essential thing:

> A good project isn’t limited to what it shows. It’s measured by how it’s used.

## Final Thoughts

Today, this portfolio continues to evolve.
Like a laboratory.
Like a logbook.

And perhaps, as the starting point for something bigger.
