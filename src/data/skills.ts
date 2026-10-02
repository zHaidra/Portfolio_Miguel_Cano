import type { L10n, SkillGroup } from '@/types';

/**
 * Skills, grouped for reading rather than by taxonomy.
 * Only list what you actually work with.
 *
 * Lists are translated as a whole because they mix proper nouns
 * ("PostgreSQL", unchanged) with phrases ("Database Management").
 * Keep both arrays the same length and in the same order.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: { en: 'Languages', es: 'Lenguajes' },
    icon: 'code',
    tone: 'accent',
    items: {
      en: ['Java', 'Python', 'JavaScript', 'C++', 'SQL', 'TypeScript'],
      es: ['Java', 'Python', 'JavaScript', 'C++', 'SQL', 'TypeScript'],
    },
  },
  {
    id: 'backend',
    title: { en: 'Backend & APIs', es: 'Backend y APIs' },
    icon: 'server',
    tone: 'warm',
    items: {
      en: [
        'Backend Development',
        'REST APIs',
        'API Integrations',
        'Software Architecture',
        'Full-Stack Development',
      ],
      es: [
        'Desarrollo backend',
        'APIs REST',
        'Integración de APIs',
        'Arquitectura de software',
        'Desarrollo full-stack',
      ],
    },
  },
  {
    id: 'ai',
    title: { en: 'AI & Data', es: 'IA y datos' },
    icon: 'brain',
    tone: 'violet',
    items: {
      en: [
        'Machine Learning',
        'Artificial Neural Networks',
        'Intelligent Agents',
        'AI-assisted Development',
        'Automation',
      ],
      es: [
        'Machine Learning',
        'Redes neuronales artificiales',
        'Agentes inteligentes',
        'Desarrollo asistido por IA',
        'Automatización',
      ],
    },
  },
  {
    id: 'databases',
    title: { en: 'Databases', es: 'Bases de datos' },
    icon: 'database',
    tone: 'signal',
    items: {
      en: ['PostgreSQL', 'MySQL', 'Database Management'],
      es: ['PostgreSQL', 'MySQL', 'Gestión de bases de datos'],
    },
  },
  {
    id: 'frontend',
    title: { en: 'Frontend', es: 'Frontend' },
    icon: 'layout',
    tone: 'accent',
    items: {
      en: ['Frontend Development', 'HTML', 'CSS', 'Responsive UI'],
      es: ['Desarrollo frontend', 'HTML', 'CSS', 'Interfaces responsive'],
    },
  },
  {
    id: 'foundations',
    title: { en: 'Tools & Foundations', es: 'Herramientas y fundamentos' },
    icon: 'tools',
    tone: 'warm',
    items: {
      en: [
        'Git',
        'n8n',
        'Cloud Computing',
        'Cybersecurity',
        'Networking',
        'Data Structures & Algorithms',
      ],
      es: [
        'Git',
        'n8n',
        'Cloud computing',
        'Ciberseguridad',
        'Redes',
        'Estructuras de datos y algoritmos',
      ],
    },
  },
];

/**
 * Shown under the skills grid. Keeps the site's own stack distinct
 * from professional experience.
 */
export const skillsFootnote: L10n = {
  en: 'This site is built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.',
  es: 'Esta web está hecha con React, TypeScript, Vite, Tailwind CSS y Framer Motion.',
};

/** Technology strip under the hero. Proper nouns — the same in both languages. */
export const heroStack: string[] = [
  'Java',
  'Python',
  'REST APIs',
  'PostgreSQL',
  'MySQL',
  'n8n',
  'Machine Learning',
  'Git',
];
