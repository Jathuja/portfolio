"use client";

import React, { useState, useId } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  RotateCcw,
  Copy,
  Check,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { MOTION_EASE, MOTION_DURATION } from "@/lib/motion";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const formId = useId();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "Internship / Full-time Opportunity",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const rawEmail = siteConfig.links.email.replace("mailto:", "");

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rawEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your name.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return undefined;
      case "email":
        if (!value.trim()) return "Please enter your email address.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim()))
          return "Please enter a valid email address (e.g., name@domain.com).";
        return undefined;
      case "message":
        if (!value.trim()) return "Please write a message.";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters long.";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    // Clean undefined keys
    Object.keys(newErrors).forEach((key) => {
      if (!newErrors[key as keyof FormErrors]) {
        delete newErrors[key as keyof FormErrors];
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(siteConfig.contact.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject,
          message: formData.message.trim(),
          _timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          errorData?.error ||
            "Unable to send message. Please use direct email below or retry shortly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network connection or service endpoint unreachable. Please retry or reach out directly via email."
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "Internship / Full-time Opportunity",
      message: "",
    });
    setErrors({});
    setTouched({});
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="border border-border/90 bg-background/60 p-6 sm:p-8 md:p-10 relative">
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/80 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
            CONTACT FORM
          </span>
          <span className="text-border">/</span>
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            DIRECT MESSAGE
          </span>
        </div>

        {/* Turnaround Time Badge */}
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-muted/40 border border-border/60 px-3 py-1 self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span>Usually responds within 1–2 business days</span>
        </div>
      </div>

      {/* Dynamic Content: Success State vs Form */}
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success-state"
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -12 }}
            transition={{ duration: MOTION_DURATION.base, ease: MOTION_EASE }}
            className="py-10 md:py-14 space-y-6 text-center max-w-xl mx-auto"
          >
            <div className="w-14 h-14 mx-auto border border-accent bg-accent/10 flex items-center justify-center text-accent">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                Message Sent
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
                Thank you, {formData.name || "friend"}.
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Your message has been received. I will get back to you at{" "}
                <strong className="text-foreground font-mono text-xs">{formData.email}</strong>{" "}
                shortly.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-border bg-muted/30 text-foreground font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Send Another Message</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <form
            key="contact-form"
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 space-y-6"
          >
            {/* Error Banner if submission failed */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASE }}
                className="p-4 border border-destructive/60 bg-destructive/10 text-destructive text-xs font-mono space-y-2"
                role="alert"
              >
                <div className="flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>MESSAGE COULD NOT BE SENT</span>
                </div>
                <p className="text-foreground/90 font-sans text-xs sm:text-sm">
                  {errorMessage}
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-accent hover:underline uppercase text-[11px] font-mono font-medium cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? "Email Copied!" : "Copy direct email"}</span>
                  </button>
                  <span className="text-border">|</span>
                  <a
                    href={siteConfig.links.email}
                    className="inline-flex items-center gap-1 text-accent hover:underline uppercase text-[11px] font-mono font-medium"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Open Mail App</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor={`${formId}-name`}
                  className="block font-mono text-xs uppercase tracking-wider text-foreground font-semibold"
                >
                  01 {"//"} Your Name <span className="text-accent">*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === "submitting"}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                  placeholder="e.g. Maya Lin"
                  className={`w-full px-4 py-3 font-sans text-sm border bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none ${
                    errors.name && touched.name
                      ? "border-destructive focus:border-destructive ring-1 ring-destructive/40"
                      : "border-border/80 focus:border-accent hover:border-border"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {errors.name && touched.name && (
                  <p
                    id={`${formId}-name-error`}
                    className="font-mono text-xs text-destructive flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor={`${formId}-email`}
                  className="block font-mono text-xs uppercase tracking-wider text-foreground font-semibold"
                >
                  02 {"//"} Email Address <span className="text-accent">*</span>
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={status === "submitting"}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                  placeholder="e.g. maya@domain.com"
                  className={`w-full px-4 py-3 font-sans text-sm border bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none ${
                    errors.email && touched.email
                      ? "border-destructive focus:border-destructive ring-1 ring-destructive/40"
                      : "border-border/80 focus:border-accent hover:border-border"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {errors.email && touched.email && (
                  <p
                    id={`${formId}-email-error`}
                    className="font-mono text-xs text-destructive flex items-center gap-1.5"
                    role="alert"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Subject / Topic Field */}
            <div className="space-y-2">
              <label
                htmlFor={`${formId}-subject`}
                className="block font-mono text-xs uppercase tracking-wider text-foreground font-semibold"
              >
                03 {"//"} Inquiring About
              </label>
              <div className="relative">
                <select
                  id={`${formId}-subject`}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === "submitting"}
                  className="w-full px-4 py-3 font-sans text-sm border border-border/80 bg-background text-foreground transition-colors focus:outline-none focus:border-accent hover:border-border appearance-none cursor-pointer disabled:opacity-60"
                >
                  <option value="Internship / Full-time Opportunity">
                    Internship / Full-time Engineering Role
                  </option>
                  <option value="Project Collaboration">
                    Open Source & Project Collaboration
                  </option>
                  <option value="General Inquiry">General Technical Inquiry</option>
                  <option value="Saying Hello">Just Saying Hello</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none font-mono text-xs text-muted-foreground">
                  ▼
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`${formId}-message`}
                  className="block font-mono text-xs uppercase tracking-wider text-foreground font-semibold"
                >
                  04 {"//"} Message Content <span className="text-accent">*</span>
                </label>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {formData.message.length} chars
                </span>
              </div>
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={status === "submitting"}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                placeholder="Share your requirements, context, or question..."
                className={`w-full px-4 py-3 font-sans text-sm border bg-background text-foreground placeholder:text-muted-foreground/60 transition-colors focus:outline-none resize-y min-h-[130px] ${
                  errors.message && touched.message
                    ? "border-destructive focus:border-destructive ring-1 ring-destructive/40"
                    : "border-border/80 focus:border-accent hover:border-border"
                  } disabled:opacity-60 disabled:cursor-not-allowed`}
              />
              {errors.message && touched.message && (
                <p
                  id={`${formId}-message-error`}
                  className="font-mono text-xs text-destructive flex items-center gap-1.5"
                  role="alert"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submit Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <p className="font-mono text-[11px] text-muted-foreground/80 leading-relaxed max-w-sm">
                * Messages are delivered directly via Formspree.
              </p>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
