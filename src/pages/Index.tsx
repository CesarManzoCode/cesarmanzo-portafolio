/* ==================================================================== *
 * /projects — the whole body of work, sorted by what it is.
 *
 * A contents list first (six kinds, with counts), then every project as
 * a band in its own palette, led by its own capture or a drawing of its
 * own evidence, with its strongest measured result beside the thesis.
 * How much room a band takes follows the project’s weight.
 * ==================================================================== */
import type { ReactNode } from 'react';
import { CATEGORIES, ordered, projectsIn, selection, type Project } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Reveal, Status } from '../components/primitives';
import { Preview } from '../components/Previews';
import { OneClaims, tone } from '../components/Rooms';
import { CapabilityBand, GateGrid, ScalingChart, ToolPolicy } from '../components/viz';

/* Projects whose evidence is a dataset: the index draws it at size
   instead of cropping a capture. */
const DRAWN: Record<string, ReactNode> = {
  'thalyx-kernel': <ScalingChart />,
  supakernel: <GateGrid compact />,
  supadiff: (
    <>
      <div className="max-lg:hidden">
        <CapabilityBand />
      </div>
      <div className="relative h-[10rem] lg:hidden">
        <Preview slug="supadiff" />
      </div>
    </>
  ),
  ennard: <ToolPolicy />,
  one: <OneClaims />,
};

function Row({ p, n }: { p: Project; n: string }) {
  const { c, t } = useI18n();
  const doc = getTech(p.slug);
  const m = doc?.headline[0];
  const minor = p.weight === 'minor';
  const major = p.weight === 'major';
  const long = p.name.length > 12;
  return (
    <Link
      to={paths.project(p.slug)}
      data-tone={tone(p.slug)}
      className={`surface room-${p.slug} ${tone(p.slug) === 'dark' ? 'tone-dark' : ''} group block`}
    >
      <div className={`wrap grid gap-x-14 gap-y-7 lg:grid-cols-12 ${major ? 'py-12 md:py-16' : 'py-10 md:py-12'}`}>
        <div className={`flex flex-col ${major ? 'lg:col-span-5' : 'lg:col-span-6'}`}>
          <p className="flex flex-wrap items-baseline gap-x-3 text-[0.8rem] fg-3">
            <span className="num text-[1.15rem] accent">{n}</span>
            <span>{p.year}</span>
            {selection(p.slug) && <span className="fg-2">· {c.index.selected}</span>}
          </p>
          <p
            className={`name mt-3 break-words transition-colors group-hover:text-[var(--accent)] ${
              long ? 'text-[clamp(2rem,4vw,3.4rem)]' : major ? 'text-[clamp(2.8rem,6vw,5.6rem)]' : 'text-[clamp(2.4rem,4.6vw,4.2rem)]'
            }`}
          >
            {p.name}
          </p>
          <p className="mono mt-3 text-[0.74rem] fg-2">{t(p.kind)}</p>
          <p className={`mt-6 max-w-[52ch] leading-relaxed ${major ? 'text-[1.05rem]' : 'text-[0.98rem]'}`}>{t(p.thesis)}</p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-8 gap-y-4 pt-7">
            {m && (
              <p className="min-w-0">
                <span className="num block text-[2.2rem] accent">{t(m.value)}</span>
                <span className="mt-1 block max-w-[30ch] text-[0.76rem] leading-snug fg-3">{t(m.label)}</span>
              </p>
            )}
            <Status tone={p.statusTone} className="max-w-[40ch] fg-3">
              {t(p.status)}
            </Status>
          </div>
        </div>
        <div className={`max-lg:-order-1 ${major ? 'lg:col-span-7' : 'lg:col-span-6'}`}>
          {DRAWN[p.slug] ? (
            <div className="relative rounded-[8px] border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6">{DRAWN[p.slug]}</div>
          ) : (
          <div
            className={`relative overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--panel)] ${
              minor ? 'h-[11rem] md:h-[13rem]' : major ? 'h-[14rem] sm:h-[20rem] lg:h-full lg:min-h-[22rem]' : 'h-[13rem] sm:h-[17rem] lg:h-full lg:min-h-[17rem]'
            }`}
          >
            <Preview slug={p.slug} />
            <span className="index-open" aria-hidden="true">
              {c.index.open} →
            </span>
          </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function Index() {
  const { c, t } = useI18n();
  const all = ordered();
  const n = (slug: string) => String(all.findIndex((p) => p.slug === slug) + 1).padStart(2, '0');

  return (
    <div data-tone="light" className="surface pt-[calc(var(--header-h)+3.5rem)]">
      <div className="wrap grid gap-x-14 gap-y-12 pb-16 lg:grid-cols-12 md:pb-24">
        <div className="lg:col-span-7">
          <h1 className="display text-[clamp(3rem,8vw,7.4rem)]">{c.index.title}</h1>
          <p className="lede mt-8 max-w-[52ch]">{c.index.lede}</p>
        </div>
        <nav className="self-end lg:col-span-4 lg:col-start-9" aria-label={c.index.contents}>
          <p className="flex justify-between text-[0.8rem] fg-3">
            <span>{c.index.contents}</span>
            <span className="mono">{c.index.count(all.length, CATEGORIES.length)}</span>
          </p>
          <ol className="mt-3 border-t border-[var(--fg)]">
            {CATEGORIES.map((cat) => {
              const items = projectsIn(cat.id);
              return (
                <li key={cat.id} className="border-b border-[var(--line-2)]">
                  <a href={`#cat-${cat.id}`} className="group flex items-baseline justify-between gap-4 py-2.5">
                    <span className="text-[0.98rem] font-semibold transition-colors group-hover:text-[var(--accent)]">{t(cat.name)}</span>
                    <span className="mono shrink-0 text-[0.72rem] fg-3">{items.map((p) => n(p.slug)).join(' ')}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {CATEGORIES.map((cat) => {
        const items = projectsIn(cat.id);
        return (
          <section key={cat.id} id={`cat-${cat.id}`} aria-labelledby={`cat-${cat.id}-title`}>
            <div className="wrap">
              <div className="grid items-baseline gap-x-14 gap-y-2 border-t border-[var(--fg)] pt-5 pb-6 lg:grid-cols-12">
                <h2 id={`cat-${cat.id}-title`} className="display text-[clamp(1.6rem,2.6vw,2.3rem)] lg:col-span-5">
                  {t(cat.name)}
                </h2>
                <p className="text-[0.92rem] fg-2 lg:col-span-6 lg:col-start-7">{t(cat.blurb)}</p>
              </div>
            </div>
            <ul>
              {items.map((p) => (
                <li key={p.slug}>
                  <Reveal>
                    <Row p={p} n={n(p.slug)} />
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="h-14 md:h-20" />
          </section>
        );
      })}
    </div>
  );
}
