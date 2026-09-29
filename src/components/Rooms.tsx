/* ==================================================================== *
 * Rooms — each project presented in its own material.
 *
 * A room paints itself with the palette of the project’s own captures
 * and leads with what the project actually produced: a terminal frame,
 * a storefront, a compiler’s verdict, a benchmark, a matrix of release
 * gates. The same compositions are used on Home (as a room) and at the
 * top of the project page (at full size).
 * ==================================================================== */
import { useState, type ReactNode } from 'react';
import { CATEGORIES, SELECTED, selection, type FigureRef, type MediaKey, type Project, type T } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Annotated, Figure, Framed, Reveal, Rich, Shot, Stat, Status, type Pin } from './primitives';
import {
  AreaDots,
  CapabilityBand,
  CapabilityMatrix,
  CourseBlocks,
  FerrolReduction,
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
 * The head of a room: kept short, so the evidence starts within the
 * first screen. The name, what it was checked against, and the one
 * sentence that says what it is.
 * -------------------------------------------------------------------- */
export function RoomHead({ p, n, level = 'home' }: { p: Project; n?: string; level?: 'home' | 'page' }) {
  const { t, c } = useI18n();
  const cat = CATEGORIES.find((k) => k.id === p.category)!;
  const sel = selection(p.slug);
  const H = level === 'page' ? 'h1' : 'h2';
  // Sized by length, so a name never breaks inside a word on a wide screen.
  const len = p.name.length;
  const size =
    level === 'page'
      ? len <= 8
        ? 'text-[clamp(3.8rem,12vw,11rem)]'
        : len <= 11
          ? 'text-[clamp(3rem,8.4vw,7.6rem)]'
          : 'text-[clamp(2.2rem,6.2vw,6rem)]'
      : len <= 8
        ? 'text-[clamp(3.4rem,8.6vw,8rem)]'
        : len <= 11
          ? 'text-[clamp(2.8rem,6.6vw,6.2rem)]'
          : 'text-[clamp(2.2rem,5.2vw,5rem)]';
  return (
    <header className="grid gap-x-14 gap-y-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[0.8rem] fg-2">
          {n && (
            <span className="num text-[1.3rem] accent">
              {n}
              {sel && <span className="fg-3">/{String(SELECTED.length).padStart(2, '0')}</span>}
            </span>
          )}
          <span>{t(cat.name)}</span>
          <span className="fg-3">{p.year}</span>
        </p>
        <H id={`${p.slug}-name`} className={`name mt-4 break-words ${size}`}>
          {level === 'home' ? (
            <Link to={paths.project(p.slug)} className="transition-colors duration-300 hover:text-[var(--accent)]">
              {p.name}
            </Link>
          ) : (
            p.name
          )}
        </H>
        <p className="mono mt-4 fg-2">{t(p.kind)}</p>
      </div>
      <div className="flex flex-col justify-end gap-6 lg:col-span-5">
        {sel && (
          <p>
            <span className="block text-[0.8rem] fg-3">{c.room.against}</span>
            <span className="against mt-1 block accent">{t(sel.against)}</span>
          </p>
        )}
        <p className="thesis">{t(p.thesis)}</p>
        <Status tone={p.statusTone} className="fg-3">
          {t(p.status)}
        </Status>
      </div>
    </header>
  );
}

/** The two ways in, after the evidence. */
export function RoomFoot({ p }: { p: Project }) {
  const { c, t } = useI18n();
  const sel = selection(p.slug);
  return (
    <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-[var(--line)] pt-7 md:mt-24">
      {sel && <p className="max-w-[60ch] text-[0.95rem] leading-relaxed fg-2">{t(sel.verdict)}</p>}
      <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
        <Link to={`${paths.project(p.slug)}#record`} className="link mono text-[0.76rem]">
          {c.room.record} <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <Link to={paths.project(p.slug)} className="btn btn-solid">
          {c.room.open} <span className="arrow" aria-hidden="true">→</span>
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

/** Numbered claims in a row, each with its reason — the story told as rules. */
function Rules({ p, idx, className = '' }: { p: Project; idx: number[]; className?: string }) {
  const { t } = useI18n();
  return (
    <ol className={`rules ${className}`}>
      {idx.map((i, k) => (
        <Reveal as="li" key={i} delay={k * 80}>
          <p className="text-[1.15rem] font-semibold leading-snug tracking-[-0.01em]">{t(p.points[i]!.title)}</p>
          <p className="body mt-3 text-[0.92rem]">
            <Rich text={t(p.points[i]!.body)} />
          </p>
        </Reveal>
      ))}
    </ol>
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
  return <div className={`border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-7 ${className}`}>{children}</div>;
}

/* -------------------------------------------------------------------- *
 * Pins on the captures. Each one points at something visibly in the
 * capture; the note says what it is, in the project’s own terms.
 * -------------------------------------------------------------------- */
const s2 = (en: string, es: string): T => ({ en, es });

const PINS: Partial<Record<MediaKey, Pin[]>> = {
  'thalyx-authorisation': [
    { x: 62, y: 16.7, note: s2('The frame is drawn by the core from the module’s signed manifest — the agent cannot compose it or reword it.', 'El núcleo dibuja el aviso a partir del manifiesto firmado del módulo — el agente no puede redactarlo ni reformularlo.') },
    { x: 62, y: 38.1, note: s2('The one permission requested, shown in full — never a subset.', 'El único permiso solicitado, completo — nunca una parte.') },
    { x: 24, y: 59.6, note: s2('Nothing installs without a yes from the person at the keyboard.', 'Nada se instala sin un sí de la persona frente al teclado.') },
    { x: 67, y: 76.8, note: s2('The module runs as its own user, and no other module’s.', 'El módulo corre con su propio usuario, y el de ningún otro módulo.') },
  ],
  'ferrol-category': [
    { x: 43, y: 3.3, note: s2('One search field, by measurement, key or name.', 'Un solo buscador, por medida, por clave o por nombre.') },
    { x: 39.8, y: 19.9, note: s2('A branch with 2,597 articles of the real list.', 'Una rama con 2,597 artículos de la lista real.') },
    { x: 60.4, y: 25.1, note: s2('Names arrive the way the supplier writes them: “TOR” means tornillo — screw.', 'Los nombres llegan como los escribe el proveedor: «TOR» es tornillo.') },
    { x: 51.8, y: 52.6, note: s2('Availability per article, and a filter for it: in stock, on order, out of stock.', 'Disponibilidad por artículo, con su filtro: disponible, sobre pedido, sin existencia.') },
    { x: 82.6, y: 25.6, note: s2('A reference price per row, tax included — the margin in this capture is a trial figure, not the store’s.', 'Precio de referencia por renglón, IVA incluido — el margen de esta captura es de ensayo, no el de la tienda.') },
  ],
  'indice-challenge': [
    { x: 79.5, y: 35.4, note: s2('The attempt divides by `3`, not `3.0` — the classic integer-division mistake.', 'El intento divide entre `3`, no entre `3.0` — el error clásico de la división entera.') },
    { x: 44.8, y: 64.6, note: s2('Compiled and run against 2 tests: 0 passed.', 'Compilado y corrido contra 2 pruebas: 0 aprobadas.') },
    { x: 69.6, y: 76.3, note: s2('Expected output next to the student’s.', 'La salida esperada junto a la del estudiante.') },
    { x: 87.6, y: 81.4, note: s2('The exact place they part: line 1, column 12.', 'El lugar exacto donde se separan: línea 1, columna 12.') },
    { x: 61.6, y: 88.9, note: s2('A hidden second case, so the fix cannot be fitted to the example.', 'Un segundo caso oculto, para que la solución no se ajuste al ejemplo.') },
  ],
};

function pinned(p: Project, key: MediaKey) {
  return { f: fig(p, key), pins: PINS[key]! };
}

/* -------------------------------------------------------------------- *
 * Orux — the storyboard: one save, seen from three seats. The steps
 * are the controls; the stage shows the capture of the chosen one.
 * -------------------------------------------------------------------- */
function Storyboard({ p, full }: { p: Project; full: boolean }) {
  const { c, t } = useI18n();
  const keys: MediaKey[] = ['orux-tentative', 'orux-review', 'orux-impact'];
  const [at, setAt] = useState(0);
  const steps = c.room.storyboard;
  const f = fig(p, keys[at]!);
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-8">
        <div className="frame frame-bare">
          <div className="figure-scroll zoom-md">
            <div className="relative" style={{ aspectRatio: '1600 / 1003' }}>
              {keys.map((k, i) => (
                <Shot
                  key={k}
                  media={k}
                  alt={i === at ? t(fig(p, k).alt) : ''}
                  priority={full && i === 0}
                  className={`story-shot absolute inset-0 h-full ${i === at ? 'on' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="caption" aria-live="polite">
          <span className="mono mr-2 md:hidden">↔ {c.a11y.swipe}</span>
          {t(f.caption)}
        </p>
      </div>
      <ol className="story-steps lg:col-span-4" aria-label={c.room.storyboardLabel}>
        {steps.map((st, i) => (
          <li key={st.step}>
            <button type="button" className={`story-step ${i === at ? 'on' : ''}`} aria-pressed={i === at} onClick={() => setAt(i)}>
              <span className="story-thumb" aria-hidden="true">
                <Shot media={keys[i]!} alt="" className="h-full object-cover object-left-top" />
              </span>
              <span className="min-w-0">
                <span className="num block text-[1.9rem] accent">{st.step}</span>
                <span className="mt-1 block text-[0.9rem] leading-snug">{st.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
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
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <Reveal className="grid gap-8 lg:col-span-7">
              <Annotated {...pinned(p, 'thalyx-authorisation')} priority={full} />
            </Reveal>
            <Reveal className="lg:col-span-5" delay={120}>
              <div className="border-t border-[var(--line-2)] pt-6">
                <VerifyRun />
              </div>
              <div className="mt-12">
                <Stats p={p} cols={2} />
              </div>
            </Reveal>
          </div>
          <Rules p={p} idx={[0, 1, 2, 3]} className="mt-20 md:mt-28" />
        </>
      );

    case 'ferrol':
      return (
        <>
          <Reveal>
            <Annotated {...pinned(p, 'ferrol-category')} side label="ferrol · tornillería / tornillo hexagonal" priority={full} frameClassName="sm:mb-20">
              {/* The phone sits over the empty foot of the filter column. */}
              <div className="absolute -bottom-20 left-[2.5%] hidden w-[19%] sm:block">
                <Framed media="ferrol-mobile" alt={t(fig(p, 'ferrol-mobile').alt)} kind="phone" />
              </div>
            </Annotated>
          </Reveal>
          <Reveal className="mt-20 border-t border-[var(--line-2)] pt-8 md:mt-28">
            <FerrolReduction />
          </Reveal>
          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Point p={p} i={2} />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <FerrolRubric />
            </Reveal>
          </div>
          {full && <Rules p={p} idx={[0, 1, 3]} className="mt-20 md:mt-28" />}
        </>
      );

    case 'indice-cero':
      return (
        <>
          <Reveal>
            <Annotated
              {...pinned(p, 'indice-challenge')}
              side
              label="índice cero · reto"
              priority={full}
              aside={<p className="display mb-8 text-[clamp(2rem,3.2vw,3rem)]">{t(p.points[1]!.title)}</p>}
            />
          </Reveal>
          <Reveal className="mt-20 grid gap-x-14 gap-y-12 border-t border-[var(--line-2)] pt-8 md:mt-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Point p={p} i={0} />
              <div className="mt-12">
                <Stats p={p} cols={3} size="md" />
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
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

    case 'orux':
      return (
        <>
          <Reveal>
            <Storyboard p={p} full={full} />
          </Reveal>
          <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Point p={p} i={1} />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
              <Stats p={p} cols={2} />
              <p className="body mt-10 border-t border-[var(--line)] pt-5 text-[0.95rem]">
                <span className="font-semibold text-[var(--fg)]">{t(p.points[2]!.title)}</span> {t(p.points[2]!.body)}
              </p>
            </Reveal>
          </div>
        </>
      );

    case 'supadiff': {
      const doc = getTech('supadiff')!;
      const findings = doc.sections.find((s) => s.kind === 'evidence')!.blocks.find((b) => 'items' in b) as {
        items: { title: { en: string; es: string }; body: { en: string; es: string } }[];
      };
      return (
        <>
          <Reveal>
            <Panel className="max-lg:hidden">
              <CapabilityBand />
            </Panel>
            <Panel className="lg:hidden">
              <p className="label fg-2">{t({ en: '27 capabilities × 6 real targets', es: '27 capacidades × 6 targets reales' })}</p>
              <div className="mt-5">
                <CapabilityMatrix compact={!full} />
              </div>
            </Panel>
          </Reveal>
          <div className="mt-20 grid gap-x-14 gap-y-12 md:mt-28 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Point p={p} i={0} />
              <div className="mt-12">
                <Stats p={p} cols={3} size="md" />
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7 lg:col-start-6" delay={120}>
              <p className="text-[0.8rem] fg-3">{c.room.findings}</p>
              <ol className="mt-4 grid gap-4 md:grid-cols-2">
                {findings.items.map((f, i) => (
                  <li key={f.title.en} className="ticket">
                    <p className="mono flex justify-between gap-4 text-[0.7rem] fg-3">
                      <span>{c.room.finding} {String(i + 1).padStart(2, '0')}</span>
                      <span className="accent">{c.room.reproducible}</span>
                    </p>
                    <p className="mt-4 text-[1.15rem] font-semibold leading-snug">
                      <Rich text={t(f.title)} />
                    </p>
                    <p className="body mt-3 text-[0.9rem]">
                      <Rich text={t(f.body)} />
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </>
      );
    }

    case 'supakernel': {
      const chain = ['claim', 'capability', 'contract §', 'real targets', 'command', 'artifact', 'hash', 'result', 'limitation'];
      return (
        <>
          <Reveal>
            <p className="label fg-3">{c.room.evidenceModel}</p>
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

    case 'one':
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
              <OneClaims />
            </Panel>
          </Reveal>
        </div>
      );

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

/** ONE’s registry: every claim sits in its first state. */
export function OneClaims() {
  const { t } = useI18n();
  const states = ['untested', 'supported', 'refuted', 'inconclusive', 'withdrawn'];
  return (
    <div>
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
    </div>
  );
}
