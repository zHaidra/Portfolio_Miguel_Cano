import { createContext } from 'react';
import type { L10n, L10nList, Locale } from '@/types';

export interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Pick the current language out of a bilingual string. */
  t: (value: L10n) => string;
  /** Pick the current language out of a bilingual list. */
  tl: (value: L10nList) => string[];
}

/**
 * Lives in its own module (no components) so the provider and the hook can
 * both import it without tripping react-refresh's single-export rule.
 */
export const I18nContext = createContext<I18nValue | null>(null);

export const LOCALES: Locale[] = ['en', 'es'];

export const DEFAULT_LOCALE: Locale = 'en';

/** Key used to remember the visitor's choice between visits. */
export const STORAGE_KEY = 'portfolio:locale';

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as string[]).includes(value);
