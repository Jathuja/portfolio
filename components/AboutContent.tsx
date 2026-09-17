"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  Code2,
  Sparkles,
  Compass,
} from "lucide-react";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { timelineData } from "@/data/timeline";
import { interests } from "@/data/interests";
import { skillCategories } from "@/data/skills";
import { testimonials } from "@/data/testimonials";
import { BadgeWall } from "@/components/BadgeWall";
import { Timeline } from "@/components/Timeline";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";

export function AboutContent() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants respecting reduced-motion
  const sectionVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const getHobbyIcon = (id: string) => {
    switch (id) {
      case "01":
        return <Code2 className="w-4 h-4 text-accent" />;
      case "02":
        return <Sparkles className="w-4 h-4 text-accent" />;
      default:
        return <Compass className="w-4 h-4 text-accent" />;
    }
  };

  return (
    <div className="space-y-24 md:space-y-36">
      {/* ─────────────────────────────────────────────────────────────
          PAGE HEADER & METADATA STRIP
      ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-6 md:pt-12">
        {/* Giant Swiss Numeral Watermark */}
        <div className="absolute right-0 top-0 section-numeral-hero -z-10 pointer-events-none opacity-40">
          04
        </div>

        <div className="flex items-center gap-4 mb-6">
          <span className="section-motif">04 — ABOUT ME</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-foreground leading-[1.08]">
              About Me
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Third-year Information Technology undergraduate at the University of Moratuwa, interested in software engineering and full-stack development.
            </p>
          </div>

          {/* Quick status box */}
          <div className="lg:col-span-4 border border-border bg-muted/20 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-foreground font-semibold">
                Current Availability
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-start justify-between gap-2 text-muted-foreground">
                <span className="uppercase text-[11px]">Role:</span>
                <span className="text-foreground text-right">Software Engineering Internship</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-muted-foreground">
                <span className="uppercase text-[11px]">Timeline:</span>
                <span className="text-foreground text-right">Open Immediately</span>
              </div>
              <div className="flex items-start justify-between gap-2 text-muted-foreground">
                <span className="uppercase text-[11px]">Location:</span>
                <span className="text-foreground text-right flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-accent inline" /> Colombo, Sri Lanka / Remote / Hybrid
                </span>
              </div>
              <div className="flex items-start justify-between gap-2 text-muted-foreground">
                <span className="uppercase text-[11px]">Major:</span>
                <span className="text-foreground text-right">BSc (Hons) Information Technology</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex gap-2">
              <Link
                href="/resume"
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 font-mono text-xs bg-accent text-accent-foreground font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                <span>View Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hairline divider */}
        <div className="mt-12 hairline-b" />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: EXTENDED BIO
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-10"
      >
        <div className="flex items-center gap-4">
          <span className="section-motif">01 — BIOGRAPHY</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Candidate Profile & Focus */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-l-2 border-accent pl-5 py-1">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-medium block mb-2">
                Candidate Profile
              </span>
              <p className="font-display text-xl sm:text-2xl font-normal text-foreground leading-snug">
                Undergraduate seeking Software Engineering Internship
              </p>
            </div>

            <div className="border border-border/80 p-6 bg-muted/10 space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-widest text-foreground font-semibold">
                Focus Areas
              </h2>
              <ul className="space-y-2.5 font-mono text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">01.</span>
                  <span>Full-Stack Web & API Development</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">02.</span>
                  <span>Cross-Platform Mobile Apps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">03.</span>
                  <span>Database Design & Applied AI</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-8 space-y-6 text-foreground/90 text-base sm:text-lg leading-relaxed">
            <p>
              I am a third-year Information Technology undergraduate at the University of Moratuwa with an interest in software engineering and full-stack development. Through university, personal, and team projects, I have gained practical experience building web applications, REST APIs, databases, mobile applications, and AI-integrated features.
            </p>
            <p>
              I enjoy learning new technologies, solving practical problems, and working collaboratively on software projects. I am currently looking for a Software Engineering Internship where I can apply my skills, gain industry experience, and continue learning from experienced developers.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02: EDUCATION (CARD-FREE FORMAT WITH HAIRLINE DIVIDERS)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-10"
      >
        <div className="flex items-center gap-4">
          <span className="section-motif">02 — EDUCATION & ACADEMICS</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Clean card-free layout using hairline dividers */}
        <div className="divide-y divide-border border-y border-border">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Column: Timeline, Institution & Degree */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-accent tracking-wider uppercase px-2.5 py-1 bg-accent/10 border border-accent/20">
                    {edu.duration}
                  </span>
                  {edu.gpa && (
                    <span className="font-mono text-xs text-muted-foreground border border-border px-2.5 py-1">
                      GPA: <strong className="text-foreground font-semibold">{edu.gpa}</strong>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-normal text-foreground tracking-tight leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 text-base text-muted-foreground">
                    {edu.institution}
                  </p>
                  {edu.location && (
                    <p className="mt-1 font-mono text-xs text-muted-foreground/80 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-accent" />
                      <span>{edu.location}</span>
                    </p>
                  )}
                </div>

                {edu.honors && edu.honors.length > 0 && (
                  <div className="pt-4 space-y-2">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground font-medium block">
                      Academic Recognition & Honors:
                    </span>
                    <ul className="space-y-1.5 font-mono text-xs text-foreground/90">
                      {edu.honors.map((honor, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{honor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Coursework as Monospace Tags */}
              <div className="lg:col-span-7 space-y-4 lg:pl-6 lg:border-l lg:border-border/60">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-medium block">
                  Relevant Coursework & Technical Modules
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {edu.coursework.map((course, cIdx) => (
                    <span
                      key={cIdx}
                      className="font-mono text-xs px-3 py-1.5 border border-border/80 bg-muted/20 text-foreground transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03: TECHNICAL SKILLS (STANDALONE COMPONENT)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        <Skills
          categories={skillCategories}
          showHeading={true}
          headingMotif="03 — TECHNICAL SKILLS"
          headingTitle="Technical Skills"
          headingSubtitle="A transparent inventory of languages, frameworks, developer tooling, and technical practices gained through coursework and project development."
          filterEnabled={true}
        />
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04: CERTIFICATIONS ("BADGE WALL")
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <span className="section-motif">04 — CERTIFICATIONS & CREDENTIALS</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
              Certifications & Credentials
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              Selected certifications and technical courses completed through recognized learning platforms and institutions.
            </p>
          </div>
          <span className="font-mono text-xs text-muted-foreground self-start md:self-end">
            [ {String(certifications.length).padStart(2, "0")} Verified Credentials ]
          </span>
        </div>

        {/* Badge Wall Component */}
        <BadgeWall certifications={certifications} />
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05: TIMELINE (CHRONOLOGICAL NARRATIVE)
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-10"
      >
        <div className="flex items-center gap-4">
          <span className="section-motif">05 — CHRONOLOGICAL JOURNEY</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
              Experience, Education & Milestones
            </h2>
            <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-xl">
              A chronological timeline tracing academic progression, leadership roles, and project milestones.
            </p>
          </div>
        </div>

        {/* Vertical Timeline Component */}
        <Timeline items={timelineData} />
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06: OUTSIDE OF CODE / ACTIVITIES
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-10"
      >
        <div className="flex items-center gap-4">
          <span className="section-motif">06 — ACTIVITIES & EXPLORATION</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
            Activities & Technical Interests
          </h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl">
            Open-source contribution and practical technology exploration beyond core coursework.
          </p>
        </div>

        {/* 2-column grid of interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className="border border-border/80 bg-background/50 p-6 md:p-8 space-y-4 hover:border-accent transition-colors duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    {getHobbyIcon(interest.id)}
                    <span className="font-mono text-xs text-accent font-semibold">
                      {interest.id}
                    </span>
                    <span className="text-border">/</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {interest.category}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                  {interest.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {interest.description}
                </p>
              </div>

              {interest.details && (
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p className="font-mono text-xs text-muted-foreground">
                    <span className="text-accent mr-1.5">→</span>
                    {interest.details}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 07: ENDORSEMENTS & TESTIMONIALS (IF ANY)
      ───────────────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-10"
        >
          <Testimonials
            showHeading={true}
            headingMotif="07 — ENDORSEMENTS & PERSPECTIVES"
            headingTitle="Peer Reviews & Mentor Perspectives"
            headingSubtitle="Observations from academic supervisors and engineering collaborators on technical execution and teamwork."
          />
        </motion.section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 08: CLOSING CALL TO ACTION
      ───────────────────────────────────────────────────────────── */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="pt-8 pb-12 border-t border-border"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-2">
            <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
              Next Steps
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
              Explore my projects or get in touch to discuss internship opportunities.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Take a look at my project work, technical background, or reach out directly.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-border bg-transparent text-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-muted hover:border-foreground/30 transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
