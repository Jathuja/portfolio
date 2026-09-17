# Super Portfolio — Requirements & Content Specification
### For: IT Undergraduate — Web/Software Development Track
### Stack: Next.js (React) + TypeScript + Tailwind CSS + MDX
### Version 1.0

---

## 0. How to Use This Document

This is your single source of truth. It has three jobs:

1. **Tell you everything you *could* include** in a portfolio, organized so nothing gets missed.
2. **Define exactly how the site should look, feel, and behave** so it doesn't read as a generic AI-generated template.
3. **Feed the companion files** — `COPILOT_PROMPTS.md` (phase-by-phase build prompts) and `.github/copilot-instructions.md` (persistent rules for Copilot) — which turn this spec into actual code.

Read this once fully. Then work phase by phase using `COPILOT_PROMPTS.md`. Every phase references sections of this document by number, so keep it open in a side tab.

You said you have real content but want dummy data first — every content section below includes both **(a)** the full field list your real data will eventually fill and **(b)** a placeholder/dummy example so Copilot can scaffold pages before your real content arrives.

---

## 1. Vision Statement

> "A portfolio that reads like a well-engineered product, not a template — every section should look like it was designed by someone who *builds* software, not someone who *filled in a theme*."

The site must communicate three things within 5 seconds of landing:
- **Competence** — this person ships real, working software.
- **Taste** — this person cares about craft, detail, and design, not just function.
- **Personality** — this is a specific human, not a corporate template.

**Anti-goal:** Do not produce the "AI-vibe-coded" look — you know it when you see it:
- Purple-to-blue gradient hero with a floating 3D blob
- Big rounded "Inter/Poppins" heading + generic glassmorphism cards
- Centered hero, 3 feature cards, testimonials carousel, generic footer
- Overused emoji bullet icons (🚀 ✨ 💡) as section decoration
- Stock "Book a call" CTA button styling

Section 8 (Design System) defines the specific alternative direction to take instead.

---

## 2. Target Audience & Use Cases

| Visitor | What they're looking for | Primary page |
|---|---|---|
| Recruiter / HR (skimming) | 10-second scan: name, role, top 2-3 projects, contact | Home |
| Hiring manager / tech lead | Depth: how you think, code quality, problem-solving | Project case studies |
| Fellow developers | Blog content, GitHub activity, technical opinions | Blog |
| Internship/job application reviewer | Proof of credentials | Education, Certifications, Resume |
| You, in 2 years | A living record of your growth | Timeline/Now page |

Design every page to serve at least one of these explicitly.

---

## 3. Differentiation Strategy (Read This Before Design)

Pick **one strong point of view** rather than trying to look like every trend at once. Choose one direction (or blend two deliberately) and commit fully:

- **A. Editorial/Documentation style** — inspired by technical docs and dev blogs (Stripe docs, Linear blog). Lots of whitespace, strong typographic hierarchy, monospace accents for code/meta info, subtle borders instead of shadows/gradients.
- **B. Terminal/IDE-inspired** — dark-mode-first, monospace headings, command-palette style navigation (⌘K search), syntax-highlighted code blocks as a design motif, blinking cursor accents.
- **C. Print/Swiss-poster inspired** — bold asymmetric grid, oversized numerals for section labels ("01 — Projects"), strong single accent color on off-white/near-black background, no rounded corners, no shadows.
- **D. Personal-brand/magazine style** — large expressive type, generous project imagery, a distinctive signature color pairing (not purple/blue), hand-drawn or custom SVG accents.

**Recommendation for your profile:** Blend **A + C** — editorial structure with Swiss-poster boldness. It signals engineering rigor (docs-like clarity) and design taste (poster-like confidence) without relying on 3D renders or gradients, which are the fastest way to look templated.

Concrete, non-generic techniques to use throughout:
- Custom cursor or cursor-following micro-interaction on interactive elements (optional, subtle)
- A distinctive **numbering system** for sections (01, 02, 03…) as a recurring visual anchor
- **Asymmetric grids** instead of centered 3-column card layouts
- Typography as the hero — a strong custom or well-paired font duo instead of a big illustration
- Motion that reveals information on scroll (staggered text reveal, not generic fade-up-everything)
- A genuinely custom 404 page and loading state — these are cheap wins that scream "not a template"
- Real, specific microcopy instead of generic CTAs ("See how I built this" instead of "Learn More")

---

## 4. Full Sitemap

