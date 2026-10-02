import { useEffect, useState } from 'react';

/** Roughly the nav height — a section counts as "reached" once it passes this. */
const NAV_OFFSET = 96;

/**
 * Tracks which section is currently in view so the nav can highlight it.
 *
 * Deliberately not IntersectionObserver: ratio-based selection cannot pick
 * the final section, which is usually short and sits at the bottom of the
 * page where it never becomes the most-visible element. This reads
 * positions instead, throttled to one measurement per animation frame, and
 * snaps to the last section once the page is scrolled to the end.
 */
export const useActiveSection = (sectionIds: string[]): string => {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const scrollBottom = window.scrollY + window.innerHeight;
      const atEnd = scrollBottom >= document.documentElement.scrollHeight - 2;

      if (atEnd) {
        const last = sectionIds[sectionIds.length - 1];
        if (last) setActive(last);
        return;
      }

      let current = sectionIds[0] ?? '';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= NAV_OFFSET) {
          current = id;
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  return active;
};
