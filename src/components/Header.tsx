import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';
import { GITHUB, type Lang } from '../i18n/content';
import { Link, paths, useRouter } from '../router';

const LANGS: Lang[] = ['en', 'es'];

export function Header() {
  const { c, lang, setLang } = useI18n();
  const { route } = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const section =
    route.name === 'projects' || route.name === 'project'
      ? 'projects'
      : route.name === 'technical' || route.name === 'tech'
        ? 'technical'
        : route.name === 'about'
          ? 'about'
          : route.name === 'home'
            ? 'home'
            : null;

  const items = [
    { id: 'home', to: paths.home, label: c.nav.home, hideSmall: true },
    { id: 'projects', to: paths.projects, label: c.nav.projects },
    { id: 'technical', to: paths.technical, label: c.nav.technical },
    { id: 'about', to: paths.about, label: c.nav.about },
  ] as const;

  const navLink = (active: boolean) =>
    `relative py-1 transition-colors hover:text-[var(--accent)] ${active ? 'text-[var(--ink)] nav-active' : 'text-[var(--ink-2)]'}`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-[var(--paper)] transition-colors duration-200 ${scrolled ? 'border-[var(--rule)]' : 'border-transparent'}`}
    >
      <div className="shell flex h-14 items-center justify-between gap-4 sm:h-16">
        <Link to={paths.home} className="flex items-baseline gap-3 whitespace-nowrap">
          <span className="mono font-medium tracking-[0.02em]">César Manzo</span>
          <span className="hidden text-[0.78rem] text-[var(--ink-3)] lg:inline">{c.home.role}</span>
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden items-center gap-6 text-[0.85rem] sm:flex" aria-label={c.nav.primary}>
            {items.map((it) => (
              <Link key={it.id} to={it.to} className={navLink(section === it.id)} aria-current={section === it.id ? 'page' : undefined}>
                {it.label}
              </Link>
            ))}
            <a className="text-[var(--ink-2)] transition-colors hover:text-[var(--accent)]" href={GITHUB} target="_blank" rel="noreferrer noopener">
              {c.nav.github} <span aria-hidden="true">↗</span>
            </a>
          </nav>

          <div
            className="flex items-center gap-1 text-[0.8rem] sm:border-l sm:border-[var(--rule)] sm:pl-5"
            role="group"
            aria-label={c.a11y.language}
          >
            {LANGS.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="px-1 text-[var(--ink-3)]">·</span>}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`mono uppercase transition-colors ${lang === l ? 'text-[var(--ink)]' : 'text-[var(--ink-3)] hover:text-[var(--accent)]'}`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Phones: the section links get their own row instead of being crushed. */}
      <nav className="shell flex h-10 items-center gap-5 overflow-x-auto border-t border-[var(--rule)] text-[0.82rem] sm:hidden" aria-label={c.nav.primary}>
        {items
          .filter((it) => !('hideSmall' in it))
          .map((it) => (
            <Link key={it.id} to={it.to} className={`whitespace-nowrap ${navLink(section === it.id)}`} aria-current={section === it.id ? 'page' : undefined}>
              {it.label}
            </Link>
          ))}
        <a className="whitespace-nowrap text-[var(--ink-2)]" href={GITHUB} target="_blank" rel="noreferrer noopener">
          {c.nav.github} <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
