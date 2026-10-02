import { Section } from '@/components/Section';
import { Pill } from '@/components/Tag';
import { site } from '@/data/site';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';

export const About = () => {
  const { t, tl } = useI18n();

  return (
    <Section id="about">
      <div className="flex flex-col gap-10 md:flex-row md:gap-16">
        <div className="md:w-72 md:shrink-0">
          <p className="eyebrow text-accent">{t(ui.aboutEyebrow)}</p>
          <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
            {t(ui.aboutTitle)}
          </h2>
        </div>

        <div className="flex max-w-2xl flex-col gap-5">
          {tl(site.about).map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-[1.05rem] leading-[1.7] text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <p className="eyebrow text-subtle">{t(ui.currentlyInterested)}</p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {tl(site.interests).map((interest) => (
            <li key={interest}>
              <Pill>{interest}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
