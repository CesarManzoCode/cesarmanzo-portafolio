import { useEffect } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getProject } from './data/projects';
import { useI18n } from './i18n/context';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Index } from './pages/Index';
import { Ledger } from './pages/Ledger';
import { NotFound } from './pages/NotFound';
import { Project } from './pages/Project';
import { useRouter } from './router';

export default function App() {
  const { c, lang, t } = useI18n();
  const { route } = useRouter();

  // /projects/:slug and /technical/:slug are one page: the record is its lower half.
  const project = route.name === 'project' || route.name === 'tech' ? getProject(route.slug) : undefined;
  const missing = ((route.name === 'project' || route.name === 'tech') && !project) || route.name === 'notFound';

  let title = c.meta.title;
  if (missing) title = c.meta.notFound;
  else if (route.name === 'projects') title = c.meta.index;
  else if (route.name === 'technical') title = c.meta.ledger;
  else if (route.name === 'about') title = c.meta.about;
  else if (project) title = `${project.name} — César Manzo`;

  const description = project ? t(project.thesis) : c.meta.description;

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = lang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, lang, description]);

  let page;
  if (missing) page = <NotFound />;
  else if (route.name === 'home') page = <Home />;
  else if (route.name === 'projects') page = <Index />;
  else if (route.name === 'technical') page = <Ledger />;
  else if (project) page = <Project p={project} toRecord={route.name === 'tech'} />;
  else page = <About />;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-white"
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
