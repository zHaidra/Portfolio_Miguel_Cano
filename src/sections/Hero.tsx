import { motion, useReducedMotion } from 'framer-motion';
import { ButtonLink } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { cvHref, site } from '@/data/site';
import { projects } from '@/data/projects';
import { heroStack } from '@/data/skills';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';
import { childReveal, staggerChildren } from '@/utils/motion';

/** The code card beside the headline. Content mirrors src/data/site.ts. */
const ProfileCard = () => (
  <div className="overflow-hidden rounded-card border border-line bg-[#101318] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
    <div className="flex h-10 items-center gap-2.5 border-b border-line bg-[#14171D] px-4">
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
      <span className="ml-2 font-mono text-[0.7rem] text-subtle">profile.ts</span>
    </div>
    {/* Code is shown as code — identifiers stay in English in both locales. */}
    <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.78rem] leading-[1.85] text-ink-soft">
      <code>
        <span className="text-subtle">const</span> <span className="text-warm-soft">engineer</span>{' '}
        = {'{'}
        {'\n'}  <span className="text-subtle">name</span>:{' '}
        <span className="text-signal-soft">&#39;{site.name}&#39;</span>,{'\n'}{' '}
        <span className="text-subtle">focus</span>: [
        <span className="text-signal-soft">&#39;backend&#39;</span>,{' '}
        <span className="text-signal-soft">&#39;full-stack&#39;</span>,{' '}
        <span className="text-signal-soft">&#39;ai&#39;</span>],{'\n'}{' '}
        <span className="text-subtle">degree</span>:{' '}
        <span className="text-signal-soft">&#39;BSc Artificial Intelligence&#39;</span>,{'\n'}{' '}
        <span className="text-subtle">building</span>:{' '}
        <span className="text-signal-soft">&#39;RiseSense&#39;</span>,{'\n'}{' '}
        <span className="text-subtle">available</span>: <span className="text-accent">true</span>,
        {'\n'}
        {'}'};
      </code>
    </pre>
  </div>
);

export const Hero = () => {
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  const stats = [
    { value: '2:1', label: t(ui.statDegree) },
    { value: `${projects.length}`, label: t(ui.statProjects) },
    { value: 'C1', label: t(ui.statEnglish) },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-[4.5rem]">
      {/* Two soft glows. Decorative, and kept far below text contrast. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-56 h-[42rem] w-[60rem] rounded-full bg-accent/[0.13] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-24 h-[34rem] w-[42rem] rounded-full bg-warm/[0.09] blur-[120px]"
      />

      <motion.div
        className="relative mx-auto grid w-full max-w-shell gap-14 px-5 pb-20 pt-16 sm:px-8 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:px-16"
        variants={reduced ? undefined : staggerChildren(0.07)}
        initial={reduced ? false : 'hidden'}
        animate={reduced ? {} : 'visible'}
      >
        <div className="flex flex-col gap-6">
          <motion.p
            variants={reduced ? undefined : childReveal}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] py-2 pl-3 pr-4 text-[0.82rem] text-ink-soft"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_0_3px_rgba(72,200,140,0.18)]"
            />
            {t(site.availability)}
          </motion.p>

          <motion.h1
            variants={reduced ? undefined : childReveal}
            className="font-display text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
          >
            {site.name}
          </motion.h1>

          <motion.p
            variants={reduced ? undefined : childReveal}
            className="font-display text-lg font-medium leading-snug text-ink-soft sm:text-[1.35rem]"
          >
            {locale === 'es' ? (
              <>
                Desarrollador de software especializado en{' '}
                <span className="text-accent">Backend</span>,{' '}
                <span className="whitespace-nowrap text-accent">Full-Stack</span> e{' '}
                <span className="text-accent">IA</span>
              </>
            ) : (
              <>
                Software Developer focused on <span className="text-accent">Backend</span>,{' '}
                <span className="whitespace-nowrap text-accent">Full-Stack</span> &amp;{' '}
                <span className="text-accent">AI</span>
              </>
            )}
          </motion.p>

          <motion.p
            variants={reduced ? undefined : childReveal}
            className="max-w-xl text-base leading-relaxed text-muted"
          >
            {t(site.intro)}
          </motion.p>

          <motion.div
            variants={reduced ? undefined : childReveal}
            className="mt-1 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#projects">
              {t(ui.viewProjects)}
              <Icon name="arrow-right" size={15} strokeWidth={2.2} />
            </ButtonLink>

            <ButtonLink href={cvHref()} download={site.cv.file} variant="secondary">
              <Icon name="download" size={15} />
              {t(ui.downloadCv)}
            </ButtonLink>

            <ButtonLink
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              variant="secondary"
              aria-label={t(ui.linkedinProfile)}
              className="w-12 px-0"
            >
              <Icon name="linkedin" size={17} />
            </ButtonLink>

            {site.links.github ? (
              <ButtonLink
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                variant="secondary"
                aria-label={t(ui.githubProfile)}
                className="w-12 px-0"
              >
                <Icon name="github" size={18} />
              </ButtonLink>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          variants={reduced ? undefined : childReveal}
          className="flex flex-col gap-4 lg:pt-1"
        >
          <ProfileCard />
          <ul className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <li key={stat.label} className="rounded-xl border border-line bg-surface p-4">
                <p className="font-display text-xl font-semibold sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-[0.72rem] leading-snug text-subtle">{stat.label}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <div className="relative border-y border-line bg-[#0C0E12]">
        <div className="mx-auto flex w-full max-w-shell flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-7 sm:px-8 lg:px-16">
          <p className="eyebrow shrink-0 text-subtle">{t(ui.workingWith)}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem] text-muted">
            {heroStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
