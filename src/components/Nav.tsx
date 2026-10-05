import { useCallback, useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Icon } from '@/components/Icon';
import { LanguageToggle } from '@/components/LanguageToggle';
import { cn } from '@/utils/cn';
import { navItems, site } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';

const sectionIds = navItems.map((item) => item.id);

export const Nav = () => {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const menuId = useId();
  const { t } = useI18n();

  useScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and whenever the viewport grows.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const media = window.matchMedia('(min-width: 768px)');
    const onChange = () => media.matches && setOpen(false);

    document.addEventListener('keydown', onKeyDown);
    media.addEventListener('change', onChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      media.removeEventListener('change', onChange);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-line bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-shell items-center justify-between px-5 sm:px-8 lg:px-16">
        <a
          href="#top"
          className="-ml-1 flex min-h-[44px] items-center gap-3 rounded-md px-1"
          aria-label={`${site.shortName} — ${t(ui.backToTop)}`}
        >
          <span
            aria-hidden="true"
            className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-line-strong bg-raised font-mono text-[13px] text-accent"
          >
            {site.initials}
          </span>
          <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em]">
            {site.shortName}
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label={t(ui.primaryNav)} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative inline-flex h-11 items-center rounded-md px-3 text-sm transition-colors',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {t(item.label)}
                    {isActive ? (
                      <motion.span
                        layoutId={reduced ? undefined : 'nav-active'}
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
            <li className="ml-2">
              <LanguageToggle />
            </li>
            <li className="ml-1">
              <a
                href={`mailto:${site.links.email}`}
                className="inline-flex h-10 items-center rounded-control bg-ink px-4 text-sm font-medium text-canvas transition-colors hover:bg-white"
              >
                {t(ui.getInTouch)}
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile: language switch stays reachable without opening the menu. */}
        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink-soft"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t(ui.closeMenu) : t(ui.openMenu)}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id={menuId}
            aria-label={t(ui.primaryNav)}
            className="overflow-hidden border-t border-line bg-canvas md:hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? {} : { height: 'auto', opacity: 1 }}
            exit={reduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="mx-auto flex max-w-shell flex-col gap-1 px-5 py-4 sm:px-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={close}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'flex min-h-[44px] items-center rounded-control px-3 text-base transition-colors',
                      active === item.id ? 'bg-raised text-ink' : 'text-muted',
                    )}
                  >
                    {t(item.label)}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={`mailto:${site.links.email}`}
                  onClick={close}
                  className="flex min-h-[48px] items-center justify-center rounded-control bg-ink px-4 font-medium text-canvas"
                >
                  {t(ui.getInTouch)}
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