```
/                     Home (hero + condensed highlights of everything below)
/about                Full bio, story, education, certifications, timeline
/projects             Project grid (filterable by tag/tech)
/projects/[slug]      Individual project case study
/blog                 Unified blog feed (native posts + syndicated Medium/Dev.to)
/blog/[slug]          Individual blog post (native, MDX-rendered)
/uses                 Tools, hardware, software you actually use (devs love this page)
/now                  What you're currently learning/building (updated periodically)
/resume               Embedded + downloadable CV
/contact              Contact form + social links + calendar link (optional)
/404                  Custom not-found page
```

Optional stretch pages (Phase 10+ / v2): `/playground` (live code demos), `/guestbook`, `/uses/setup-photos`.

---

## 5. Complete Content Inventory

This is the exhaustive list. Not everything is mandatory — check off what applies to you — but this is the "everything you could add" list you asked for.

### 5.1 Identity & About
- Full name, professional title (e.g., "IT Undergraduate & Full-Stack Developer")
- One-line positioning statement (your "elevator pitch")
- Profile photo (professional but personable) + optional alternate/illustrated avatar
- Short bio (50 words, for hero) and long bio (300–500 words, for About page)
- Location, availability status ("Open to internships", "Open to freelance", etc.)
- Pronouns (optional)
- Languages spoken
- Personal interests / "outside of code" section (humanizes you — hobbies, sports, music)
- A personal "manifesto" or values statement (optional but strong differentiator)

### 5.2 Education
For each entry: Institution name, degree/program, field of study, start–end dates (or "expected"), GPA/CGPA (optional, include if strong), relevant coursework (list), notable academic projects, honors/dean's list, institution logo.

**Dummy example:**
```json
{
  "institution": "University of Example",
  "degree": "BSc (Hons) in Information Technology",
  "duration": "2023 – 2027 (Expected)",
  "gpa": "3.7 / 4.0",
  "coursework": ["Data Structures & Algorithms", "Database Systems", "Software Engineering", "Cloud Computing"],
  "highlights": ["Dean's List 2024", "Led 3-person capstone team building a campus event app"]
}
```

### 5.3 Certifications & Courses
Fields: Certificate name, issuing body, date issued, expiry (if any), credential ID, verification URL, badge/logo image, skills covered.

**Dummy examples to scaffold with:**
- AWS Certified Cloud Practitioner — Amazon Web Services — 2025
- Meta Front-End Developer Professional Certificate — Coursera/Meta — 2024
- The Complete JavaScript Course — Udemy — 2024
- freeCodeCamp Responsive Web Design — freeCodeCamp — 2023

Include a visual "badge wall" grid layout with hover-to-reveal verification links.

### 5.4 Skills
Group by category, not a flat list:
- **Languages:** JavaScript/TypeScript, Python, Java, C, SQL, etc.
- **Frontend:** React, Next.js, Tailwind CSS, HTML5/CSS3
- **Backend:** Node.js, Express, REST/GraphQL APIs
- **Databases:** PostgreSQL, MongoDB, MySQL, Firebase
- **Cloud/DevOps:** AWS/Azure/GCP basics, Docker, Git/GitHub, CI/CD (GitHub Actions)
- **Tools:** VS Code, Figma, Postman, Linux/CLI
- **Soft skills:** Communication, teamwork, agile/scrum familiarity, problem-solving
- Optional: proficiency indicators — but prefer **honest, specific descriptors** ("built 3 production apps with this") over arbitrary progress bars/percentages, which read as unverifiable and template-y.

### 5.5 Projects (Most Important Section)
For each project, structure as a **mini case study**, not just a card:

- Title, one-line tagline
- Cover image / GIF demo / embedded video walkthrough
- Problem statement — what need did this solve?
- Your role (solo / team of X, your specific contribution)
- Tech stack used (tagged)
- Key features (bulleted, specific — not "responsive design" but "real-time collaborative editing via WebSockets")
- Challenges faced + how you solved them (this is what separates a strong candidate from a template list)
- Screenshots/architecture diagram
- Metrics if available (users, performance improvement, test coverage)
- Links: Live demo, GitHub repo, related blog post write-up
- Status: Completed / In Progress / Archived

**Dummy example:**
```json
{
  "slug": "campus-connect",
  "title": "CampusConnect",
  "tagline": "A real-time event discovery platform for university students",
  "role": "Solo developer",
  "stack": ["Next.js", "PostgreSQL", "Prisma", "Tailwind", "WebSockets"],
  "problem": "Students missed campus events due to scattered announcements across WhatsApp groups and posters.",
  "features": [
    "Real-time RSVP counts via WebSocket updates",
    "Role-based dashboard for event organizers vs students",
    "Calendar sync (Google Calendar API)"
  ],
  "challenge": "Handling concurrent RSVP writes without race conditions — solved using optimistic locking in Prisma.",
  "links": { "demo": "#", "github": "#", "writeup": "/blog/building-campus-connect" },
  "status": "Completed"
}
```

