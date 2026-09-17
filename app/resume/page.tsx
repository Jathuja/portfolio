import type { Metadata } from "next";
import { ResumeViewer } from "@/components/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Curriculum Vitae of Jathuja Sithamparanathan — IT undergraduate at University of Moratuwa seeking a Software Engineering Internship.",
  // Resume pages are fine to index but don't need social cards
  twitter: {
    card: "summary",
    title: "Resume | Jathuja Sithamparanathan",
    description:
      "Curriculum Vitae of Jathuja Sithamparanathan — IT undergraduate at University of Moratuwa seeking a Software Engineering Internship.",
  },
};

export default function ResumePage() {
  return (
    <main className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
      <div className="space-y-12 md:space-y-16">
        {/* ─────────────────────────────────────────────────────────────
            HEADER & MOTIF
        ───────────────────────────────────────────────────────────── */}
        <section className="relative pt-4">
          {/* Swiss Numeral Watermark */}
          <div className="absolute right-0 top-0 section-numeral-hero -z-10 pointer-events-none opacity-40">
            06
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="section-motif">06 — CURRICULUM VITAE</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
              Resume & <span className="italic text-accent">Technical Track Record</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
              Academic credentials, core competencies, verified certifications, and production
              experience formatted for ATS evaluation and hiring teams.
            </p>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            RESUME VIEWER & TOOLBAR
            Note: PDF document source lives at /public/Jathuja_cv.pdf.
            // The actual PDF document is now linked.
        ───────────────────────────────────────────────────────────── */}
        <section>
          <ResumeViewer />
        </section>
      </div>
    </main>
  );
}
