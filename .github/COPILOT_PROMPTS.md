# Copilot Build Prompts — 10 Phases

**How to use this file:**
1. Put `copilot-instructions.md` in `.github/copilot-instructions.md` at your repo root *before* Phase 1 — Copilot reads it automatically as persistent context.
2. Work through phases in order, in **separate chat sessions** in VS Code Copilot Chat (one phase per session keeps context clean).
3. Paste the whole prompt block for a phase as-is. Each one already tells Copilot to use dummy data where your real content isn't ready yet.
4. After each phase, run the app (`npm run dev`), check it actually looks right, and only then move to the next phase.
5. Every prompt explicitly reminds Copilot of the anti-generic-AI-design rule — keep that line in even if you shorten anything else.

---

## Phase 1 — Project Scaffold & Architecture

```
Set up a new Next.js 14+ project using the App Router, TypeScript, and Tailwind CSS.

Requirements:
- Use `create-next-app` conventions but organize the project as follows:
  /app
  /components
  /content/blog        (for MDX blog posts)
  /data                (TS files for education, certifications, skills, projects)
  /lib                 (utility functions, e.g. RSS fetching, reading-time calc)
  /public

- Install and configure: framer-motion, lucide-react, rss-parser, gray-matter, next-mdx-remote.
- Set up a `theme` system using CSS variables in globals.css for color tokens (I will define exact colors in the next phase) and a dark/light mode toggle using next-themes.
- Set up strict TypeScript config and ESLint + Prettier.
- Create empty placeholder route files for: /, /about, /projects, /projects/[slug], /blog, /blog/[slug], /uses, /now, /resume, /contact, and a custom not-found.tsx (404).
- Add a README.md explaining the folder structure.

Do not add any visual design yet — this phase is pure scaffolding. Follow the conventions in .github/copilot-instructions.md for all file/naming choices.
```

---

## Phase 2 — Design Tokens & Theme

```
Reference PORTFOLIO_SRS.md Section 8 (Design System) for full context if available; otherwise use the spec below.

Implement the visual design system as CSS variables + a Tailwind config extension:

- Base colors: off-black (#0B0B0C) for dark mode background, off-white (#F7F6F3) for light mode background, with one confident accent color: #FF4D2E (feel free to suggest 1-2 alternate accent options in your response, but implement this one by default).
- Typography: a strong display font for headings (use "Fraunces" or "Clash Display" from Google Fonts/Fontshare), a clean sans body font (use "Inter" or "Geist"), and a monospace font ("JetBrains Mono") for tags, dates, and numbering.
- Type scale: define a clear hierarchy (e.g. text-xs through text-7xl) with generous line-height for body text (18px+ base size).
- Spacing: generous whitespace tokens, not cramped.
- Borders: define a hairline border token (1px, low opacity) — this design uses hairline borders instead of drop shadows for separation. Do NOT use box-shadow-heavy "card" styling anywhere in this project.
- No gradients, no glassmorphism, no rounded-corner-everything. Pick sharp corners as the default, with at most one small consistent radius token used sparingly for things like buttons.

IMPORTANT DESIGN CONSTRAINT: this portfolio must NOT look like a generic AI-generated template. Specifically avoid: purple/blue gradient heroes, floating 3D blobs, centered-hero-then-3-cards layouts, and glassmorphic cards. The direction is "editorial documentation meets Swiss poster design" — bold asymmetric layouts, strong typography as the hero element, hairline borders, and a recurring large-numeral section-numbering motif (e.g. "01 —", "02 —").

Set up next-themes for dark/light mode with a manual toggle component (icon-based, in the header — to be built in Phase 3).
```

---

## Phase 3 — Global Layout, Navigation & Footer

```
Build the global layout shell: header, navigation, footer, and page transition wrapper.

Header:
- Sticky, minimal, with logo/initials on the left, nav links on the right (Home, Projects, Blog, About, Contact), and a dark/light toggle.
- On mobile, replace nav links with a full-screen overlay menu (not a small dropdown) — big typography, staggered entrance animation using Framer Motion.
- Add an active-route indicator (e.g., an underline or the numbering motif from Phase 2) that highlights the current page.

Footer:
- Include social links (GitHub, LinkedIn, Medium, email) as text links with icons from lucide-react, a short tagline, and a copyright line.
- Keep it minimal — no generic "newsletter signup + 4 columns of links" footer.

Page transitions:
- Wrap page content in a Framer Motion transition (fade + slight vertical shift on route change) that respects `prefers-reduced-motion`.

Also build the custom 404 page (not-found.tsx): give it real personality specific to a developer's portfolio (e.g., a broken-link joke, a terminal-style "404: route not found" message with a button back home) — not the generic "Oops!" page.

Use the design tokens from Phase 2. Follow .github/copilot-instructions.md conventions.
```

---

## Phase 4 — Home Page

