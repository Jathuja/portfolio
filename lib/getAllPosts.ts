import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "./types";
import { calculateReadingTime } from "./readingTime";
import { getMediumPosts } from "./getMediumPosts";
import { recentPosts as curatedPosts } from "@/data/posts";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Parses and returns all native MDX posts stored under /content/blog/*.mdx
 */
export function getNativePosts(): Post[] {
  try {
    if (!fs.existsSync(BLOG_CONTENT_DIR)) {
      return [];
    }

    const fileNames = fs.readdirSync(BLOG_CONTENT_DIR);
    const mdxFiles = fileNames.filter(
      (fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md")
    );

    const posts: Post[] = mdxFiles
      .map((fileName) => {
        const slug = fileName.replace(/\.(mdx|md)$/, "");
        const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const { data, content } = matter(fileContents);

        // Compute reading time based on MDX raw content (words / 200)
        const readingTime = data.readingTime || calculateReadingTime(content);

        // Normalize date to display format
        let formattedDate = data.date || "Recent";
        if (data.date) {
          const parsed = new Date(data.date);
          if (!isNaN(parsed.getTime())) {
            formattedDate = parsed.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          }
        }

        const tags: string[] = Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === "string"
          ? [data.tags]
          : ["Engineering"];

        return {
          slug,
          title: data.title || slug.replace(/-/g, " "),
          date: formattedDate,
          excerpt: data.excerpt || "",
          tags,
          source: (data.source as "native" | "medium") || "native",
          canonicalUrl: data.canonicalUrl,
          coverImage: data.coverImage,
          readingTime,
          content,
        };
      })
      .filter((post) => post.title.trim() !== "");

    return posts;
  } catch (error) {
    console.error("[getNativePosts] Error reading native blog posts:", error);
    return [];
  }
}

/**
 * Returns a single native post with its full MDX content by slug
 */
export function getNativePostBySlug(slug: string): Post | null {
  const posts = getNativePosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * Merges native MDX posts, curated posts from data/posts.ts, and Medium RSS posts,
 * sorted by date descending. Deduplicates by slug.
 */
export async function getAllPosts(): Promise<Post[]> {
  const nativePosts = getNativePosts();
  const mediumPosts = await getMediumPosts();

  // Merge curated posts (from data/posts.ts) into the combined list.
  // These are already normalized Post objects (e.g. the WSO2 Medium article).
  const allRaw = [...nativePosts, ...curatedPosts, ...mediumPosts];

  // Deduplicate by slug — first occurrence wins
  const seen = new Set<string>();
  const combined = allRaw.filter((p) => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  // Sort descending by parsed date
  return combined.sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });
}

/**
 * Retrieves a post by slug from either native files or Medium feed
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // First check native posts for instant local response
  const nativePost = getNativePostBySlug(slug);
  if (nativePost) return nativePost;

  // Otherwise check Medium posts
  const mediumPosts = await getMediumPosts();
  return mediumPosts.find((p) => p.slug === slug) || null;
}

/**
 * Retrieves a unique list of all tags across all published posts
 */
export async function getAllPostTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}
