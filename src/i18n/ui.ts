import type { L10n, Locale, ProjectCategory } from '@/types';

/**
 * ─────────────────────────────────────────────────────────────
 *  INTERFACE TEXT
 *  Every label, button and aria-label on the site. Content
 *  (projects, experience, about…) lives in `src/data/` instead.
 *
 *  Each entry is { en, es }. Add a key here, use it with
 *  `t(ui.myKey)` in a component.
 * ─────────────────────────────────────────────────────────────
 */
export const ui = {
  // ── Navigation & chrome ────────────────────────────────────
  skipToContent: { en: 'Skip to content', es: 'Saltar al contenido' },
  backToTop: { en: 'back to top', es: 'volver arriba' },
  getInTouch: { en: 'Get in touch', es: 'Contactar' },
  openMenu: { en: 'Open menu', es: 'Abrir menú' },
  closeMenu: { en: 'Close menu', es: 'Cerrar menú' },
  primaryNav: { en: 'Primary', es: 'Principal' },
  languageSwitch: { en: 'Change language', es: 'Cambiar idioma' },
  switchToEnglish: { en: 'Switch to English', es: 'Cambiar a inglés' },
  switchToSpanish: { en: 'Switch to Spanish', es: 'Cambiar a español' },

  // ── Hero ───────────────────────────────────────────────────
  viewProjects: { en: 'View projects', es: 'Ver proyectos' },
  downloadCv: { en: 'Download CV', es: 'Descargar CV' },
  linkedinProfile: { en: 'LinkedIn profile', es: 'Perfil de LinkedIn' },
  githubProfile: { en: 'GitHub profile', es: 'Perfil de GitHub' },
  workingWith: { en: 'Working with', es: 'Trabajo con' },
  statDegree: { en: 'BSc AI, Coventry', es: 'Grado en IA, Coventry' },
  statProjects: { en: 'Featured projects', es: 'Proyectos destacados' },
  statEnglish: { en: 'English · IELTS 6.5', es: 'Inglés · IELTS 6.5' },

  // ── About ──────────────────────────────────────────────────
  aboutEyebrow: { en: '01 / About', es: '01 / Sobre mí' },
  aboutTitle: { en: 'A bit about how I work', es: 'Un poco sobre cómo trabajo' },
  currentlyInterested: { en: 'Currently interested in', es: 'Ahora mismo me interesa' },

  // ── Skills ─────────────────────────────────────────────────
  skillsEyebrow: { en: '02 / Skills', es: '02 / Tecnologías' },
  skillsTitle: { en: 'Technical toolkit', es: 'Stack técnico' },
  skillsAside: {
    en: 'Grouped by what I actually reach for, not by tutorial order.',
    es: 'Agrupado por lo que uso de verdad, no por el orden de los tutoriales.',
  },

  // ── Experience & education ─────────────────────────────────
  experienceEyebrow: { en: '03 / Experience', es: '03 / Experiencia' },
  experienceTitle: { en: "Where I've built things", es: 'Dónde he construido cosas' },
  current: { en: 'Current', es: 'Actual' },
  educationEyebrow: { en: '04 / Education', es: '04 / Formación' },
  educationTitle: { en: 'Academic background', es: 'Formación académica' },
  languagesLabel: { en: 'Languages', es: 'Idiomas' },

  // ── Projects ───────────────────────────────────────────────
  projectsEyebrow: { en: '05 / Projects', es: '05 / Proyectos' },
  projectsTitle: { en: 'Selected work', es: 'Proyectos destacados' },
  projectsAside: {
    en: 'Everything here is driven by a single projects.ts data file — add a project and the filters update themselves.',
    es: 'Todo esto sale de un único archivo projects.ts — añades un proyecto y los filtros se actualizan solos.',
  },
  filterLabel: { en: 'Filter projects by category', es: 'Filtrar proyectos por categoría' },
  filterAll: { en: 'All', es: 'Todos' },
  seeDetails: { en: 'See the details', es: 'Ver detalles' },
  hideDetails: { en: 'Hide details', es: 'Ocultar detalles' },
  problem: { en: 'Problem', es: 'Problema' },
  myContribution: { en: 'My contribution', es: 'Mi aportación' },
  viewArchitecture: { en: 'View architecture', es: 'Ver arquitectura' },
  sourceCode: { en: 'source code', es: 'código fuente' },
  liveDemo: { en: 'live demo', es: 'demo en vivo' },

  // ── Architecture modal ─────────────────────────────────────
  systemArchitecture: { en: 'System architecture', es: 'Arquitectura del sistema' },
  closeDialog: { en: 'Close dialog', es: 'Cerrar diálogo' },
  contributionPrefix: { en: 'My contribution:', es: 'Mi aportación:' },
  liveSite: { en: 'Live site', es: 'Ver en vivo' },

  // ── Terminal ───────────────────────────────────────────────
  terminalEyebrow: { en: '06 / Terminal', es: '06 / Terminal' },
  terminalTitle: { en: 'Prefer a keyboard?', es: '¿Prefieres el teclado?' },
  terminalBody: {
    en: 'The whole CV is queryable from here. Type a command and hit enter. Tab completes, the arrow keys walk your history, and Ctrl+L clears the screen — the same as a real shell.',
    es: 'Todo el CV se puede consultar desde aquí. Escribe un comando y pulsa enter. Tab autocompleta, las flechas recorren el historial y Ctrl+L limpia la pantalla, igual que en una shell de verdad.',
  },
  terminalTry: { en: 'Try', es: 'Prueba' },
  terminalInputLabel: { en: 'Terminal command', es: 'Comando de terminal' },
  terminalPlaceholder: { en: 'type a command…', es: 'escribe un comando…' },
  terminalOutputLabel: { en: 'Terminal output', es: 'Salida de la terminal' },
  terminalHint: {
    en: 'tab completes · ↑↓ history · ctrl+L clear',
    es: 'tab autocompleta · ↑↓ historial · ctrl+L limpia',
  },

  // ── Contact ────────────────────────────────────────────────
  contactEyebrow: { en: '07 / Contact', es: '07 / Contacto' },
  contactTitle: { en: "Let's talk", es: 'Hablemos' },
  channelEmail: { en: 'Email', es: 'Correo' },
  channelLinkedin: { en: 'LinkedIn', es: 'LinkedIn' },
  channelGithub: { en: 'GitHub', es: 'GitHub' },
  channelCv: { en: 'CV', es: 'CV' },
} as const satisfies Record<string, L10n>;

/** Visible labels for the project filter keys. */
export const categoryLabels: Record<ProjectCategory, L10n> = {
  Backend: { en: 'Backend', es: 'Backend' },
  'Full-Stack': { en: 'Full-Stack', es: 'Full-Stack' },
  AI: { en: 'AI', es: 'IA' },
  Automation: { en: 'Automation', es: 'Automatización' },
  Algorithms: { en: 'Algorithms', es: 'Algoritmos' },
  Security: { en: 'Security', es: 'Seguridad' },
};

/** "Showing 3 of 5 projects in AI" — needs the numbers, so it is a function. */
export const showingProjects = (
  locale: Locale,
  shown: number,
  total: number,
  category: string | null,
): string =>
  locale === 'es'
    ? `Mostrando ${shown} de ${total} proyectos${category ? ` en ${category}` : ''}`
    : `Showing ${shown} of ${total} projects${category ? ` in ${category}` : ''}`;

/** "3 commands this session", with Spanish pluralisation. */
export const commandCount = (locale: Locale, count: number): string =>
  locale === 'es'
    ? `${count} comando${count === 1 ? '' : 's'} en esta sesión`
    : `${count} command${count === 1 ? '' : 's'} this session`;
