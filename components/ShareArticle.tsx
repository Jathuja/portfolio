"use client";

import React, { useState } from "react";
import { Check, Copy, Share2, Twitter, Linkedin } from "lucide-react";

interface ShareArticleProps {
  title: string;
  url?: string;
}

export function ShareArticle({ title, url }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Share2 className="h-3.5 w-3.5 text-accent" />
        <span>SHARE:</span>
      </span>

      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs border border-border bg-card hover:border-accent text-foreground transition-colors"
        type="button"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-medium">Copied Link</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 opacity-70" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs border border-border bg-card hover:border-accent text-foreground transition-colors"
      >
        <Twitter className="h-3.5 w-3.5 opacity-70" />
        <span>Twitter</span>
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs border border-border bg-card hover:border-accent text-foreground transition-colors"
      >
        <Linkedin className="h-3.5 w-3.5 opacity-70" />
        <span>LinkedIn</span>
      </a>
    </div>
  );
}
