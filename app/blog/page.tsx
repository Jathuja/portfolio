import type { Metadata } from "next";
import { getAllPosts, getAllPostTags } from "@/lib/getAllPosts";
import { BlogFeed } from "@/components/BlogFeed";
import { siteConfig } from "@/lib/config";

const title = "Blog";
const description =
  "Notes on software development, learning, and my experiences as an Information Technology undergraduate.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: `${siteConfig.url}/blog`,
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=blog`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=blog`,
    ],
  },
};

// Use ISR with 1 hour revalidation to aggregate new syndicated Medium posts automatically
export const revalidate = 3600;

export default async function BlogPage() {
  const [posts, allTags] = await Promise.all([
    getAllPosts(),
    getAllPostTags(),
  ]);

  return (
    <main className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-16 md:py-24 space-y-12">
      {/* Section Motif Header */}
      <header className="relative space-y-4">
        {/* Giant Swiss Numeral Watermark */}
        <div className="absolute right-0 top-0 section-numeral-hero -z-10 pointer-events-none opacity-40">
          03
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="section-motif">03 — BLOG</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl font-sans max-w-2xl leading-relaxed">
            Notes on software development, learning, and my experiences as an Information Technology undergraduate.
          </p>
        </div>
      </header>

      {/* Unified Blog Feed */}
      <BlogFeed posts={posts} allTags={allTags} />
    </main>
  );
}
