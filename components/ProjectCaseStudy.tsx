import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Terminal,
  Cpu,
  Sparkles,
} from "lucide-react";
import { Project } from "@/lib/types";

interface ProjectCaseStudyProps {
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
}

export function ProjectCaseStudy({
  project,
  prevProject,
  nextProject,
}: ProjectCaseStudyProps) {
  const getStatusBadge = (status?: string) => {
    const st = status || "Completed";
    const isCompleted = st.toLowerCase() === "completed";
    const isInProgress = st.toLowerCase().includes("progress");

    return (
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-3 py-1 border border-border bg-card text-foreground">
        <span
          className={`h-2 w-2 rounded-full ${
            isCompleted
              ? "bg-emerald-500"
              : isInProgress
              ? "bg-amber-500 animate-pulse"
              : "bg-muted-foreground"
          }`}
        />
        <span>STATUS: {st}</span>
      </span>
    );
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ========================================================================= */}
      {/* 1. TOP BREADCRUMB & MOTIF NAVIGATION */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors group"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects Archive</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="section-motif hidden md:inline">
            CASE STUDY // {project.slug.toUpperCase()}
          </span>
          {getStatusBadge(project.status)}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION */}
      {/* ========================================================================= */}
      <header className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold text-accent">
              INDEX // {project.year || "2024"}
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 border border-accent/40 text-accent bg-accent/10">
                <Sparkles className="h-3 w-3" />
                Featured Engineering Project
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground">
            {project.title}
          </h1>

          <p className="font-sans text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed max-w-3xl">
            {project.tagline}
          </p>
        </div>

        {/* Spec Sheet / Architectural Ledger */}
        <div className="hairline-border bg-card/60 p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
            <div className="space-y-1.5 hairline-b sm:hairline-b-0 pb-4 sm:pb-0">
              <span className="uppercase text-muted-foreground block">
                Engineering Role
              </span>
              <span className="text-foreground font-medium text-sm">
                {project.role || "Lead Full-Stack Developer"}
              </span>
            </div>

            <div className="space-y-1.5 hairline-b sm:hairline-b-0 pb-4 sm:pb-0">
              <span className="uppercase text-muted-foreground block">
                Timeline / Year
              </span>
              <span className="text-foreground font-medium text-sm">
                {project.year || "2024"}
              </span>
            </div>

            <div className="space-y-1.5 hairline-b lg:hairline-b-0 pb-4 lg:pb-0">
              <span className="uppercase text-muted-foreground block">
                Core Domain
              </span>
              <span className="text-foreground font-medium text-sm">
                {project.stack[0]} &amp; {project.stack[1] || "Systems"}
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="uppercase text-muted-foreground block">
                Repository Status
              </span>
              <span className="text-accent font-medium text-sm">
                {project.status || "Completed"}
              </span>
            </div>
          </div>

          {/* Quick Action Link Buttons */}
          <div className="flex flex-wrap items-center gap-4 hairline-t mt-6 pt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group flex items-center gap-2"
              >
                <span>Launch Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group flex items-center gap-2"
              >
                <Github className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                <span>Inspect Source Code</span>
              </a>
            )}

            {project.links?.writeup && (
              <Link
                href={project.links.writeup}
                className="btn-outline group flex items-center gap-2"
              >
                <BookOpen className="h-3.5 w-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
                <span>Read Technical Article</span>
              </Link>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Cover Image / Architectural Schematic Preview Banner */}
        {/* ========================================================================= */}
        <div className="hairline-border bg-card overflow-hidden">
          <div className="px-4 py-3 hairline-b bg-muted/30 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              <span className="text-muted-foreground">SCHEMATIC //</span>
              <span className="text-foreground font-semibold">
                {project.slug}.sys_topology.v1
              </span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-[11px] hidden sm:flex">
              <span>LAT: 40.7128° N</span>
              <span>•</span>
              <span>RENDER: SVG_CANVAS</span>
            </div>
          </div>

          <div className="p-8 sm:p-12 md:p-16 bg-background/50 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8888880a_1px,transparent_1px),linear-gradient(to_bottom,#8888880a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-6">
              <div className="inline-flex p-3 hairline-border bg-muted/40 text-accent">
                <Cpu className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
                  {project.title} Architectural Diagram
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {project.description || project.tagline}
                </p>
              </div>

              {/* Topology Nodes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {project.stack.slice(0, 6).map((tech, tIdx) => (
                  <div
                    key={tech}
                    className="hairline-border bg-card/80 p-2.5 font-mono text-xs text-left"
                  >
                    <div className="text-[10px] text-muted-foreground">
                      NODE_0{tIdx + 1}
                    </div>
                    <div className="font-semibold text-foreground truncate mt-0.5">
                      {tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. SECTION 01: THE PROBLEM & CONTEXT */}
      {/* ========================================================================= */}
      <section className="hairline-t pt-16 space-y-8" aria-labelledby="problem-heading">
        <div className="flex items-center gap-4">
          <span className="section-numeral-hero">01</span>
          <div>
            <span className="section-motif mb-1 block">THE PROBLEM STATEMENT</span>
            <h2 id="problem-heading" className="font-display text-3xl sm:text-4xl font-normal tracking-tight">
              Challenge &amp; Ecosystem Context
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 md:p-8 hairline-border bg-muted/20 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                <AlertTriangle className="h-4 w-4" />
                <span>CORE BOTTLENECK SOLVED</span>
              </div>
              <p className="font-sans text-base sm:text-lg text-foreground/90 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <p className="font-sans text-muted-foreground leading-relaxed text-base sm:text-lg">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-4 hairline-border bg-card p-6 space-y-4 font-mono text-xs">
            <div className="hairline-b pb-3 uppercase text-muted-foreground font-semibold">
              PROJECT CONSTRAINTS
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">Zero-downtime fault tolerance</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">Strict type safety &amp; validation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">Minimal network serialization overhead</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span className="text-foreground">Cross-client responsive fidelity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 02: KEY ARCHITECTURAL FEATURES */}
      {/* ========================================================================= */}
      {project.features && project.features.length > 0 && (
        <section className="hairline-t pt-16 space-y-8" aria-labelledby="features-heading">
          <div className="flex items-center gap-4">
            <span className="section-numeral-hero">02</span>
            <div>
              <span className="section-motif mb-1 block">SYSTEM CAPABILITIES</span>
              <h2 id="features-heading" className="font-display text-3xl sm:text-4xl font-normal tracking-tight">
                Key Architectural Features
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feature, fIdx) => (
              <div
                key={fIdx}
                className="hairline-border bg-card p-6 sm:p-8 space-y-4 hover:border-foreground/30 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {`02.${fIdx + 1} // CAPABILITY`}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>

                  <p className="font-sans text-base text-foreground/90 leading-relaxed font-medium">
                    {feature}
                  </p>
                </div>

                <div className="font-mono text-[11px] text-muted-foreground uppercase hairline-t pt-3 flex items-center justify-between">
                  <span>SUBSYSTEM MODULE</span>
                  <span>ACTIVE</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 5. SECTION 03: CHALLENGES & ENGINEERING SOLUTIONS (DIFFERENTIATOR SECTION!) */}
      {/* ========================================================================= */}
      {(project.challenge || project.solution) && (
        <section className="hairline-t pt-16 space-y-8" aria-labelledby="challenges-heading">
          <div className="flex items-center gap-4">
            <span className="section-numeral-hero">03</span>
            <div>
              <span className="section-motif mb-1 block">CRITICAL DIFFERENTIATOR</span>
              <h2 id="challenges-heading" className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-accent">
                Challenges &amp; Engineering Solutions
              </h2>
            </div>
          </div>

          {/* High visual weight featured case study card */}
          <div className="border-2 border-foreground/20 bg-card p-6 sm:p-10 md:p-12 space-y-8 relative overflow-hidden shadow-sm">
            {/* Top Tag Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 bg-accent" />
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-foreground uppercase">
                  HIGH-CONCURRENCY ARCHITECTURAL TRADE-OFF
                </span>
              </div>
              <span className="font-mono text-xs text-accent">
                VERIFIED PRODUCTION RESOLUTION
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: The Engineering Challenge / Bottleneck */}
              <div className="lg:col-span-6 hairline-border bg-muted/30 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-destructive font-mono text-xs uppercase font-semibold">
                    <AlertTriangle className="h-4 w-4" />
                    <span>The Bottleneck / Obstacle</span>
                  </div>
                  <h4 className="font-display text-xl font-normal text-foreground">
                    System Failure Mode Under Peak Load
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="font-mono text-[11px] text-muted-foreground uppercase hairline-t pt-3">
                  RISK: RACE CONDITIONS &amp; UI FREEZES
                </div>
              </div>

              {/* Right: The Engineered Solution & Implementation */}
              <div className="lg:col-span-6 border border-accent/40 bg-accent/5 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase font-semibold">
                    <Zap className="h-4 w-4" />
                    <span>The Engineered Solution</span>
                  </div>
                  <h4 className="font-display text-xl font-normal text-foreground">
                    Architectural Strategy &amp; Resolution
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {project.solution ||
                      "Architected asynchronous pipeline isolations with deterministic locking and client-side delta streaming to resolve race conditions."}
                  </p>
                </div>

                <div className="font-mono text-[11px] text-accent uppercase hairline-t border-accent/30 pt-3 flex items-center justify-between">
                  <span>OUTCOME: 100% DETERMINISTIC</span>
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>

            {/* Architecture Notes Callout */}
            {project.architectureNotes && (
              <div className="hairline-t pt-6">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  ARCHITECTURAL TOPOLOGY NOTES:
                </div>
                <p className="font-sans text-sm text-foreground/80 leading-relaxed">
                  {project.architectureNotes}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. SECTION 04: METRICS & PERFORMANCE BENCHMARKS */}
      {/* ========================================================================= */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="hairline-t pt-16 space-y-8" aria-labelledby="metrics-heading">
          <div className="flex items-center gap-4">
            <span className="section-numeral-hero">04</span>
            <div>
              <span className="section-motif mb-1 block">QUANTITATIVE RESULTS</span>
              <h2 id="metrics-heading" className="font-display text-3xl sm:text-4xl font-normal tracking-tight">
                Performance &amp; Benchmarks
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {project.metrics.map((metric, mIdx) => (
              <div
                key={mIdx}
                className="hairline-border bg-card p-6 sm:p-8 space-y-3 text-center"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </div>
                <div className="font-mono text-4xl sm:text-5xl font-bold text-accent">
                  {metric.value}
                </div>
                <div className="font-mono text-[11px] text-muted-foreground">
                  VERIFIED IN BENCHMARK SUITE
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 7. SECTION 05: TECH STACK SPECIFICATION */}
      {/* ========================================================================= */}
      <section className="hairline-t pt-16 space-y-8" aria-labelledby="stack-heading">
        <div className="flex items-center gap-4">
          <span className="section-numeral-hero">05</span>
          <div>
            <span className="section-motif mb-1 block">SPECIFICATION</span>
            <h2 id="stack-heading" className="font-display text-3xl sm:text-4xl font-normal tracking-tight">
              Tech Stack Composition
            </h2>
          </div>
        </div>

        <div className="hairline-border bg-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap gap-2.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="tag-mono text-sm py-1.5 px-3 bg-background"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="font-sans text-xs text-muted-foreground leading-relaxed hairline-t pt-4">
            Components and modules engineered strictly with type safety, minimal dependency footprints,
            and production-grade build pipelines.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SECTION 06: EXTERNAL LINKS & VERIFICATION */}
      {/* ========================================================================= */}
      <section className="hairline-t pt-16 space-y-8" aria-labelledby="links-heading">
        <div className="flex items-center gap-4">
          <span className="section-numeral-hero">06</span>
          <div>
            <span className="section-motif mb-1 block">DEPLOYMENT &amp; ARTIFACTS</span>
            <h2 id="links-heading" className="font-display text-3xl sm:text-4xl font-normal tracking-tight">
              Links &amp; Source Verification
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline-border bg-card p-6 space-y-4 group hover:border-foreground/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-accent font-semibold">
                  LIVE SERVICE
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display text-xl font-normal text-foreground">
                Interactive Demo
              </h3>
              <p className="font-sans text-xs text-muted-foreground">
                Experience the application in production with live cloud endpoints.
              </p>
            </a>
          ) : (
            <div className="hairline-border bg-muted/20 p-6 space-y-4 opacity-60">
              <span className="font-mono text-xs uppercase text-muted-foreground">
                LIVE DEMO
              </span>
              <h3 className="font-display text-xl font-normal text-muted-foreground">
                Local Cluster Only
              </h3>
              <p className="font-sans text-xs text-muted-foreground">
                Self-hosted daemon requiring local container setup.
              </p>
            </div>
          )}

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline-border bg-card p-6 space-y-4 group hover:border-foreground/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-accent font-semibold">
                  SOURCE CODE
                </span>
                <Github className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display text-xl font-normal text-foreground">
                GitHub Repository
              </h3>
              <p className="font-sans text-xs text-muted-foreground">
                Inspect commit history, test suites, architecture schemas, and Docker configs.
              </p>
            </a>
          ) : (
            <div className="hairline-border bg-muted/20 p-6 space-y-4 opacity-60">
              <span className="font-mono text-xs uppercase text-muted-foreground">
                SOURCE
              </span>
              <h3 className="font-display text-xl font-normal text-muted-foreground">
                Private Repository
              </h3>
              <p className="font-sans text-xs text-muted-foreground">
                Proprietary client repository; architecture specs available on request.
              </p>
            </div>
          )}

          {project.links?.writeup ? (
            <Link
              href={project.links.writeup}
              className="hairline-border bg-card p-6 space-y-4 group hover:border-foreground/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-accent font-semibold">
                  WRITE-UP
                </span>
                <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display text-xl font-normal text-foreground">
                Engineering Post
              </h3>
              <p className="font-sans text-xs text-muted-foreground">
                Read deep-dive design documentation and architectural retrospective.
              </p>
            </Link>
          ) : (
            <div className="hairline-border bg-muted/20 p-6 space-y-4 opacity-60">
              <span className="font-mono text-xs uppercase text-muted-foreground">
                ARTICLE
              </span>
              <h3 className="font-display text-xl font-normal text-muted-foreground">
                Writeup In Progress
              </h3>
              <p className="font-sans text-xs text-muted-foreground">
                Technical blog article currently undergoing editorial review.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. BOTTOM PREV / NEXT NAVIGATION */}
      {/* ========================================================================= */}
      <nav className="hairline-t pt-12" aria-label="Project Navigation">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="hairline-border bg-card p-6 space-y-2 group hover:border-foreground/40 transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                <span>PREVIOUS CASE STUDY</span>
              </div>
              <div className="font-display text-xl font-normal text-foreground group-hover:text-accent transition-colors">
                {prevProject.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="hairline-border bg-card p-6 space-y-2 text-right group hover:border-foreground/40 transition-colors sm:col-start-2"
            >
              <div className="flex items-center justify-end gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <span>NEXT CASE STUDY</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="font-display text-xl font-normal text-foreground group-hover:text-accent transition-colors">
                {nextProject.title}
              </div>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
