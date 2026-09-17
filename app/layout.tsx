import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/config";
import "./globals.css";

// ─────────────────────────────────────────────────────────────────────────────
// Fonts — loaded via next/font for subsetting (no render-blocking requests)
// ─────────────────────────────────────────────────────────────────────────────

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ─────────────────────────────────────────────────────────────────────────────
// Root Metadata — inherited by all pages; each page can override
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  keywords: [
    "portfolio",
    "full-stack developer",
    "IT undergraduate",
    "Next.js",
    "TypeScript",
    "software engineering",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: `/og?title=${encodeURIComponent(siteConfig.name)}&description=${encodeURIComponent(siteConfig.tagline)}&type=page`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      `/og?title=${encodeURIComponent(siteConfig.name)}&description=${encodeURIComponent(siteConfig.tagline)}&type=page`,
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

// Viewport exported separately (Next.js 14 requirement)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F6F3" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ─────────────────────────────────────────────────────────────────────────────
// Person JSON-LD — injected site-wide; relevant on Home & About
// ─────────────────────────────────────────────────────────────────────────────

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.title,
  description: siteConfig.description,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.medium,
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent selection:text-accent-foreground flex flex-col">
        {/* Person structured data */}
        <JsonLd data={personJsonLd} />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip-to-content link: visible only on keyboard focus */}
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>

          <Header />
          <PageTransition>
            <div id="main-content">{children}</div>
          </PageTransition>
          <Footer />
        </ThemeProvider>

        {/*
          Vercel Analytics — tracks page views with zero PII.
          To switch to Plausible instead:
            1. Remove <Analytics /> and the @vercel/analytics import.
            2. npm install @plausible/tracker
            3. Add <Script data-domain="yourdomain.com"
                        src="https://plausible.io/js/script.js"
                        strategy="afterInteractive" />
        */}
        <Analytics />
      </body>
    </html>
  );
}
