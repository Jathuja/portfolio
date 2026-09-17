"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

interface ProfileImageProps {
  /** "hero" = compact right-panel card for the Home page
   *  "contact" = larger personality-forward card for the Contact page */
  variant: "hero" | "contact";
  className?: string;
}

/** Derive initials from siteConfig.name (e.g. "Jathuja T" → "JT") */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileImage({ variant, className = "" }: ProfileImageProps) {
  const [imgError, setImgError] = useState(false);
  const initials = getInitials(siteConfig.name);

  /* ─── HERO VARIANT ──────────────────────────────────────────────────────── */
  if (variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], delay: 0.2 }}
        className={`group relative hairline-border bg-card overflow-hidden max-w-sm sm:max-w-md mx-auto lg:ml-auto ${className}`}
      >
        {/* Top bar — location label */}
        <div className="flex items-center justify-between px-4 py-2.5 hairline-b bg-muted/30">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            COLOMBO
          </span>
          <span className="font-mono text-[10px] font-semibold text-accent">
            SRI LANKA
          </span>
        </div>

        {/* Photo or Fallback */}
        <div className="relative aspect-[4/5] max-h-[480px] w-full overflow-hidden">
          {!imgError ? (
            <Image
              src="/jathuja.jpg"
              alt={`${siteConfig.name} — Software Engineering Intern candidate`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
            />
          ) : (
            /* Graceful initials fallback */
            <div className="flex h-full w-full items-center justify-center bg-muted/40">
              <span className="font-display text-5xl font-light text-accent select-none">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Caption strip */}
        <div className="px-4 py-3 hairline-t">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            {siteConfig.name}
          </p>
        </div>
      </motion.div>
    );
  }

  /* ─── CONTACT VARIANT ───────────────────────────────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, rotate: 2 }}
      animate={{ opacity: 1, x: 0, rotate: 1 }}
      whileHover={{ rotate: 0, scale: 1.01 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`relative w-full max-w-sm sm:max-w-md mx-auto lg:ml-auto ${className}`}
    >
      {/* Decorative accent offset frame */}
      <div
        className="absolute inset-0 border border-accent/40 translate-x-3 translate-y-3 -z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Main photo card */}
      <div className="hairline-border bg-card overflow-hidden">
        {/* Swiss top strip */}
        <div className="flex items-center justify-between px-4 py-2.5 hairline-b bg-muted/30">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            05 // CONTACT
          </span>
        </div>

        {/* Photo or Fallback */}
        <div className="relative aspect-[4/5] max-h-[500px] w-full overflow-hidden">
          {!imgError ? (
            <Image
              src="/jathuja.jpg"
              alt={`${siteConfig.name} — seeking software engineering internship`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/40">
              <span className="font-display text-7xl font-light text-accent select-none">
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="px-4 py-3 hairline-t">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
            {siteConfig.name}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
            Colombo, Sri Lanka
          </p>
        </div>
      </div>
    </motion.div>
  );
}
