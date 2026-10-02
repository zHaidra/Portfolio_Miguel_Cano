import type { L10n, L10nList, NavItem } from '@/types';

/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE FIRST.
 *  Name, headline, contact details and links all live here.
 *  Nothing else in the codebase hard-codes them.
 *
 *  Anything the visitor reads is written as { en, es }.
 *  Names, URLs and technology names stay as plain strings.
 * ─────────────────────────────────────────────────────────────
 */
interface Site {
  name: string;
  shortName: string;
  initials: string;
  headline: L10n;
  positioning: L10n;
  intro: L10n;
  availability: L10n;
  seo: { title: L10n; description: L10n };
  /** `github` is optional — leave it out and every GitHub link disappears. */
  links: { email: string; linkedin: string; github?: string };
  handles: { linkedin: string; github?: string };
  cv: { file: string };
  languages: Array<{ name: L10n; level: L10n }>;
  interests: L10nList;
  about: L10nList;
  colophon: L10n;
}

export const site: Site = {
  name: 'Miguel Cano Domingo',
  shortName: 'Miguel Cano',
  /** Used in the nav mark and the favicon. */
  initials: 'm',

  headline: {
    en: 'Software Developer focused on Backend, Full-Stack & AI',
    es: 'Desarrollador de software especializado en Backend, Full-Stack e IA',
  },
  positioning: {
    en: 'AI · Automation · Backend Integrations · APIs · Databases · Software Architecture',
    es: 'IA · Automatización · Integraciones backend · APIs · Bases de datos · Arquitectura de software',
  },
  intro: {
    en: 'I build practical software, intelligent automations, backend integrations and AI-powered solutions.',
    es: 'Desarrollo software práctico, automatizaciones inteligentes, integraciones de backend y soluciones basadas en IA.',
  },
  availability: {
    en: 'Open to graduate, junior and early-career software engineering opportunities.',
    es: 'Disponible para puestos junior y de recién titulado en ingeniería de software.',
  },

  seo: {
    title: {
      en: 'Miguel Cano Domingo | Software Developer',
      es: 'Miguel Cano Domingo | Desarrollador de Software',
    },
    description: {
      en: 'Software Developer focused on Backend, Full-Stack, AI and Automation.',
      es: 'Desarrollador de software especializado en Backend, Full-Stack, IA y Automatización.',
    },
  },

  /**
   * Contact + social.
   *
   * There is no GitHub link on purpose. To add one later, uncomment the
   * `github` line in BOTH objects below — the hero button, the contact card
   * and the terminal's `contact` command all appear on their own.
   */
  links: {
    email: 'mcanodomingo@gmail.com',
    linkedin: 'https://www.linkedin.com/in/miguel-cano-domingo-2231181bb/',
    // github: 'https://github.com/your-username',
  },

  /** Display text for the contact cards. */
  handles: {
    linkedin: '/in/miguel-cano-domingo',
    // github: 'your-username',
  },

  /**
   * CV lives in /public and is served from the site's base path,
   * so it keeps working under a GitHub Pages subdirectory.
   */
  cv: {
    file: 'Miguel-Cano-CV.pdf',
  },

  languages: [
    {
      name: { en: 'Spanish', es: 'Español' },
      level: { en: 'Native', es: 'Nativo' },
    },
    {
      name: { en: 'English', es: 'Inglés' },
      level: { en: 'C1 · IELTS 6.5', es: 'C1 · IELTS 6.5' },
    },
  ],

  /** Badge group under the About section. */
  interests: {
    en: [
      'Backend Engineering',
      'Full-Stack Development',
      'AI Engineering',
      'Automation',
      'Graduate Software Engineering',
    ],
    es: [
      'Ingeniería backend',
      'Desarrollo full-stack',
      'Ingeniería de IA',
      'Automatización',
      'Programas de graduados en ingeniería',
    ],
  },

  /**
   * About copy. Two or three short paragraphs, first person.
   * Rewrite freely — nothing here is generated at runtime.
   */
  about: {
    en: [
      'I like building software that solves real problems and makes the work easier. I have worked with APIs, databases, automations, chatbots and appointment systems, usually connecting different tools so they work together in a way that is simple and reliable.',
      'My background is focused on Artificial Intelligence, with experience in machine learning and intelligent agents, but I am just as interested in everything around them: backend, data modelling, integrations, architecture, and how to make a system work well from end to end.',
      'I have worked on both frontend and backend on real projects, and I usually pick up new technologies quickly when a project calls for it. I am a co-founder of RiseSense, where I build automation solutions and software for businesses.',
    ],
    es: [
      'Me gusta construir software que resuelva problemas reales y haga el trabajo más fácil. He trabajado con APIs, bases de datos, automatizaciones, chatbots y sistemas de citas, normalmente conectando distintas herramientas para que funcionen juntas de forma simple y fiable.',
      'Mi formación está centrada en Inteligencia Artificial, con experiencia en machine learning y agentes inteligentes, pero también me interesa mucho todo lo que hay alrededor: backend, modelado de datos, integraciones, arquitectura y cómo hacer que un sistema funcione bien de principio a fin.',
      'He trabajado tanto en frontend como en backend en proyectos reales y suelo aprender tecnologías nuevas rápido cuando el proyecto lo requiere. Actualmente cofundé RiseSense, donde desarrollo soluciones de automatización y software para negocios.',
    ],
  },

  /** Footnote in the footer — keeps the TypeScript claim honest. */
  colophon: {
    en: 'Built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.',
    es: 'Hecho con React, TypeScript, Vite, Tailwind CSS y Framer Motion.',
  },
};

export const navItems: NavItem[] = [
  { id: 'about', label: { en: 'About', es: 'Sobre mí' } },
  { id: 'skills', label: { en: 'Skills', es: 'Tecnologías' } },
  { id: 'experience', label: { en: 'Experience', es: 'Experiencia' } },
  { id: 'projects', label: { en: 'Projects', es: 'Proyectos' } },
  { id: 'terminal', label: { en: 'Terminal', es: 'Terminal' } },
  { id: 'contact', label: { en: 'Contact', es: 'Contacto' } },
];

/** Resolves a /public asset against the deployed base path. */
export const asset = (file: string): string => `${import.meta.env.BASE_URL}${file}`;

export const cvHref = (): string => asset(site.cv.file);
