import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import type { Project, ProjectCategory } from '@/types';
import { Section, SectionHeading } from '@/components/Section';
import { FilterBar, type FilterOption } from '@/components/FilterBar';
import { ProjectCard } from '@/components/ProjectCard';
import { Modal } from '@/components/Modal';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { Icon } from '@/components/Icon';
import { projectCategories, projects } from '@/data/projects';
import { useI18n } from '@/hooks/useI18n';
import { categoryLabels, showingProjects, ui } from '@/i18n/ui';
import { revealViewport, staggerChildren } from '@/utils/motion';

const ALL = 'All' as const;

type Filter = ProjectCategory | typeof ALL;

export const Projects = () => {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const reduced = useReducedMotion();
  const { t, locale } = useI18n();

  const options = useMemo<FilterOption[]>(
    () => [
      { value: ALL, label: t(ui.filterAll), count: projects.length },
      ...projectCategories.map((category) => ({
        value: category,
        label: t(categoryLabels[category]),
        count: projects.filter((project) => project.tags.includes(category)).length,
      })),
    ],
    [t],
  );

  const visible = useMemo(
    () =>
      filter === ALL
        ? projects
        : projects.filter((project) => project.tags.includes(filter)),
    [filter],
  );

  const closeModal = useCallback(() => setOpenProject(null), []);

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow={t(ui.projectsEyebrow)}
        title={t(ui.projectsTitle)}
        aside={t(ui.projectsAside)}
      />

      <div className="mt-8">
        <FilterBar
          options={options}
          value={filter}
          onChange={(value) => setFilter(value as Filter)}
          label={t(ui.filterLabel)}
        />
      </div>

      {/* Count is announced so filtering is not a silent change. */}
      <p aria-live="polite" className="mt-4 font-mono text-[0.72rem] text-subtle">
        {showingProjects(
          locale,
          visible.length,
          projects.length,
          filter === ALL ? null : t(categoryLabels[filter]),
        )}
      </p>

      <LayoutGroup>
        <motion.div
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={reduced ? undefined : staggerChildren(0.05)}
          initial={reduced ? false : 'hidden'}
          whileInView={reduced ? {} : 'visible'}
          viewport={revealViewport}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenArchitecture={setOpenProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <Modal
        open={openProject !== null}
        onClose={closeModal}
        eyebrow={t(ui.systemArchitecture)}
        title={openProject ? t(openProject.title) : ''}
        description={openProject?.architecture ? t(openProject.architecture.intro) : undefined}
        footer={
          openProject?.architecture ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-subtle">
                <span className="mt-0.5 shrink-0">
                  <Icon name="layers" size={14} />
                </span>
                {t(ui.contributionPrefix)} {t(openProject.architecture.contribution)}
              </p>
              {openProject.links?.demo ? (
                <a
                  href={openProject.links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-control bg-accent px-4 text-sm font-semibold text-[#06080C]"
                >
                  {t(ui.liveSite)}
                  <Icon name="external" size={14} />
                </a>
              ) : null}
            </div>
          ) : null
        }
      >
        {openProject?.architecture ? (
          <ArchitectureDiagram architecture={openProject.architecture} />
        ) : null}
      </Modal>
    </Section>
  );
};
