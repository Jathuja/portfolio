"use client";
import { useState } from "react";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Mail,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { projects } from "@/data/projects";
import { recentPosts } from "@/data/posts";
import { ProfileImage } from "@/components/ProfileImage";

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const rawEmail = siteConfig.links.email.replace("mailto:", "");

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 3 Featured Projects
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  // Categorized Skills for the Quick Snapshot Strip
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Java", "Python", "TypeScript", "JavaScript", "Dart", "C", "C++", "PHP"],
      description: "Core programming languages for application and systems development.",
    },
    {
      title: "Frontend",
      skills: ["React", "Angular", "Tailwind CSS", "HTML5", "CSS3", "PrimeNG", "RxJS"],
      description: "Modern component-driven web interfaces and responsive styling.",
    },
    {
      title: "Backend",
      skills: ["Spring Boot", "FastAPI", "Node.js", "Express.js", "REST APIs", "WebSockets"],
      description: "Robust backend services, RESTful APIs, and real-time communication.",
    },
    {
      title: "Mobile",
      skills: ["Flutter", "Dart", "Provider", "Secure Local Storage"],
      description: "Cross-platform mobile applications for iOS and Android.",
    },
    {
      title: "Databases & Storage",
      skills: ["PostgreSQL", "MySQL", "MS SQL Server", "MongoDB", "ChromaDB", "Supabase"],
      description: "Relational databases, document stores, and vector embeddings.",
    },
    {
      title: "AI",
      skills: ["LangChain", "RAG", "LLM Integration", "Vector Databases"],
      description: "Applied AI, retrieval pipelines, and LLM integrations.",
    },
    {
      title: "Tools",
      skills: ["Git", "GitHub", "Postman", "Android Studio", "VS Code", "Agile Methodology"],
      description: "Version control, developer tools, API testing, and agile workflows.",
    },
  ];

  // Motion variants respecting reduced-motion
  const sectionVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <main className="min-h-screen text-foreground transition-colors duration-200">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="relative isolate w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-12 md:py-20"
        aria-label="Introduction & Hero"
      >
        {/* Giant Swiss Numeral Watermark */}
        <div className="absolute right-8 sm:right-12 lg:right-16 top-2 section-numeral-hero pointer-events-none select-none z-0 opacity-40">
          01
        </div>

        {/* Editorial Subhead Motif */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 mb-8 flex items-center gap-4"
        >
          <span className="section-motif inline-flex items-center gap-2">
            <span>01</span>
            <span className="text-accent">—</span>
            <span>INTRODUCTION</span>
          </span>
          <div className="h-px flex-1 bg-border" />
        </motion.div>

        {/* Hero Grid Container */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12 w-full">
          {/* Left: Strong Typography & Highlights */}
          <div className="space-y-6 lg:col-span-7 xl:col-span-7">
            {/* Main Typographic Display Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl font-normal leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
            >
              Hello, I&apos;m{" "}
              <span className="text-accent underline decoration-border decoration-1 underline-offset-8">
                {siteConfig.name}
              </span>
              .
            </motion.h1>

            {/* Seeking Internship Subtitle */}
            <motion.p
              variants={itemVariants}
              className="font-display text-xl font-light italic leading-snug text-foreground/90 md:text-2xl"
            >
              Seeking a Software Engineering Internship.
            </motion.p>

            {/* 2-Sentence Short Intro */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              Third-year Information Technology undergraduate at the University of
              Moratuwa, interested in software engineering and full-stack development.
              I enjoy building practical web applications, APIs, and software
              projects while continuously learning new technologies.
            </motion.p>

            {/* 2 CTA Links + Status Tag */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                href="#featured-projects"
                className="btn-primary group flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/resume"
                className="btn-outline group flex items-center gap-2"
              >
                <Download className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
                <span>Download Resume</span>
              </Link>

              <div className="tag-mono hidden sm:inline-flex">
                <span className="h-1.5 w-1.5 bg-accent" />
                <span>SEEKING SOFTWARE ENGINEERING INTERNSHIPS</span>
              </div>
            </motion.div>

            {/* Highlights Strip — Fills lower space naturally */}
            <motion.div
              variants={itemVariants}
              className="pt-6 hairline-t grid grid-cols-1 sm:grid-cols-3 gap-3.5"
            >
              <div className="hairline-border bg-muted/20 p-5 space-y-2 transition-colors hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    01 // ACADEMICS
                  </span>
                  <span className="font-mono text-sm font-semibold text-accent">
                    CGPA 3.30
                  </span>
                </div>
                <p className="font-display text-lg font-normal text-foreground leading-snug">
                  University of Moratuwa
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-normal">
                  3rd-Year BSc (Hons) Information Technology
                </p>
              </div>

              <div className="hairline-border bg-muted/20 p-5 space-y-2 transition-colors hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    02 // BUILDS
                  </span>
                  <span className="font-mono text-sm font-semibold text-accent">
                    3 Projects
                  </span>
                </div>
                <p className="font-display text-lg font-normal text-foreground leading-snug">
                  Web, Mobile & AI
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-normal">
                  Spring Boot, React, FastAPI, Flutter
                </p>
              </div>

              <div className="hairline-border bg-muted/20 p-5 space-y-2 transition-colors hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    03 // STATUS
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-500 font-semibold uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open
                  </span>
                </div>
                <p className="font-display text-lg font-normal text-foreground leading-snug">
                  Seeking Internship
                </p>
                <p className="font-sans text-sm text-muted-foreground leading-normal">
                  Available · Colombo / Remote / Hybrid
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Profile Photo + Architectural Spec Sheet */}
          <div className="space-y-4 lg:col-span-5 xl:col-span-5">
            {/* Profile Photo Card */}
            <ProfileImage variant="hero" />

            {/* Profile Overview Card */}
            <motion.div
              variants={itemVariants}
              className="hairline-border space-y-4 bg-muted/20 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between hairline-b pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  PROFILE OVERVIEW
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-start justify-between hairline-b pb-2.5 gap-4">
                  <span className="uppercase text-muted-foreground shrink-0">
                    Education
                  </span>
                  <div className="text-right font-medium text-foreground">
                    <div>BSc (Hons) Information Technology</div>
                    <div className="text-muted-foreground font-normal">University of Moratuwa</div>
                  </div>
                </div>
                <div className="flex items-center justify-between hairline-b pb-2.5 gap-4">
                  <span className="uppercase text-muted-foreground shrink-0">
                    Primary Focus
                  </span>
                  <span className="text-right font-medium text-foreground">
                    Software Engineering / Full-Stack Development
                  </span>
                </div>
                <div className="flex items-center justify-between hairline-b pb-2.5 gap-4">
                  <span className="uppercase text-muted-foreground shrink-0">
                    Core Stack
                  </span>
                  <span className="text-right font-medium text-accent">
                    Java / Spring Boot / React / TypeScript / PostgreSQL
                  </span>
                </div>
                <div className="flex items-center justify-between hairline-b pb-2.5 gap-4">
                  <span className="uppercase text-muted-foreground shrink-0">
                    Mobile
                  </span>
                  <span className="text-right font-medium text-foreground">
                    Flutter / Dart
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="uppercase text-muted-foreground shrink-0">Status</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground text-right">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                    Seeking Software Engineering Internship
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 2. FEATURED PROJECTS SECTION (01) */}
      {/* ========================================================================= */}
      <motion.section
        id="featured-projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionVariants}
        className="hairline-t py-20"
        aria-label="Featured Projects"
      >
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-20">
          {/* Section Header with oversized Swiss Numeral */}
          <motion.div
            variants={itemVariants}
            className="mb-16 grid grid-cols-1 items-end gap-6 md:grid-cols-12"
          >
            <div className="flex items-baseline gap-6 md:col-span-8">
              <span className="section-numeral-hero">01</span>
              <div>
                <span className="section-motif mb-1 block">SELECTED WORK</span>
                <h2 className="font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                  Featured Projects
                </h2>
              </div>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
              >
                <span>View All Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Asymmetric Project List */}
          <div className="space-y-10">
            {featuredProjects.map((project, idx) => (
              <motion.article
                key={project.slug}
                variants={itemVariants}
                className="group hairline-border bg-card p-6 transition-all hover:border-foreground/30 sm:p-8 md:p-10"
              >
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                  {/* Left Column: Index, Role & Metrics */}
                  <div className="space-y-4 lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-accent">
                        {`0${idx + 1} //`}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {project.role || "Lead Developer"}
                      </span>
                      {project.year && (
                        <span className="font-mono text-xs text-muted-foreground/60">
                          / {project.year}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl font-normal transition-colors group-hover:text-accent sm:text-3xl">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2.5 pt-2">
                        {project.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="hairline-border bg-muted/20 p-2.5"
                          >
                            <div className="font-mono text-[11px] uppercase text-muted-foreground">
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

                  {/* Right Column: Tagline, Problem & Tech Stack */}
                  <div className="flex h-full flex-col justify-between space-y-6 lg:col-span-8">
                    <div className="space-y-3">
                      <p className="font-sans text-base font-medium leading-snug text-foreground/90 sm:text-lg">
                        {project.tagline}
                      </p>
                      <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {project.problem || project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="tag-mono">
                            {tech}
                          </span>
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
                            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
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
                            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <span>Source</span>
                            <Github className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 3. QUICK SKILLS SNAPSHOT SECTION (02) */}
      {/* ========================================================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionVariants}
        className="hairline-t py-20"
        aria-label="Skills & Technologies"
      >
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-20">
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="mb-16 grid grid-cols-1 items-end gap-6 md:grid-cols-12"
          >
            <div className="flex items-baseline gap-6 md:col-span-8">
              <span className="section-numeral-hero">02</span>
              <div>
                <span className="section-motif mb-1 block">
                  SKILLS & TECHNOLOGIES
                </span>
                <h2 className="font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                  Skills & Technologies
                </h2>
              </div>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
              >
                <span>Detailed Background</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Categorized Skills Asymmetric Grid */}
          <div className="hairline-border grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                variants={itemVariants}
                className="group flex flex-col justify-between space-y-6 bg-background p-6 transition-colors hover:bg-muted/15 sm:p-8"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {`0${idx + 1} //`}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {cat.skills.length} STACK ITEMS
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-normal text-foreground transition-colors group-hover:text-accent">
                    {cat.title}
                  </h3>

                  <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 hairline-t pt-4">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tag-mono text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 4. LATEST WRITING SECTION (03) */}
      {/* ========================================================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionVariants}
        className="hairline-t py-20"
        aria-label="Latest Writing"
      >
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-20">
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="mb-16 grid grid-cols-1 items-end gap-6 md:grid-cols-12"
          >
            <div className="flex items-baseline gap-6 md:col-span-8">
              <span className="section-numeral-hero">03</span>
              <div>
                <span className="section-motif mb-1 block">
                  LATEST WRITING
                </span>
                <h2 className="font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
                  Latest Writing
                </h2>
              </div>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
              >
                <span>All Publications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Editorial Article Rows */}
          <div className="hairline-border divide-y divide-border bg-card">
            {recentPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                variants={itemVariants}
                className="group p-6 transition-colors hover:bg-muted/30 sm:p-8"
              >
                <div className="grid grid-cols-1 items-baseline gap-6 md:grid-cols-12">
                  {/* Meta: Index, Date, Source Badge */}
                  <div className="space-y-2.5 md:col-span-3">
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="font-semibold text-accent">
                        {`0${idx + 1}`}
                      </span>
                      <span className="text-muted-foreground">{post.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
                          post.source === "medium"
                            ? "border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "border border-border bg-muted/40 text-muted-foreground"
                        }`}
                      >
                        {post.source === "medium" ? "Medium ↗" : "Native Post"}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {post.readingTime}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3 md:col-span-9">
                    <h3 className="font-display text-xl font-normal text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                      {post.source === "medium" && post.url ? (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          <span>{post.title}</span>
                          <ArrowUpRight className="h-4 w-4 opacity-70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </a>
                      ) : (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2"
                        >
                          <span>{post.title}</span>
                          <ArrowUpRight className="h-4 w-4 opacity-70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </Link>
                      )}
                    </h3>

                    <p className="max-w-3xl font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-border/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground/80"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 5. CLOSING CTA SECTION (04) */}
      {/* ========================================================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={sectionVariants}
        className="hairline-t py-20 md:py-28"
        aria-label="Contact Invitation"
      >
        <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-20">
          <div className="hairline-border relative overflow-hidden bg-muted/15 p-8 sm:p-12 md:p-16">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              {/* Left: Headline & Actions */}
              <div className="space-y-6 lg:col-span-8">
                <div className="flex items-center gap-4">
                  <span className="section-motif">
                    04 — GET IN TOUCH
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <h2 className="font-display text-3xl font-normal leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
                  Looking for a Software Engineering Intern?
                </h2>

                <p className="max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg">
                  I am currently looking for a Software Engineering Internship where I can apply my technical skills, gain industry experience, and continue learning from experienced developers.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <a
                    href={siteConfig.links.email}
                    className="btn-primary group flex items-center gap-2"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send Email</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="btn-outline flex items-center gap-2"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-accent" />
                        <span>Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <Link
                    href="/resume"
                    className="btn-outline flex items-center gap-2"
                  >
                    <Download className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-accent" />
                    <span>Resume</span>
                  </Link>

                  <Link
                    href="/contact"
                    className="font-mono text-xs uppercase tracking-wider text-muted-foreground underline underline-offset-4 transition-colors hover:text-accent"
                  >
                    Contact page →
                  </Link>
                </div>
              </div>

              {/* Right: Direct Reach Ledger */}
              <div className="hairline-border space-y-4 bg-background p-6 lg:col-span-4">
                <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground hairline-b pb-3">
                  DIRECT CHANNELS
                </span>

                <div className="space-y-2.5 font-mono text-xs">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hairline-border flex items-center justify-between p-2.5 transition-colors hover:border-accent"
                  >
                    <span className="text-foreground">GitHub</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>

                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hairline-border flex items-center justify-between p-2.5 transition-colors hover:border-accent"
                  >
                    <span className="text-foreground">LinkedIn</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>

                  <a
                    href={siteConfig.links.email}
                    className="hairline-border flex items-center justify-between p-2.5 transition-colors hover:border-accent"
                  >
                    <span className="text-foreground">Email</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>

                  <Link
                    href="/resume"
                    className="hairline-border flex items-center justify-between p-2.5 transition-colors hover:border-accent"
                  >
                    <span className="text-foreground">Resume</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
