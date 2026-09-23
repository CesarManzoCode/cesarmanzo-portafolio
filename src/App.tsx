import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getProject } from './data/projects';
import { getTech } from './data/technical';
import { useI18n } from './i18n/context';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';
import { Projects } from './pages/Projects';
import { TechDetail } from './pages/TechDetail';
import { Technical } from './pages/Technical';
import { useRouter } from './router';

export default function App() {
  const { c, lang, t } = useI18n();
  const { route } = useRouter();

  const project = route.name === 'project' ? getProject(route.slug) : undefined;
  const doc = route.name === 'tech' ? getTech(route.slug) : undefined;
  const missing = (route.name === 'project' && !project) || (route.name === 'tech' && !doc) || route.name === 'notFound';
  const technical = !missing && (route.name === 'technical' || route.name === 'tech');

  let title = c.meta.title;
  if (missing) title = c.meta.notFound;
  else if (route.name === 'projects') title = c.meta.projects;
  else if (route.name === 'technical') title = c.meta.technical;
  else if (route.name === 'about') title = c.meta.about;
  else if (project) title = `${project.name} — César Manzo`;
  else if (doc) title = `${getProject(doc.slug)!.name} · ${c.nav.technical} — César Manzo`;

  const description = project ? t(project.thesis) : doc ? t(doc.abstract) : c.meta.description;

  // Title, language, description and the surface (the technical layer is dark).
  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    document.documentElement.dataset.surface = technical ? 'tech' : 'paper';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', technical ? '#0f1116' : '#f3f0ea');
  }, [title, lang, technical, description]);

  let page;
  if (missing) page = <NotFound />;
  else if (route.name === 'home') page = <Home />;
  else if (route.name === 'projects') page = <Projects />;
  else if (project) page = <ProjectDetail p={project} />;
  else if (route.name === 'technical') page = <Technical />;
  else if (doc) page = <TechDetail doc={doc} />;
  else page = <About />;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--paper)]"
      >
        {c.a11y.skip}
      </a>

      <Header />

      <main id="main" key={route.name + ('slug' in route ? route.slug : '')}>
        {page}
      </main>

      <Footer />
    </>
  );
}
