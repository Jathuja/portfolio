import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

/**
 * /robots.txt — programmatic metadata route.
 * Replaces the static public/robots.txt so it can reference the live SITE_URL
 * from environment variables.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow server-only API / OG image route from indexing
        disallow: ["/og", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
