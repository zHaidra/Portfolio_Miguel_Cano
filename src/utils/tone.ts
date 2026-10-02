import type { Tone } from '@/types';

interface ToneClasses {
  /** Text colour for icons and small labels. */
  text: string;
  /** Badge: tinted background + border + readable text. */
  badge: string;
  /** Border only, for emphasised containers. */
  border: string;
}

/**
 * Tailwind cannot see class names built at runtime, so every variant is
 * written out in full here. One place to change a category's colour.
 */
const map: Record<Tone, ToneClasses> = {
  accent: {
    text: 'text-accent-soft',
    badge: 'bg-accent/10 border-accent/30 text-accent-soft',
    border: 'border-accent/60',
  },
  warm: {
    text: 'text-warm-soft',
    badge: 'bg-warm/10 border-warm/30 text-warm-soft',
    border: 'border-warm/60',
  },
  signal: {
    text: 'text-signal-soft',
    badge: 'bg-signal/10 border-signal/30 text-signal-soft',
    border: 'border-signal/60',
  },
  violet: {
    text: 'text-violet-soft',
    badge: 'bg-violet/10 border-violet/30 text-violet-soft',
    border: 'border-violet/60',
  },
};

export const toneClasses = (tone: Tone): ToneClasses => map[tone];
