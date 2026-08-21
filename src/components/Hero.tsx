import { useI18n } from '../i18n/context';

export function Hero() {
  const { c } = useI18n();

  return (
    <section id="top" className="shell pt-10 sm:pt-14 md:pt-16">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-12 lg:gap-x-16">
        {/* ---- the statement ---- */}
        <div className="flex flex-col md:col-span-7">
          <p className="label">
            {c.hero.role} · {c.hero.place}
          </p>

          <h1 className="display mt-4 text-[3.1rem] leading-[0.94] sm:text-[4.4rem] md:mt-6 md:text-[5rem] lg:text-[5.75rem]">
            {c.hero.headline}
          </h1>

          <p className="prose-lede mt-6 max-w-[46ch] md:mt-8">{c.hero.lead}</p>

          <p className="mono mt-8 border-t border-[var(--rule)] pt-4 text-[var(--ink-3)] md:mt-auto">
            {c.hero.available}{' '}
            <a className="text-[var(--ink)] transition-colors hover:text-[var(--accent)]" href={`mailto:${c.contact.email}`}>
              {c.contact.email}
            </a>
          </p>
        </div>

        {/* ---- the index: contents and navigation at once ---- */}
        <nav className="md:col-span-5" aria-label={c.a11y.toIndex}>
          <div className="flex items-baseline justify-between border-b border-[var(--ink)] pb-2">
            <p className="label text-[var(--ink)]">{c.hero.indexLabel}</p>
            <p className="mono text-[var(--ink-3)]">{c.hero.indexHint}</p>
          </div>

          <ol>
            {c.index.map((p) => (
              <li key={p.n} className="border-b border-[var(--rule)]">
                <a href={p.href} className="group block py-3.5 transition-[padding] duration-200 hover:pl-2">
                  <div className="flex items-baseline gap-3">
                    <span className="mono text-[var(--ink-3)] transition-colors group-hover:text-[var(--accent)]">
                      {p.n}
                    </span>
                    <span className="display text-[1.55rem] leading-none transition-colors group-hover:text-[var(--accent)]">
                      {p.name}
                    </span>
                  </div>
                  <p className="mt-1.5 pl-[2.1rem] text-[0.83rem] leading-snug text-[var(--ink-2)]">{p.blurb}</p>
                  <p className="mono mt-1 pl-[2.1rem] text-[0.66rem] text-[var(--ink-3)]">{p.kind}</p>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
