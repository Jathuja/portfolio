"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`inline-flex h-9 w-9 items-center justify-center border border-border bg-transparent text-foreground/40 ${className}`}
        aria-hidden="true"
      >
        <span className="h-4 w-4" />
      </div>
    );
  }

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`group relative inline-flex h-9 w-9 items-center justify-center border border-border bg-transparent text-foreground transition-colors hover:border-accent hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-accent ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 transition-transform group-hover:rotate-45 text-foreground" />
      ) : (
        <Moon className="h-4 w-4 transition-transform group-hover:-rotate-12 text-foreground" />
      )}
      <span className="sr-only">
        {isDark ? "Switch to light theme" : "Switch to dark theme"}
      </span>
    </button>
  );
}
