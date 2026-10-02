/** Shared domain types. Every data file in `src/data` is typed against these. */

/** The two languages the site ships in. English is the default. */
export type Locale = 'en' | 'es';

/** A string that exists in both languages. */
export type L10n = Record<Locale, string>;

/** A list of strings that exists in both languages. */
export type L10nList = Record<Locale, string[]>;

/**
 * Filter buckets shown above the projects grid. These are KEYS, not labels —
 * their visible text is translated in `src/i18n/ui.ts`.
 */
export type ProjectCategory =
  | 'Backend'
  | 'Full-Stack'
  | 'AI'
  | 'Automation'
  | 'Algorithms'
  | 'Security';

/** Accent used for a project's category badge. */
export type Tone = 'accent' | 'warm' | 'signal' | 'violet';

export interface ArchitectureNode {
  /** Layer name, e.g. "REST API". */
  name: L10n;
  /** One line on what the layer is responsible for. */
  summary: L10n;
  /** Short technology note. Product names, so usually not translated. */
  detail?: L10n;
  /** Visually marks the layer the project is really about. */
  emphasis?: boolean;
  /** Dashed border — used for things outside the system's own boundary. */
  external?: boolean;
  tone: Tone;
}

export interface Architecture {
  /** Sentence framing the diagram, shown under the modal title. */
  intro: L10n;
  /** Layers in request order. Rendered as a flow with arrows between them. */
  nodes: ArchitectureNode[];
  /** What the author personally did, shown in the modal footer. */
  contribution: L10n;
}

export interface Project {
  /** Stable key — also used as the React list key. */
  id: string;
  title: L10n;
  /** Label shown on the card badge, e.g. "AI / Machine Learning". */
  category: L10n;
  /** Which filters this project answers to. */
  tags: ProjectCategory[];
  /** One or two sentences: what it is. */
  description: L10n;
  /** The problem it solves. Shown in expanded details. */
  problem: L10n;
  /** What the author personally contributed. Shown in expanded details. */
  contribution: L10n;
  /** Technologies actually used. Proper nouns — not translated. */
  tech: string[];
  tone: Tone;
  /** Optional links. Omit a field and its button is not rendered. */
  links?: {
    code?: string;
    demo?: string;
  };
  /** Present only on projects with an architecture view. */
  architecture?: Architecture;
}

export interface ExperienceItem {
  id: string;
  role: L10n;
  /** Company name — not translated. */
  company: string;
  period: L10n;
  current?: boolean;
  summary: L10n;
  highlights: L10nList;
  /** Technology names — not translated. */
  tech: string[];
}

export interface EducationItem {
  id: string;
  qualification: L10n;
  /** Institution name — not translated. */
  institution: string;
  /** Years, identical in both languages. */
  period: string;
  grade?: L10n;
  /** Short note shown instead of / alongside the subject list. */
  note?: L10n;
  subjects?: L10nList;
}

export interface SkillGroup {
  id: string;
  title: L10n;
  /** Key into the icon map in `components/Icon.tsx`. */
  icon: 'code' | 'server' | 'brain' | 'database' | 'layout' | 'tools';
  tone: Tone;
  /** Mixed proper nouns and phrases, so the whole list is translated. */
  items: L10nList;
}

export interface NavItem {
  /** Target section id, without the leading '#'. */
  id: string;
  label: L10n;
}

export interface TerminalCommand {
  name: string;
  /** Shown by `help`. */
  description: string;
  /** Lines printed when the command runs. Empty string = blank line. */
  output: string[];
}
