import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Project } from '@/types';
import { Icon } from '@/components/Icon';
import { Tag } from '@/components/Tag';
import { cn } from '@/utils/cn';
import { toneClasses } from '@/utils/tone';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';
import { childReveal } from '@/utils/motion';

interface ProjectCardProps {
  project: Project;
  onOpenArchitecture: (project: Project) => void;
}

export const ProjectCard = ({ project, onOpenArchitecture }: ProjectCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();
  const reduced = useReducedMotion();
  const { t } = useI18n();
  const tone = toneClasses(project.tone);
  const hasArchitecture = Boolean(project.architecture);
  const title = t(project.title);

  return (
    <motion.article
      variants={reduced ? undefined : childReveal}
      layout={reduced ? false : 'position'}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-4 rounded-card border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={cn('rounded-md border px-2.5 py-1 font-mono text-[0.68rem]', tone.badge)}>
          {t(project.category)}
        </span>

        {project.links?.code || project.links?.demo ? (
          <div className="flex shrink-0 gap-2">
            {project.links.code ? (
              <a
                href={project.links.code}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${title} — ${t(ui.sourceCode)}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-muted transition-colors hover:text-ink"
              >
                <Icon name="github" size={14} />
              </a>
            ) : null}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${title} — ${t(ui.liveDemo)}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-muted transition-colors hover:text-ink"
              >
                <Icon name="external" size={14} />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.02em]">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">{t(project.description)}</p>
      </div>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={detailsId}
            className="overflow-hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? {} : { height: 'auto', opacity: 1 }}
            exit={reduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <dl className="flex flex-col gap-3 border-t border-line pt-4 text-sm">
              <div>
                <dt className="eyebrow text-subtle">{t(ui.problem)}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink-soft">{t(project.problem)}</dd>
              </div>
              <div>
                <dt className="eyebrow text-subtle">{t(ui.myContribution)}</dt>
                <dd className="mt-1.5 leading-relaxed text-ink-soft">{t(project.contribution)}</dd>
              </div>
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-auto flex flex-col gap-4 pt-1">
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-controls={expanded ? detailsId : undefined}
            className="inline-flex min-h-[44px] w-full items-center justify-between rounded-control border border-line-strong bg-raised px-4 text-sm font-medium text-ink-soft transition-colors hover:border-subtle hover:text-ink"
          >
            {expanded ? t(ui.hideDetails) : t(ui.seeDetails)}
            <motion.span
              aria-hidden="true"
              animate={reduced ? {} : { rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex"
            >
              <Icon name="chevron-down" size={14} />
            </motion.span>
          </button>

          {hasArchitecture ? (
            <button
              type="button"
              onClick={() => onOpenArchitecture(project)}
              className="inline-flex min-h-[44px] w-full items-center justify-between rounded-control border border-accent/40 bg-accent/10 px-4 text-sm font-medium text-accent-soft transition-colors hover:bg-accent/15"
            >
              {t(ui.viewArchitecture)}
              <Icon name="arrow-right" size={14} />
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
};
