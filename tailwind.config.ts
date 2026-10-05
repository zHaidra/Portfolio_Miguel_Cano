import type { Config } from 'tailwindcss';

/**
 * Design tokens. These mirror the "Design tokens" artboard one-to-one —
 * change a value here and it changes everywhere on the site.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Named `canvas`, not `base`: a colour called `base` would collide
        // with Tailwind's built-in `text-base` font-size utility, and the
        // colour silently wins — painting text in the page background.
        canvas: '#0A0B0D',
        surface: '#101318',
        raised: '#181C23',
        line: '#1E222A',
        'line-strong': '#2B313A',
        muted: '#9AA3AF',
        subtle: '#808894',
        ink: '#EDEFF2',
        'ink-soft': '#B4BCC7',
        accent: {
          DEFAULT: '#4F8CFF',
          soft: '#8FB8FF',
        },
        warm: {
          DEFAULT: '#E8925C',
          soft: '#F0A878',
        },
        signal: {
          DEFAULT: '#48C88C',
          soft: '#6FD9A8',
        },
        violet: {
          DEFAULT: '#A78BFA',
          soft: '#BCA6FB',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      borderRadius: {
        card: '1rem',
        control: '0.625rem',
      },
      maxWidth: {
        shell: '80rem',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        blink: 'blink 1.05s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
