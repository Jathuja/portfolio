"use client";

import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Terminal, Search } from "lucide-react";
import { skillCategories as defaultCategories } from "@/data/skills";
import { SkillCategoryGroup, SkillItem } from "@/lib/types";
import { MOTION_EASE, MOTION_DURATION } from "@/lib/motion";

interface SkillsProps {
  categories?: SkillCategoryGroup[];
  showHeading?: boolean;
  headingMotif?: string;
  headingTitle?: string;
  headingSubtitle?: string;
  filterEnabled?: boolean;
  className?: string;
}

export function Skills({
  categories = defaultCategories,
  showHeading = false,
  headingMotif = "03 — TECHNICAL ARSENAL",
  headingTitle = "Skills & Applied Capabilities",
  headingSubtitle = "A transparent breakdown of production frameworks, languages, systems tooling, and collaborative practices. No arbitrary percentage meters — only tested experience.",
  filterEnabled = true,
  className = "",
}: SkillsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [highlightedOnly, setHighlightedOnly] = useState<boolean>(false);


  // Filter categories and skills based on search and active tab
  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => {
        // Filter by category key if not "all"
        if (activeCategory !== "all" && cat.key !== activeCategory) {
          return null;
        }

        // Filter skills within category
        const filteredSkills = cat.skills.filter((skill) => {
          const matchesSearch =
            searchQuery.trim() === "" ||
            skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (skill.descriptor &&
              skill.descriptor.toLowerCase().includes(searchQuery.toLowerCase()));

          const matchesHighlight = !highlightedOnly || skill.highlighted;

          return matchesSearch && matchesHighlight;
        });

        if (filteredSkills.length === 0) return null;

        return {
          ...cat,
          skills: filteredSkills,
        };
      })
      .filter((cat): cat is SkillCategoryGroup => cat !== null);
  }, [categories, activeCategory, searchQuery, highlightedOnly]);

  // Total count of all filtered skills
  const totalSkillsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [filteredCategories]);

  return (
    <div className={`space-y-10 ${className}`}>
      {/* Optional Top Section Heading */}
      {showHeading && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="section-motif">{headingMotif}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
                {headingTitle}
              </h2>
              {headingSubtitle && (
                <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl">
                  {headingSubtitle}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>[ {categories.length} DOMAINS // {defaultCategories.reduce((acc, c) => acc + c.skills.length, 0)} TOTAL CAPABILITIES ]</span>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      {filterEnabled && (
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
                All Domains
              </button>

              {categories.map((cat) => (
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

            {/* Search & Highlight Toggle */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 font-mono text-xs border border-border/80 bg-background text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent"
                />
              </div>

              <button
                type="button"
                onClick={() => setHighlightedOnly(!highlightedOnly)}
                aria-pressed={highlightedOnly}
                className={`w-full sm:w-auto font-mono text-xs px-3 py-1.5 border transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 ${
                  highlightedOnly
                    ? "border-accent text-accent bg-accent/10 font-semibold"
                    : "border-border/80 bg-background text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <Sparkles className="w-3 h-3 text-accent" />
                <span>Key Highlights</span>
              </button>
            </div>
          </div>

          {/* Active stats line */}
          <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span>
              Showing <strong className="text-foreground">{totalSkillsCount}</strong> items across{" "}
              <strong className="text-foreground">{filteredCategories.length}</strong> categories
            </span>
            {(searchQuery || highlightedOnly || activeCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setHighlightedOnly(false);
                }}
                className="text-accent hover:underline uppercase text-[11px] font-medium"
              >
                [ Reset Filters ]
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Asymmetric Skills Layout */}
      {filteredCategories.length === 0 ? (
        <div className="border border-dashed border-border p-12 text-center space-y-3">
          <Terminal className="w-6 h-6 text-muted-foreground mx-auto" />
          <p className="font-mono text-sm text-foreground">No matching skills or technologies found.</p>
          <p className="font-mono text-xs text-muted-foreground">
            Try adjusting your search query or reset active filters.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.key}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE }}
              className="group border border-border/80 bg-background/50 hover:border-border transition-colors duration-200"
            >
              {/* Category Header Row */}
              <div className="px-6 py-4 border-b border-border/60 bg-muted/15 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-accent tracking-wider">
                    {category.id} {"//"}
                  </span>
                  <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground">
                    {category.title}
                  </h3>
                  <span className="text-border hidden sm:inline">|</span>
                  <span className="font-sans text-xs text-muted-foreground hidden md:inline truncate max-w-md">
                    {category.tagline}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto">
                  <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 border border-border/60 bg-background text-muted-foreground">
                    [ {category.skills.length} Items ]
                  </span>
                </div>
              </div>

              {/* Tag Groups Container with Asymmetric Density */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.skills.map((skill) => (
                    <SkillTagItem key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sub-component for individual skill tag with honest descriptor and accent hover state
function SkillTagItem({ skill }: { skill: SkillItem }) {
  return (
    <div
      className={`group/tag relative border p-3.5 transition-all duration-200 flex flex-col justify-between ${
        skill.highlighted
          ? "border-border/90 bg-muted/25 hover:border-accent hover:bg-accent/[0.03]"
          : "border-border/60 bg-background/40 hover:border-accent hover:bg-accent/[0.02]"
      }`}
    >
      <div className="space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <span className="font-mono text-xs font-semibold text-foreground group-hover/tag:text-accent transition-colors tracking-tight">
            {skill.name}
          </span>
          {skill.highlighted && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent mt-1 shrink-0"
              title="Key technical focus"
            />
          )}
        </div>

        {skill.descriptor && (
          <p className="font-sans text-xs text-muted-foreground leading-relaxed">
            {skill.descriptor}
          </p>
        )}
      </div>

      {/* Subtle indicator bar on bottom edge on hover */}
      <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground/80">
        <span className="uppercase tracking-widest text-[9px] text-muted-foreground/60">
          {skill.highlighted ? "Core Experience" : "Proficiency"}
        </span>
        <span className="opacity-0 group-hover/tag:opacity-100 text-accent transition-opacity">
          verified
        </span>
      </div>
    </div>
  );
}