Recommend 4–8 quality projects over 15 shallow ones. Categorize as Featured (top 2–3, full case study) vs. Other Projects (compact grid with GitHub link).

### 5.6 Blog (Native + Syndicated)
This is a key requirement you mentioned — pulling in your Medium posts alongside native ones.

**Content types:**
- Native posts written directly in MDX in your repo (full control, best for SEO, hosted on your domain)
- Syndicated posts from Medium (pulled via RSS, displayed with a "Originally published on Medium ↗" badge and canonical link back)
- Optionally same treatment for Dev.to, Hashnode, LinkedIn articles

**Per-post fields:** Title, slug, publish date, updated date, cover image, tags/categories, excerpt, reading time (auto-calculated), source ("native" | "medium" | "devto"), canonical URL (for syndicated), content body.

**Fetching strategy (technical note for Phase 8):**
- Medium exposes an RSS feed at `https://medium.com/feed/@yourusername`
- Fetch and parse this at build time (Next.js `getStaticProps`/route handler) using a library like `rss-parser`, normalize into the same shape as native posts, merge and sort by date.
- Cache/revalidate periodically (ISR — Incremental Static Regeneration) so new Medium posts appear without a manual redeploy.

**Blog page features:** tag filtering, search, reading-time badges, "source" badge (Native / Medium / Dev.to), related-posts section, newsletter signup (optional — e.g., Buttondown/ConvertKit embed).

### 5.7 Experience / Work History
Internships, part-time roles, freelance work, teaching assistant roles, club leadership. Fields: Role, organization, duration, description, key achievements (quantified where possible), tech/tools used.

### 5.8 Open Source & GitHub Activity
- Contribution graph embed (GitHub stats card or custom-styled)
- Notable PRs merged to external repos
- Personal open-source projects/libraries published (npm packages, etc.)

### 5.9 Achievements & Awards
Hackathon wins, coding competition rankings (LeetCode/Codeforces rating if strong), scholarships, dean's list, published papers, conference talks/workshops.

### 5.10 Testimonials / Recommendations
Quotes from professors, teammates, internship supervisors, or freelance clients. Name, role/relationship, photo (optional), quote. Even 2–3 genuine ones outweigh a generic carousel of 8.

### 5.11 Resume/CV
Embedded PDF viewer + prominent download button. Keep a plain-text/ATS-friendly version available too, since many recruiter systems parse resumes as text.

### 5.12 Contact
Contact form (name, email, message — wire to a service like Formspree/Resend, no backend needed), direct email (as text, not just an icon, for accessibility), social links (GitHub, LinkedIn, Medium, Twitter/X, LeetCode), optional calendar booking link (Calendly/Cal.com) for interview scheduling.

### 5.13 "Uses" Page
Hardware (laptop, monitor, peripherals), software/IDE setup, VS Code extensions, terminal/shell setup, favorite libraries/tools. This is a small page but a well-known signal of technical seriousness and personality in developer portfolios.

### 5.14 "Now" Page
A dated, periodically-updated note: what you're currently learning, building, or focused on. Shows momentum and honesty over a static "Skills: 100%" bar.

### 5.15 Timeline / Journey
A vertical or horizontal timeline combining education, certifications, projects, and experience into one narrative view — good for the About page.

### 5.16 Personality & Craft Details (Small Things, Big Impact)
- Custom favicon + Open Graph image (so link previews look designed, not default)
- Custom 404 page with personality (not "Oops! Page not found" — something specific to you)
- A subtle Easter egg (e.g., a Konami code, a hidden dev-console greeting message for other engineers who open DevTools — a well-loved touch among developers)
- Dark/light mode toggle with a genuinely designed dark palette, not just inverted colors
- Reading progress bar on blog posts
- Command palette (⌘K) for quick navigation, if going with Direction B/A blend

---

## 6. Functional Requirements Summary

