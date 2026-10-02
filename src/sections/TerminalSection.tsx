import { Section } from '@/components/Section';
import { Terminal } from '@/components/Terminal';
import { Tag } from '@/components/Tag';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';

/** Command names are the same in both languages — they are the API. */
const suggestions = ['help', 'about', 'projects', 'skills', 'experience', 'contact', 'clear'];

export const TerminalSection = () => {
  const { t } = useI18n();

  return (
    <Section id="terminal">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-14">
        <div className="flex flex-col gap-5">
          <div>
            <p className="eyebrow text-accent">{t(ui.terminalEyebrow)}</p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
              {t(ui.terminalTitle)}
            </h2>
          </div>

          <p className="leading-relaxed text-muted">{t(ui.terminalBody)}</p>

          <div className="flex flex-col gap-2.5">
            <p className="eyebrow text-subtle">{t(ui.terminalTry)}</p>
            <ul className="flex flex-wrap gap-2">
              {suggestions.map((command) => (
                <li key={command}>
                  <Tag className="text-[0.75rem]">{command}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Terminal />
      </div>
    </Section>
  );
};
