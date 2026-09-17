import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { siteConfig } from "@/lib/config";

const title = "Projects";
const description =
  "A selection of university, personal, and team software projects by Jathuja Sithamparanathan, demonstrating experience in full-stack development, mobile development, APIs, and databases.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
  openGraph: {
    title: `${title} | ${siteConfig.name}`,
    description,
    type: "website",
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=projects`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${siteConfig.name}`,
    description,
    images: [
      `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=projects`,
    ],
  },
};

export default function ProjectsPage() {
  return (
    <main className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-16 md:py-24 space-y-12">
      {/* ========================================================================= */}
      {/* PAGE HEADER */}
      {/* ========================================================================= */}
      <header className="relative space-y-6">
        {/* Giant Swiss Numeral Watermark */}
        <div className="absolute right-0 top-0 section-numeral-hero -z-10 pointer-events-none opacity-40">
          02
        </div>

        <div className="flex items-center gap-4">
          <span className="section-motif inline-flex items-center gap-2">
            <span>02</span>
            <span className="text-accent">—</span>
            <span>PROJECTS</span>
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-4xl">
          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground">
              Projects
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
              A selection of university, personal, and team software projects that demonstrate my
              experience in full-stack development, mobile development, APIs, databases, and
              AI-integrated applications.
            </p>
          </div>

          <div className="shrink-0 pb-1">
            <span className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-border bg-muted/40 text-foreground">
              <span className="h-1.5 w-1.5 bg-accent" />
              <span>TOTAL: {projects.length} PROJECTS</span>
            </span>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* FILTERABLE PROJECTS GRID */}
      {/* ========================================================================= */}
      <ProjectsGrid projects={projects} />
    </main>
  );
}
