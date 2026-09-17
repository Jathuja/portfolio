import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/config";

const description =
  "Extended biography, undergraduate education in Information Technology, verified technical certifications, chronological timeline, and personal interests.";

export const metadata: Metadata = {
  title: "About",
  description,
  openGraph: {
    title: `About ${siteConfig.name}`,
    description,
    type: "profile",
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: `/og?title=${encodeURIComponent("About " + siteConfig.name)}&description=${encodeURIComponent(siteConfig.tagline)}&type=page`,
        width: 1200,
        height: 630,
        alt: `About ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.name}`,
    description,
    images: [
      `/og?title=${encodeURIComponent("About " + siteConfig.name)}&description=${encodeURIComponent(siteConfig.tagline)}&type=page`,
    ],
  },
};

// Person JSON-LD with additional About-page context
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.title,
    description: siteConfig.shortBio,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.medium,
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
      <JsonLd data={aboutJsonLd} />
      <AboutContent />
    </main>
  );
}
