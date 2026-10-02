import { motion, useReducedMotion } from 'framer-motion';
import { Section, SectionHeading } from '@/components/Section';
import { Tag } from '@/components/Tag';
import { cn } from '@/utils/cn';
import { education, experience } from '@/data/experience';
import { site } from '@/data/site';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';
import { childReveal, revealViewport, staggerChildren } from '@/utils/motion';

export const Experience = () => {
  const reduced = useReducedMotion();
  const { t, tl } = useI18n();

  return (
    <Section id="experience">
      <SectionHeading eyebrow={t(ui.experienceEyebrow)} title={t(ui.experienceTitle)} />

      <motion.ol
        className="mt-10 flex flex-col gap-5"
        variants={reduced ? undefined : staggerChildren(0.08)}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? {} : 'visible'}
        viewport={revealViewport}
      >
        {experience.map((role) => (
          <motion.li
            key={role.id}
            variants={reduced ? undefined : childReveal}
            className={cn(
              'flex flex-col gap-6 rounded-card border p-6 sm:p-8 md:flex-row md:gap-10',
              role.current
                ? 'border-accent/25 bg-gradient-to-b from-[#111720] to-[#0F1216]'
                : 'border-line bg-surface',
            )}
          >
            <div className="flex shrink-0 flex-col gap-2.5 md:w-48">
              {role.current ? (
                <span className="inline-flex w-fit items-center rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-wider text-signal-soft">
                  {t(ui.current)}
                </span>
              ) : null}
              <p className="font-mono text-[0.8rem] text-subtle">{t(role.period)}</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                  {t(role.role)}
                </h3>
                <p
                  className={cn(
                    'mt-1.5 text-[0.95rem]',
                    role.current ? 'text-accent' : 'text-ink-soft',
                  )}
                >
                  {role.company}
                </p>
              </div>

              <p className="max-w-3xl leading-relaxed text-muted">{t(role.summary)}</p>

              <ul className="flex max-w-3xl list-disc flex-col gap-2 pl-5 text-[0.92rem] leading-relaxed text-muted marker:text-line-strong">
                {tl(role.highlights).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-1.5 pt-1">
                {role.tech.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <div className="mt-20 flex flex-col gap-10 md:flex-row md:gap-16">
        <div className="md:w-72 md:shrink-0">
          <p className="eyebrow text-accent">{t(ui.educationEyebrow)}</p>
          <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {t(ui.educationTitle)}
          </h3>
        </div>

        <ul className="grid flex-1 gap-5 sm:grid-cols-2">
          {education.map((item) => {
            const grade = item.grade ? t(item.grade) : null;

            return (
              <li
                key={item.id}
                className="flex flex-col gap-3.5 rounded-card border border-line bg-surface p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-lg font-semibold leading-snug">
                      {t(item.qualification)}
                    </h4>
                    <p className="mt-1.5 text-[0.92rem] text-muted">{item.institution}</p>
                  </div>
                  {grade ? (
                    <span className="shrink-0 rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.68rem] text-accent-soft">
                      {grade.match(/\(([^)]+)\)/)?.[1] ?? grade}
                    </span>
                  ) : null}
                </div>

                <p className="font-mono text-[0.75rem] text-subtle">{item.period}</p>

                {item.note ? (
                  <p className="text-[0.88rem] leading-relaxed text-muted">{t(item.note)}</p>
                ) : null}

                {item.subjects ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {tl(item.subjects).map((subject) => (
                      <li key={subject}>
                        <Tag className="font-sans text-[0.75rem]">{subject}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-7">
        <p className="eyebrow shrink-0 text-subtle">{t(ui.languagesLabel)}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-[0.92rem] text-ink-soft">
          {site.languages.map((language) => (
            <li key={language.name.en}>
              {t(language.name)} — <span className="text-subtle">{t(language.level)}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
