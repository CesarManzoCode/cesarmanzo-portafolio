import { useEffect } from 'react';
import { About } from './components/About';
import { Acredita } from './components/Acredita';
import { Contact } from './components/Contact';
import { CppCeti } from './components/CppCeti';
import { Ferrol } from './components/Ferrol';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { More } from './components/More';
import { Orux } from './components/Orux';
import { Studymation } from './components/Studymation';
import { Thalyx } from './components/Thalyx';
import { SecondaryHeading, WorkHeading } from './components/WorkHeading';
import { useI18n } from './i18n/context';

export default function App() {
  const { c, lang } = useI18n();

  // Keep the document title and description in the reader's language.
  useEffect(() => {
    document.title = c.meta.title;
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.meta.description);
  }, [c, lang]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--paper)]"
      >
        {c.a11y.skip}
      </a>

      <Header />

      <main id="main">
        <Hero />

        <div className="pt-16 pb-16 sm:pt-20 sm:pb-20 md:pt-24 md:pb-24">
          <WorkHeading />
        </div>

        <Thalyx />
        <Orux />
        <Ferrol />

        <div className="pt-16 sm:pt-20 md:pt-24">
          <SecondaryHeading />
        </div>

        <Acredita />
        <Studymation />
        <CppCeti />
        <More />

        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
