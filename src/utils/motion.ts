import type { Variants } from 'framer-motion';

/**
 * Shared motion vocabulary. Every animated element pulls from here so the
 * site moves in one voice — short, eased, never bouncy.
 *
 * Reduced motion is handled at the component level with framer-motion's
 * `useReducedMotion`, plus a global CSS override in index.css.
 */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const staggerChildren = (stagger = 0.06, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const childReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: easeOut } },
};

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.24, ease: easeOut } },
  exit: { opacity: 0, scale: 0.98, y: 4, transition: { duration: 0.16 } },
};

/** Viewport settings used by every section reveal. */
export const revealViewport = { once: true, amount: 0.18 } as const;
