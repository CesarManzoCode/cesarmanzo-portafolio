import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n/context';
import { GITHUB, type Lang } from '../i18n/content';
import { SELECTED, getProject, selection } from '../data/projects';
import { Link, paths, useRouter } from '../router';

const LANGS: Lang[] = ['en', 'es'];

/* The bar takes on the room it is sitting over: it reads the background
   and tone of whatever section is directly under it, once per frame at
   most, so a dark room gets a dark bar and a blue room a blue one. On
   the root page it also reports which chapter is under it, and how far
   through that chapter the reader is. */
type Underlay = { bg: string; dark: boolean; chapter: number | null; progress: number };

function useUnderlay(dep: string): Underlay {
  const [under, setUnder] = useState<Underlay>({ bg: '', dark: false, chapter: null, progress: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const read = () => {
      raf.current = 0;
      const y = 58;
      const els = document.elementsFromPoint(window.innerWidth / 2, y);
      const room = els.map((e) => e.closest('[data-tone]')).find((e) => e && !e.closest('header')) as HTMLElement | undefined;
      if (!room) return;
      const bg = getComputedStyle(room).backgroundColor;
      const ch = els.map((e) => e.closest('[data-chapter]')).find(Boolean) as HTMLElement | undefined;
      const chapter = ch ? Number(ch.dataset.chapter) : null;
      let progress = 0;
      if (ch) {
        const r = ch.getBoundingClientRect();
        progress = Math.round(Math.min(1, Math.max(0, (y - r.top) / Math.max(1, r.height - window.innerHeight + y))) * 200) / 200;
      }
      setUnder((u) =>
        u.bg === bg && u.chapter === chapter && u.progress === progress ? u : { bg, dark: room.dataset.tone === 'dark', chapter, progress },
      );
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(read);
    };
    read();
    const t = window.setTimeout(read, 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(t);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [dep]);

  return under;
}

export function Header() {
  const { c, lang, setLang } = useI18n();
  const { route, path } = useRouter();
  // The menu belongs to the page it was opened on: navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const under = useUnderlay(path);

  const open = openOn === path;

  const section =
    route.name === 'home' || (route.name === 'project' && selection(route.slug)) ? 'work' : route.name === 'projects' || route.name === 'project' ? 'index' : route.name === 'technical' || route.name === 'tech' ? 'ledger' : route.name === 'about' ? 'about' : null;

  const items = [
    { id: 'work', to: paths.home, label: c.nav.work },
    { id: 'index', to: paths.projects, label: c.nav.index },
    { id: 'ledger', to: paths.technical, label: c.nav.ledger },
    { id: 'about', to: paths.about, label: c.nav.about },
  ] as const;

  const dark = under.dark;
  const chapter =
    route.name === 'home' && under.chapter !== null ? { i: under.chapter, slug: SELECTED[under.chapter]!, name: getProject(SELECTED[under.chapter]!)!.name } : null;
  const style = under.bg ? { backgroundColor: under.bg.replace(/rgb\(([^)]+)\)/, 'rgba($1, 0.86)') } : undefined;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-[background-color,color] duration-300 ${dark ? 'tone-dark surface-ink' : ''}`}
      style={{ ...style, color: dark ? '#efeee9' : '#0e0e0d' }}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <div className="flex min-w-0 items-baseline gap-3 whitespace-nowrap">
          <Link to={paths.home} className="text-[0.95rem] font-[750] tracking-[-0.01em]" style={{ fontStretch: '80%' }}>
            CÉSAR MANZO
          </Link>
          {chapter ? (
            <a href={`#${chapter.slug}`} className="mono truncate text-[0.7rem] opacity-70 transition-opacity hover:opacity-100">
              <span className="sr-only">{c.nav.chapter} </span>
              {String(chapter.i + 1).padStart(2, '0')}/{String(SELECTED.length).padStart(2, '0')} · {chapter.name}
            </a>
          ) : (
            <span className="hidden text-[0.74rem] opacity-60 lg:inline">{lang === 'es' ? 'Ingeniero de software' : 'Software engineer'}</span>
          )}
        </div>

        <div className="flex items-center gap-4 sm:gap-7">
          <nav className="hidden items-center gap-6 text-[0.84rem] md:flex" aria-label={c.nav.primary}>
            {items.map((it) => (
              <Link
                key={it.id}
                to={it.to}
                aria-current={section === it.id ? 'page' : undefined}
                className={`relative py-1 transition-opacity hover:opacity-100 ${section === it.id ? 'opacity-100' : 'opacity-65'}`}
              >
                {it.label}
                {section === it.id && <span className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-current" aria-hidden="true" />}
              </Link>
            ))}
            <a className="opacity-65 transition-opacity hover:opacity-100" href={GITHUB} target="_blank" rel="noreferrer noopener">
              {c.nav.github} <span aria-hidden="true">↗</span>
            </a>
          </nav>

          <div role="group" aria-label={c.a11y.language} className="mono flex items-center text-[0.72rem]">
            {LANGS.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="px-1 opacity-40">/</span>}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`cursor-pointer px-1 py-2 uppercase transition-opacity ${lang === l ? 'font-semibold opacity-100' : 'opacity-50 hover:opacity-100'}`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            className="mono cursor-pointer px-1 py-2 text-[0.72rem] uppercase md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenOn(open ? null : path)}
          >
            {open ? c.nav.close : c.nav.menu}
          </button>
        </div>
      </div>

      {route.name === 'home' && !open && (
        <div className="wrap pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
          <div className="relative h-[2px]">
            <div className="chapters" style={{ opacity: chapter ? 1 : 0 }}>
              {SELECTED.map((slug, i) => {
                const fill = !chapter ? 0 : i < chapter.i ? 1 : i === chapter.i ? under.progress : 0;
                return (
                  <i key={slug}>
                    <b style={{ transform: `scaleX(${fill})` }} />
                  </i>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {open && (
        <nav id="mobile-nav" className="wrap border-t border-current/15 pb-6 md:hidden" aria-label={c.nav.primary}>
          <ul className="grid">
            {items.map((it) => (
              <li key={it.id} className="border-b border-current/10">
                <Link to={it.to} className="name block py-3 text-[2.4rem]" aria-current={section === it.id ? 'page' : undefined}>
                  {it.label}
                </Link>
              </li>
            ))}
            <li>
              <a className="block py-4 text-[0.95rem]" href={GITHUB} target="_blank" rel="noreferrer noopener">
                {c.nav.github} ↗
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
