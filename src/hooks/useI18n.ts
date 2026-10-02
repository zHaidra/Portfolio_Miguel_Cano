import { useContext } from 'react';
import { I18nContext, type I18nValue } from '@/i18n/context';

/**
 * Current language plus the two helpers used everywhere:
 * `t()` for a bilingual string, `tl()` for a bilingual list.
 */
export const useI18n = (): I18nValue => {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error('useI18n must be used inside <I18nProvider>');
  }

  return value;
};
