import { SiteConfig } from "./types";

/**
 * Central site configuration.
 *
 * Environment variables (set in .env.local / Vercel dashboard):
 *   NEXT_PUBLIC_SITE_URL        — your deployed URL (e.g. https://jathuja.dev)
 *   NEXT_PUBLIC_MEDIUM_USERNAME — your Medium handle (e.g. @yourhandle)
 *   NEXT_PUBLIC_FORMSPREE_ID    — your Formspree form ID (e.g. mqkvyqpo)
 *
 * All values fall back to safe placeholder strings so local dev works
 * without a .env.local file.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://example.com";

const MEDIUM_USERNAME =
  process.env.NEXT_PUBLIC_MEDIUM_USERNAME ?? "@example";

const FORMSPREE_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "placeholder_form_id";

export const siteConfig: SiteConfig = {
  name: "Jathuja Sithamparanathan",
  title: "Software Engineering Intern",
  tagline: "Third-year Information Technology undergraduate seeking a Software Engineering Internship.",
  shortBio:
    "Third-year Information Technology undergraduate at the University of Moratuwa, interested in software engineering and full-stack development. I enjoy building practical web applications, APIs, and software projects while continuously learning new technologies.",
  description:
    "Portfolio of Jathuja Sithamparanathan, a third-year Information Technology undergraduate at the University of Moratuwa seeking a Software Engineering Internship.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og`,
  mediumUsername: MEDIUM_USERNAME,
  links: {
    github: "https://github.com/Jathuja",
    linkedin: "https://www.linkedin.com/in/jathuja-sithamparanathan-508953301/",
    medium: "https://medium.com",
    email: "mailto:jathuja004@gmail.com",
  },
  contact: {
    // TODO: Set NEXT_PUBLIC_FORMSPREE_ID in your .env.local / Vercel env vars.
    formspreeEndpoint: `https://formspree.io/f/${FORMSPREE_ID}`,
    responseEstimate: "1–2 business days",
  },
  navItems: [
    { name: "Home", href: "/", number: "01" },
    { name: "Projects", href: "/projects", number: "02" },
    { name: "Blog", href: "/blog", number: "03" },
    { name: "About", href: "/about", number: "04" },
    { name: "Contact", href: "/contact", number: "05" },
  ],
  secondaryNavItems: [
    { name: "Resume", href: "/resume", number: "06" },
    { name: "Now", href: "/now", number: "07" },
    { name: "Uses", href: "/uses", number: "08" },
  ],
};
