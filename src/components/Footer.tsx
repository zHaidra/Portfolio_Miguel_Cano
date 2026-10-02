import { site } from '@/data/site';
import { useI18n } from '@/hooks/useI18n';

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-line bg-[#0C0E12]">
      <div className="mx-auto flex w-full max-w-shell flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-16">
        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-[0.72rem] text-subtle">{t(site.colophon)}</p>
      </div>
    </footer>
  );
};
