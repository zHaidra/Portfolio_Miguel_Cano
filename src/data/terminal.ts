import type { L10n, Locale, TerminalCommand } from '@/types';
import { site } from '@/data/site';
import { projects } from '@/data/projects';
import { experience, education } from '@/data/experience';
import { skillGroups } from '@/data/skills';

/** Pads a label so the terminal's two columns line up in a monospace font. */
const pad = (value: string, width: number): string =>
  value.length >= width ? value : value + ' '.repeat(width - value.length);

/** Command descriptions, shown by `help`. */
const descriptions: Record<string, L10n> = {
  help: { en: 'list available commands', es: 'lista los comandos disponibles' },
  about: { en: 'who I am, briefly', es: 'quién soy, en breve' },
  projects: { en: 'selected work', es: 'proyectos destacados' },
  skills: { en: 'what I build with', es: 'con qué trabajo' },
  experience: { en: 'where I have worked and studied', es: 'dónde he trabajado y estudiado' },
  contact: { en: 'how to reach me', es: 'cómo contactarme' },
  cv: { en: 'download my CV', es: 'descargar mi CV' },
  whoami: { en: 'a one-line answer', es: 'una respuesta de una línea' },
  clear: { en: 'wipe the screen', es: 'limpiar la pantalla' },
};

const strings = {
  shellTitle: {
    en: 'portfolio shell v1.0',
    es: 'shell del portfolio v1.0',
  },
  shellHint: {
    en: 'Type "help" to see what you can ask.',
    es: 'Escribe "help" para ver qué puedes preguntar.',
  },
  availableCommands: { en: 'Available commands:', es: 'Comandos disponibles:' },
  helpFooter: {
    en: 'Tab completes · ↑ ↓ walk history · Ctrl+L clears',
    es: 'Tab autocompleta · ↑ ↓ recorren el historial · Ctrl+L limpia',
  },
  role: { en: 'Software Developer.', es: 'Desarrollador de software.' },
  focus: {
    en: 'Backend, full-stack and AI.',
    es: 'Backend, full-stack e IA.',
  },
  coFounder: {
    en: 'Co-founder at',
    es: 'Cofundador en',
  },
  coFounderTail: {
    en: 'building automation systems for businesses.',
    es: 'construyendo sistemas de automatización para empresas.',
  },
  projectsFooter: {
    en: 'projects. Scroll up to the grid to filter and open them.',
    es: 'proyectos. Sube a la cuadrícula para filtrarlos y abrirlos.',
  },
  cvRun: { en: 'run "cv" to download', es: 'ejecuta "cv" para descargar' },
  opening: { en: 'Opening CV…', es: 'Abriendo el CV…' },
  notFound: { en: 'command not found:', es: 'comando no encontrado:' },
  didYouMean: { en: 'did you mean', es: 'quizá quisiste decir' },
  tryHelp: { en: 'try "help"', es: 'prueba con "help"' },
} satisfies Record<string, L10n>;

/** Error and suggestion lines, used by the Terminal component. */
export const terminalStrings = strings;

/**
 * Terminal commands are derived from the same data as the rest of the
 * site, so the shell can never drift out of sync with the page above it —
 * in either language.
 */
export const buildCommands = (locale: Locale): TerminalCommand[] => {
  const first = education[0];
  const grade = first?.grade?.[locale].match(/\(([^)]+)\)/)?.[1] ?? '';

  // Column width follows the longest title, so the two columns of `projects`
  // stay aligned in both languages however the project list changes.
  const titleWidth = Math.max(...projects.map((p) => p.title[locale].length)) + 3;

  const commands: TerminalCommand[] = [
    {
      name: 'about',
      description: descriptions.about?.[locale] ?? '',
      output: [
        `${site.name} — ${strings.role[locale]}`,
        strings.focus[locale],
        first
          ? `${first.qualification[locale]}, ${first.institution}${grade ? ` (${grade})` : ''}.`
          : '',
        `${strings.coFounder[locale]} ${experience[0]?.company ?? ''}, ${strings.coFounderTail[locale]}`,
        '',
        site.availability[locale],
      ],
    },
    {
      name: 'projects',
      description: descriptions.projects?.[locale] ?? '',
      output: [
        ...projects.map((p) => `${pad(p.title[locale], titleWidth)}${p.category[locale]}`),
        '',
        `${projects.length} ${strings.projectsFooter[locale]}`,
      ],
    },
    {
      name: 'skills',
      description: descriptions.skills?.[locale] ?? '',
      output: skillGroups.map(
        (g) => `${pad(g.title[locale].toLowerCase(), 22)}${g.items[locale].join(' · ')}`,
      ),
    },
    {
      name: 'experience',
      description: descriptions.experience?.[locale] ?? '',
      output: [
        ...experience.map((e) => `${pad(e.period[locale], 26)}${e.role[locale]}, ${e.company}`),
        '',
        ...education.map((e) => `${pad(e.period, 26)}${e.qualification[locale]}, ${e.institution}`),
      ],
    },
    {
      name: 'contact',
      description: descriptions.contact?.[locale] ?? '',
      output: [
        `${pad('email', 12)}${site.links.email}`,
        `${pad('linkedin', 12)}${site.links.linkedin}`,
        // Printed only when a GitHub URL is configured.
        ...(site.links.github ? [`${pad('github', 12)}${site.links.github}`] : []),
        `${pad('cv', 12)}${strings.cvRun[locale]}`,
      ],
    },
    {
      name: 'cv',
      description: descriptions.cv?.[locale] ?? '',
      output: [strings.opening[locale]],
    },
    {
      name: 'whoami',
      description: descriptions.whoami?.[locale] ?? '',
      output: [site.headline[locale]],
    },
    {
      name: 'clear',
      description: descriptions.clear?.[locale] ?? '',
      output: [],
    },
  ];

  // `help` is generated last so it always lists every command above it.
  const help: TerminalCommand = {
    name: 'help',
    description: descriptions.help?.[locale] ?? '',
    output: [
      strings.availableCommands[locale],
      '',
      ...commands.map((c) => `  ${pad(c.name, 13)}${c.description}`),
      '',
      strings.helpFooter[locale],
    ],
  };

  return [help, ...commands];
};

/** Lines printed when the terminal first mounts. */
export const terminalBanner = (locale: Locale): string[] => [
  `${site.name.toLowerCase().replace(/\s+/g, '-')} — ${strings.shellTitle[locale]}`,
  strings.shellHint[locale],
];
