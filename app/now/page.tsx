import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { nowData } from "@/data/now";

const description =
  "A public declaration of what I'm focused on right now — active builds, technical learning goals, current reading list, and availability.";

export const metadata: Metadata = {
  title: "Now",
  description,
  twitter: {
    card: "summary",
    title: "Now | Jathuja",
    description,
  },
};

export default function NowPage() {
  return (
    <main className="mx-auto max-w-4xl w-full px-6 py-12 md:py-20">
      <div className="space-y-12 md:space-y-16">
        {/* ─────────────────────────────────────────────────────────────
            HEADER & WATERMARK
        ───────────────────────────────────────────────────────────── */}
        <section className="relative pt-4">
          {/* Swiss Numeral Watermark */}
          <div className="absolute right-0 top-0 section-numeral-hero -z-10 pointer-events-none opacity-40">
            07
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="section-motif">07 — ACTIVITY & DIRECTION</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
              What I&apos;m Doing <span className="italic text-accent">Now</span>
            </h1>

            {/* Last updated & location badge */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 font-mono text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5 border border-border/80 bg-muted/30 px-3 py-1 text-foreground">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Last updated: {nowData.lastUpdated}</span>
              </div>
              <span className="text-border hidden sm:inline">/</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                <span>{nowData.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            HIGH-LEVEL STATUS SYNTHESIS
        ───────────────────────────────────────────────────────────── */}
        <section className="border-l-2 border-accent pl-6 py-2">
          <p className="font-sans text-base sm:text-lg text-foreground/90 leading-relaxed">
            {nowData.statusSummary}
          </p>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            CURRENT FOCUS ITEMS (MINIMAL EDITORIAL BREAKDOWN)
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="section-motif">ACTIVE PRIORITIES</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-6">
            {nowData.focusItems.map((item) => (
              <div
                key={item.id}
                className="border border-border/80 bg-background/50 p-6 md:p-8 space-y-4 hover:border-accent transition-colors duration-200"
              >
                {/* Item Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-accent">
                      {item.id} {"//"}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                      {item.category}
                    </span>
                  </div>

                  {item.status && (
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-border/70 bg-muted/20 text-muted-foreground self-start sm:self-auto">
                      [ {item.status} ]
                    </span>
                  )}
                </div>

                {/* Title & Core Description */}
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Detailed Bullet Points */}
                {item.details && item.details.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-border/40 font-mono text-xs text-foreground/80">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-accent font-semibold select-none">&rarr;</span>
                        <span className="leading-normal">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional Action Link */}
                {item.link && (
                  <div className="pt-2">
                    <Link
                      href={item.link.url}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline uppercase tracking-wider font-semibold"
                    >
                      <span>{item.link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            QUOTE & NOW MOVEMENT FOOTNOTE
        ───────────────────────────────────────────────────────────── */}
        {nowData.quote && (
          <section className="border border-border/60 bg-muted/15 p-6 space-y-2">
            <blockquote className="font-display text-lg sm:text-xl italic text-foreground tracking-tight">
              &ldquo;{nowData.quote.text}&rdquo;
            </blockquote>
            <p className="font-mono text-xs text-muted-foreground">
              &mdash; {nowData.quote.author}
            </p>
          </section>
        )}

        <section className="border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <div>
            <span>Inspired by the </span>
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-0.5"
            >
              <span>/now page movement</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <span> founded by Derek Sivers.</span>
          </div>

          <div className="text-[11px]">
            <span>Public Declaration &middot; Independent Status</span>
          </div>
        </section>
      </div>
    </main>
  );
}
