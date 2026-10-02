import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { revealViewport, sectionReveal } from '@/utils/motion';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Accessible name for the landmark, when no visible heading suits. */
  label?: string;
}

/**
 * A page section: semantic <section>, consistent rhythm, and one
 * entrance animation that plays once when it scrolls into view.
 */
export const Section = ({ id, children, className, label }: SectionProps) => {
  const reduced = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-label={label}
      className={cn('mx-auto w-full max-w-shell px-5 py-20 sm:px-8 md:py-28 lg:px-16', className)}
      variants={reduced ? undefined : sectionReveal}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={revealViewport}
    >
      {children}
    </motion.section>
  );
};

interface SectionHeadingProps {
  /** Small monospace label, e.g. "01 / ABOUT". */
  eyebrow: string;
  title: string;
  /** Optional supporting line, shown to the right on wide screens. */
  aside?: string;
  className?: string;
}

export const SectionHeading = ({ eyebrow, title, aside, className }: SectionHeadingProps) => (
  <div
    className={cn(
      'flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12',
      className,
    )}
  >
    <div>
      <p className="eyebrow text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
        {title}
      </h2>
    </div>
    {aside ? (
      <p className="max-w-sm text-sm leading-relaxed text-subtle md:pb-2 md:text-right">{aside}</p>
    ) : null}
  </div>
);