```
Build the home page (/app/page.tsx) using dummy content for now (I will replace with real content later — use realistic placeholder text, not "Lorem ipsum").

Sections, in order:
1. Hero — my name, title ("IT Undergraduate & Full-Stack Developer"), a punchy one-line positioning statement, and a short 2-sentence intro. Use strong asymmetric typography as the visual centerpiece rather than an illustration or photo-heavy hero. Include 2 CTA links: "View Projects" and "Download Resume."
2. Featured Projects — show 3 projects pulled from /data/projects.ts (create this file with 3 realistic dummy entries per the schema in PORTFOLIO_SRS.md Section 16 if it doesn't exist yet), each with title, tagline, tech tags, and a link to the case study page.
3. Quick Skills Snapshot — a compact, categorized skills strip (not progress bars — just well-organized tag groups) sourced from /data/skills.ts (create with realistic dummy data).
4. Latest Writing — show the 3 most recent blog posts (use dummy post objects for now; real blog data comes in Phase 8), each with title, date, source badge (Native/Medium), and excerpt.
5. A closing CTA section inviting contact.

Every section should use the numbering motif (e.g. large "01" beside "Featured Projects"). Add scroll-triggered staggered reveal animations per section using Framer Motion, respecting reduced-motion preference.

Remember: no generic 3-card centered grids, no gradient backgrounds. Follow the design system from Phase 2.
```

---

## Phase 5 — About Page (Bio, Education, Certifications, Timeline)

```
Build the /about page with these sections, using dummy data initially and pulling from structured data files where noted:

1. Extended Bio — a longer first-person narrative (300-500 words placeholder) about my background as an IT undergraduate, what I'm passionate about, and what I'm looking for (internships/freelance/etc). Include an "outside of code" mini-section (hobbies/interests) to add personality.

2. Education — create /data/education.ts per the schema in PORTFOLIO_SRS.md Section 16 with one realistic dummy entry, and render it in a clean card-free format (use hairline dividers, not boxed cards) showing institution, degree, duration, GPA, and relevant coursework as tags.

3. Certifications — create /data/certifications.ts with 4 realistic dummy entries (mix of AWS, Coursera, Udemy, freeCodeCamp style certs). Render as a "badge wall": a grid of certification names/issuers where hovering reveals the verification link and date. No generic shadowed cards — use hairline borders and the accent color for hover states.

4. Timeline — build a vertical timeline component combining education + certifications + 2-3 dummy "experience" entries into one chronological narrative, using the monospace font for dates and the numbering/accent color as timeline markers.

Follow .github/copilot-instructions.md and the design tokens from Phase 2. Keep layouts asymmetric, not centered-column-everything.
```

---

## Phase 6 — Skills Section (Standalone Component)

```
Build a detailed, reusable Skills component (to be used on both /about and potentially a dedicated section) sourced from /data/skills.ts.

Requirements:
- Group skills by category: Languages, Frontend, Backend, Databases, Cloud/DevOps, Tools, Soft Skills — populate each with realistic dummy entries for a web/software development IT undergraduate.
- Display as clean tag groups organized in an asymmetric grid — NOT progress bars or percentage-based skill meters (these look unverifiable and generic). Where relevant, add a short honest descriptor instead, e.g. "React — built 3 production apps."
- Use the monospace font for category labels and the numbering motif for category ordering.
- Add a subtle hover-state using the accent color, consistent with earlier phases.

Keep this component visually distinct from the certifications "badge wall" in Phase 5 so sections don't feel repetitive despite both being grid-based.
```

---

## Phase 7 — Projects: Grid + Case Study Detail Pages

```
Build the full projects system:

1. /app/projects/page.tsx — a filterable grid of all projects sourced from /data/projects.ts. Expand that file to include 6 realistic dummy project entries following the full schema in PORTFOLIO_SRS.md Section 5.5/16 (title, tagline, role, stack, problem, features, challenge, links, status, featured flag). Add tag-based filtering (by tech stack) using simple client-side state — no external library needed unless you think fuse.js adds real value here.

2. /app/projects/[slug]/page.tsx — a dynamic case-study page for each project rendering ALL fields from the schema: hero (title + tagline + cover image placeholder), problem statement, role, tech stack tags, key features list, "Challenges & Solutions" section (this is the differentiator section — give it real visual weight, not an afterthought), links to live demo/GitHub/related blog post, and a "status" badge.

3. Use generateStaticParams for static generation of project pages.

4. Layout: asymmetric, editorial — think a well-designed dev-blog post layout, not a generic "product landing page" layout. Use the numbering motif, hairline dividers between sections, and the monospace font for the tech-stack tags and status badge.

Follow .github/copilot-instructions.md conventions throughout.
```

---

## Phase 8 — Blog System (Native MDX + Medium RSS Aggregation)

