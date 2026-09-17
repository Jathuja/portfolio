import React from "react";
import Link from "next/link";
import { Info, AlertTriangle, Lightbulb, ExternalLink } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

/**
 * Editorial Callout Box for Tips, Notes, and Warnings
 */
export function Callout({
  children,
  type = "note",
  title,
}: {
  children: React.ReactNode;
  type?: "note" | "tip" | "warning" | "info";
  title?: string;
}) {
  const styles = {
    note: {
      border: "border-border",
      bg: "bg-muted/30",
      icon: <Info className="h-4 w-4 text-accent" />,
      defaultTitle: "NOTE",
    },
    tip: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      icon: <Lightbulb className="h-4 w-4 text-emerald-500" />,
      defaultTitle: "KEY TIP",
    },
    warning: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/5",
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      defaultTitle: "WARNING",
    },
    info: {
      border: "border-accent/30",
      bg: "bg-accent/5",
      icon: <Info className="h-4 w-4 text-accent" />,
      defaultTitle: "INSIGHT",
    },
  }[type];

  return (
    <aside
      className={`my-8 p-5 hairline-border ${styles.bg} ${styles.border} transition-colors`}
    >
      <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase mb-2 text-foreground">
        {styles.icon}
        <span>{title || styles.defaultTitle}</span>
      </div>
      <div className="font-sans text-sm sm:text-base leading-relaxed text-foreground/90 [&>p]:mb-0">
        {children}
      </div>
    </aside>
  );
}

/**
 * Key Takeaways Summary Box
 */
export function KeyTakeaways({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 hairline-border bg-card relative overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs font-semibold tracking-wider uppercase text-accent">
          KEY TAKEAWAYS
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="font-sans text-sm sm:text-base leading-relaxed text-foreground/90">
        {children}
      </div>
    </div>
  );
}

/**
 * MDX custom components mapping matching the Swiss editorial design system
 */
export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground mt-12 mb-6 scroll-m-20"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-foreground mt-10 mb-4 pb-2 border-b border-border scroll-m-20"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-display text-xl sm:text-2xl font-normal tracking-tight text-foreground mt-8 mb-3 scroll-m-20"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="font-display text-lg sm:text-xl font-normal tracking-tight text-foreground mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="font-sans text-base sm:text-lg leading-relaxed text-foreground/90 mb-6"
      {...props}
    />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
        {...props}
      >
        <span>{children}</span>
        <ExternalLink className="h-3 w-3 inline opacity-70" />
      </a>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 space-y-2.5 list-none pl-0 font-sans text-base sm:text-lg text-foreground/90" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 space-y-2.5 list-decimal pl-6 font-sans text-base sm:text-lg text-foreground/90" {...props} />
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="relative pl-6 leading-relaxed before:content-['—'] before:absolute before:left-0 before:text-accent before:font-mono" {...props}>
      {children}
    </li>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 pl-6 py-2 border-l-2 border-accent bg-muted/20 italic font-display text-lg sm:text-xl text-foreground"
      {...props}
    />
  ),
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (!className?.includes("language-")) {
      return (
        <code
          className="font-mono text-[0.875em] px-1.5 py-0.5 border border-border bg-muted/40 text-foreground font-normal"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <CodeBlock {...props} />,
  hr: () => <hr className="my-12 border-0 border-t border-border" />,
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto hairline-border">
      <table className="w-full text-left font-sans text-sm sm:text-base border-collapse" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="font-mono text-xs uppercase tracking-wider px-4 py-3 bg-muted/50 border-b border-border text-foreground font-semibold"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 border-b border-border/60 text-foreground/90"
      {...props}
    />
  ),
  Callout,
  KeyTakeaways,
};
