import { motion, useReducedMotion } from 'framer-motion';
import type { Locale } from '@/types';
import { cn } from '@/utils/cn';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';

const options: Array<{ value: Locale; label: string; aria: keyof typeof ui }> = [
  { value: 'en', label: 'EN', aria: 'switchToEnglish' },
  { value: 'es', label: 'ES', aria: 'switchToSpanish' },
];

/**
 * EN / ES switch. Two real buttons rather than a select, so the current
 * language is visible at a glance and reachable in one tap.
 */
export const LanguageToggle = ({ className }: { className?: string }) => {
  const { locale, setLocale, t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <div
      role="group"
      aria-label={t(ui.languageSwitch)}
      className={cn(
        'relative flex items-center rounded-control border border-line-strong bg-surface p-0.5',
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === locale;

        return (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={selected}
            aria-label={t(ui[option.aria])}
            onClick={() => setLocale(option.value)}
            className={cn(
              // 44px tall on touch screens, trimmed on desktop where the
              // nav bar is tighter and pointers are precise.
              'relative z-10 inline-flex h-11 min-w-[2.6rem] items-center justify-center rounded-[0.45rem] px-2 font-mono text-[0.7rem] tracking-wide transition-colors duration-200 md:h-9 md:min-w-[2.4rem]',
              selected ? 'text-ink' : 'text-subtle hover:text-ink-soft',
            )}
          >
            {selected && !reduced ? (
              <motion.span
                layoutId="locale-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-[0.45rem] bg-raised"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
            {selected && reduced ? (
              <span aria-hidden="true" className="absolute inset-0 -z-10 rounded-[0.45rem] bg-raised" />
            ) : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
