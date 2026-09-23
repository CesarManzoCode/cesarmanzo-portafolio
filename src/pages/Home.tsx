import { CATEGORIES, PROJECTS, homeProjects } from '../data/projects';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Contact } from '../components/Contact';
import { Rise } from '../components/primitives';

export function Home() {
  const { c, t } = useI18n();
  const h = c.home;
  const five = homeProjects();
  const categoryName = (id: string) => t(CATEGORIES.find((k) => k.id === id)!.name);

  return (
    <>
      {/* ---- introduction ---- */}
      <section className="shell pt-10 sm:pt-14 md:pt-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-12 lg:gap-x-16">
          <div className="flex flex-col md:col-span-7">
            <p className="label">
              {h.role} · {h.place}
            </p>
            <h1 className="display mt-4 text-[3.1rem] leading-[0.94] sm:text-[4.4rem] md:mt-6 md:text-[5rem] lg:text-[5.75rem]">
              {h.headline}
            </h1>
            <p className="prose-lede mt-6 max-w-[48ch] md:mt-8">{h.lead}</p>
            <p className="mono mt-8 border-t border-[var(--rule)] pt-4 text-[var(--ink-3)] md:mt-auto">
              {h.available}{' '}
              <a className="text-[var(--ink)] transition-colors hover:text-[var(--accent)]" href={`mailto:${c.contact.email}`}>
                {c.contact.email}
              </a>
            </p>
          </div>

          {/* The five, as a table of contents. */}
          <nav className="md:col-span-5" aria-label={h.selectedLabel}>
            <div className="flex items-baseline justify-between border-b border-[var(--ink)] pb-2">
              <p className="label text-[var(--ink)]">{h.selectedLabel}</p>
            </div>
            <ol>
              {five.map((p, i) => (
                <li key={p.slug} className="border-b border-[var(--rule)]">
                  <a href={`#${p.slug}`} className="group block py-3.5 transition-[padding] duration-200 hover:pl-2">
                    <div className="flex items-baseline gap-3">
                      <span className="mono text-[var(--ink-3)] group-hover:text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="display text-[1.55rem] leading-none group-hover:text-[var(--accent)]">{p.name}</span>
                    </div>
                    <p className="mono mt-1.5 pl-[2.1rem] text-[0.66rem] text-[var(--ink-3)]">{categoryName(p.category)}</p>
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[0.8rem] leading-snug text-[var(--ink-3)]">{h.selectedNote}</p>
          </nav>
        </div>
      </section>

      {/* ---- the selected five ---- */}
      <section className="shell pt-20 md:pt-28" aria-labelledby="selected-heading">
        <h2 id="selected-heading" className="sr-only">
          {h.selectedLabel}
        </h2>
        <ol className="border-t border-[var(--ink)]">
          {five.map((p, i) => (
            <li key={p.slug} id={p.slug} className="border-b border-[var(--rule)]">
              <Rise className="grid gap-5 py-9 md:grid-cols-12 md:gap-12 md:py-12">
                <div className="md:col-span-4">
                  <p className="mono text-[var(--ink-3)]">
                    {String(i + 1).padStart(2, '0')} · {categoryName(p.category)}
                  </p>
                  <h3 className="display mt-2 text-[2.6rem] leading-[0.95] sm:text-[3.2rem]">
                    <Link to={paths.project(p.slug)} className="transition-colors hover:text-[var(--accent)]">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mono mt-3 text-[var(--ink-3)]">{t(p.kind)}</p>
                </div>

                <div className="md:col-span-8">
                  <p className="prose-lede max-w-[60ch] text-[var(--ink)]">{t(p.thesis)}</p>
                  <ul className="mt-5 grid gap-2.5">
                    {p.proof.slice(0, 3).map((pt) => (
                      <li key={pt.en} className="proof max-w-[62ch] text-[0.92rem] leading-relaxed text-[var(--ink-2)]">
                        {t(pt)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <Link to={paths.project(p.slug)} className="link">
                      {h.projectCta} <span aria-hidden="true">→</span>
                    </Link>
                    <Link to={paths.tech(p.slug)} className="link mono text-[0.78rem]">
                      {h.technicalCta} <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </div>
              </Rise>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- where to go next ---- */}
      <section className="shell grid gap-6 pt-16 md:grid-cols-2 md:gap-8 md:pt-24">
        <Rise className="flex flex-col border border-[var(--rule-strong)] bg-[var(--card)] p-6 sm:p-8">
          <p className="label">{h.beyondLabel}</p>
          <h2 className="display mt-3 text-[2rem] leading-[1.05]">{h.beyondTitle}</h2>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--ink-2)]">{h.beyondBody}</p>
          <p className="mono mt-4 text-[var(--ink-3)]">{c.projects.count(PROJECTS.length, CATEGORIES.length)}</p>
          <p className="mt-6 pt-2 md:mt-auto">
            <Link to={paths.projects} className="link">
              {h.beyondCta} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </Rise>

        <Rise className="tech-card flex flex-col p-6 sm:p-8" delay={60}>
          <p className="label">{h.techLabel}</p>
          <h2 className="display mt-3 text-[2rem] leading-[1.05]">{h.techTitle}</h2>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-[var(--ink-2)]">{h.techBody}</p>
          <p className="mono mt-4 text-[var(--accent)]">{h.techSample}</p>
          <p className="mt-6 pt-2 md:mt-auto">
            <Link to={paths.technical} className="link">
              {h.techCta} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </Rise>
      </section>

      <Contact />
    </>
  );
}
