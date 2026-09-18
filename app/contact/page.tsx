import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactChannels } from "@/components/ContactChannels";
import { ProfileImage } from "@/components/ProfileImage";
import { siteConfig } from "@/lib/config";

const description =
  "Contact Jathuja Sithamparanathan — third-year Information Technology undergraduate seeking a Software Engineering Internship.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description,
    type: "website",
    url: `${siteConfig.url}/contact`,
  },
  twitter: {
    card: "summary",
    title: `Contact ${siteConfig.name}`,
    description,
  },
};

export default function ContactPage() {
  return (
    <main className="w-full px-8 sm:px-12 lg:px-16 xl:px-20 py-12 md:py-20">
      <div className="space-y-16 md:space-y-24">
        {/* ─────────────────────────────────────────────────────────────
            HEADER & MOTIF
        ───────────────────────────────────────────────────────────── */}
        <section className="relative pt-4">
          {/* Swiss Numeral Watermark */}
          <div className="absolute right-0 top-0 section-numeral-hero -z-10 pointer-events-none opacity-40">
            05
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="section-motif">05 — GET IN TOUCH</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* 2-column: text left, photo right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Heading & subtitle */}
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
                Let&apos;s connect.
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
                I am currently looking for a Software Engineering Internship and would be happy to connect about internship opportunities, projects, or technical discussions.
              </p>

              <ContactChannels variant="hero" className="pt-2" />
            </div>

            {/* Right: Profile photo */}
            <div className="lg:col-span-4">
              <ProfileImage variant="contact" />
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 01: CONTACT FORM
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="section-motif">01 {"// "} SEND A MESSAGE</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <ContactForm />
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 02: SOCIAL CHANNELS & PROFILES
        ───────────────────────────────────────────────────────────── */}
        <section>
          <ContactChannels variant="full" />
        </section>
      </div>
    </main>
  );
}
