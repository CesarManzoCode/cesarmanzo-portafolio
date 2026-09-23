/* ==================================================================== *
 * Rooms — each project presented in its own material.
 *
 * A room paints itself with the palette of the project’s own captures
 * and leads with what the project actually produced: a terminal frame,
 * a storefront, a compiler’s verdict, a benchmark, a matrix of release
 * gates. The same compositions are used on Home (as a room) and at the
 * top of the project page (at full size).
 * ==================================================================== */
import type { ReactNode } from 'react';
import { CATEGORIES, type FigureRef, type MediaKey, type Project } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Figure, Framed, Reveal, Rich, Shot, Stat, Status } from './primitives';
import {
  AreaDots,
  CapabilityMatrix,
  CourseBlocks,
  FerrolFunnel,
  FerrolRubric,
  GateGrid,
  PhaseLadder,
  RatioPlot,
  ScalingChart,
  ToolPolicy,
  VerifyRun,
} from './viz';

export const tone = (slug: string) =>
  ['thalyx', 'orux', 'studymation', 'ennard', 'cesarmanzocode-rice', 'indice-cero'].includes(slug) ? 'dark' : 'light';

function fig(p: Project, key: MediaKey): FigureRef {
  const f = p.figures.find((x) => x.media === key);
  if (!f) throw new Error(`${p.slug}: missing figure ${key}`);
  return f;
}

/* -------------------------------------------------------------------- *
 * The head of a room: index, category, name, kind, status.
 * -------------------------------------------------------------------- */
export function RoomHead({ p, n, level = 'home' }: { p: Project; n?: string; level?: 'home' | 'page' }) {
  const { t } = useI18n();
  const cat = CATEGORIES.find((k) => k.id === p.category)!;
  const H = level === 'page' ? 'h1' : 'h2';
  return (
    <header>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-[var(--line-2)] pt-4">
        <p className="label fg-2">
          {n && <span className="accent mr-3">{n}</span>}
          {t(cat.name)}
        </p>
        <Status tone={p.statusTone} className="fg-2 max-w-[60ch]">
          {t(p.status)}
        </Status>
      </div>
      <H
        className={`name mt-6 break-words ${
          level === 'page' ? 'text-[clamp(3.6rem,15vw,13.5rem)]' : 'text-[clamp(3.4rem,12.5vw,11rem)]'
        }`}
      >
        {level === 'home' ? (
          <Link to={paths.project(p.slug)} className="transition-colors duration-300 hover:text-[var(--accent)]">
            {p.name}
          </Link>
        ) : (
          p.name
        )}
      </H>
      <p className="mono mt-4 fg-2">{t(p.kind)}</p>
    </header>
  );
}

