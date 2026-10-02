import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TagProps {
  children: ReactNode;
  className?: string;
}

/** Monospace chip used for technologies. */
export const Tag = ({ children, className }: TagProps) => (
  <span
    className={cn(
      'rounded-md border border-line-strong bg-raised px-2.5 py-1 font-mono text-[0.72rem] text-muted',
      className,
    )}
  >
    {children}
  </span>
);

/** Larger pill used for the "currently interested in" group. */
export const Pill = ({ children, className }: TagProps) => (
  <span
    className={cn(
      'rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-ink-soft',
      className,
    )}
  >
    {children}
  </span>
);
