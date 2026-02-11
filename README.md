# Portfolio v2 Content-driven & Accessibility-first

This portfolio is designed as a **content-driven social feed** using a familiar mental model to minimize cognitive friction while showcasing real-world frontend architecture skills.

## Why a feed-based portfolio?

Instead of inventing a new interaction model, this portfolio reuses a **known UX pattern**: a central feed, side navigation, predictable interactions, and progressive disclosure.
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

- **Nuxt 4** (SSR / SSG)
- **@nuxt/content** (Markdown-driven content)
- **Radix Vue** (headless, accessible UI primitives)
- **Pinia** (theme & UI state)
- **CSS variables & design tokens**

No UI framework, no Tailwind, no inline styles

## Content strategy

The feed is structured content, not a blog.
Each post serves a clear purpose:

- Project
- Update (career-relevant only)
- Pinned content
- About

Content is written in Markdown and rendered server-side for SEO and accessibility.

## Progressive enhancement

- Project pages are the SEO source of truth.
- Modals are used as optional enhancements.
- No interaction is modal-only.

## Future evolution

The architecture is intentionally prepared for future growth:

- Migration to PostgreSQL and Prisma
- Server routes for contact / messaging
- Content persistence without structural changes

## Philosophy

> Familiar patterns. Honest UX. Accessible by default.
