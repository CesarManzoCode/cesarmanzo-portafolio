import { CATEGORIES, TAGS, type FigureRef, type Project } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { ExternalLink, ProjectFigure, Rise, Status } from '../components/primitives';

export function ProjectDetail({ p }: { p: Project }) {
  const { c, t } = useI18n();
  const k = c.project;
  const doc = getTech(p.slug);
  const category = CATEGORIES.find((x) => x.id === p.category)!;
  const [lead, ...rest] = p.figures;

  return (
    <article className="pt-10 pb-20 sm:pt-14 md:pb-28">
      <div className="shell">
        <p className="mono text-[var(--ink-3)]">
          <Link to={paths.projects} className="transition-colors hover:text-[var(--accent)]">
            ← {k.back}
          </Link>
          <span className="px-2">/</span>
          <Link to={`${paths.projects}#${category.id}`} className="transition-colors hover:text-[var(--accent)]">
            {t(category.name)}
          </Link>
        </p>

        <header className="mt-6 border-b border-[var(--rule)] pb-8 sm:pb-10">
          <p className="mono text-[var(--ink-3)]">
            {t(p.kind)} · {p.year}
          </p>
          <h1 className="display mt-1 text-[2.9rem] leading-[0.95] sm:text-[3.8rem] md:text-[4.6rem]">{p.name}</h1>

          <div className="mt-5 grid gap-x-10 gap-y-5 md:mt-7 md:grid-cols-12">
            <p className="prose-lede text-[var(--ink)] md:col-span-8">{t(p.thesis)}</p>
            <dl className="grid content-start gap-4 text-[0.85rem] md:col-span-4">
              <div>
                <dt className="label">{k.status}</dt>
                <dd className="mt-1.5">
                  <Status tone={p.statusTone} className="text-[var(--ink-2)]">
                    {t(p.status)}
                  </Status>
                </dd>
              </div>
              {(p.links.length > 0 || p.privateRepo) && (
                <div>
                  <dt className="label">{k.links}</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-2">
                    {p.links.map((l) => (
                      <ExternalLink key={l.href} href={l.href}>
                        {t(l.label)}
                      </ExternalLink>
                    ))}
                    {p.privateRepo && <span className="mono text-[0.75rem] text-[var(--ink-3)]">{c.projects.privateRepo}</span>}
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {p.tags.map((id) => (
              <li key={id} className="tag">
                {t(TAGS[id])}
              </li>
            ))}
          </ul>
          {p.note && <p className="note mt-5">{t(p.note)}</p>}
        </header>

        {/* Why, and the proof, before anything else. */}
        <Rise className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="label">{k.why}</p>
            <p className="prose-lede mt-3 max-w-[60ch]">{t(p.why)}</p>
          </div>
          {p.proof.length > 0 && (
            <ul className="grid content-start gap-3 md:col-span-5">
              {p.proof.map((pt) => (
                <li key={pt.en} className="proof text-[0.92rem] leading-relaxed">
                  {t(pt)}
                </li>
              ))}
            </ul>
          )}
        </Rise>

        {lead && (
          <Rise className="mt-12 md:mt-16">
            <ProjectFigure f={lead} priority />
          </Rise>
        )}

        {p.points.length > 0 && (
          <Rise className="mt-12 md:mt-16">
            <p className="label">{k.what}</p>
            <ul className="mt-3 grid gap-x-12 sm:grid-cols-2">
              {p.points.map((pt) => (
                <li key={pt.title.en} className="border-t border-[var(--rule)] py-6">
                  <h2 className="text-[1rem] font-semibold leading-snug tracking-[-0.01em]">{t(pt.title)}</h2>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--ink-2)]">{t(pt.body)}</p>
                </li>
              ))}
            </ul>
          </Rise>
        )}

        {rest.length > 0 && (
          <Rise className="mt-10 grid items-start gap-8 md:mt-14 md:grid-cols-12">
            {rest.map((f) => (
              <ProjectFigure key={f.media} f={f} className={figureSpan(f, rest)} />
            ))}
          </Rise>
        )}

        {p.figures.length > 0 && <p className="mono mt-8 text-[var(--ink-3)]">{k.captureNote}</p>}

        {/* The bridge to the engineering layer. */}
        <Rise className="mt-14 md:mt-20">
          {doc ? (
            <Link to={paths.tech(p.slug)} className="tech-card group block p-6 sm:p-8">
              <p className="label">
                {c.technical.eyebrow} · {c.depth[doc.depth].one}
              </p>
              <p className="display mt-3 text-[1.9rem] leading-[1.05] transition-colors group-hover:text-[var(--accent)] sm:text-[2.3rem]">
                {k.toTechnical} <span aria-hidden="true">→</span>
              </p>
              <p className="mt-3 max-w-[60ch] text-[0.9rem] leading-relaxed text-[var(--ink-2)]">{t(doc.abstract)}</p>
              <p className="mono mt-4 text-[var(--ink-3)]">{k.technicalHint}</p>
            </Link>
          ) : (
            <p className="mono text-[var(--ink-3)]">{k.noTechnical}</p>
          )}
        </Rise>
      </div>
    </article>
  );
}

/* Wide captures pair up; a phone capture sits narrow beside its wide one. */
function figureSpan(f: FigureRef, all: FigureRef[]): string {
  if (all.length === 1) return 'md:col-span-12';
  if (f.narrow) return 'mx-auto w-full max-w-[17rem] md:col-span-4 md:mx-0';
  return all.some((x) => x.narrow) ? 'md:col-span-8' : 'md:col-span-6';
}
