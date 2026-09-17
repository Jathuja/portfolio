"use client";
import { useState } from "react";

import { motion, useReducedMotion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Printer,
  FileText,
  Check,
  Copy,
  GraduationCap,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import { MOTION_EASE, MOTION_DURATION } from "@/lib/motion";

/**
 * ResumeViewer Component
 *
 * NOTE: Sourced from `/public/Jathuja_cv.pdf`.
 * // The actual official resume PDF file is now used.
 */

export function ResumeViewer() {
  const shouldReduceMotion = useReducedMotion();
  const [copiedLink, setCopiedLink] = useState(false);

  const resumePdfPath = "/Jathuja_cv.pdf";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${resumePdfPath}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      const printWindow = window.open(resumePdfPath, "_blank");
      if (printWindow) {
        printWindow.focus();
        // Give time for PDF to load in new tab before triggering print
        setTimeout(() => {
          printWindow.print();
        }, 800);
      }
    }
  };

  return (
    <div className="space-y-10">
      {/* ─────────────────────────────────────────────────────────────
          QUICK CREDENTIALS STRIP (EDITORIAL OVERVIEW)
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="border border-border/80 bg-background/50 p-5 space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <GraduationCap className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Education
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm font-medium text-foreground">
            B.Sc. (Hons) in Information Technology
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Specializing in Software Engineering
          </p>
        </div>

        <div className="border border-border/80 bg-background/50 p-5 space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Briefcase className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Target Roles
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm font-medium text-foreground">
            Full-Stack / Software Engineer
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Internship & Graduate Opportunities
          </p>
        </div>

        <div className="border border-border/80 bg-background/50 p-5 space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Layers className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Primary Stack
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm font-medium text-foreground">
            TypeScript, Next.js, Node.js, Go
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            PostgreSQL, Docker, REST & GraphQL
          </p>
        </div>

        <div className="border border-border/80 bg-background/50 p-5 space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="w-4 h-4" />
            <span className="font-mono text-[11px] uppercase tracking-wider font-semibold">
              Verification
            </span>
          </div>
          <p className="font-sans text-xs sm:text-sm font-medium text-foreground">
            Verified Certifications & Honors
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            AWS, freeCodeCamp, Hackathon finalist
          </p>
        </div>
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          TOOLBAR & PROMINENT DOWNLOAD CTA
      ───────────────────────────────────────────────────────────── */}
      <div className="border border-border/90 bg-muted/20 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Status & Metadata */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-border bg-background flex items-center justify-center text-accent shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                CURRICULUM VITAE {"//"} OFFICIAL
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 border border-border/70 bg-background text-muted-foreground">
                PDF
              </span>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
              Single-page developer resume &middot; Updated September 2026
            </p>
          </div>
        </div>

        {/* Right Action Suite */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Prominent Download Button */}
          <a
            href={resumePdfPath}
            download="Jathuja-Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>

          {/* Open in New Tab */}
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-border bg-background text-foreground font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
          >
            <span>Open in Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Print Shortcut */}
          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print resume document"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-border bg-background text-muted-foreground hover:text-foreground hover:border-border transition-colors font-mono text-xs uppercase"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy direct PDF URL"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 border border-border bg-background text-muted-foreground hover:text-foreground hover:border-border transition-colors font-mono text-xs uppercase"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? "Copied" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EMBEDDED PDF VIEWER FRAME
      ───────────────────────────────────────────────────────────── */}
      <div className="relative border border-border bg-background/80 overflow-hidden">
        {/* PDF Frame Header Bar */}
        <div className="px-4 py-2.5 border-b border-border/80 bg-muted/40 flex items-center justify-between font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="w-2.5 h-2.5 rounded-full bg-border" />
            <span className="ml-2 font-mono text-[11px] text-foreground">
              document_preview {"//"} resume.pdf
            </span>
          </div>

          <div className="text-[11px]">
            <span>Format: Standard A4 / Letter</span>
          </div>
        </div>

        {/* Embedded PDF iframe / Object with Fallback */}
        <div className="w-full bg-neutral-900/5 dark:bg-neutral-950/40 relative min-h-[750px] md:min-h-[900px]">
          <object
            data={`${resumePdfPath}#view=FitH`}
            type="application/pdf"
            className="w-full h-full min-h-[750px] md:min-h-[900px] border-0"
            aria-label="Resume PDF Document Viewer"
          >
            {/* Fallback for browsers without inline PDF viewing */}
            <div className="p-12 text-center space-y-4 max-w-md mx-auto my-auto pt-24">
              <FileText className="w-12 h-12 text-accent mx-auto" />
              <h3 className="font-display text-2xl font-normal text-foreground">
                Embedded Preview Unavailable
              </h3>
              <p className="font-sans text-sm text-muted-foreground">
                Your browser does not support native inline PDF embedding. You can download or view
                the document directly using the link below.
              </p>
              <div className="pt-2">
                <a
                  href={resumePdfPath}
                  download="Jathuja-Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wider font-semibold"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