| Feature | Requirement |
|---|---|
| Navigation | Sticky header, active-route indicator, mobile hamburger with full-screen menu |
| Search | Client-side search across blog posts and projects (e.g., using `fuse.js`) |
| Filtering | Tag/tech-based filtering on Projects and Blog pages |
| Dark mode | System-preference default, manual toggle, persisted via `localStorage`-free approach (cookie or Next.js theme provider, since artifacts disallow localStorage — not a constraint for your real deployed site, only relevant if prototyping inside Claude artifacts) |
| Forms | Client-side validation + serverless submission (Formspree/Resend/EmailJS) |
| SEO | Per-page metadata, sitemap.xml, robots.txt, JSON-LD structured data (Person + BlogPosting schema) |
| Performance | Image optimization (`next/image`), font subsetting, Lighthouse score ≥ 90 on all metrics |
| Accessibility | WCAG 2.1 AA: semantic HTML, keyboard navigation, sufficient contrast, alt text, focus states |
| Analytics | Privacy-respecting analytics (Vercel Analytics / Plausible) |
| RSS aggregation | Medium (and optionally Dev.to) feed merged into native blog listing |

---

## 7. Non-Functional Requirements

- **Performance:** First Contentful Paint < 1.5s, fully responsive from 320px to 4K.
- **Responsiveness:** Mobile-first; test breakpoints at 375 / 768 / 1024 / 1440px.
- **Accessibility:** Full keyboard navigability, `prefers-reduced-motion` respected for all animations.
- **SEO:** Every page has unique title/description/OG image; blog posts have article schema.
- **Maintainability:** Content (projects, certifications, education) stored as structured data files (JSON/MDX frontmatter), not hardcoded in JSX — so you can update content without touching layout code.
- **Deployment:** Vercel (native Next.js support, free tier sufficient, automatic preview deployments per Git branch).

---

## 8. Design System Specification

### 8.1 Color
Avoid the default purple/indigo/blue-gradient "SaaS AI" palette entirely. Pick **one confident accent color** against a near-black/near-white base:

- Suggested direction: `Off-black (#0B0B0C)` + `Off-white (#F7F6F3)` + one accent — e.g., a warm signal color like `#FF4D2E` (burnt orange-red), `#00D68F` (signal green), or `#FFD400` (warning yellow) — used sparingly (links, highlights, one hero element) rather than everywhere.
- Dark mode should be a deliberately designed near-black (not pure `#000`) with the same accent, tuned for contrast.

### 8.2 Typography
Pair a **strong display typeface** with a **clean workhorse text face**, plus a **monospace** for meta/code:
- Display: something with character — e.g., `Fraunces`, `Söhne`, `General Sans`, or `Clash Display` (via Fontshare, free) — avoid default `Poppins`/generic `Inter`-only pairing.
- Body: `Inter`, `Geist`, or `IBM Plex Sans` at a generous size (18px+ base).
- Mono: `JetBrains Mono` or `Geist Mono` for dates, tags, code snippets, and the numbering system (01, 02…).

### 8.3 Layout Principles
- Asymmetric grid over centered-everything layout.
- Generous whitespace; let content breathe rather than filling every pixel.
- Hairline borders (1px, low-opacity) instead of drop shadows for separation.
- No rounded-corner-everything; pick either sharp corners (poster direction) or one consistent radius token used sparingly.
- Section numbering (e.g., large "02" beside "Projects" heading) as a recurring wayfinding device.

### 8.4 Motion
- Scroll-triggered staggered text/element reveals (e.g., via Framer Motion), not universal fade-ins on everything.
- Micro-interactions on hover for project cards (slight image parallax or reveal of metadata) rather than a generic "lift + shadow" hover.
- Respect `prefers-reduced-motion`.

### 8.5 Imagery
- Real screenshots/screen recordings of your actual projects, not stock photography or 3D abstract renders.
- Consistent treatment (same browser-chrome mockup frame, or consistent aspect ratio + border style) across all project images.

---

## 9. Technical Architecture

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS + CSS variables for theme tokens (supports dark mode cleanly)
- **Content:** MDX for blog posts and project case studies (via `next-mdx-remote` or Contentlayer); JSON/TS data files for structured data (education, certifications, skills)
- **Animation:** Framer Motion
- **Forms:** Formspree, Resend, or EmailJS (no custom backend needed)
- **Blog syndication:** `rss-parser` (or `feed` package) to fetch Medium RSS at build/revalidate time
- **Icons:** `lucide-react`
- **Deployment:** Vercel
- **Version control:** Git + GitHub, with a clean commit history (recruiters do check this)

---

## 10. Blog Architecture Detail

```
/content/blog/*.mdx        → native posts (frontmatter: title, date, tags, excerpt, cover)
/lib/getMediumPosts.ts     → fetches & parses Medium RSS feed, normalizes shape
/lib/getAllPosts.ts        → merges native + syndicated, sorts by date, exposes unified type
/app/blog/page.tsx         → lists unified posts with source badges + filters
/app/blog/[slug]/page.tsx  → renders native MDX; syndicated posts show excerpt + "Read on Medium ↗"
```

