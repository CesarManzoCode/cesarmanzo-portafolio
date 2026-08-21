import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/context';
import type { Lang } from '../i18n/content';

const LANGS: Lang[] = ['en', 'es'];

export function Header() {
  const { c, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);

  // The bar has to survive crossing the dark Thalyx band, so it reads the
  // band's position rather than assuming a single palette.
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      const band = document.getElementById('thalyx');
      if (!band) return;
      const r = band.getBoundingClientRect();
      setOnDark(r.top <= 32 && r.bottom >= 32);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const bg = onDark ? 'bg-[var(--dark)] text-[var(--dark-ink)]' : 'bg-[var(--paper)]';
  const border = !scrolled
    ? 'border-transparent'
    : onDark
      ? 'border-[var(--dark-rule)]'
      : 'border-[var(--rule)]';
  const muted = onDark ? 'text-[var(--dark-ink-2)]' : 'text-[var(--ink-3)]';
  const hover = onDark ? 'hover:text-[var(--dark-accent)]' : 'hover:text-[var(--accent)]';

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${bg} ${border}`}>
      <div className="shell flex h-14 items-center justify-between gap-4 sm:h-16">
        <a href="#top" className="flex items-baseline gap-2 whitespace-nowrap sm:gap-3">
          <span className="mono font-medium tracking-[0.02em]">{c.hero.name}</span>
          <span className={`hidden text-[0.78rem] sm:inline ${muted}`}>{c.hero.role}</span>
        </a>

        <nav className="flex items-center gap-3.5 whitespace-nowrap text-[0.8rem] sm:gap-7 sm:text-[0.85rem]" aria-label={c.a11y.menu}>
          <a className={`transition-colors ${hover}`} href="#work">
            {c.nav.work}
          </a>
          <a className={`hidden transition-colors min-[420px]:inline ${hover}`} href="#about">
            {c.nav.about}
          </a>
          <a className={`transition-colors ${hover}`} href="#contact">
            {c.nav.contact}
          </a>

          <div
            className={`flex items-center gap-1 border-l pl-3.5 sm:pl-5 ${onDark ? 'border-[var(--dark-rule)]' : 'border-[var(--rule)]'}`}
            role="group"
            aria-label={c.a11y.language}
          >
            {LANGS.map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className={`px-1 ${muted}`}>·</span>}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  aria-current={lang === l ? 'true' : undefined}
                  className={`mono uppercase transition-colors ${lang === l ? '' : `${muted} ${hover}`}`}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
