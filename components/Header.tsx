"use client";
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md hairline-b transition-colors duration-200">
        <div className="flex h-16 w-full items-center justify-between px-8 sm:px-12 lg:px-16 xl:px-20">
          {/* Logo / Initials */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm tracking-wider font-semibold uppercase text-foreground"
            aria-label={`${siteConfig.name} - Home`}
          >
            <span className="flex h-6 w-6 items-center justify-center bg-accent text-accent-foreground font-mono text-xs font-bold transition-transform group-hover:scale-105">
              J
            </span>
            <span className="transition-colors group-hover:text-accent">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-muted-foreground sm:inline-block font-normal">
              / DEV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <nav className="flex items-center gap-6" aria-label="Main Navigation">
              {siteConfig.navItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative py-1 font-mono text-xs uppercase tracking-wider transition-colors hover:text-foreground ${
                      active ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`mr-1.5 transition-colors ${
                        active ? "text-accent font-semibold" : "text-muted-foreground/60"
                      }`}
                    >
                      {item.number}
                    </span>
                    <span>{item.name}</span>

                    {/* Active route animated underline */}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="h-4 w-px bg-border" aria-hidden="true" />

            <ThemeToggle />
          </div>

          {/* Mobile Right Bar: ThemeToggle + Hamburger Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="inline-flex h-9 w-9 items-center justify-center border border-border bg-transparent text-foreground transition-colors hover:border-accent hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-accent"
            >
              <Menu className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
