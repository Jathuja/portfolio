"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Github, Linkedin, BookOpen, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "./ThemeToggle";
import { mobileMenuOverlay, mobileMenuItem } from "@/lib/motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);


  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav-overlay"
          variants={mobileMenuOverlay}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-background p-6 sm:p-8 md:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Top Header in Overlay */}
          <div className="flex items-center justify-between hairline-b pb-4">
            <Link
              href="/"
              onClick={onClose}
              className="group flex items-center gap-2 font-mono text-sm tracking-widest font-semibold uppercase text-foreground"
            >
              <span className="text-accent font-bold">/</span>
              <span>{siteConfig.name}</span>
            </Link>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="inline-flex h-9 w-9 items-center justify-center border border-border bg-transparent text-foreground transition-colors hover:border-accent hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-accent"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>
          </div>

          {/* Center Navigation Links with Big Typography */}
          <nav className="my-auto py-8 space-y-4 sm:space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
              Navigation Index
            </div>
            {siteConfig.navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <motion.div key={item.href} variants={mobileMenuItem}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-baseline justify-between py-2 transition-colors ${
                      active
                        ? "text-accent"
                        : "text-foreground hover:text-accent"
                    }`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-muted-foreground group-hover:text-accent transition-colors">
                        {item.number} —
                      </span>
                      <span className="font-display text-4xl sm:text-5xl font-normal tracking-tight">
                        {item.name}
                      </span>
                    </div>
                    <ArrowUpRight
                      className={`h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        active
                          ? "opacity-100 text-accent"
                          : "opacity-40 group-hover:opacity-100"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Bottom Section: Secondary Links & Socials */}
          <motion.div
            variants={mobileMenuItem}
            className="space-y-6 hairline-t pt-6"
          >
            {/* Secondary Pages */}
            <div className="flex flex-wrap gap-2">
              {siteConfig.secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="tag-mono"
                >
                  <span className="text-accent">{item.number}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Social Links & Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-4 text-sm font-mono">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={siteConfig.links.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Medium</span>
                </a>
                <a
                  href={siteConfig.links.email}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </div>

              <div className="font-mono text-[11px] text-muted-foreground tracking-wider uppercase">
                LK // UTC+05:30
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
