import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterBarProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the group of filters. */
  label: string;
}

export const FilterBar = ({ options, value, onChange, label }: FilterBarProps) => {
  const reduced = useReducedMotion();

  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;
        const disabled = option.count === 0;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative inline-flex min-h-[44px] items-center gap-2 rounded-control border px-4 text-sm font-medium transition-colors duration-200',
              selected
                ? 'border-accent bg-accent text-[#06080C]'
                : 'border-line-strong bg-surface text-ink-soft hover:border-subtle hover:text-ink',
              disabled && 'cursor-not-allowed opacity-40 hover:border-line-strong',
            )}
          >
            {option.label}
            <span
              className={cn(
                'font-mono text-[0.7rem]',
                selected ? 'text-[#06080C]/60' : 'text-subtle',
              )}
            >
              {option.count}
            </span>
            {selected && !reduced ? (
              <motion.span
                layoutId="filter-active"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-control ring-1 ring-accent"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
};
