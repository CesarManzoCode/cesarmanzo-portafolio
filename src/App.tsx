import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';

export default function App() {
  return (
    <div className="app-shell relative min-h-screen bg-transparent text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[28rem] h-[28rem] bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.10),transparent_30%)]" />

      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
