import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/getAllPosts";
import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/config";

/**
 * /sitemap.xml — auto-generated via Next.js metadata routes.
 * Includes all static pages + dynamic blog post + project slugs.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/uses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/now`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // Dynamic: project case study pages
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic: native blog posts only (syndicated Medium posts have canonical URLs elsewhere)
  let postRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getAllPosts();
    postRoutes = posts
      .filter((p) => p.source === "native")
      .map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "yearly" as const,
        priority: 0.7,
      }));
  } catch {
    // Gracefully skip if posts cannot be fetched at build time
  }

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
