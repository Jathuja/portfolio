"use client";
import { useState, useMemo } from "react";

import { motion, useReducedMotion } from "framer-motion";
import {
  Laptop,
  Terminal,
  Code2,
  Wrench,
  Search,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { usesCategories } from "@/data/uses";
import { UsesCategoryGroup, UsesItem } from "@/lib/types";
import { MOTION_EASE, MOTION_DURATION } from "@/lib/motion";

export function UsesContent() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case "hardware":
        return <Laptop className="w-4 h-4 text-accent" />;
      case "editor-terminal":
        return <Terminal className="w-4 h-4 text-accent" />;
      case "stack-libraries":
        return <Code2 className="w-4 h-4 text-accent" />;
      default:
        return <Wrench className="w-4 h-4 text-accent" />;
    }
  };

  const filteredCategories = useMemo(() => {
    return usesCategories
      .map((cat) => {
        if (activeCategory !== "all" && cat.key !== activeCategory) {
          return null;
        }

        const matchingItems = cat.items.filter((item) => {
          if (!searchQuery.trim()) return true;
          const query = searchQuery.toLowerCase();
          return (
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            (item.specsOrDetails && item.specsOrDetails.toLowerCase().includes(query)) ||
            (item.tag && item.tag.toLowerCase().includes(query))
          );
        });

        if (matchingItems.length === 0) return null;

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter((cat): cat is UsesCategoryGroup => cat !== null);
  }, [activeCategory, searchQuery]);

  const totalItemsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <div className="space-y-12">
      {/* ─────────────────────────────────────────────────────────────
          FILTER & SEARCH STRIP
      ───────────────────────────────────────────────────────────── */}
      <div className="border border-border/80 bg-background/60 p-4 md:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 uppercase tracking-wider ${
                activeCategory === "all"
                  ? "border-accent bg-accent text-accent-foreground font-semibold"
                  : "border-border/70 bg-muted/20 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              }`}
            >
              All Categories
            </button>

            {usesCategories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`font-mono text-xs px-3 py-1.5 border transition-all duration-200 uppercase tracking-wider flex items-center gap-1.5 ${
                  activeCategory === cat.key
                    ? "border-accent bg-accent text-accent-foreground font-semibold"
                    : "border-border/70 bg-muted/20 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                <span className="opacity-60">{cat.id}</span>
                <span>{cat.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search gear, tools, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 font-mono text-xs border border-border/80 bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Count & Reset Row */}
        <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>
            Listing <strong className="text-foreground">{totalItemsCount}</strong> tools across{" "}
            <strong className="text-foreground">{filteredCategories.length}</strong> categories
          </span>
          {(searchQuery || activeCategory !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="text-accent hover:underline uppercase text-[11px] font-medium"
            >
              [ Reset Filter ]
            </button>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CATEGORIZED USES SECTIONS
      ───────────────────────────────────────────────────────────── */}
      {filteredCategories.length === 0 ? (
        <div className="border border-dashed border-border p-12 text-center space-y-3">
          <Wrench className="w-6 h-6 text-muted-foreground mx-auto" />
          <p className="font-mono text-sm text-foreground">No matching tools or setup items found.</p>
          <p className="font-mono text-xs text-muted-foreground">
            Try adjusting your search terms or reset the active category filter.
          </p>
        </div>
      ) : (
        <div className="space-y-12 md:space-y-16">
          {filteredCategories.map((category) => (
            <motion.section
              key={category.key}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <span className="section-motif">{category.id} {"//"} {category.title}</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
                  {category.tagline}
                </p>
                <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground shrink-0">
                  {getCategoryIcon(category.key)}
                  <span>[ {category.items.length} Items ]</span>
                </div>
              </div>

              {/* Items Grid with Structured Spec Cards (Distinct from Skills tag pills) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {category.items.map((item) => (
                  <UsesCardItem key={item.id} item={item} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          COLOPHON / INSPIRATION STRIP
      ───────────────────────────────────────────────────────────── */}
      <div className="border-t border-border pt-8 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <div>
          <span>Living setup index &middot; Inspired by </span>
          <a
            href="https://uses.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline inline-flex items-center gap-0.5"
          >
            <span>uses.tech</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="text-[11px]">
          <span>Hardware & config last audited September 2026</span>
        </div>
      </div>
    </div>
  );
}

function UsesCardItem({ item }: { item: UsesItem }) {
  return (
    <div
      className={`group border p-6 flex flex-col justify-between transition-all duration-200 ${
        item.highlight
          ? "border-border/90 bg-muted/20 hover:border-accent hover:bg-accent/[0.02]"
          : "border-border/70 bg-background/50 hover:border-accent hover:bg-accent/[0.02]"
      }`}
    >
      <div className="space-y-3">
        {/* Top Header Row with Category Badge & Highlight */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold block">
              {item.category}
            </span>
            <h3 className="font-mono text-sm sm:text-base font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
              {item.name}
            </h3>
          </div>

          {item.tag && (
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-border/70 bg-background text-muted-foreground shrink-0">
              {item.tag}
            </span>
          )}
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Specs or Details Footnote */}
      {item.specsOrDetails && (
        <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between gap-2">
          <div className="font-mono text-[11px] text-foreground/80 truncate">
            <span className="text-accent mr-1 font-semibold">&rarr;</span>
            <span className="opacity-90">{item.specsOrDetails}</span>
          </div>

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent shrink-0"
              aria-label={`Link for ${item.name}`}
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
