import Link from "next/link";
import { ArrowLeft, Terminal, FolderGit2, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Route Not Found",
  description: "The requested route does not exist in memory or was relocated.",
  robots: { index: false, follow: false },
};


export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-16rem)] flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-8">
        {/* Section Motif */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-widest text-accent uppercase">
            FAULT // 404_ROUTE_NOT_FOUND
          </span>
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-muted-foreground uppercase">
            STATUS: 0x194
          </span>
        </div>

        {/* Swiss Big Numeral & Heading */}
        <div className="space-y-3">
          <div className="font-mono text-7xl font-light tracking-tighter text-foreground sm:text-8xl md:text-9xl leading-none select-none">
            4<span className="text-accent">0</span>4
          </div>
          <h1 className="font-display text-3xl font-normal tracking-tight sm:text-4xl text-foreground">
            Null pointer in routing table.
          </h1>
          <p className="font-sans text-base text-muted-foreground leading-relaxed sm:text-lg">
            The endpoint you requested does not map to any active handler or was
            garbage-collected into the void.
          </p>
        </div>

        {/* Terminal Diagnostic Box */}
        <div className="border border-border bg-card/60 p-4 sm:p-5 font-mono text-xs text-muted-foreground shadow-none">
          <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-2">
            <div className="flex items-center gap-2 text-foreground font-medium">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              <span>route_debugger.sh</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              DIAGNOSTIC OUTPUT
            </span>
          </div>

          <div className="space-y-1.5 overflow-x-auto text-[11px] sm:text-xs">
            <div className="text-foreground">
              <span className="text-accent">$</span> probe --status --path=CURRENT_ROUTE
            </div>
            <div className="text-destructive font-mono">
              [ERROR 404]: Target uri dereferenced null pointer at memory::cluster
            </div>
            <div>[INFO]: Page resolution returned 0 valid byte sequences.</div>
            <div className="text-muted-foreground/80">
              [HINT]: Re-route execution flow back to valid root coordinates.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/" className="btn-primary gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Base</span>
          </Link>

          <Link href="/projects" className="btn-outline gap-2">
            <FolderGit2 className="h-4 w-4 text-accent" />
            <span>Explore Projects</span>
          </Link>

          <Link href="/blog" className="btn-outline gap-2">
            <BookOpen className="h-4 w-4 text-accent" />
            <span>Read Articles</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
