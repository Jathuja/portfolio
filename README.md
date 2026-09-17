# Personal Portfolio

A personal portfolio web application built with **Next.js 14+ (App Router)**, **TypeScript (strict)**, and **Tailwind CSS**.

---

## 📁 Project Structure

```text
portfolio/
├── .github/                  # Specs, instructions, and build prompts
│   ├── copilot-instructions.md  # Persistent guidelines for Copilot / AI agents
│   ├── COPILOT_PROMPTS.md       # 10-phase build prompts
│   └── PORTFOLIO_SRS.md         # Full requirements & content specification
├── app/                      # Next.js App Router routes & layouts
│   ├── about/                # /about — Bio, background, education, timeline
│   ├── blog/                 # /blog — Unified native + Medium blog posts
│   │   └── [slug]/           # /blog/[slug] — Dynamic blog post reader
│   ├── contact/              # /contact — Contact form & channels
│   ├── now/                  # /now — Current focus, reading, and learning
│   ├── projects/             # /projects — Projects index with filters
│   │   └── [slug]/           # /projects/[slug] — Project case study detail
│   ├── resume/               # /resume — Interactive/downloadable resume
│   ├── uses/                 # /uses — Development setup, hardware, & software
│   ├── globals.css           # Tailwind base & CSS variables theme tokens
│   ├── layout.tsx            # Root layout with ThemeProvider & font setup
│   ├── not-found.tsx         # Custom 404 handler
│   └── page.tsx              # Home page
├── components/               # Reusable React components (PascalCase)
│   ├── ThemeProvider.tsx     # Theme wrapper with next-themes
│   └── ThemeToggle.tsx       # Dark/light mode switcher
├── content/                  # Static long-form content
│   └── blog/                 # MDX articles with typed frontmatter
├── data/                     # Structured data files (TypeScript)
│   ├── certifications.ts     # Professional credentials & certifications
│   ├── education.ts          # Academic background & coursework
│   ├── projects.ts           # Project metadata & showcase definitions
│   └── skills.ts             # Categorized technical competencies
├── lib/                      # Reusable utilities, shared types, & configurations
│   ├── config.ts             # Global site & personal configuration
│   ├── motion.ts             # Shared Framer Motion animation variants
│   ├── readingTime.ts        # Reading time calculation helpers
│   ├── rss.ts                # RSS parser for Medium aggregation
│   ├── types.ts              # Core TypeScript interfaces & types
│   └── utils.ts              # Tailwind / clsx styling utility
├── public/                   # Static assets (images, icons, robots.txt)
├── .eslintrc.json            # ESLint rules (Next.js core-web-vitals + Prettier)
├── .prettierrc               # Prettier configuration with Tailwind plugin
├── next.config.mjs           # Next.js runtime configuration
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind theme tokens & design system extensions
└── tsconfig.json             # Strict TypeScript compiler options
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS (CSS variables design token system)
- **Theme**: `next-themes` (system/light/dark modes)
- **Animation**: `framer-motion` (reduced-motion compliant)
- **Icons**: `lucide-react`
- **Content**: MDX (`next-mdx-remote`, `gray-matter`)
- **RSS**: `rss-parser` (Medium feed aggregation)
- **Linting & Formatting**: ESLint + Prettier (`prettier-plugin-tailwindcss`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Lint & Format
```bash
npm run lint
npm run format
```

### 4. Build for Production
```bash
npm run build
```

---

## 📐 Design & Code Conventions

1. **No Generic AI Patterns**: Avoid purple/blue gradient backgrounds, glassmorphism, floating 3D blobs, or generic 3-column card layouts.
2. **Design Tokens**: All colors and theme properties are driven by CSS variables in `app/globals.css`.
3. **Strict TypeScript**: Props and data models are fully typed without using `any`.
4. **Separation of Concerns**: Structured content lives in `/data/*.ts` and `/content/blog/*.mdx`, never hardcoded in page JSX.
5. **Animation Standards**: Motion variants live in `/lib/motion.ts` and respect `prefers-reduced-motion`.
