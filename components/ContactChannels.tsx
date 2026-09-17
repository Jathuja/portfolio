"use client";

import React, { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

interface ContactChannelsProps {
  variant?: "hero" | "full";
  className?: string;
}

export function ContactChannels({
  variant = "hero",
  className = "",
}: ContactChannelsProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const rawEmail = siteConfig.links.email.replace("mailto:", "");

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  /* ─── HERO / INLINE VARIANT (FOR CONTACT HEADER EMPTY AREA) ─────────────── */
  if (variant === "hero") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Direct Email Card */}
          <div className="border border-border/80 bg-background/50 p-4 flex flex-col justify-between hover:border-accent transition-colors duration-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-accent">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider">
                    Direct Email
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/40 px-1.5 py-0.5 border border-border/60">
                  Primary
                </span>
              </div>

              <div className="space-y-0.5">
                <p className="font-mono text-xs font-medium text-foreground select-all break-all">
                  {rawEmail}
                </p>
                <p className="font-sans text-[11px] text-muted-foreground">
                  Best for internship inquiries and professional communication.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-accent hover:underline uppercase tracking-wider cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? "Copied" : "Copy address"}</span>
              </button>
              <a
                href={siteConfig.links.email}
                aria-label="Open default mail client"
                className="font-mono text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <span>Mail</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Verified Profiles Card */}
          <div className="border border-border/80 bg-background/50 p-4 flex flex-col justify-between hover:border-accent transition-colors duration-200">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Verified Profiles
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Connect
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center justify-between border border-border/60 p-2 hover:border-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-accent transition-colors" />
                    <span className="text-foreground">github.com/Jathuja</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover/link:text-accent transition-colors" />
                </a>

                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center justify-between border border-border/60 p-2 hover:border-accent transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-accent transition-colors" />
                    <span className="text-foreground truncate max-w-[150px] sm:max-w-[170px]">
                      LinkedIn Profile
                    </span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover/link:text-accent transition-colors shrink-0" />
                </a>
              </div>
            </div>

            <p className="font-sans text-[11px] text-muted-foreground pt-1.5">
              Available for internship and software project discussions.
            </p>
          </div>
        </div>

        {/* Compact Availability Strip */}
        <div className="border border-border/80 bg-muted/20 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-foreground font-medium">Seeking Internship</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-accent" />
              <span>Colombo, LK (UTC+05:30)</span>
            </div>
            <span className="text-border hidden sm:inline">|</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-accent" />
              <span>Response: ≤ 1–2 days</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── FULL VARIANT ───────────────────────────────────────────────────────── */
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Channels Header Strip */}
      <div className="flex items-center gap-4">
        <span className="section-motif">02 {"//"} DIRECT CHANNELS & PROFILES</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Email as text with copy button */}
        <div className="group border border-border/80 bg-background/50 p-5 flex flex-col justify-between hover:border-accent transition-colors duration-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-accent">
                <Mail className="w-4 h-4" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  Direct Email
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/40 px-1.5 py-0.5 border border-border/60">
                Primary
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-mono text-xs font-medium text-foreground select-all break-all">
                {rawEmail}
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                Best for internship inquiries and professional communication.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent hover:underline uppercase tracking-wider cursor-pointer"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? "Copied to clipboard" : "Copy address"}</span>
            </button>
            <a
              href={siteConfig.links.email}
              aria-label="Open default mail client"
              className="font-mono text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <span>Mail</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* GitHub Profile */}
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-border/80 bg-background/50 p-5 flex flex-col justify-between hover:border-accent transition-colors duration-200"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-accent">
                <Github className="w-4 h-4" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  GitHub
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>

            <div className="space-y-1">
              <p className="font-mono text-xs font-medium text-foreground">
                github.com/Jathuja
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                Source repositories, public experiments, and open-source contributions.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between font-mono text-xs text-muted-foreground group-hover:text-accent">
            <span>Explore Repositories</span>
            <span>&rarr;</span>
          </div>
        </a>

        {/* LinkedIn Profile */}
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group border border-border/80 bg-background/50 p-5 flex flex-col justify-between hover:border-accent transition-colors duration-200"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-accent">
                <Linkedin className="w-4 h-4" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  LinkedIn
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>

            <div className="space-y-1">
              <p className="font-mono text-xs font-medium text-foreground">
                linkedin.com/in/jathuja-sithamparanathan-508953301
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                Connect with me for professional and internship opportunities.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between font-mono text-xs text-muted-foreground group-hover:text-accent">
            <span>Connect on LinkedIn</span>
            <span>&rarr;</span>
          </div>
        </a>
      </div>

      {/* Availability Strip */}
      <div className="border border-border/80 bg-muted/20 p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
              Availability
            </span>
            <p className="font-sans text-xs text-muted-foreground mt-0.5">
              Currently seeking Software Engineering Internship opportunities.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>Colombo, LK (UTC+05:30)</span>
          </div>
          <span className="text-border hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Response: &le; 1–2 business days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
