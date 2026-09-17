"use client";

import React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto hairline-t bg-background text-foreground transition-colors duration-200">
      <div className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Left Column: Name, Tagline & Status */}
          <div className="space-y-4 md:col-span-7">
            <h2 className="font-display text-2xl font-normal tracking-tight md:text-3xl text-foreground">
              {siteConfig.name}
            </h2>

            <p className="max-w-md font-sans text-sm text-muted-foreground leading-relaxed">
              {siteConfig.tagline}
            </p>

            {/* Live Status & Coordinates */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-mono">
              <div className="inline-flex items-center gap-2 border border-border bg-muted/30 px-2.5 py-1 text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="tracking-wider uppercase">
                  Seeking Software Engineering Internships
                </span>
              </div>
              <span className="text-muted-foreground/60 hidden sm:inline">/</span>
              <span className="text-muted-foreground tracking-wider uppercase">
                Colombo, Sri Lanka
              </span>
            </div>
          </div>

          {/* Right Column: Social Links & Channels */}
          <div className="space-y-6 md:col-span-5 md:pl-6">
            <div className="font-mono text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Connect & Channels
            </div>

            {/* Text Links with Icons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-border p-3 text-xs font-mono text-foreground transition-colors hover:border-accent hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent" />
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border border-border p-3 text-xs font-mono text-foreground transition-colors hover:border-accent hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent" />
              </a>

              <a
                href={siteConfig.links.email}
                className="group flex items-center justify-between border border-border p-3 text-xs font-mono text-foreground transition-colors hover:border-accent hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span>Email</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent" />
              </a>

              <Link
                href="/resume"
                className="group flex items-center justify-between border border-border p-3 text-xs font-mono text-foreground transition-colors hover:border-accent hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span>Resume</span>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-accent" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 hairline-t pt-6 sm:flex-row text-xs font-mono text-muted-foreground">
          <div>
            © {currentYear} {siteConfig.name}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="group flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
}
