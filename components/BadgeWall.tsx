"use client";

import React, { useState } from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { Certification } from "@/lib/types";

interface BadgeWallProps {
  certifications: Certification[];
}

export function BadgeWall({ certifications }: BadgeWallProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
      {certifications.map((cert, index) => {
        const isHovered = hoveredIndex === index;
        const indexStr = String(index + 1).padStart(2, "0");

        return (
          <div
            key={cert.credentialId || cert.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex flex-col justify-between border border-border/80 bg-background/50 p-6 md:p-8 transition-all duration-300 hover:border-accent hover:bg-accent/[0.02] focus-within:border-accent"
          >
            {/* Top metadata row */}
            <div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-accent tracking-wider">
                    CERT — {indexStr}
                  </span>
                  <span className="text-border">/</span>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/80" />
                  <span>{cert.date}</span>
                </div>
              </div>

              {/* Title & Issuer */}
              <div className="mt-5">
                <h3 className="font-display text-xl md:text-2xl font-normal text-foreground group-hover:text-foreground tracking-tight leading-snug">
                  {cert.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Issued by <span className="text-foreground font-medium">{cert.issuer}</span>
                </p>
              </div>

              {/* Skills Covered (if provided) */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] px-2 py-0.5 border border-border/60 bg-muted/30 text-muted-foreground group-hover:border-accent/40 group-hover:text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom credential bar with hover reveal */}
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px] truncate max-w-[140px] sm:max-w-[180px]">
                  {cert.credentialId || "VERIFIED"}
                </span>
              </div>

              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.name} credential`}
                className="inline-flex items-center gap-1.5 text-accent group-hover:text-accent font-medium tracking-wide uppercase text-[11px] hover:underline focus:outline-none focus-visible:underline transition-all"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Subtle corner accent indicator on hover */}
            <div
              className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-accent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
