import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, ExternalLink, Bookmark, User } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/getAllPosts";
import { mdxComponents } from "@/components/MDXComponents";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ShareArticle } from "@/components/ShareArticle";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/config";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const ogImageUrl = `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.excerpt)}&type=post`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const isNative = post.source === "native";
  const isMedium = post.source === "medium";

  // BlogPosting JSON-LD for native posts (syndicated posts have canonical URLs on Medium)
  const blogPostingJsonLd = isNative
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Person",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        url: `${siteConfig.url}/blog/${post.slug}`,
        keywords: post.tags.join(", "),
        ...(post.coverImage ? { image: post.coverImage } : {}),
      }
    : null;

  return (
    <main className="mx-auto max-w-4xl w-full px-6 py-12 md:py-20">
      {/* BlogPosting structured data for native posts */}
      {blogPostingJsonLd && <JsonLd data={blogPostingJsonLd} />}

      {/* Top Reading Progress Bar for Native Posts */}
      {isNative && <ReadingProgressBar />}


      {/* Back Link & Section Header */}
      <div className="space-y-6 mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all articles</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="section-motif">
            {isNative ? "POST // NATIVE ESSAY" : "POST // MEDIUM SYNDICATED"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* Article Header */}
      <header className="space-y-6 pb-8 border-b border-border">
        {/* Source Badge & Meta Row */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
          {isMedium ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 uppercase tracking-wider border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
              <span>Medium Syndicated</span>
              <ExternalLink className="h-3 w-3" />
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 uppercase tracking-wider border border-border bg-muted/40 text-foreground font-medium">
              Native Publication
            </span>
          )}

          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            <span>{post.date}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-accent" />
            <span>{post.readingTime}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-accent" />
            <span>{siteConfig.name}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.12]">
          {post.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="font-sans text-lg sm:text-xl text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tag List */}
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="tag-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Post Body: Native MDX vs Medium Syndicated */}
      {isNative ? (
        <article className="py-10 prose-custom">
          {post.content ? (
            <MDXRemote source={post.content} components={mdxComponents} />
          ) : (
            <p className="text-muted-foreground font-sans">
              No content found for this post.
            </p>
          )}
        </article>
      ) : (
        /* Medium Syndicated Article Card */
        <div className="py-12 space-y-8">
          <div className="hairline-border p-8 sm:p-10 bg-card space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-500 font-semibold flex items-center gap-1.5">
                <Bookmark className="h-4 w-4 text-amber-500" />
                <span>Original Publication</span>
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-foreground font-normal">
              This article was originally published on Medium
            </h2>

            <p className="font-sans text-base sm:text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            <div className="pt-4">
              <a
                href={post.canonicalUrl || post.url || `https://medium.com/@${siteConfig.mediumUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                <span>Continue reading on Medium</span>
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Post Footer: Share & Navigation */}
      <footer className="mt-12 pt-8 border-t border-border space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <ShareArticle title={post.title} />

          <Link
            href="/blog"
            className="btn-outline self-start sm:self-auto text-xs"
          >
            ← Explore all articles
          </Link>
        </div>
      </footer>
    </main>
  );
}
