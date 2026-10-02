import { motion, useReducedMotion } from 'framer-motion';
import { Section, SectionHeading } from '@/components/Section';
import { Icon } from '@/components/Icon';
import { Tag } from '@/components/Tag';
import { skillGroups, skillsFootnote } from '@/data/skills';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';
import { toneClasses } from '@/utils/tone';
import { childReveal, revealViewport, staggerChildren } from '@/utils/motion';

export const Skills = () => {
  const reduced = useReducedMotion();
  const { t, tl } = useI18n();

  return (
    <Section id="skills">
      <SectionHeading
        eyebrow={t(ui.skillsEyebrow)}
        title={t(ui.skillsTitle)}
        aside={t(ui.skillsAside)}
      />

      <motion.ul
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={reduced ? undefined : staggerChildren(0.05)}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? {} : 'visible'}
        viewport={revealViewport}
      >
        {skillGroups.map((group) => {
          const tone = toneClasses(group.tone);
          return (
            <motion.li
              key={group.id}
              variants={reduced ? undefined : childReveal}
              className="flex flex-col gap-4 rounded-card border border-line bg-surface p-6"
            >
              <h3 className="flex items-center gap-2.5 font-display text-base font-semibold">
                <span className={tone.text}>
                  <Icon name={group.icon} size={16} />
                </span>
                {t(group.title)}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {tl(group.items).map((item) => (
                  <li key={item}>
                    <Tag className="text-[0.76rem] text-ink-soft">{item}</Tag>
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </motion.ul>

      <p className="mt-6 font-mono text-[0.72rem] text-subtle">{t(skillsFootnote)}</p>
    </Section>
  );
};
