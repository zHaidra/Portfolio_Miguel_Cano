import { Section, SectionHeading } from '@/components/Section';
import { Icon, type IconName } from '@/components/Icon';
import { cn } from '@/utils/cn';
import { cvHref, site } from '@/data/site';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';

interface Channel {
  key: string;
  label: string;
  value: string;
  href: string;
  icon: IconName;
  external?: boolean;
  download?: string;
}

export const Contact = () => {
  const { t } = useI18n();

  const channels: Channel[] = [
    {
      key: 'email',
      label: t(ui.channelEmail),
      value: site.links.email,
      href: `mailto:${site.links.email}`,
      icon: 'mail',
    },
    {
      key: 'linkedin',
      label: t(ui.channelLinkedin),
      value: site.handles.linkedin,
      href: site.links.linkedin,
      icon: 'linkedin',
      external: true,
    },
    // Only rendered when a GitHub URL is configured in src/data/site.ts.
    ...(site.links.github
      ? [
          {
            key: 'github',
            label: t(ui.channelGithub),
            value: site.handles.github ?? site.links.github,
            href: site.links.github,
            icon: 'github' as IconName,
            external: true,
          },
        ]
      : []),
    {
      key: 'cv',
      label: t(ui.channelCv),
      value: site.cv.file,
      href: cvHref(),
      icon: 'download',
      download: site.cv.file,
    },
  ];

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow={t(ui.contactEyebrow)}
        title={t(ui.contactTitle)}
        aside={t(site.availability)}
      />

      {/* Columns follow the number of channels so there is never a hole in
          the row when one of them (GitHub) is not configured. */}
      <ul
        className={cn(
          'mt-10 grid gap-4 sm:grid-cols-2',
          channels.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
        )}
      >
        {channels.map((channel) => (
          <li key={channel.key}>
            <a
              href={channel.href}
              {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              {...(channel.download ? { download: channel.download } : {})}
              className="group flex h-full min-h-[7rem] flex-col justify-between gap-5 rounded-card border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong"
            >
              <span className="flex items-center justify-between">
                <span className="eyebrow text-subtle">{channel.label}</span>
                <span className="text-muted transition-colors group-hover:text-accent">
                  <Icon name={channel.icon} size={16} />
                </span>
              </span>
              <span className="break-words font-mono text-[0.82rem] text-ink-soft">
                {channel.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};