/** Thesis + the two ways in. */
export function RoomFoot({ p }: { p: Project }) {
  const { t, c } = useI18n();
  return (
    <div className="mt-14 grid gap-8 border-t border-[var(--line)] pt-8 md:grid-cols-12 md:mt-20">
      <p className="thesis md:col-span-8">{t(p.thesis)}</p>
      <div className="flex flex-col items-start gap-3 md:col-span-4 md:items-end md:justify-end">
        <Link to={paths.project(p.slug)} className="btn btn-solid">
          {c.home.open} <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <Link to={`${paths.project(p.slug)}#record`} className="link mono text-[0.76rem]">
          {c.home.record} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

function Point({ p, i, big = false }: { p: Project; i: number; big?: boolean }) {
  const { t } = useI18n();
  const pt = p.points[i]!;
  return (
    <div>
      <p className={`display ${big ? 'text-[clamp(2.2rem,4vw,3.6rem)]' : 'text-[clamp(1.8rem,3vw,2.6rem)]'}`}>{t(pt.title)}</p>
      <p className="body mt-5 max-w-[46ch]">
        <Rich text={t(pt.body)} />
      </p>
    </div>
  );
}

function Stats({ p, cols = 3, size = 'lg' as const }: { p: Project; cols?: 2 | 3; size?: 'md' | 'lg' }) {
  const { t } = useI18n();
  return (
    <div className={`grid gap-x-6 gap-y-8 ${cols === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2'}`}>
      {p.stats.map((s) => (
        <Stat key={s.value + s.label.en} value={s.value} label={t(s.label)} size={size} />
      ))}
    </div>
  );
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`border border-[var(--line)] bg-[var(--panel)] p-5 sm:p-7 ${className}`}>{children}</div>;
}

/* -------------------------------------------------------------------- *
 * The compositions.
 * -------------------------------------------------------------------- */
export function Showcase({ p, full = false }: { p: Project; full?: boolean }) {
  const { t, c } = useI18n();

  switch (p.slug) {
    case 'thalyx':
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <Figure f={fig(p, 'thalyx-authorisation')} priority={full} />
            </Reveal>
            <Reveal className="flex flex-col justify-center lg:col-span-5" delay={120}>
              <Point p={p} i={0} big />
              <div className="mt-12">
                <Stats p={p} />
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-14 md:mt-20">
            <Panel>
              <VerifyRun />
            </Panel>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-3">
            {[1, 2, 3].map((i, k) => (
              <Reveal key={i} delay={k * 90} className="border-t border-[var(--line)] pt-5">
                <p className="text-[1.15rem] font-semibold leading-snug">{t(p.points[i]!.title)}</p>
                <p className="body mt-3 text-[0.92rem]">{t(p.points[i]!.body)}</p>
              </Reveal>
            ))}
          </div>
        </>
      );

    case 'ferrol':
      return (
        <>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="relative lg:col-span-8">
              <Framed media="ferrol-category" alt={t(fig(p, 'ferrol-category').alt)} label="ferrol · tornillería / tornillo hexagonal" priority={full} />
              <div className="absolute -bottom-10 -right-3 hidden w-[23%] sm:block lg:-right-8">
                <Framed media="ferrol-mobile" alt={t(fig(p, 'ferrol-mobile').alt)} kind="phone" />
              </div>
              <p className="caption pr-[26%]">{t(fig(p, 'ferrol-category').caption)}</p>
            </Reveal>
            <Reveal className="lg:col-span-4" delay={120}>
              <FerrolFunnel />
            </Reveal>
          </div>
          <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Point p={p} i={2} />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <FerrolRubric />
            </Reveal>
          </div>
          {full && (
            <div className="mt-20 grid gap-x-12 gap-y-10 md:grid-cols-3">
              {[0, 1, 3].map((i, k) => (
                <Reveal key={i} delay={k * 90} className="border-t border-[var(--line)] pt-5">
                  <p className="text-[1.15rem] font-semibold leading-snug">{t(p.points[i]!.title)}</p>
                  <p className="body mt-3 text-[0.92rem]">{t(p.points[i]!.body)}</p>
                </Reveal>
              ))}
            </div>
          )}
        </>
      );

    case 'indice-cero':
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <Figure f={fig(p, 'indice-challenge')} label="índice cero · reto" priority={full} />
            </Reveal>
            <Reveal className="flex flex-col justify-center lg:col-span-5" delay={120}>
              <Point p={p} i={1} big />
              <div className="mt-12">
                <Stats p={p} />
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Point p={p} i={0} />
            </div>
            <div className="lg:col-span-7">
              <CourseBlocks />
            </div>
          </Reveal>
          {full && (
            <Reveal className="mt-16">
              <Figure f={fig(p, 'indice-cycle')} kind="bare" />
            </Reveal>
          )}
        </>
      );

    case 'thalyx-kernel':
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <Panel>
                <p className="label fg-2">{t({ en: 'IPC round trips per 10 ms — higher is more work done', es: 'Idas y vueltas de IPC por 10 ms — más alto es más trabajo' })}</p>
                <div className="mt-5">
                  <ScalingChart />
                </div>
              </Panel>
            </Reveal>
            <Reveal className="flex flex-col justify-center lg:col-span-5" delay={120}>
              <Point p={p} i={1} big />
              <div className="mt-12">
                <Stats p={p} />
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-16 md:mt-24 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Point p={p} i={0} />
            </div>
            <div className="lg:col-span-8">
              <PhaseLadder />
            </div>
          </Reveal>
          {full && (
            <Reveal className="mt-16 md:mt-24">
              <Panel>
                <p className="display text-[clamp(1.6rem,2.6vw,2.3rem)]">
                  {t({ en: 'Every paired row, including the ones it loses.', es: 'Cada fila pareada, incluidas las que pierde.' })}
                </p>
                <p className="body mt-3 max-w-[70ch]">
                  {t({
                    en: 'Before anything runs, each benchmark declares what it may conclude. Only “equivalent” rows can be read as speed; “comparable” rows are the cost of different guarantees.',
                    es: 'Antes de correr, cada benchmark declara qué puede concluir. Solo las filas «equivalentes» se pueden leer como velocidad; las «comparables» son el costo de garantías distintas.',
                  })}
                </p>
                <div className="mt-8">
                  <RatioPlot />
                </div>
              </Panel>
            </Reveal>
          )}
        </>
      );

    case 'orux': {
      const steps = c.home.storyboard;
      const shot = (key: MediaKey, i: number, priority?: boolean) => (
        <figure>
          <p className="mb-3 flex items-baseline gap-3">
            <span className="num text-[1.8rem] accent">{steps[i]!.step}</span>
            <span className="text-[0.92rem] leading-snug fg-2">{steps[i]!.title}</span>
          </p>
          <Framed media={key} alt={t(fig(p, key).alt)} kind="bare" zoom="md" priority={priority} />
        </figure>
      );
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-8">{shot('orux-tentative', 0, full)}</Reveal>
            <div className="grid content-start gap-10 lg:col-span-4">
              <Reveal delay={120}>{shot('orux-review', 1)}</Reveal>
              <Reveal delay={200}>{shot('orux-impact', 2)}</Reveal>
            </div>
          </div>
          <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Point p={p} i={1} />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <Stats p={p} cols={2} />
              <p className="body mt-8 text-[0.92rem]">
                <span className="font-semibold text-[var(--fg)]">{t(p.points[2]!.title)}</span> {t(p.points[2]!.body)}
              </p>
            </Reveal>
          </div>
        </>
      );
    }

    case 'supadiff': {
      const doc = getTech('supadiff')!;
      const findings = doc.sections.find((s) => s.kind === 'evidence')!.blocks.find((b) => 'items' in b) as {
        items: { title: { en: string; es: string }; body: { en: string; es: string } }[];
      };
      return (
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Panel>
              <p className="label fg-2">
                {t({ en: '27 capabilities × 6 real targets', es: '27 capacidades × 6 targets reales' })}
              </p>
              <div className="mt-5">
                <CapabilityMatrix compact={!full} />
              </div>
            </Panel>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <Point p={p} i={0} />
            <p className="label mt-12 fg-3">{c.home.findings}</p>
            <ol className="mt-3 grid gap-5">
              {findings.items.map((f, i) => (
                <li key={f.title.en} className="border-l-2 border-[var(--accent)] pl-4">
                  <p className="font-semibold leading-snug">
                    <span className="mono mr-2 fg-3">0{i + 1}</span>
                    <Rich text={t(f.title)} />
                  </p>
                  <p className="body mt-2 text-[0.88rem]">
                    <Rich text={t(f.body)} />
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      );
    }

    case 'supakernel': {
      const chain = ['claim', 'capability', 'contract §', 'real targets', 'command', 'artifact', 'hash', 'result', 'limitation'];
      return (
        <>
          <Reveal>
            <p className="label fg-3">{c.home.evidenceModel}</p>
            <ol className="mt-3 flex flex-wrap items-center gap-y-2">
              {chain.map((x, i) => (
                <li key={x} className="flex items-center">
                  <span className="mono border border-[var(--line-2)] bg-[var(--panel)] px-2.5 py-1.5 text-[0.74rem]">{x}</span>
                  {i < chain.length - 1 && <span className="px-1.5 fg-3" aria-hidden="true">→</span>}
                </li>
              ))}
            </ol>
          </Reveal>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-8">
              <GateGrid compact={!full} />
            </Reveal>
            <Reveal className="lg:col-span-4" delay={120}>
              <Point p={p} i={1} />
              <div className="mt-10">
                <Stats p={p} cols={2} size="md" />
              </div>
            </Reveal>
          </div>
        </>
      );
    }

    case 'acredita-bach':
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <Figure f={fig(p, 'acredita-today')} label="acredita-bach · hoy" priority={full} />
            </Reveal>
            <Reveal className="flex flex-col justify-center lg:col-span-5" delay={120}>
              <Point p={p} i={0} big />
              <div className="mt-12">
                <Stats p={p} />
              </div>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <Reveal>
              <Figure f={fig(p, 'acredita-lesson')} label="paso 16 / 32" />
            </Reveal>
            <Reveal delay={120}>
              <Figure f={fig(p, 'acredita-item')} label="paso 22 / 32" />
            </Reveal>
          </div>
          <Reveal className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <Point p={p} i={1} />
            </div>
            <div className="lg:col-span-8">
              <AreaDots />
            </div>
          </Reveal>
        </>
      );

    case 'studymation':
      return (
        <>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <Figure f={fig(p, 'studymation-brief')} label="studymation · nuevo documento" priority={full} />
            </Reveal>
            <Reveal className="flex flex-col justify-center lg:col-span-5" delay={120}>
              <Point p={p} i={0} big />
              <div className="mt-12">
                <Stats p={p} cols={2} />
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-16">
            <Figure f={fig(p, 'studymation-pipeline')} kind="bare" />
          </Reveal>
          <Reveal className="mt-16">
            <Figure f={fig(p, 'studymation-document')} kind="bare" />
          </Reveal>
        </>
      );

    case 'ennard':
      return (
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Point p={p} i={0} big />
            <div className="mt-12">
              <Stats p={p} cols={2} />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <Panel>
              <ToolPolicy />
            </Panel>
          </Reveal>
        </div>
      );

    case 'one': {
      const states = ['untested', 'supported', 'refuted', 'inconclusive', 'withdrawn'];
      return (
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <Point p={p} i={0} big />
            <div className="mt-12">
              <Stats p={p} cols={2} />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-6" delay={120}>
            <Panel>
              <p className="label fg-3">{t({ en: 'Claim states in the registry', es: 'Estados de un claim en el registro' })}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {states.map((st) => (
                  <li
                    key={st}
                    className={`mono border px-2.5 py-1 text-[0.76rem] ${st === 'untested' ? 'border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]' : 'border-dashed border-[var(--line-2)] fg-3'}`}
                  >
                    {st}
                  </li>
                ))}
              </ul>
              <p className="body mt-5 text-[0.9rem]">
                {t({
                  en: 'Every claim sits in the first state. “Supported” means it survived its falsifier — never “proven”.',
                  es: 'Todos los claims están en el primer estado. «Supported» significa que sobrevivió a su falsador — nunca «probado».',
                })}
              </p>
              <p className="mono mt-6 border-t border-[var(--line)] pt-4 text-[0.74rem] leading-relaxed fg-2">
                ONE-C-O1 · RV64IM-O1 → Core-O1 → x86-64
                <br />
                <span className="fg-3">{t({ en: 'the first experiment — designed, not built', es: 'el primer experimento — diseñado, no construido' })}</span>
              </p>
            </Panel>
          </Reveal>
        </div>
      );
    }

    case 'cesarmanzocode-rice':
      return (
        <Reveal>
          <Figure f={p.figures[0]!} kind="bare" priority={full} />
        </Reveal>
      );

    default:
      return null;
  }
}