Unified post type:
```ts
type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  source: "native" | "medium" | "devto";
  canonicalUrl?: string; // required if source !== "native"
  coverImage?: string;
  readingTime: string;
};
```

---

## 11. SEO & Analytics Plan

- `sitemap.xml` + `robots.txt` auto-generated via Next.js metadata routes
- JSON-LD: `Person` schema on About/Home, `BlogPosting` schema per post
- Open Graph + Twitter Card meta per page, with a generated OG image template (via `@vercel/og`) so each blog post gets a unique share image automatically
- Vercel Analytics or Plausible for privacy-respecting page-view tracking

---

## 12. Content Voice & Style Guide

- Write in first person, active voice, confident but not boastful: "I built X to solve Y" not "This is a project that was created."
- Project descriptions lead with the **problem solved**, not the tech stack.
- Avoid buzzword soup ("passionate", "synergy", "leverage") — be specific and concrete instead.
- Blog posts: technical, example-driven, written as if explaining to a peer developer.

---

## 13. Success Metrics (How You'll Know It Worked)

- Lighthouse scores ≥ 90 across Performance/Accessibility/Best Practices/SEO
- At least 3 fully-detailed project case studies live at launch
- Blog aggregating both native and Medium content automatically
- Positive, specific feedback from at least 2 peers/mentors before sharing publicly with recruiters
- Site fully functional and legible with JavaScript-disabled fallback content where feasible (progressive enhancement for core content)

---

## 14. Real-Content Collection Checklist

Fill this in progressively — you don't need it all before starting (dummy data covers Phases 1–9), but gather it before the final content pass:

- [ ] Professional headshot / photo
- [ ] Resume PDF (updated)
- [ ] 4–8 project write-ups using the Section 5.5 template
- [ ] Screenshots/recordings for each project
- [ ] Full education history with dates
- [ ] All certifications with verification links
- [ ] Full skills list, honestly self-assessed
- [ ] Links to all existing Medium/Dev.to posts
- [ ] 2–3 testimonials requested from professors/teammates/supervisors
- [ ] Social links (GitHub, LinkedIn, Medium, LeetCode, etc.)
- [ ] Domain name decision (e.g., `yourname.dev`, `yourname.com`)

---

## 15. Build Roadmap (Maps to `COPILOT_PROMPTS.md`)

| Phase | Deliverable |
|---|---|
| 1 | Project scaffold, folder structure, config, `copilot-instructions.md` wired in |
| 2 | Design tokens: colors, type scale, spacing, dark mode wiring |
| 3 | Global layout: header, footer, nav, page transitions |
| 4 | Home page with dummy data |
| 5 | About page: bio, education, certifications, timeline |
| 6 | Skills section |
| 7 | Projects: grid + dynamic case-study detail pages |
| 8 | Blog system: native MDX + Medium RSS aggregation |
| 9 | Contact, resume, testimonials, uses/now pages |
| 10 | Motion polish, accessibility audit, SEO metadata, performance pass, deployment |

---

## 16. Appendix — Dummy Data Schemas

Use these shapes for Phase 1–9 scaffolding before real data arrives.

```ts
// data/education.ts
export const education = [{
  institution: "University of Example",
  degree: "BSc (Hons) Information Technology",
  duration: "2023 – 2027",
  gpa: "3.7/4.0",
  coursework: ["DSA", "Databases", "Software Engineering"],
}];

// data/certifications.ts
export const certifications = [{
  name: "AWS Certified Cloud Practitioner",
  issuer: "Amazon Web Services",
  date: "2025",
  url: "#",
}];

// data/skills.ts
export const skills = {
  languages: ["TypeScript", "Python", "Java", "SQL"],
  frontend: ["React", "Next.js", "Tailwind CSS"],
  backend: ["Node.js", "Express"],
  databases: ["PostgreSQL", "MongoDB"],
  tools: ["Git", "Docker", "Figma"],
};

// data/projects.ts
export const projects = [{
  slug: "campus-connect",
  title: "CampusConnect",
  tagline: "Real-time event discovery for university students",
  stack: ["Next.js", "PostgreSQL", "WebSockets"],
  featured: true,
}];
```

---

**End of specification. Proceed to `COPILOT_PROMPTS.md` for the phase-by-phase build prompts, and place `copilot-instructions.md` in your repo's `.github/` folder before starting Phase 1.**
