"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract raw text from children for clipboard copy
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (!node) return "";
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (
      typeof node === "object" &&
      node !== null &&
      "props" in node &&
      (node as { props: { children?: React.ReactNode } }).props?.children
    ) {
      return extractText((node as { props: { children?: React.ReactNode } }).props.children);
    }
    return "";
  };

  const codeText = extractText(children);

  // Extract language from className (e.g., "language-typescript")
  const langMatch = className?.match(/language-([a-z0-9_-]+)/i);
  const language = langMatch ? langMatch[1] : "";

  const handleCopy = async () => {
    if (!codeText) return;
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard", err);
    }
  };

  return (
    <div className="relative group my-8 overflow-hidden hairline-border bg-card">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-b border-border text-xs font-mono text-muted-foreground">
        <span className="uppercase tracking-wider font-semibold text-accent">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border border-border bg-background/80 hover:bg-muted text-foreground transition-colors"
          aria-label="Copy code to clipboard"
          type="button"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 opacity-70" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre
        className="p-5 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto text-foreground/90 selection:bg-accent selection:text-accent-foreground"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
