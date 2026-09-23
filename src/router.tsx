import { createContext, useCallback, useContext, useEffect, useState, type AnchorHTMLAttributes, type MouseEvent, type PropsWithChildren } from 'react';

/* -------------------------------------------------------------------- *
 * A deliberately small History-API router: five route shapes don’t
 * justify a dependency. Paths are app-relative (“/projects/thalyx”);
 * Vite’s BASE_URL is added and stripped at the edges.
 * -------------------------------------------------------------------- */

export type Route =
  | { name: 'home' }
  | { name: 'projects' }
  | { name: 'project'; slug: string }
  | { name: 'technical' }
  | { name: 'tech'; slug: string }
  | { name: 'about' }
  | { name: 'notFound' };

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

function currentPath(): string {
  let p = window.location.pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  p = p.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

export function parse(path: string): Route {
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return { name: 'home' };
  const [a, b, ...rest] = parts;
  if (rest.length > 0) return { name: 'notFound' };
  if (a === 'projects') return b ? { name: 'project', slug: b } : { name: 'projects' };
  if (a === 'technical') return b ? { name: 'tech', slug: b } : { name: 'technical' };
  if (a === 'about' && !b) return { name: 'about' };
  return { name: 'notFound' };
}

type RouterValue = { path: string; route: Route; navigate: (to: string) => void };
const RouterContext = createContext<RouterValue | null>(null);

export function RouterProvider({ children }: PropsWithChildren) {
  const [path, setPath] = useState(currentPath);

  // A deep link with a fragment: the target only exists after the first render.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const [pathname, hash] = to.split('#');
    const target = `${BASE}${pathname || '/'}${hash ? `#${hash}` : ''}`;
    if (target !== window.location.pathname + window.location.hash) window.history.pushState(null, '', target);
    setPath(currentPath());
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return <RouterContext.Provider value={{ path, route: parse(path), navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}

/** Internal link: a real <a href> (so it works without JS and in new tabs), routed client-side on a plain click. */
export function Link({ to, onClick, ...rest }: { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { navigate } = useRouter();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };

  return <a href={`${BASE}${to}`} onClick={handle} {...rest} />;
}

export const paths = {
  home: '/',
  projects: '/projects',
  project: (slug: string) => `/projects/${slug}`,
  technical: '/technical',
  tech: (slug: string) => `/technical/${slug}`,
  about: '/about',
};