/* -------------------------------------------------------------------- *
 * A compact card for the smaller rooms on Home.
 * -------------------------------------------------------------------- */
export function AlsoCard({ p, className = '' }: { p: Project; className?: string }) {
  const { t } = useI18n();
  let art: ReactNode = null;
  if (p.slug === 'acredita-bach') art = <Framed media="acredita-today" alt={t(fig(p, 'acredita-today').alt)} label="acredita-bach · hoy" />;
  else if (p.slug === 'studymation')
    art = (
      <div className="frame aspect-[16/10]">
        <Shot media="studymation-brief" alt={t(fig(p, 'studymation-brief').alt)} className="h-full object-cover object-left-top" />
      </div>
    );
  else if (p.slug === 'ennard') art = <ToolPolicy />;
  else if (p.slug === 'cesarmanzocode-rice')
    art = <Shot media="rice-signal" alt={t(p.figures[0]!.alt)} className="aspect-[3/1] rounded-md border border-[var(--line)] object-cover" />;
  else if (p.slug === 'one')
    art = (
      <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
        {p.stats.map((s) => (
          <Stat key={s.value} value={s.value} label={t(s.label)} size="md" />
        ))}
        <span className="mono border border-[var(--fg)] bg-[var(--fg)] px-2.5 py-1 text-[0.76rem] text-[var(--bg)]">every claim: untested</span>
      </div>
    );

  return (
    <Link
      to={paths.project(p.slug)}
      data-tone={tone(p.slug)}
      className={`surface room-${p.slug} ${tone(p.slug) === 'dark' ? 'tone-dark' : ''} group flex flex-col p-6 sm:p-8 ${className}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="label fg-2">{t(p.kind)}</p>
        <span className="arrow accent" aria-hidden="true">
          →
        </span>
      </div>
      <h3 className="name mt-4 text-[clamp(2.6rem,5vw,4.4rem)] transition-colors group-hover:text-[var(--accent)]">{p.name}</h3>
      <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed fg-2">{t(p.thesis)}</p>
      <div className="mt-8 flex-1 content-end">{art}</div>
    </Link>
  );
}
