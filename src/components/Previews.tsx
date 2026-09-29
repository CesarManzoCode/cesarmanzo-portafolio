/* ==================================================================== *
 * Previews — what stands for a project wherever it is listed: its own
 * capture when it has one, otherwise a small drawing of its own
 * evidence (the kernel's scaling curve, the release gates, the
 * capability matrix, the tool policy, the verify run).
 * ==================================================================== */
import type { CSSProperties } from 'react';
import { ENNARD_TOOLS, KERNEL_SCALING, SUPADIFF_MATRIX, SUPAKERNEL_GATES, THALYX_VERIFY } from '../data/evidence';
import { getProject } from '../data/projects';
import { MEDIA } from '../data/media';
import { useInView } from './primitives';

/* Where each capture is framed when it is cropped to a preview. */
const POS: Record<string, string> = {
  thalyx: 'left top',
  orux: '22% top',
  ferrol: 'left 12%',
  'indice-cero': 'right top',
  'acredita-bach': 'left top',
  studymation: '30% 12%',
  'cesarmanzocode-rice': 'center',
};

export function KernelArt({ seen }: { seen: boolean }) {
  const W = 300;
  const H = 150;
  const x = (i: number) => 18 + (i / 3) * (W - 36);
  const y = (v: number) => H - 16 - (v / 12000) * (H - 34);
  const d = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const draw = (delay: number): CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: seen ? 0 : 1,
    transition: `stroke-dashoffset 1.4s cubic-bezier(.6,0,.2,1) ${delay}ms`,
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={18} x2={W - 18} y1={y(i * 4000)} y2={y(i * 4000)} stroke="var(--line)" />
      ))}
      <path d={d(KERNEL_SCALING.linux)} fill="none" stroke="var(--fg)" strokeWidth="1.4" strokeDasharray="4 4" />
      <path d={d(KERNEL_SCALING.baseline)} fill="none" stroke="var(--fg-3)" strokeWidth="1.4" pathLength={1} style={draw(200)} />
      <path d={d(KERNEL_SCALING.split)} fill="none" stroke="var(--accent)" strokeWidth="2.4" pathLength={1} style={draw(600)} />
    </svg>
  );
}

export function GatesArt({ seen }: { seen: boolean }) {
  return (
    <div className="absolute inset-x-4 top-4 flex max-w-[20rem] flex-wrap gap-[3px]" aria-hidden="true">
      {SUPAKERNEL_GATES.map((g, i) => (
        <span
          key={g.id}
          className="block h-4 w-4"
          style={{
            background: g.result === 'pass' ? 'var(--ok)' : 'transparent',
            boxShadow: g.result === 'pass' ? undefined : 'inset 0 0 0 1.5px var(--warn)',
            opacity: seen ? 1 : 0.1,
            transition: `opacity .3s ease ${i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function MatrixArt({ seen }: { seen: boolean }) {
  const lvl = (l: string): CSSProperties =>
    l === 'exact'
      ? { background: 'var(--fg)' }
      : l === 'experimental'
        ? { boxShadow: 'inset 0 0 0 1px var(--warn)' }
        : l === 'approximate'
          ? { background: 'var(--fg-3)' }
          : l === 'unsupported'
            ? { boxShadow: 'inset 0 0 0 1px var(--line-2)' }
            : {};
  return (
    <div className="absolute inset-x-4 top-4 grid grid-flow-col grid-rows-6 gap-[2px]" aria-hidden="true">
      {SUPADIFF_MATRIX.flatMap((r, ri) =>
        r.levels.map((l, ci) => (
          <span
            key={`${ri}-${ci}`}
            className="block h-[9px]"
            style={{ ...lvl(l), opacity: seen ? 1 : 0, transition: `opacity .3s ease ${ri * 20}ms` }}
          />
        )),
      )}
    </div>
  );
}

export function ToolsArt() {
  return (
    <div className="absolute inset-x-4 top-4 flex flex-wrap gap-[3px]" aria-hidden="true">
      {Array.from({ length: ENNARD_TOOLS.automatic + ENNARD_TOOLS.approval.length }, (_, i) => (
        <span key={i} className="block h-4 w-4" style={i < ENNARD_TOOLS.automatic ? { boxShadow: 'inset 0 0 0 1px var(--line-2)' } : { background: 'var(--accent)' }} />
      ))}
    </div>
  );
}

export function VerifyArt({ seen }: { seen: boolean }) {
  const n = THALYX_VERIFY.proven + THALYX_VERIFY.notProven;
  return (
    <div className="absolute inset-x-4 top-4 grid gap-[2px]" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(7px, 1fr))' }} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          className={`block aspect-square ${i >= THALYX_VERIFY.proven ? 'hatch' : ''}`}
          style={{
            background: i < THALYX_VERIFY.proven ? 'var(--ok)' : undefined,
            outline: i >= THALYX_VERIFY.proven ? '1px solid var(--warn)' : undefined,
            outlineOffset: -1,
            opacity: seen ? 1 : 0.15,
            transition: `opacity .3s ease ${i * 4}ms`,
          }}
        />
      ))}
    </div>
  );
}

function ClaimsArt() {
  const states = ['untested', 'supported', 'refuted', 'inconclusive', 'withdrawn'];
  return (
    <div className="absolute inset-x-4 top-4 flex flex-wrap gap-1.5" aria-hidden="true">
      {states.map((st) => (
        <span
          key={st}
          className={`mono border px-2 py-0.5 text-[0.66rem] ${st === 'untested' ? 'border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]' : 'border-dashed border-[var(--line-2)] fg-3'}`}
        >
          {st}
        </span>
      ))}
    </div>
  );
}

/** Fills its (positioned) parent with the project’s capture or evidence drawing. */
export function Preview({ slug, eager = false, evidence = false }: { slug: string; eager?: boolean; evidence?: boolean }) {
  const [ref, seen] = useInView<HTMLDivElement>('0px');
  const p = getProject(slug)!;
  let art = null;
  if (slug === 'thalyx-kernel') art = <KernelArt seen={seen} />;
  else if (slug === 'supakernel') art = <GatesArt seen={seen} />;
  else if (slug === 'supadiff') art = <MatrixArt seen={seen} />;
  else if (slug === 'ennard') art = <ToolsArt />;
  else if (slug === 'one') art = <ClaimsArt />;
  else if (slug === 'thalyx' && evidence) art = <VerifyArt seen={seen} />;
  const media = p.cover ?? (slug === 'cesarmanzocode-rice' ? p.figures[0]?.media : undefined);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {art ??
        (media && (
          <img
            src={MEDIA[media]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ objectPosition: POS[slug] ?? 'left top' }}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
    </div>
  );
}
