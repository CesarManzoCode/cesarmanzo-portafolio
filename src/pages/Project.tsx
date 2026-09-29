import { useEffect } from 'react';
import { CATEGORIES, ordered, selection, type MediaKey, type Project as P } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { ExternalLink, Figure, Reveal, Rich } from '../components/primitives';
import { RoomHead, Showcase, tone } from '../components/Rooms';
import { Record } from '../components/Record';
import { Preview } from '../components/Previews';

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
      <article data-tone={tone(p.slug)} className={`surface room-${p.slug} ${dark ? 'tone-dark' : ''} pt-[calc(var(--header-h)+2rem)] pb-20 md:pb-32`}>
        <div className="wrap">
          <p className="mb-10 text-[0.82rem] fg-3">
            {/* A selected project leads back to its chapter on the root page. */}
            <Link to={selection(p.slug) ? `${paths.home}#${p.slug}` : paths.projects} className="transition-colors hover:text-[var(--accent)]">
              ← {selection(p.slug) ? k.backSelected : k.back}
            </Link>
            <span className="px-2">/</span>
            {t(cat.name)}
          </p>
          <RoomHead p={p} n={n} level="page" />

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[var(--line)] pt-5 text-[0.88rem]">
            {p.links.map((l) => (
              <ExternalLink key={l.href} href={l.href}>
                {t(l.label)}
              </ExternalLink>
            ))}
            {p.privateRepo && <span className="chip">{c.index.privateRepo}</span>}
            {doc && (
              <a href="#record" className="link mono text-[0.76rem] sm:ml-auto">
                {k.record} <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>
          {p.note && <p className="mt-5 max-w-[80ch] text-[0.8rem] leading-relaxed fg-3">{t(p.note)}</p>}

          <div className="mt-14 md:mt-20">
            <Showcase p={p} full />
          </div>

          {/* ---- the plain story ---- */}
          <div className="mt-24 grid gap-x-14 gap-y-8 border-t border-[var(--line-2)] pt-8 md:mt-32 lg:grid-cols-12">
            <Reveal className="lg:col-span-3">
              <p className="text-[0.9rem] font-semibold">{k.why}</p>
            </Reveal>
            <Reveal className="lg:col-span-9" delay={80}>
              <p className="thesis">{t(p.why)}</p>
              {p.proof.length > 0 && (
                <ul className="mt-12 border-t border-[var(--line-2)]">
                  {p.proof.map((pr) => (
                    <li key={pr.en} className="grid grid-cols-[2.2rem_1fr] items-baseline border-b border-[var(--line)] py-4 text-[1rem] leading-relaxed">
                      <span className="proof-mark" aria-hidden="true">
                        ✓
                      </span>
                      {t(pr)}
                    </li>
                  ))}
                </ul>
              )}
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
        className={`surface room-${next.slug} ${tone(next.slug) === 'dark' ? 'tone-dark' : ''} group block border-t border-[var(--line)] py-14 md:py-20`}
      >
        <div className="wrap grid items-center gap-x-14 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-[0.82rem] fg-3">{k.next}</p>
            <p className={`name mt-4 break-words transition-colors group-hover:text-[var(--accent)] ${next.name.length > 12 ? 'text-[clamp(2.4rem,6vw,6rem)]' : 'text-[clamp(3rem,9vw,8rem)]'}`}>
              {next.name} <span className="arrow text-[0.5em]">→</span>
            </p>
            <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed fg-2">{t(next.thesis)}</p>
          </div>
          <div className="relative h-[12rem] overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--panel)] sm:h-[16rem] lg:col-span-5" aria-hidden="true">
            <Preview slug={next.slug} />
          </div>
        </div>
      </Link>
    </>
  );
}
