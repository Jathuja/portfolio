# Deployment Guide

This document covers every step needed to go from a local repository to a live, custom-domain Vercel deployment.

---

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
- Your portfolio code pushed to a GitHub repository
- A registered domain name (e.g., `yourname.dev`) if connecting a custom domain

---

## 1. Environment Variables

Before deploying, identify the variables the app reads from the environment. All have fallback values for local development, but you **must** set the real values in Vercel for production.

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live domain with protocol | `https://yourname.dev` |
| `NEXT_PUBLIC_MEDIUM_USERNAME` | Your Medium handle | `@yourhandle` |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID | `mqkvyqpo` |

### Local setup

Create a `.env.local` in the repo root (already git-ignored):

```bash
NEXT_PUBLIC_SITE_URL=https://yourname.dev
NEXT_PUBLIC_MEDIUM_USERNAME=@yourhandle
NEXT_PUBLIC_FORMSPREE_ID=mqkvyqpo
```

### Getting a Formspree form ID

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → copy the 8-character form ID from the endpoint URL
3. Set `NEXT_PUBLIC_FORMSPREE_ID` to that ID

---

## 2. First Deploy to Vercel

### Option A — Vercel Dashboard (recommended for first deploy)

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the `portfolio` repository
4. Vercel auto-detects Next.js — no build config changes needed
5. Before clicking **Deploy**, open **Environment Variables** and add the three variables above
6. Click **Deploy**

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

The CLI will prompt you through project setup on first run.

---

## 3. Connect a Custom Domain

1. In the Vercel dashboard, open your project → **Settings** → **Domains**
2. Click **Add Domain** and enter your domain (e.g., `yourname.dev`)
3. Vercel provides DNS records:
   - **Apex domain** (`yourname.dev`): Add an `A` record pointing to `76.76.21.21`
   - **www subdomain**: Add a `CNAME` record → `cname.vercel-dns.com`
4. Add these records in your domain registrar's DNS panel
5. Wait up to 48h for propagation (usually under 30 minutes)
6. Vercel auto-provisions a free TLS/SSL certificate via Let's Encrypt

> **Tip**: After connecting the domain, update `NEXT_PUBLIC_SITE_URL` in Vercel to match the live domain so sitemap.xml, robots.txt, and OG images all reference the correct URL.

---

## 4. Enable Vercel Analytics

Analytics is already integrated in `app/layout.tsx` via `<Analytics />` from `@vercel/analytics`.

To activate it:

1. In the Vercel dashboard → your project → **Analytics** tab
2. Click **Enable Analytics** (free for hobby tier, limited events)

No code changes needed — the `<Analytics />` component is already in place.

### Alternative: Plausible Analytics

If you prefer Plausible (privacy-first, self-hostable, no cookies):

1. Remove the `<Analytics />` import and component from `app/layout.tsx`
2. Uninstall `@vercel/analytics`: `npm uninstall @vercel/analytics`
3. Add a Plausible script tag:

```tsx
// app/layout.tsx — inside <body>, before </body>
import Script from "next/script";

<Script
  data-domain="yourname.dev"
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

4. Set up your Plausible account at [plausible.io](https://plausible.io) and add your domain.

---

## 5. Automatic Preview Deployments

Every push to a non-main branch automatically creates a **preview deployment** at a unique Vercel URL. This is useful for:

- Testing changes before merging to `main`
- Sharing with peers for the "positive feedback from 2 peers" success metric (SRS §13)

---

## 6. Updating Content

Content is stored in data files, not a CMS, so updates are a Git push:

1. Edit the relevant file in `/data/*.ts` or `/content/blog/*.mdx`
2. `git commit -m "content: update projects"` and push to `main`
3. Vercel automatically rebuilds and deploys within ~30 seconds

### Medium posts

New Medium posts appear automatically within **1 hour** due to ISR (`revalidate = 3600` on `/blog`). No redeploy needed.

---

## 7. Swapping Placeholder Content

Before sharing with recruiters, replace:

| File | What to replace |
|---|---|
| `public/resume-placeholder.pdf` | Your actual resume PDF |
| `data/projects.ts` | Real project data using Section 5.5 template |
| `data/education.ts` | Your real education history |
| `data/certifications.ts` | Your real certifications with verification URLs |
| `data/testimonials.ts` | Real quotes from professors/supervisors |
| `lib/config.ts` links | Your real GitHub, LinkedIn, email links |

Use the "Real Content Swap" prompt in `.github/COPILOT_PROMPTS.md` for each content type.

---

## 8. Known JS-Disabled Behaviour

Most pages (About, Blog, Projects, Contact, Resume, Uses, Now) are Next.js Server Components and render full content without JavaScript.

**Exception**: `app/page.tsx` (Home) uses `"use client"` for Framer Motion animations and the email copy button. Users with JavaScript disabled will see a blank home page. This is an acceptable trade-off — portfolio visitors universally have JS enabled, and the animations are core to the home page design.

---

## 9. Post-Deploy Checklist

- [ ] Visit `/sitemap.xml` — verify all routes are listed
- [ ] Visit `/robots.txt` — verify sitemap URL is correct
- [ ] Paste a blog post URL into [opengraph.xyz](https://www.opengraph.xyz) — verify branded OG image
- [ ] Tab through the site with keyboard only — verify focus rings are visible
- [ ] Enable `prefers-reduced-motion` in DevTools — verify animations don't fire
- [ ] Submit the site to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap in Search Console → Sitemaps → add `https://yourname.dev/sitemap.xml`
- [ ] Run Lighthouse in Chrome DevTools — target 90+ on all 4 metrics

---

*Generated by Phase 10 of COPILOT_PROMPTS.md. See `.github/PORTFOLIO_SRS.md` for the full specification.*
