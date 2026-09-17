import Parser from "rss-parser";
import { Post } from "./types";
import { calculateReadingTime } from "./readingTime";
import { siteConfig } from "./config";

// Placeholder username constant that can be swapped or configured
export const DEFAULT_MEDIUM_USERNAME = "jathuja";

interface CustomFeedItem {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  creator?: string;
  content?: string;
  contentSnippet?: string;
  categories?: string[];
  guid?: string;
  "content:encoded"?: string;
}

const parser = new Parser<Record<string, unknown>, CustomFeedItem>({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

/**
 * Extracts the first image URL from HTML content if present
 */
function extractCoverImage(htmlContent?: string): string | undefined {
  if (!htmlContent) return undefined;
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch ? imgMatch[1] : undefined;
}

/**
 * Normalizes a title into a URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Strips HTML tags and collapses whitespace to create a clean excerpt
 */
function cleanExcerpt(htmlText?: string, maxLength = 180): string {
  if (!htmlText) return "Read full article on Medium.";
  const stripped = htmlText
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (stripped.length <= maxLength) return stripped;
  return `${stripped.slice(0, maxLength).trim()}...`;
}

/**
 * Fetches and parses Medium RSS feed, converting items to normalized Post objects.
 * Gracefully handles fetch failures and network timeouts so builds never break.
 */
export async function getMediumPosts(
  username: string = siteConfig.mediumUsername || DEFAULT_MEDIUM_USERNAME
): Promise<Post[]> {
  try {
    const cleanUsername = username.replace(/^@/, "").trim();
    if (!cleanUsername || cleanUsername === "example") {
      // If default dummy username is unset, skip or try feed without failing
      return [];
    }

    const feedUrl = `https://medium.com/feed/@${cleanUsername}`;
    
    // Use timeout to prevent build hangs if Medium is unreachable
    const feed = await Promise.race([
      parser.parseURL(feedUrl),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Medium RSS request timeout")), 5000)
      ),
    ]);

    if (!feed || !Array.isArray(feed.items)) {
      return [];
    }

    const posts: Post[] = feed.items.map((item, index) => {
      const rawTitle = item.title?.trim() || `Medium Article ${index + 1}`;
      const slug = `medium-${slugify(rawTitle) || index + 1}`;
      const rawContent =
        (item as { contentEncoded?: string }).contentEncoded ||
        item.content ||
        item.contentSnippet ||
        "";
      
      const coverImage = extractCoverImage(rawContent);
      const excerpt = cleanExcerpt(item.contentSnippet || rawContent);
      const canonicalUrl = item.link || `https://medium.com/@${cleanUsername}`;
      
      // Parse date safely
      const dateStr = item.isoDate || item.pubDate || new Date().toISOString();
      const formattedDate = new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      const tags = Array.isArray(item.categories) && item.categories.length > 0
        ? item.categories.slice(0, 4)
        : ["Engineering", "Web Development"];

      return {
        slug,
        title: rawTitle,
        date: formattedDate,
        excerpt,
        tags,
        source: "medium",
        canonicalUrl,
        url: canonicalUrl,
        coverImage,
        readingTime: calculateReadingTime(rawContent || excerpt),
      };
    });

    return posts;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[getMediumPosts] Warning: Failed to fetch Medium RSS feed (${message}). Proceeding with native posts only.`);
    return [];
  }
}
