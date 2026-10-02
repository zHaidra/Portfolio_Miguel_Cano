import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { Experience } from '@/sections/Experience';
import { Projects } from '@/sections/Projects';
import { TerminalSection } from '@/sections/TerminalSection';
import { Contact } from '@/sections/Contact';
import { useI18n } from '@/hooks/useI18n';
import { ui } from '@/i18n/ui';

const App = () => {
  const { t } = useI18n();

  return (
    <>
      {/* First tab stop: lets keyboard users jump past the nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:inline-flex focus:h-11 focus:items-center focus:rounded-control focus:bg-accent focus:px-4 focus:text-sm focus:font-semibold focus:text-[#06080C]"
      >
        {t(ui.skipToContent)}
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TerminalSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;
