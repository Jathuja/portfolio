"use client";
import { useState } from "react";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Briefcase, GraduationCap, Award, Sparkles, Code2 } from "lucide-react";
import { TimelineItem } from "@/lib/types";
import { MOTION_EASE, MOTION_DURATION } from "@/lib/motion";

interface TimelineProps {
  items: TimelineItem[];
}

type FilterCategory = "all" | "experience" | "education" | "certification" | "milestone";

export function Timeline({ items }: TimelineProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const getCategoryIcon = (category: TimelineItem["category"]) => {
    switch (category) {
      case "experience":
        return <Briefcase className="w-3.5 h-3.5" />;
      case "education":
        return <GraduationCap className="w-3.5 h-3.5" />;
      case "certification":
        return <Award className="w-3.5 h-3.5" />;
      case "milestone":
        return <Code2 className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryBadgeClass = (category: TimelineItem["category"]) => {
    switch (category) {
      case "experience":
        return "border-accent/30 bg-accent/5 text-accent";
      case "education":
        return "border-border bg-muted/40 text-foreground";
      case "certification":
        return "border-border bg-muted/20 text-muted-foreground";
      case "milestone":
        return "border-violet-500/30 bg-violet-500/10 text-violet-500";
      default:
        return "border-border bg-muted/20 text-muted-foreground";
    }
  };

  const filterButtons: { label: string; value: FilterCategory; count: number }[] = [
    { label: "All Milestones", value: "all", count: items.length },
    {
      label: "Experience",
      value: "experience",
      count: items.filter((i) => i.category === "experience").length,
    },
    {
      label: "Projects",
      value: "milestone",
      count: items.filter((i) => i.category === "milestone").length,
    },
    {
      label: "Education",
      value: "education",
      count: items.filter((i) => i.category === "education").length,
    },
    {
      label: "Certifications",
      value: "certification",
      count: items.filter((i) => i.category === "certification").length,
    },
  ];

  return (
    <div className="w-full">
      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-border">
        <span className="font-mono text-xs text-muted-foreground mr-2 uppercase tracking-wider hidden sm:inline-block">
          Filter Narrative:
        </span>
        {filterButtons.map((btn) => {
          const isActive = selectedCategory === btn.value;
          return (
            <button
              key={btn.value}
              onClick={() => setSelectedCategory(btn.value)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs transition-all ${
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "border border-border/80 bg-background text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              <span>{btn.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {btn.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Timeline items list */}
      <div className="relative pl-6 md:pl-10 space-y-12 before:absolute before:left-[11px] md:before:left-[15px] before:top-3 before:bottom-3 before:w-px before:bg-border">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 }}
                transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE }}
                className="group relative"
              >
                {/* Timeline node marker */}
                <div className="absolute -left-[30px] md:-left-[41px] top-1.5 flex items-center justify-center">
                  <div
                    className={`w-6 h-6 md:w-7 md:h-7 rounded-none border font-mono text-[10px] md:text-xs font-semibold flex items-center justify-center transition-colors ${
                      item.highlight
                        ? "border-accent bg-accent text-accent-foreground shadow-sm"
                        : "border-border bg-background text-muted-foreground group-hover:border-accent group-hover:text-accent"
                    }`}
                  >
                    {indexStr}
                  </div>
                </div>

                {/* Entry content card / block */}
                <div className="border border-border/80 bg-background/40 p-6 md:p-8 hover:border-accent/70 transition-all duration-300">
                  {/* Top line: Date + Category Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs md:text-sm font-semibold text-accent tracking-wide">
                        {item.date}
                      </span>
                      <span className="text-border">/</span>
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 border ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {getCategoryIcon(item.category)}
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {item.highlight && (
                      <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 border border-accent/40 text-accent bg-accent/5">
                        Key Milestone
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4">
                    <h3 className="font-display text-xl md:text-2xl font-normal text-foreground tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs md:text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Narrative description */}
                  {item.description && (
                    <p className="mt-4 text-sm md:text-base text-foreground/80 leading-relaxed max-w-3xl">
                      {item.description}
                    </p>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2.5 py-0.5 border border-border/70 bg-muted/30 text-muted-foreground group-hover:border-accent/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* External Link (if present) */}
                  {item.link && (
                    <div className="mt-5 pt-3 border-t border-border/40">
                      <a
                        href={item.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline uppercase tracking-wider font-medium"
                      >
                        <span>{item.link.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
