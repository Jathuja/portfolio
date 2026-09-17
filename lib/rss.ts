import Parser from "rss-parser";
import { BlogPost } from "./types";
import { calculateReadingTime } from "./readingTime";

const parser = new Parser();

export async function fetchMediumPosts(mediumUsername: string): Promise<BlogPost[]> {
  try {
    const cleanUsername = mediumUsername.replace(/^@/, "");
    const feed = await parser.parseURL(`https://medium.com/feed/@${cleanUsername}`);

    return (feed.items || []).map((item) => {
      const contentSnippet = item.contentSnippet || item.content || "";
      const cleanSnippet = contentSnippet
        .replace(/<[^>]+>/g, "")
        .slice(0, 160)
        .trim();

      const slug = item.title
        ? item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "")
        : "post";

      return {
        slug,
        title: item.title || "Untitled Post",
        date: item.isoDate || item.pubDate || new Date().toISOString(),
        excerpt: cleanSnippet.length > 0 ? `${cleanSnippet}...` : "Read more on Medium",
        source: "medium",
        url: item.link,
        readingTime: calculateReadingTime(item.content || item.contentSnippet || ""),
        tags: (item.categories as string[]) || ["Engineering"],
      };
    });
  } catch (error) {
    console.error("Failed to fetch Medium RSS feed:", error);
    return [];
  }
}
