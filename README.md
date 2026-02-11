# Portfolio v2 Content-driven & Accessibility-first

This portfolio is designed as a **content-driven social feed** using a familiar mental model to minimize cognitive friction while showcasing real-world frontend architecture skills.

## Why a feed-based portfolio?

Instead of inventing a new interaction model (another one), this portfolio reuses a **known UX pattern**: a central feed, side navigation, predictable interactions, and progressive disclosure.
The goal is not originality for its own sake, but **usability, clarity, and accessibility**.

## Accessibility first

Accessibility is treated as a core architectural concern, not an afterthought.

- 100% keyboard navigable
- Logical tab order
- Visible focus styles (never removed)
- Semantic HTML (`main`, `nav`, `article`, `section`)
- Screen reader tested (NVDA / VoiceOver)
- Infinite scroll with accessible fallback
- WCAG AAA target when possible

A dedicated **Accessibility Statement** is available at `/accessibility`.

## Tech stack

- **Nuxt** (SSR / SSG)
- **Nuxt Content + Markdown It** (Markdown-driven content)
- **Nuxt Image** (Display beautiful images)
- **Nuxt UI** (UI framework based on Reka UI (Tailwind) but with accessible UI primitives)
- **Pinia** (theme & UI state)
- **CSS variables & design tokens**

Soon:

- **Prisma** (ORM with automatic scaling for faster building)
- **PostgreSQL** (SQL Database)

## Content strategy

The feed is structured content, not a blog.
Each post serves a clear purpose:

- Project (personnal project)
- Update (career-relevant only)
- Pinned content (only one at a time)
- About

Content is written in Markdown and rendered server-side for SEO and accessibility.

## Progressive enhancement

- Project pages are the SEO source of truth.
- Modals are used as optional enhancements.
- No interaction is modal-only.

## Future evolution

The architecture is intentionally prepared for future growth:

- Migration to PostgreSQL and Prisma
- Server routes for contact / messaging (already working on it)
- Content persistence without structural changes

## Philosophy

> Familiar patterns. Honest UX. Accessible by default.

## Find a problem

Accessibility concern, bug, issue, etc. : Go on the [report page](https://aureldev.fr/report)
Feedback or professionnal contact : Go on the [home page](https://aureldev.fr/) and click on the button "Send a message".

## License

This project is licensed under the MIT License - see the (LICENSE.md) for details.