"use client";
import { useState, useMemo } from "react";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  X,
  ArrowUpRight,
  Github,
  ExternalLink,
  BookOpen,
  Filter,
  Layers,
  Sparkles,
} from "lucide-react";
import { Project } from "@/lib/types";
import { MOTION_EASE, MOTION_DURATION } from "@/lib/motion";

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract all unique tech stack tags across all projects
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => {
      p.stack.forEach((tech) => tagSet.add(tech));
    });
    return ["All", ...Array.from(tagSet).sort()];
  }, [projects]);

  // Extract all unique statuses
  const allStatuses = useMemo(() => {
    const statusSet = new Set<string>();
    projects.forEach((p) => {
      if (p.status) statusSet.add(p.status);
    });
    return ["All", ...Array.from(statusSet).sort()];
  }, [projects]);

  // Filter projects based on search query, selected tag, and selected status
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTag =
        selectedTag === "All" ||
        project.stack.some(
          (t) => t.toLowerCase() === selectedTag.toLowerCase()
        );

      const matchesStatus =
        selectedStatus === "All" ||
        project.status?.toLowerCase() === selectedStatus.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        project.title.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        (project.description && project.description.toLowerCase().includes(query)) ||
        (project.problem && project.problem.toLowerCase().includes(query)) ||
        project.stack.some((t) => t.toLowerCase().includes(query)) ||
        (project.role && project.role.toLowerCase().includes(query));

      return matchesTag && matchesStatus && matchesSearch;
    });
  }, [projects, selectedTag, selectedStatus, searchQuery]);

  const hasActiveFilters =
    selectedTag !== "All" || selectedStatus !== "All" || searchQuery !== "";

  const handleResetFilters = () => {
    setSelectedTag("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  const getStatusBadge = (status?: string) => {
    const st = status || "Completed";
    const isCompleted = st.toLowerCase() === "completed";
    const isInProgress = st.toLowerCase().includes("progress");

    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 border border-border bg-muted/40 text-foreground">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isCompleted
              ? "bg-emerald-500"
              : isInProgress
              ? "bg-amber-500 animate-pulse"
              : "bg-muted-foreground"
          }`}
        />
        <span>{st}</span>
      </span>
    );
  };

  return (
    <div className="space-y-12">
      {/* ========================================================================= */}
      {/* 1. FILTER & SEARCH CONTROL CONSOLE */}
      {/* ========================================================================= */}
      <div className="hairline-border bg-card/60 p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 hairline-b pb-6">
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-accent" />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              FILTER CONTROLS
            </span>
            <span className="text-border">|</span>
            <span className="font-mono text-xs font-semibold text-accent">
              [ {filteredProjects.length} / {projects.length} PROJECTS MATCHED ]
            </span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-accent transition-colors self-start md:self-auto"
            >
              <X className="h-3.5 w-3.5" />
              <span>RESET FILTERS</span>
            </button>
          )}
        </div>

        {/* Search Bar & Status Filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="relative md:col-span-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, stack, or keywords..."
              className="w-full bg-background hairline-border pl-10 pr-4 py-2.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search query"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="md:col-span-4 flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase text-muted-foreground hidden lg:inline">
              Status:
            </span>
            <div className="flex-1 flex hairline-border bg-background p-0.5">
              {allStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex-1 py-1.5 px-2 font-mono text-[11px] uppercase tracking-wider text-center transition-colors ${
                    selectedStatus === status
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack Pills Filter */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Filter by Technology:
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {allTags.map((tag) => {
              const isSelected = selectedTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`font-mono text-xs px-3 py-1 hairline-border transition-all ${
                    isSelected
                      ? "bg-foreground text-background font-semibold border-foreground"
                      : "bg-background/80 text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PROJECT LIST / ASYMMETRIC GRID */}
      {/* ========================================================================= */}
      {filteredProjects.length === 0 ? (
        <div className="hairline-border bg-card/40 p-12 text-center space-y-4">
          <div className="font-mono text-xs uppercase tracking-wider text-accent">
            NO MATCHING PROJECTS
          </div>
          <h3 className="font-display text-2xl font-normal text-foreground">
            No projects found matching the current criteria.
          </h3>
          <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your search query or reset the technology filters to view all projects.
          </p>
          <button
            onClick={handleResetFilters}
            className="btn-outline inline-flex items-center gap-2 mt-2"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -16 }}
                transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE }}
                className="group hairline-border bg-card p-6 sm:p-8 md:p-10 transition-all hover:border-foreground/30"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Index, Role, Year & Status & Metrics */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-accent">
                        {`0${idx + 1} //`}
                      </span>
                      {project.year && (
                        <span className="font-mono text-xs text-muted-foreground">
                          {project.year}
                        </span>
                      )}
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 border border-accent/40 text-accent bg-accent/10">
                          <Sparkles className="h-2.5 w-2.5" />
                          FEATURED
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {project.role || "Lead Developer"}
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground group-hover:text-accent transition-colors">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>
                    </div>

                    <div className="pt-1">{getStatusBadge(project.status)}</div>

                    {/* Metrics Bar */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 pt-3">
                        {project.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="hairline-border bg-muted/20 p-2.5"
                          >
                            <div className="font-mono text-[10px] uppercase text-muted-foreground">
                              {m.label}
                            </div>
                            <div className="mt-0.5 font-mono text-xs font-semibold text-foreground">
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Tagline, Problem Description, Stack & Actions */}
                  <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-3">
                      <p className="font-sans text-base sm:text-lg font-medium leading-snug text-foreground/90">
                        {project.tagline}
                      </p>
                      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                        {project.problem || project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {/* Tech Stack Tags with click-to-filter */}
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <button
                            key={tech}
                            onClick={() => setSelectedTag(tech)}
                            title={`Filter by ${tech}`}
                            className={`tag-mono text-left cursor-pointer transition-colors ${
                              selectedTag.toLowerCase() === tech.toLowerCase()
                                ? "border-accent bg-accent/15 text-accent font-semibold"
                                : "hover:border-accent"
                            }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-5 hairline-t pt-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent underline-offset-4 hover:underline"
                        >
                          <span>Read Case Study</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <span>Source</span>
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {project.links?.writeup && (
                          <Link
                            href={project.links.writeup}
                            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <span>Architecture Post</span>
                            <BookOpen className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
