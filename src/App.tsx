import { useEffect } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Stats } from './components/Stats';
import { TechRibbon } from './components/TechRibbon';
import { Background } from './components/fx/Background';
import { CursorGlow } from './components/fx/CursorGlow';
import { ScrollProgress } from './components/fx/ScrollProgress';
import { useIsMobile } from './hooks/useIsMobile';

export default function App() {
  const isMobile = useIsMobile();

  // Keep the phone flag in sync on resize / orientation change. The initial
  // value is already set pre-paint by the inline script in index.html.
  useEffect(() => {
    document.documentElement.classList.toggle('is-phone', isMobile);
  }, [isMobile]);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        Saltar al contenido
      </a>

      <Background />
      <CursorGlow />
      <ScrollProgress />

      <Header />
      <main id="main">
        <Hero />
        <TechRibbon />
        <Stats />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
