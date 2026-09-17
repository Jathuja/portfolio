# GitHub Copilot Custom Instructions — Personal Portfolio Project

Place this file at `.github/copilot-instructions.md` in the repo root. Copilot Chat in VS Code reads this automatically as persistent context for every suggestion and chat response in this repo.

---

## Project Context

This is a personal portfolio website for an IT undergraduate specializing in web/software development. It showcases projects, blog posts (native + syndicated from Medium), education, certifications, skills, and contact info. The full spec lives in `PORTFOLIO_SRS.md` and the build plan lives in `COPILOT_PROMPTS.md` — refer to both when relevant.

## Tech Stack (do not deviate without asking)

- Next.js 14+ (App Router), TypeScript (strict mode)
- Tailwind CSS with a custom theme (CSS variables for tokens)
- Framer Motion for animation
- MDX (`next-mdx-remote` or Contentlayer) for blog/project long-form content
- `rss-parser` for Medium feed aggregation
- `lucide-react` for icons
- Deployment target: Vercel

## Non-Negotiable Design Rules

This project must never look like a generic AI-generated template. Concretely, **never**:
- Use purple-to-blue (or any) gradient backgrounds/hero sections
- Use glassmorphism, floating 3D blobs/shapes, or stock "abstract tech" illustrations
- Use a centered hero + 3-column icon-card layout as the default section pattern
- Use heavy `box-shadow` "card" styling — use hairline borders (1px, low opacity) instead
- Use progress-bar/percentage skill meters
- Use generic emoji as section decoration (🚀 ✨ 💡)
- Use the default `Inter`-only or `Poppins`-only font pairing with no display font

**Always:**
- Use the design tokens defined in the theme (see `app/globals.css` / `tailwind.config` once Phase 2 is complete) — don't invent new colors ad hoc.
- Use asymmetric, editorial-style layouts over centered-column-everything.
- Use the recurring numbering motif (`01 —`, `02 —`) for major section headings where established in earlier phases.
- Use the monospace font for dates, tags, status badges, and technical metadata.
- Write realistic placeholder/dummy content when real content isn't provided yet — never use "Lorem ipsum."
- Respect `prefers-reduced-motion` in every Framer Motion animation.

## Code Conventions

- Functional React components, TypeScript types/interfaces for all props (no `any`).
- Structured content (projects, education, certifications, skills, testimonials) lives in `/data/*.ts` files, never hardcoded inline in JSX.
- Blog content lives in `/content/blog/*.mdx` with typed frontmatter.
- Shared types live in `/lib/types.ts`.
- Shared Framer Motion variants live in `/lib/motion.ts` — reuse them, don't redefine animation timing/easing per component.
- Config values that will change later (Medium username, form endpoint, social links) live in `/lib/config.ts`, not hardcoded inline.
- Component files: PascalCase (`ProjectCard.tsx`). Utility files: camelCase (`getAllPosts.ts`).
- Prefer server components by default; mark `"use client"` only where interactivity requires it.

## Accessibility & Performance Baseline

- All interactive elements must be keyboard-navigable with visible focus states.
- All images require `alt` text (placeholder-appropriate text is fine for dummy content).
- Maintain WCAG AA contrast in both light and dark themes.
- Use `next/image` for all images and `next/font` for font loading.

## When Asked to Build a New Section

1. Check `PORTFOLIO_SRS.md` for the relevant content schema/section number first.
2. Check `COPILOT_PROMPTS.md` to see which phase this belongs to and what's expected.
3. Reuse existing design tokens and components rather than introducing new patterns.
4. If real content isn't available yet, scaffold with realistic dummy data matching the schema, and leave a clear code comment marking it as placeholder (e.g., `// TODO: replace with real data — see PORTFOLIO_SRS.md 5.5`).

## What to Avoid Suggesting

- Do not suggest third-party UI kits/templates (e.g., generic Tailwind UI component packs) that would introduce the generic-AI-template look this project is explicitly avoiding.
- Do not suggest `localStorage`/`sessionStorage` for anything that needs to persist server-side or across devices — use proper data files or a database if a real backend is ever introduced.
- Do not silently change the chosen accent color, font pairing, or layout system established in Phase 2 — ask first if a change seems warranted.
