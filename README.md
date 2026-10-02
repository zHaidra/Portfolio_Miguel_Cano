# Miguel Cano Domingo — Developer Portfolio

A static, single-page portfolio built to show engineering ability rather than just describe it:
project filtering, an interactive terminal that queries the site's own data, an expandable
architecture view rendered from components, and a full English / Spanish translation.

**Stack:** React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · Framer Motion 11
**Languages:** English and Spanish, switchable in the nav
**Hosting:** fully static, deploys to GitHub Pages. No backend, no database, no runtime API calls.

---

## Contents

- [Quick start](#quick-start)
- [Editing your content](#editing-your-content)
- [Translations (EN / ES)](#translations-en--es)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Project structure](#project-structure)
- [Design and architecture decisions](#design-and-architecture-decisions)
- [Accessibility](#accessibility)
- [Before you publish](#before-you-publish)

---

## Quick start

Requires Node 20 or newer.

```bash
npm install     # install dependencies
npm run dev     # local dev server at http://localhost:5173
```

Other scripts:

| Script              | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                        |
| `npm run build`     | Typecheck (`tsc -b`) then build to `dist/`        |
| `npm run preview`   | Serve the production build locally                |
| `npm run lint`      | ESLint, including `jsx-a11y` accessibility rules  |
| `npm run typecheck` | TypeScript only, no build                         |
| `npm run deploy`    | Build and push `dist/` to the `gh-pages` branch   |

---

## Editing your content

**All content lives in `src/data/`. You should never need to touch a component to change what the
site says.**

| File                    | Holds                                                                |
| ----------------------- | -------------------------------------------------------------------- |
| `src/data/site.ts`      | **Start here.** Name, headline, email, LinkedIn, GitHub, CV filename, About paragraphs, interests, languages, nav items |
| `src/i18n/ui.ts`        | Every button, label and aria-label on the site, in both languages          |
| `src/data/projects.ts`  | Every project card, its filter tags, and the architecture diagram     |
| `src/data/experience.ts`| Work history and education                                            |
| `src/data/skills.ts`    | Skill groups shown in the Skills section                              |
| `src/data/terminal.ts`  | Terminal commands — **derived from the files above**, so it stays in sync |

Everything is typed against `src/types/index.ts`, so a mistake shows up as a TypeScript error
rather than a blank space on the page — including a translation you forgot to write.

---

## Translations (EN / ES)

The site ships in English and Spanish with a switch in the nav. English is the default; a visitor
whose browser is set to Spanish gets Spanish on their first visit, and whatever they pick is
remembered in `localStorage`.

**Anything a visitor reads is written as a pair:**

```ts
title: {
  en: 'Secure E-Commerce Website',
  es: 'Web de e-commerce segura',
},
```

Lists work the same way, with one array per language:

```ts
highlights: {
  en: ['Built and maintained web applications…'],
  es: ['Desarrollo y mantenimiento de aplicaciones web…'],
},
```

Names, URLs and technology names stay as plain strings — `'PostgreSQL'` is `'PostgreSQL'` in both
languages, so translating it would just be noise.

**Where each kind of text lives**

| Text                                   | File                |
| -------------------------------------- | ------------------- |
| Buttons, labels, aria-labels, headings | `src/i18n/ui.ts`    |
| Your actual content                    | `src/data/*.ts`     |
| Terminal commands and their output     | `src/data/terminal.ts` (built per language from the data files) |

**TypeScript enforces it.** `L10n` is `{ en: string; es: string }`, so if you add a project and
forget the Spanish title, the build fails rather than shipping a half-translated page.

**Adding a third language** means widening `Locale` in `src/types/index.ts` (e.g. `'en' | 'es' |
'fr'`), after which TypeScript lists every string still missing a translation. Then add the option
to `src/components/LanguageToggle.tsx` and `LOCALES` in `src/i18n/context.ts`.

**How the switch works.** `src/i18n/I18nProvider.tsx` holds the current language, writes it to
`<html lang>`, and keeps `document.title`, the meta description and the Open Graph tags in sync, so
the page a search engine or a link preview sees matches what is on screen. Components read it with
`useI18n()`, which gives `t()` for a string and `tl()` for a list.

---

### Adding a project

Append an object to the `projects` array in `src/data/projects.ts`:

```ts
{
  id: 'my-project',                    // unique
  title: 'My Project',
  category: 'Backend / APIs',          // free text shown on the badge
  tags: ['Backend', 'Automation'],     // which filters it answers to
  description: 'One or two sentences.',
  problem: 'What problem it solves.',
  contribution: 'What you personally did.',
  tech: ['Python', 'PostgreSQL'],
  tone: 'accent',                      // accent | warm | signal | violet
  links: { code: 'https://github.com/...' },   // optional
}
```

The filter counts, the grid and the terminal's `projects` command all update on their own. To add a
new filter button, add the value to `ProjectCategory` in `src/types/index.ts` and to
`projectCategories` in `projects.ts`.

### Adding an architecture view

Any project can have one — add an `architecture` key (see `risesense` in `projects.ts` for a full
example). A "View architecture" button appears on that card automatically.

### Replacing the CV

Drop your PDF at `public/Miguel-Cano-CV.pdf`, keeping the filename — or change `site.cv.file` in
`src/data/site.ts` to match your own. The file currently there is a **placeholder**.

### Changing the look

Colours, fonts, radii and the two keyframes are all in `tailwind.config.ts` under `theme.extend`.
Change a token there and it changes everywhere; nothing else hard-codes a brand colour.

---

## Deploying to GitHub Pages

The **base path** is the one thing that has to be right, or you get a blank page and 404s on every
asset. It is set in `vite.config.ts` and can be overridden with the `BASE_PATH` environment
variable.

### Option A — GitHub Actions (recommended)

`.github/workflows/deploy.yml` is already included. It lints, builds with the correct base path
derived from your repository name, and publishes.

1. Push this project to a GitHub repository.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow runs and your site appears at
   `https://<username>.github.io/<repo>/`.

Nothing else to configure — the workflow sets `BASE_PATH=/<repo>/` for you.

### Option B — manual, via the `gh-pages` branch

```bash
npm run deploy
```

This builds and pushes `dist/` to a `gh-pages` branch. Then set **Settings → Pages → Source:
Deploy from a branch → `gh-pages` / root**.

With this option the base path comes from `vite.config.ts`, so edit this line to match your repo
name:

```ts
const BASE_PATH = process.env.BASE_PATH ?? '/miguel-cano-portfolio/';
```

### If you use a user site (`<username>.github.io`)

The site lives at the domain root, so the base path must be `/`:

```bash
BASE_PATH=/ npm run build
```

…or change the default in `vite.config.ts` to `'/'`.

### Why there are no routing problems

The site is a single page with in-page anchors (`#about`, `#projects`, …) rather than a client-side
router. GitHub Pages has no SPA fallback, so a router would 404 on refresh at any sub-path. Anchors
avoid that entirely. A `.nojekyll` file is included so Pages serves the `assets/` directory as-is.

---

## Project structure

```
.
├─ .github/workflows/deploy.yml   GitHub Pages CI
├─ public/
│  ├─ Miguel-Cano-CV.pdf          placeholder — replace with your CV
│  ├─ favicon.svg
│  └─ .nojekyll                   stops Pages running Jekyll over the build
├─ index.html                     SEO, Open Graph, font preconnect
├─ src/
│  ├─ components/                 reusable, presentational
│  │  ├─ ArchitectureDiagram.tsx  the layered system view
│  │  ├─ Button.tsx  FilterBar.tsx  Footer.tsx  Icon.tsx
│  │  ├─ LanguageToggle.tsx       the EN / ES switch
│  │  ├─ Modal.tsx                focus-trapped dialog
│  │  ├─ Nav.tsx                  desktop + mobile navigation
│  │  ├─ ProjectCard.tsx  Section.tsx  Tag.tsx
│  │  └─ Terminal.tsx             the interactive shell
│  ├─ sections/                   one file per page section
│  │  ├─ Hero.tsx  About.tsx  Skills.tsx  Experience.tsx
│  │  ├─ Projects.tsx  TerminalSection.tsx  Contact.tsx
│  ├─ data/                       ← all content lives here, in both languages
│  ├─ i18n/
│  │  ├─ context.ts               locale constants + React context
│  │  ├─ I18nProvider.tsx         current language, persistence, <html lang>, SEO tags
│  │  └─ ui.ts                    ← every interface string, EN + ES
│  ├─ hooks/
│  │  ├─ useActiveSection.ts      nav highlighting
│  │  ├─ useI18n.ts               t() and tl()
│  │  ├─ useFocusTrap.ts          modal keyboard containment
│  │  └─ useScrollLock.ts         background scroll lock
│  ├─ types/index.ts              every shared interface
│  ├─ utils/                      cn(), motion variants, tone → classes
│  ├─ App.tsx  main.tsx  index.css
├─ tailwind.config.ts             design tokens
└─ vite.config.ts                 base path, aliases, chunking
```

The rule throughout: **`data/` holds content, `i18n/` holds interface text, `components/` holds
presentation, `sections/` composes them.** No component reaches for content that was not passed to
it or imported from `data/`, and no component contains a hard-coded user-facing string.

---

## Design and architecture decisions

**Data is separated from presentation.** Everything the site says comes from a handful of typed
files. This
is what makes the terminal honest — `buildCommands()` reads the same arrays the page renders, so
`experience` in the shell can never disagree with the Experience section.

**The terminal is real.** It parses input, keeps a command history you walk with ↑/↓, completes on
Tab, clears on Ctrl+L, and suggests the nearest command (Levenshtein distance) when you mistype.
Output is inside an `aria-live` log so screen readers hear results.

**The architecture view is composed, not drawn.** Each layer is a real element with selectable text,
so it reflows from a row into a stack on narrow screens. A single `<svg>` or an image would do
neither.

**Animation is one shared vocabulary.** All variants live in `src/utils/motion.ts` — short
durations, one easing curve, no bounce. Every animated component checks Framer Motion's
`useReducedMotion`, and `index.css` additionally disables transitions and smooth scroll under
`prefers-reduced-motion`.

**Nav highlighting reads positions, not intersection ratios.** An `IntersectionObserver` that picks
the "most visible" section can never select the last one, which is short and sits at the bottom of
the page. This implementation measures on scroll (throttled to one measurement per animation frame)
and snaps to the final section at the end of the page.

**Translation without a library.** Two languages did not justify i18next and its runtime, loaders
and plugin surface. Bilingual values typed as `{ en, es }` give compile-time safety that a key-based
library cannot — a missing Spanish string is a build error, not a key echoed on the page at runtime —
and cost about 60 lines of code.

**Bundle.** Framer Motion is split into its own chunk so it does not block first paint. Production
build is roughly 202 kB + 123 kB of JS before gzip, plus ~25 kB of CSS, with both languages
included. No icon library, no utility library, no i18n library, no router — icons are inline SVG
and `cn()` is four lines.

**Colour contrast was checked, not eyeballed.** Every text/background pair in the palette meets
WCAG AA (4.5:1); the two grey tokens were lightened from the original design until they did.

---

## Accessibility

- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`, ordered headings.
- "Skip to content" as the first tab stop.
- Full keyboard path: the modal traps focus, closes on Escape, and restores focus on close.
- Every control is a real `button` or `a`; icon-only controls carry `aria-label`.
- Filter state uses `aria-pressed`; the result count is announced with `aria-live`.
- Touch targets are at least 44 px.
- Visible focus ring on every interactive element.
- `prefers-reduced-motion` respected in both JS and CSS.
- `<html lang>` follows the selected language, so screen readers switch pronunciation.

Verified in a headless browser at 1440 / 834 / 390 px, in both languages: no horizontal overflow at
any width, no console errors, all interactions working, and no English text left on the Spanish
page.

---

## Before you publish

A short checklist — three placeholders are deliberately left in:

- [ ] **`src/data/site.ts`** — there is deliberately no GitHub link. If you publish an account later,
      uncomment the `github` line in both `links` and `handles`; the hero button, the contact card and
      the terminal's `contact` command reappear on their own.
- [ ] **`public/Miguel-Cano-CV.pdf`** — replace the placeholder with your real CV.
- [ ] **`index.html`** — replace `REPLACE-ME.github.io` in the two Open Graph URLs with your live
      address, and add an `og-image.png` (1200×630) to `public/` if you want a social preview image.
- [ ] Add `links.code` / `links.demo` to any project in `projects.ts` that has a public repo.
- [ ] Check `vite.config.ts` `BASE_PATH` matches your repo name (or use the Actions workflow, which
      handles it).
- [ ] Read through the Spanish copy in `src/data/site.ts` and `src/i18n/ui.ts` — it is your voice,
      so change anything that does not sound like you.

---

Built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.
