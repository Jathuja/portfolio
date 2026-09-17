import { type Variants } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// Shared Motion Tokens
// Centralise all easing / duration values here. Import these in every component
// rather than writing ad-hoc transition objects inline.
// ─────────────────────────────────────────────────────────────────────────────

/** Single authoritative cubic-bezier curve for all UI animations. */
export const MOTION_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

/** Snappier curve for elements entering from off-screen (spring-like feel). */
export const MOTION_EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Duration map — use these keys instead of raw numbers. */
export const MOTION_DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.5,
} as const;

/**
 * Returns a stagger delay of 0 when the user prefers reduced motion,
 * or `delay` (default 0.08s) otherwise.
 */
export function reducedStagger(
  shouldReduceMotion: boolean | null,
  delay = 0.08
): number {
  return shouldReduceMotion ? 0 : delay;
}

/**
 * Returns a duration of 0 when the user prefers reduced motion,
 * or the given `duration` otherwise.
 */
export function reducedDuration(
  shouldReduceMotion: boolean | null,
  duration: number
): number {
  return shouldReduceMotion ? 0 : duration;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Variants
// ─────────────────────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: MOTION_EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.fast + 0.1, ease: MOTION_EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: MOTION_DURATION.fast, ease: MOTION_EASE },
  },
};

export const mobileMenuOverlay: Variants = {
  closed: {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)",
    transition: {
      duration: 0.35,
      ease: MOTION_EASE,
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: MOTION_DURATION.base,
      ease: [0.32, 0.72, 0, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const mobileMenuItem: Variants = {
  closed: {
    opacity: 0,
    y: 24,
    transition: { duration: MOTION_DURATION.fast + 0.05, ease: MOTION_EASE },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.base, ease: [0.16, 1, 0.3, 1] },
  },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.slow,
      ease: MOTION_EASE,
      staggerChildren: 0.1,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.base,
      ease: MOTION_EASE,
    },
  },
};

/**
 * A feed/list container variant — use in any paginated list component.
 * Adjusts stagger based on `prefers-reduced-motion`.
 */
export function feedContainer(shouldReduceMotion: boolean | null): Variants {
  return {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedStagger(shouldReduceMotion),
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };
}

/**
 * A feed/list item variant — use with feedContainer().
 */
export function feedItem(shouldReduceMotion: boolean | null): Variants {
  return {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedDuration(shouldReduceMotion, MOTION_DURATION.base),
        ease: MOTION_EASE_OUT,
      },
    },
  };
}
