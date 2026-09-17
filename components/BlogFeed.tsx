"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X, ArrowUpRight, BookOpen, ExternalLink, Filter } from "lucide-react";
import { Post } from "@/lib/types";
import { MOTION_EASE_OUT, MOTION_DURATION } from "@/lib/motion";

interface BlogFeedProps {
  posts: Post[];
  allTags: string[];
}

export function BlogFeed({ posts, allTags }: BlogFeedProps) {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedSource, setSelectedSource] = useState<"all" | "native" | "medium">("all");

  const filterTags = useMemo(() => {
    return ["All", ...allTags];
  }, [allTags]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Filter by tag
      const matchesTag =
        selectedTag === "All" ||
        post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      // Filter by source
      const matchesSource =
        selectedSource === "all" || post.source === selectedSource;

      // Filter by search query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesTag && matchesSource && matchesSearch;
    });
  }, [posts, selectedTag, selectedSource, searchQuery]);

  const hasActiveFilters =
    selectedTag !== "All" || selectedSource !== "all" || searchQuery !== "";

  const handleResetFilters = () => {
    setSelectedTag("All");
    setSelectedSource("all");
    setSearchQuery("");
  };

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE_OUT },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
      transition: { duration: MOTION_DURATION.fast },
    },
  };

  return (
    <div className="space-y-12">
      {/* Control Bar: Search Input, Source Tabs, Tag Pills */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full bg-card font-mono text-sm pl-10 pr-10 py-2.5 hairline-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Source Toggle Tabs */}
          <div className="flex items-center hairline-border p-1 bg-card self-start md:self-auto">
            <button
              onClick={() => setSelectedSource("all")}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 transition-colors ${
                selectedSource === "all"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Sources ({posts.length})
            </button>
            <button
              onClick={() => setSelectedSource("native")}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 transition-colors ${
                selectedSource === "native"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Native ({posts.filter((p) => p.source === "native").length})
            </button>
            <button
              onClick={() => setSelectedSource("medium")}
              className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 transition-colors ${
                selectedSource === "medium"
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Medium ↗ ({posts.filter((p) => p.source === "medium").length})
            </button>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="font-mono text-xs text-muted-foreground mr-1 inline-flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-accent" />
            <span>TOPIC:</span>
          </span>
          {filterTags.map((tag) => {
            const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`font-mono text-xs px-3 py-1 border transition-all ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground font-semibold"
                    : "border-border bg-card text-foreground hover:border-foreground/40"
                }`}
              >
                {tag}
              </button>
            );
          })}

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:underline ml-2"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span className="text-accent font-semibold">FEED //</span>
          <span>
            Showing {filteredPosts.length} of {posts.length} articles
          </span>
        </div>
        {selectedTag !== "All" && (
          <span className="text-foreground font-medium">
            Filtering by: <span className="text-accent">#{selectedTag}</span>
          </span>
        )}
      </div>

      {/* Post List */}
      {filteredPosts.length === 0 ? (
        <div className="hairline-border p-12 text-center bg-card space-y-4">
          <div className="inline-flex p-3 rounded-full bg-muted/50 text-muted-foreground mb-2">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="font-display text-2xl text-foreground font-normal">
            No articles match your search
          </h3>
          <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your search query, switching source tabs, or selecting another topic filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="btn-outline text-xs mt-2"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hairline-border divide-y divide-border bg-card"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => {
              const formattedIndex = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
              const isMedium = post.source === "medium";

              return (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  layout
                  className="group p-6 sm:p-8 transition-colors hover:bg-muted/30 relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                    {/* Left Meta Column: Index, Date, Source Badge, Reading Time */}
                    <div className="md:col-span-3 space-y-2.5">
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="font-semibold text-accent">
                          {formattedIndex}
                        </span>
                        <span className="text-muted-foreground">{post.date}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {isMedium ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                            <span>Medium</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider border border-border bg-muted/40 text-muted-foreground">
                            Native Post
                          </span>
                        )}

                        <span className="font-mono text-[11px] text-muted-foreground">
                          {post.readingTime}
                        </span>
                      </div>
                    </div>

                    {/* Right Content Column: Title, Excerpt, Tags */}
                    <div className="md:col-span-9 space-y-3">
                      <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground group-hover:text-accent transition-colors leading-snug">
                        {isMedium && post.canonicalUrl ? (
                          <a
                            href={post.canonicalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-baseline gap-2"
                          >
                            <span>{post.title}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-accent inline" />
                          </a>
                        ) : (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-baseline gap-2"
                          >
                            <span>{post.title}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-accent inline" />
                          </Link>
                        )}
                      </h2>

                      <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="font-mono text-[11px] px-2 py-0.5 border border-border/70 bg-background hover:border-accent hover:text-accent text-muted-foreground transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