```
Build the full blog system per PORTFOLIO_SRS.md Section 10:

1. Set up native MDX blog posts under /content/blog/*.mdx with frontmatter (title, date, tags, excerpt, coverImage). Create 2 realistic dummy posts about topics relevant to a web dev IT undergraduate (e.g., "Lessons from building my first full-stack app", "Why I switched from X to Y").

2. Create /lib/getMediumPosts.ts that fetches and parses a Medium RSS feed (https://medium.com/feed/@USERNAME — use a placeholder username constant I can swap later) using rss-parser, and normalizes each item into the shared Post type below. Handle fetch failures gracefully (return empty array, log a warning) so the build never breaks if Medium is unreachable.

3. Create the shared type in /lib/types.ts:
type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  source: "native" | "medium";
  canonicalUrl?: string;
  coverImage?: string;
  readingTime: string;
};

4. Create /lib/getAllPosts.ts that merges native + Medium posts, sorts by date descending, and computes reading time for native posts (words/200).

5. Build /app/blog/page.tsx: unified feed with a visible "source badge" per post (Native vs Medium), tag filtering, and a simple client-side search input (title/excerpt match is fine, no need for a search library unless helpful).

6. Build /app/blog/[slug]/page.tsx: for native posts, render the MDX content with proper typography styling (use Tailwind's typography approach but styled to match our design system — headings in the display font, body in the body font, code blocks in the mono font with the accent color for syntax highlights). For Medium/syndicated posts, show the excerpt and cover image with a clear "Continue reading on Medium ↗" link to the canonicalUrl instead of trying to render full content.

7. Add a reading-progress bar at the top of native post pages.

Use ISR (revalidate) on the blog listing page so new Medium posts appear periodically without a full redeploy. Follow the design system — no generic "blog card grid with shadow" styling; use the same hairline-border, asymmetric approach as the rest of the site.
```

---

## Phase 9 — Contact, Resume, Testimonials, Uses & Now Pages

```
Build the remaining content pages:

1. /app/contact/page.tsx — a contact form (name, email, message) using Formspree (use a placeholder form endpoint constant I'll swap in later) with client-side validation and a clear success/error state. Below the form, list social links (GitHub, LinkedIn, Medium, email-as-text-not-just-icon) and a short "usually responds within X days" line for personality/professionalism.

2. /app/resume/page.tsx — embed a PDF viewer for a resume (use a placeholder PDF path /public/resume-placeholder.pdf — note in a comment that I'll replace this file) plus a prominent "Download PDF" button.

3. A Testimonials component (place it on /about or home — your call, but justify the choice in a comment) sourced from /data/testimonials.ts with 2 realistic dummy entries (name, role/relationship, quote). Style as simple, elegant pull-quotes using the display font for the quote text — not a generic sliding carousel.

4. /app/uses/page.tsx — a "Uses" page listing hardware, software/IDE setup, and favorite tools/libraries, grouped into categories, styled consistently with the Skills component from Phase 6 but visually distinguishable.

5. /app/now/page.tsx — a simple "What I'm doing now" page with a "Last updated: [date]" line and 3-4 bullet points on current focus (learning X, building Y). Keep this one intentionally minimal.

Follow .github/copilot-instructions.md and maintain visual consistency with all prior phases.
```

---

## Phase 10 — Motion Polish, Accessibility, SEO, Performance, Deployment

```
Final polish pass across the whole project:

1. Accessibility audit: ensure all interactive elements are keyboard-navigable with visible focus states, all images have meaningful alt text (placeholder alt text is fine for dummy images, but the attribute must exist), color contrast meets WCAG AA against both light and dark backgrounds, and all animations respect `prefers-reduced-motion` (wrap Framer Motion variants accordingly).

2. SEO: add per-page metadata (title, description, Open Graph, Twitter Card) using Next.js Metadata API for every route. Generate a dynamic Open Graph image for blog posts using @vercel/og. Add /sitemap.xml and /robots.txt via Next.js metadata routes. Add JSON-LD structured data: Person schema on the home/about page, BlogPosting schema on native blog posts.

3. Performance: audit and replace any raw <img> tags with next/image, ensure fonts are loaded via next/font for subsetting, and check for any render-blocking issues. Aim for Lighthouse 90+ across the board.

4. Analytics: integrate Vercel Analytics (or note where to add Plausible as an alternative).

5. Final motion pass: review all scroll-reveal and hover animations across the site for consistency — they should all use the same easing/duration tokens rather than ad-hoc values per component. Extract shared Framer Motion variants into /lib/motion.ts.

6. Prepare for deployment: add a vercel.json if needed, double check environment variables (Medium username, Formspree endpoint) are read from a central /lib/config.ts rather than hardcoded inline, and write a DEPLOYMENT.md with steps to deploy to Vercel and connect a custom domain.

Do a final full read-through against PORTFOLIO_SRS.md Section 13 (Success Metrics) and flag anything not yet met.
```

---

## After Phase 10 — Real Content Swap Prompt

Use this once your real content is ready:

```
I'm now replacing dummy content with real content. Here is my real data for [education / certifications / projects / skills / testimonials / resume / social links — specify which]:

[paste your real content here, following the existing schema in /data/*.ts]

Update the relevant data file(s) and component(s) to use this real content, preserving all existing styling, layout, and functionality. Do not change the design system or component structure — only swap the data.
```

Repeat this prompt once per content type (projects, then education, then certifications, etc.) rather than pasting everything at once — it's easier for Copilot to verify each swap cleanly.
