import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L10n, L10nList, Locale } from '@/types';
import {
  DEFAULT_LOCALE,
  I18nContext,
  STORAGE_KEY,
  isLocale,
  type I18nValue,
} from '@/i18n/context';
import { site } from '@/data/site';

/**
 * Picks the starting language: a previous choice wins, then the browser's
 * preference, then English. Reading localStorage can throw in private mode,
 * so it is guarded.
 */
const detectLocale = (): Locale => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage unavailable — fall through to the browser preference.
  }

  const preferred = window.navigator.languages ?? [window.navigator.language];
  for (const tag of preferred) {
    if (typeof tag === 'string' && tag.toLowerCase().startsWith('es')) return 'es';
  }

  return DEFAULT_LOCALE;
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Resolve after mount so the first render matches the server-rendered
  // markup and nothing flashes in the wrong language.
  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not being able to remember the choice is not worth failing over.
    }
  }, []);

  // Keep the document in sync: screen readers and search engines both read
  // `lang`, and the title/description should match what is on screen.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = site.seo.title[locale];

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', site.seo.description[locale]);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    ogTitle?.setAttribute('content', site.seo.title[locale]);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogDescription?.setAttribute('content', site.seo.description[locale]);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    ogLocale?.setAttribute('content', locale === 'es' ? 'es_ES' : 'en_GB');
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: (entry: L10n) => entry[locale],
      tl: (entry: L10nList) => entry[locale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
