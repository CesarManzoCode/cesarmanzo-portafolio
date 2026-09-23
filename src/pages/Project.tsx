import { useEffect } from 'react';
import { CATEGORIES, ordered, type MediaKey, type Project as P } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { ExternalLink, Figure, Reveal, Rich } from '../components/primitives';
import { RoomHead, Showcase, tone } from '../components/Rooms';
import { Record } from '../components/Record';

/* What the showcase at the top already presents, so the story below
   and the gallery never repeat it. */
const SHOWN_POINTS: Record<string, number[]> = {
  thalyx: [0, 1, 2, 3],
  ferrol: [0, 1, 2, 3],
  'indice-cero': [0, 1],
  'thalyx-kernel': [0, 1],
  orux: [1, 2],
  supadiff: [0],
  supakernel: [1],
  'acredita-bach': [0, 1],
  studymation: [0],
  ennard: [0],
  one: [0],
};
const SHOWN_MEDIA: MediaKey[] = [
  'thalyx-authorisation',
  'ferrol-category',
  'ferrol-mobile',
  'indice-challenge',
  'indice-cycle',
  'orux-tentative',
  'orux-review',
  'orux-impact',
  'acredita-today',
  'acredita-lesson',
  'acredita-item',
  'studymation-brief',
  'studymation-pipeline',
  'studymation-document',
  'rice-signal',
];

export function Project({ p, toRecord = false }: { p: P; toRecord?: boolean }) {
  const { c, t } = useI18n();
  const k = c.project;
  const doc = getTech(p.slug);
  const cat = CATEGORIES.find((x) => x.id === p.category)!;
  const all = ordered();
  const next = all[(all.findIndex((x) => x.slug === p.slug) + 1) % all.length]!;
  const n = String(all.findIndex((x) => x.slug === p.slug) + 1).padStart(2, '0');

  const shown = SHOWN_POINTS[p.slug] ?? [];
  const points = p.points.map((pt, i) => ({ pt, i })).filter(({ i }) => !shown.includes(i));
  const gallery = p.figures.filter((f) => !SHOWN_MEDIA.includes(f.media));
  const dark = tone(p.slug) === 'dark';

  // Old /technical/:slug links land on the record.
  useEffect(() => {
    if (toRecord) requestAnimationFrame(() => document.getElementById('record')?.scrollIntoView());
  }, [toRecord, p.slug]);

  return (
    <>
      <article data-tone={tone(p.slug)} className={`surface room-${p.slug} ${dark ? 'tone-dark' : ''} pt-[calc(var(--header-h)+2.5rem)] pb-20 md:pb-32`}>
        <div className="wrap">
          <p className="mono mb-8 text-[0.74rem] fg-3">
            <Link to={paths.projects} className="transition-colors hover:text-[var(--accent)]">
              ← {k.back}
            </Link>
            <span className="px-2">/</span>
            {t(cat.name)}
          </p>
          <RoomHead p={p} n={n} level="page" />

          <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-14">
            <p className="thesis lg:col-span-8">{t(p.thesis)}</p>
            <div className="flex flex-col gap-3 text-[0.88rem] lg:col-span-4 lg:items-end">
              {p.links.map((l) => (
                <ExternalLink key={l.href} href={l.href}>
                  {t(l.label)}
                </ExternalLink>
              ))}
              {p.privateRepo && <span className="chip">{c.index.privateRepo}</span>}
              {doc && (
                <a href="#record" className="link mono text-[0.76rem]">
                  {k.record} <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
          </div>
          {p.note && <p className="mono mt-8 max-w-[80ch] border-l-2 border-[var(--line-2)] pl-3 text-[0.72rem] leading-relaxed fg-3">{t(p.note)}</p>}

          <div className="mt-16 md:mt-24">
            <Showcase p={p} full />
          </div>

          {/* ---- the plain story ---- */}
          <div className="mt-20 grid gap-10 border-t border-[var(--line-2)] pt-8 md:mt-32 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className="label fg-3">{k.why}</p>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={80}>
              <p className="text-[clamp(1.15rem,1.7vw,1.45rem)] leading-[1.5]">{t(p.why)}</p>
              {points.length > 0 && (
                <dl className="mt-12 grid gap-x-10 md:grid-cols-2">
                  {points.map(({ pt, i }) => (
                    <div key={i} className="border-t border-[var(--line)] py-6">
                      <dt className="text-[1.15rem] font-semibold leading-snug">{t(pt.title)}</dt>
                      <dd className="body mt-3 text-[0.94rem]">
                        <Rich text={t(pt.body)} />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {p.proof.length > 0 && (
                <ul className="mt-10 grid gap-3">
                  {p.proof.map((pr) => (
                    <li key={pr.en} className="flex gap-3 text-[0.95rem] leading-relaxed fg-2">
                      <span className="accent" aria-hidden="true">
                        ✓
                      </span>
                      {t(pr)}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </div>

          {gallery.length > 0 && (
            <div className="mt-20 md:mt-28">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[var(--line-2)] pt-4">
                <p className="label fg-3">{k.gallery}</p>
                <p className="text-[0.78rem] fg-3">{k.captureNote}</p>
              </div>
              <div className="mt-8 grid gap-12 md:grid-cols-2">
                {gallery.map((f, i) => (
                  <Reveal key={f.media} delay={(i % 2) * 90} className={gallery.length % 2 === 1 && i === 0 ? 'md:col-span-2' : ''}>
                    <Figure f={f} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {doc && <Record p={p} doc={doc} />}

      <Link
        to={paths.project(next.slug)}
        data-tone={tone(next.slug)}
        className={`surface room-${next.slug} ${tone(next.slug) === 'dark' ? 'tone-dark' : ''} group block py-16 md:py-24`}
      >
        <div className="wrap">
          <p className="label fg-3">{k.next}</p>
          <p className="name mt-4 text-[clamp(3rem,11vw,9rem)] transition-colors group-hover:text-[var(--accent)]">
            {next.name} <span className="arrow text-[0.5em]">→</span>
          </p>
          <p className="mono mt-3 fg-2">{t(next.kind)}</p>
        </div>
      </Link>
    </>
  );
}
