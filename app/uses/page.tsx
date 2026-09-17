import type { Metadata } from "next";
import { UsesContent } from "@/components/UsesContent";

const description =
  "A detailed breakdown of hardware, development environment, typography, editor configs, frameworks, and daily utilities.";

export const metadata: Metadata = {
  title: "Uses",
  description,
  twitter: {
    card: "summary",
    title: "Uses | Jathuja",
    description,
  },
};

export default function UsesPage() {
  return (
    <main className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
      <div className="space-y-12 md:space-y-16">
        {/* ─────────────────────────────────────────────────────────────
            HEADER & MOTIF
        ───────────────────────────────────────────────────────────── */}
        <section className="relative pt-4">
          {/* Swiss Numeral Watermark */}
          <div className="absolute right-0 top-0 section-numeral-hero -z-10 pointer-events-none opacity-40">
            08
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="section-motif">08 — WORKSPACE & ARSENAL</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
              Gear, Setup & <span className="italic text-accent">Developer Tooling</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
              A comprehensive inventory of the physical machines, terminal configurations,
              typefaces, production frameworks, and productivity tools powering my daily workflow.
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            USES CONTENT SECTION
        ───────────────────────────────────────────────────────────── */}
        <section>
          <UsesContent />
        </section>
      </div>
    </main>
  );
}
