"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, MessageSquareQuote } from "lucide-react";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import { Testimonial } from "@/lib/types";
import { MOTION_EASE, MOTION_DURATION } from "@/lib/motion";

/**
 * Testimonials Component
 *
 * ARCHITECTURAL JUSTIFICATION:
 * Testimonials are placed on the /about page (Section 07). While the Home page prioritizes
 * rapid technical synthesis and immediate project case study highlights, the About page
 * carries the extended biographical narrative, academic timeline, and certifications.
 * Placing endorsements and mentor pull-quotes on /about directly reinforces narrative credibility,
 * collaborative ethos, and peer validation in the natural context of career history.
 */

interface TestimonialsProps {
  items?: Testimonial[];
  showHeading?: boolean;
  headingMotif?: string;
  headingTitle?: string;
  headingSubtitle?: string;
  className?: string;
}

export function Testimonials({
  items = defaultTestimonials,
  showHeading = false,
  headingMotif = "07 — ENDORSEMENTS",
  headingTitle = "Recommendations & Peer Perspectives",
  headingSubtitle = "Observations from academic supervisors and engineering collaborators on technical execution, problem solving, and interface craft.",
  className = "",
}: TestimonialsProps) {
  const shouldReduceMotion = useReducedMotion();

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
              <MessageSquareQuote className="w-3.5 h-3.5 text-accent" />
              <span>[ {items.length} VERIFIED ENDORSEMENTS ]</span>
            </div>
          </div>
        </div>
      )}

      {/* Asymmetric Editorial Pull-Quote Grid — No Generic Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: MOTION_DURATION.slow,
              delay: shouldReduceMotion ? 0 : index * 0.12,
              ease: MOTION_EASE,
            }}
            className="group relative border border-border/80 bg-background/50 p-8 sm:p-10 flex flex-col justify-between hover:border-accent transition-colors duration-300"
          >
            {/* Top Indicator & Context Badge */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-semibold text-accent">
                    REF {"//"} {item.id}
                  </span>
                  <span className="text-border">/</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground truncate max-w-[200px] sm:max-w-none">
                    {item.relationship}
                  </span>
                </div>
                <Quote className="w-5 h-5 text-muted-foreground/30 group-hover:text-accent/60 transition-colors" />
              </div>

              {/* Display Font Pull-Quote */}
              <blockquote className="relative">
                <p className="font-display text-lg sm:text-xl md:text-2xl font-normal text-foreground leading-relaxed italic tracking-tight">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Author Footer Identity */}
            <div className="mt-8 pt-5 border-t border-border/60 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-foreground tracking-tight">
                  {item.name}
                </div>
                <div className="font-sans text-xs text-muted-foreground mt-0.5">
                  {item.role}
                </div>
                <div className="font-mono text-[11px] text-muted-foreground/80 mt-0.5">
                  {item.companyOrContext}
                </div>
              </div>

              {item.projectOrHighlight && (
                <div className="self-start sm:self-auto">
                  <span className="inline-flex items-center font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-border bg-muted/30 text-muted-foreground">
                    Project: {item.projectOrHighlight}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
