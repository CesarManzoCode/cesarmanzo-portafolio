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

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
      <Background />
      <CursorGlow />
      <ScrollProgress />

      <Header />
      <main>
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
