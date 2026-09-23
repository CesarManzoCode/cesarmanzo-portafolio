/* ==================================================================== *
 * Charts drawn from src/data/evidence.ts — each one a real dataset from
 * the project’s own repository, drawn as it is. Motion is used once per
 * chart, only where it says something (a verify run filling in, a line
 * being drawn), and never under reduced motion.
 * ==================================================================== */
import type { CSSProperties } from 'react';
import {
  ACREDITA_AREAS,
  ENNARD_TOOLS,
  FERROL_FUNNEL,
  FERROL_RUBRIC,
  FERROL_THRESHOLD,
  FERROL_TOR_SCORE,
  INDICE_COURSES,
  KERNEL_PHASES,
  KERNEL_RATIOS,
  KERNEL_SCALING,
  SUPADIFF_MATRIX,
  SUPADIFF_TARGETS,
  SUPAKERNEL_EVIDENCE,
  SUPAKERNEL_GATES,
  SUPAKERNEL_RELEASE,
  THALYX_VERIFY,
  type BenchClass,
  type CapLevel,
  type GateResult,
} from '../data/evidence';
import type { T } from '../data/projects';
import { useI18n } from '../i18n/context';
import { useInView } from './primitives';

const s = (en: string, es: string): T => ({ en, es });
const fmt = (n: number, lang: string) => n.toLocaleString(lang === 'es' ? 'es-MX' : 'en-US');

function Source({ children }: { children: string }) {
  return <p className="mono mt-4 text-[0.68rem] fg-3">{children}</p>;
}

/* -------------------------------------------------------------------- *
 * Thalyx — one square per check in the latest hardware run.
 * -------------------------------------------------------------------- */
export function VerifyRun({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  const { proven, notProven, failed, date } = THALYX_VERIFY;
  const cells = [...Array(proven).fill('p'), ...Array(notProven).fill('n')] as ('p' | 'n')[];

  return (
    <div ref={ref}>
      <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
        <div>
          <p className="num text-[3.4rem] sm:text-[4.4rem]" style={{ color: 'var(--ok)' }}>
            {proven}
          </p>
          <p className="label mt-1 fg-2">PROVEN</p>
        </div>
        <div>
          <p className="num text-[3.4rem] sm:text-[4.4rem]" style={{ color: 'var(--warn)' }}>
            {notProven}
          </p>
          <p className="label mt-1 fg-2">NOT PROVEN</p>
        </div>
        <div>
          <p className="num text-[3.4rem] sm:text-[4.4rem]">{failed}</p>
          <p className="label mt-1 fg-2">FAILED</p>
        </div>
        {!compact && (
          <p className="mono max-w-[36ch] text-[0.72rem] fg-3 sm:ml-auto sm:text-right">
            <span style={{ color: 'var(--accent)' }}>$</span> sudo ./dev/verify.sh
            <br />
            {t(s(`real hardware · ${date}`, `hardware real · ${date}`))}
          </p>
        )}
      </div>

      <div
        className="mt-6 grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${compact ? 9 : 12}px, 1fr))` }}
        role="img"
        aria-label={t(
          s(
            `${proven} checks proven, ${notProven} not proven, ${failed} failed, on real hardware on ${date}.`,
            `${proven} comprobaciones probadas, ${notProven} no probadas, ${failed} fallidas, en hardware real el ${date}.`,
          ),
        )}
      >
        {cells.map((k, i) => (
          <span
            key={i}
            className={`block aspect-square rounded-[1.5px] ${k === 'n' ? 'hatch' : ''}`}
            style={{
              background: k === 'p' ? (seen ? 'var(--ok)' : 'var(--off)') : undefined,
              outline: k === 'n' ? '1px solid var(--warn)' : undefined,
              outlineOffset: -1,
              opacity: seen ? 1 : k === 'n' ? 0.2 : 1,
              transition: `background-color 0.25s ease ${i * 7}ms, opacity 0.25s ease ${i * 7}ms`,
            }}
          />
        ))}
      </div>
      <p className="mt-3 text-[0.8rem] leading-relaxed fg-3">
        {t(
          s(
            'One square per result. A check that could not run is reported NOT PROVEN, with its reason — never counted as a pass.',
            'Un cuadro por resultado. Una comprobación que no pudo correr se reporta NOT PROVEN, con su motivo — nunca se cuenta como aprobada.',
          ),
        )}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Thalyx-Kernel — phases as rows of criteria, all passed.
 * -------------------------------------------------------------------- */
export function PhaseLadder() {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="grid gap-2.5">
      {KERNEL_PHASES.map((p, row) => {
        const n = Number(p.gate.split('/')[0]);
        const extra = p.gate.includes('+') ? 5 : 0;
        return (
          <div key={p.id} className="grid grid-cols-[2.4rem_1fr] items-center gap-3 sm:grid-cols-[2.6rem_minmax(0,13rem)_1fr_auto] sm:gap-4">
            <span className="num text-[1.7rem]">{p.id}</span>
            <span className="text-[0.84rem] fg-2 max-sm:hidden">{t(p.what)}</span>
            <span className="col-span-1 flex flex-wrap gap-[2px] max-sm:col-start-2" aria-hidden="true">
              {Array.from({ length: n + extra }, (_, i) => (
                <i
                  key={i}
                  className="block h-3 w-[5px]"
                  style={{
                    background: i >= n ? 'var(--fg-3)' : 'var(--accent)',
                    opacity: seen ? 1 : 0.12,
                    transition: `opacity .3s ease ${row * 120 + i * 12}ms`,
                  }}
                />
              ))}
            </span>
            <span className="mono text-[0.74rem] fg-2 max-sm:col-start-2 sm:text-right">
              <span className="sm:hidden">{t(p.what)} · </span>
              {p.gate}
              {p.self && <span className="fg-3"> · self {p.self}</span>}
            </span>
          </div>
        );
      })}
      <p className="mt-2 text-[0.8rem] leading-relaxed fg-3">
        {t(
          s(
            'Each bar is one gate’s criteria, decided by a separate script from kernel logs and raw disk bytes. Every gate re-runs all earlier gates against the same kernel binary.',
            'Cada barra son los criterios de un gate, decididos por un script aparte a partir de los logs del kernel y los bytes crudos del disco. Cada gate vuelve a correr todos los anteriores contra el mismo binario del kernel.',
          ),
        )}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Thalyx-Kernel — IPC throughput against pairs, three series.
 * -------------------------------------------------------------------- */
export function ScalingChart() {
  const { t, lang } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  const W = 680;
  const H = 380;
  const m = { l: 58, r: 150, t: 18, b: 46 };
  const iw = W - m.l - m.r;
  const ih = H - m.t - m.b;
  const max = 12000;
  const x = (i: number) => m.l + (i / 3) * iw;
  const y = (v: number) => m.t + ih - (v / max) * ih;
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  const series = [
    { key: 'linux', vals: KERNEL_SCALING.linux, color: 'var(--fg)', dash: '5 5', label: s('Linux', 'Linux'), w: 1.6 },
    { key: 'baseline', vals: KERNEL_SCALING.baseline, color: 'var(--fg-3)', dash: undefined, label: s('one global lock', 'un lock global'), w: 1.6 },
    { key: 'split', vals: KERNEL_SCALING.split, color: 'var(--accent)', dash: undefined, label: s('lock split', 'lock partido'), w: 2.6 },
  ];

  return (
    <div ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full overflow-visible"
        role="img"
        aria-label={t(
          s(
            'IPC round trips per 10 ms with 1 to 4 pairs. Linux: 1,516, 3,031, 7,410, 11,912. This kernel with one global lock: 2,352, 1,701, 1,597, 1,806. After the lock split: 4,608, 6,362, 7,797, 8,518.',
            'Idas y vueltas de IPC por 10 ms con 1 a 4 pares. Linux: 1,516, 3,031, 7,410, 11,912. Este kernel con un lock global: 2,352, 1,701, 1,597, 1,806. Tras partir el lock: 4,608, 6,362, 7,797, 8,518.',
          ),
        )}
      >
        {[0, 3000, 6000, 9000, 12000].map((v) => (
          <g key={v}>
            <line x1={m.l} x2={m.l + iw} y1={y(v)} y2={y(v)} stroke="var(--line)" />
            <text x={m.l - 10} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--fg-3)" fontFamily="var(--font-mono)">
              {v === 0 ? '0' : `${v / 1000}k`}
            </text>
          </g>
        ))}
        {KERNEL_SCALING.pairs.map((p, i) => (
          <text key={p} x={x(i)} y={H - m.b + 22} textAnchor="middle" fontSize="11" fill="var(--fg-3)" fontFamily="var(--font-mono)">
            {p}
          </text>
        ))}
        <text x={m.l + iw / 2} y={H - 4} textAnchor="middle" fontSize="10.5" fill="var(--fg-3)" fontFamily="var(--font-sans)" letterSpacing="0.06em">
          {t(s('CLIENT/SERVER PAIRS', 'PARES CLIENTE/SERVIDOR'))}
        </text>

        {series.map((se, si) => (
          <g key={se.key}>
            <path
              d={path(se.vals)}
              fill="none"
              stroke={se.color}
              strokeWidth={se.w}
              strokeDasharray={se.dash}
              strokeLinejoin="round"
              strokeLinecap="round"
              pathLength={se.dash ? undefined : 1}
              style={
                se.dash
                  ? { opacity: seen ? 1 : 0, transition: 'opacity .6s ease' }
                  : ({
                      strokeDasharray: 1,
                      strokeDashoffset: seen ? 0 : 1,
                      transition: `stroke-dashoffset 1.3s cubic-bezier(.6,0,.2,1) ${250 + si * 350}ms`,
                    } as CSSProperties)
              }
            />
            {se.vals.map((v, i) => (
              <circle
                key={i}
                cx={x(i)}
                cy={y(v)}
                r={se.key === 'split' ? 4 : 3}
                fill={se.key === 'linux' ? 'var(--bg)' : se.color}
                stroke={se.color}
                strokeWidth={1.5}
                style={{ opacity: seen ? 1 : 0, transition: `opacity .4s ease ${600 + si * 350 + i * 120}ms` }}
              >
                <title>{`${t(se.label)} · ${i + 1}: ${fmt(v, lang)}`}</title>
              </circle>
            ))}
            <text
              x={x(3) + 12}
              y={y(se.vals[3]!) + 4}
              fontSize="12"
              fill={se.color}
              fontFamily="var(--font-sans)"
              fontWeight={600}
              style={{ opacity: seen ? 1 : 0, transition: `opacity .4s ease ${1100 + si * 350}ms` }}
            >
              {fmt(se.vals[3]!, lang)} · {t(se.label)}
            </text>
          </g>
        ))}
      </svg>
      <Source>thalyx-kernel · vault/evidence/k6-comparison-hardening.md · scale.ipc:1–4</Source>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Thalyx-Kernel — every paired row, native ÷ Linux, on a log scale.
 * -------------------------------------------------------------------- */
const CLASS_LABEL: Record<BenchClass, T> = {
  equivalent: s('equivalent — a speed difference', 'equivalente — diferencia de velocidad'),
  comparable: s('comparable — a cost, never “faster”', 'comparable — un costo, nunca «más rápido»'),
  distinct: s('distinct — no conclusion', 'distinto — sin conclusión'),
};

export function RatioPlot() {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  const pos = (r: number) => ((Math.log10(r) + 1) / 2) * 100; // 0.1 → 0%, 10 → 100%
  const mark = (cls: BenchClass): CSSProperties =>
    cls === 'equivalent'
      ? { background: 'var(--accent)', borderRadius: '50%' }
      : cls === 'comparable'
        ? { border: '1.5px solid var(--fg)', borderRadius: '50%', background: 'var(--bg)' }
        : { background: 'var(--fg-3)', transform: 'rotate(45deg)' };

  return (
    <div ref={ref}>
      <div className="mb-4 flex flex-wrap gap-x-6 gap-y-2">
        {(Object.keys(CLASS_LABEL) as BenchClass[]).map((k) => (
          <span key={k} className="flex items-center gap-2 text-[0.78rem] fg-2">
            <i className="block h-2.5 w-2.5" style={mark(k)} />
            {t(CLASS_LABEL[k])}
          </span>
        ))}
      </div>
      <div className="relative">
        <div className="grid grid-cols-[9.5rem_1fr] text-[0.66rem] fg-3 max-sm:grid-cols-[7.2rem_1fr]">
          <span />
          <div className="relative mb-2 h-4">
            {[0.1, 0.3, 1, 3, 10].map((v) => (
              <span key={v} className="mono absolute -translate-x-1/2 text-[0.64rem]" style={{ left: `${pos(v)}%` }}>
                {v}×
              </span>
            ))}
          </div>
        </div>
        {KERNEL_RATIOS.map((r, i) => (
          <div key={r.id} className="grid grid-cols-[9.5rem_1fr] items-center max-sm:grid-cols-[7.2rem_1fr]">
            <span className="mono truncate pr-3 text-[0.68rem] fg-2">{r.id}</span>
            <div className="relative h-[19px] border-l border-[var(--line)]">
              <span className="absolute inset-y-0 w-px bg-[var(--fg-2)]" style={{ left: '50%' }} />
              <span className="absolute top-1/2 h-px bg-[var(--line-2)]" style={{ left: `${Math.min(50, pos(r.ratio))}%`, width: `${Math.abs(pos(r.ratio) - 50)}%` }} />
              <i
                className="absolute top-1/2 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${seen ? pos(r.ratio) : 50}%`,
                  transition: `left .9s cubic-bezier(.22,1,.36,1) ${i * 25}ms`,
                  ...mark(r.cls),
                }}
                title={`${r.id}: ${r.ratio}×`}
              />
            </div>
          </div>
        ))}
        <div className="mt-3 grid grid-cols-[9.5rem_1fr] text-[0.72rem] fg-3 max-sm:grid-cols-[7.2rem_1fr]">
          <span />
          <div className="flex justify-between gap-4">
            <span>← {t(s('native number lower', 'número nativo menor'))}</span>
            <span className="text-right">{t(s('native number higher', 'número nativo mayor'))} →</span>
          </div>
        </div>
      </div>
      <Source>thalyx-kernel · k6-comparison-hardening.md · native ÷ linux, medians over 6 rounds (KVM)</Source>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * SupaKernel — the 22 release gates, with their artifact hashes.
 * -------------------------------------------------------------------- */
const RESULT_LABEL: Record<GateResult, T> = {
  pass: s('pass', 'pasa'),
  'artifact-only': s('artifact only', 'solo artefacto'),
  blocked: s('blocked (external)', 'bloqueado (externo)'),
};

function resultStyle(r: GateResult): CSSProperties {
  if (r === 'pass') return { borderColor: 'color-mix(in srgb, var(--ok) 55%, transparent)', background: 'color-mix(in srgb, var(--ok) 8%, var(--panel))' };
  if (r === 'artifact-only') return { borderColor: 'var(--warn)', borderStyle: 'dashed' };
  return { borderColor: 'var(--line-2)', borderStyle: 'dotted' };
}

export function GateGrid({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  const glyph = (r: GateResult) => (r === 'pass' ? '✓' : r === 'artifact-only' ? '◐' : '○');
  const color = (r: GateResult) => (r === 'pass' ? 'var(--ok)' : r === 'artifact-only' ? 'var(--warn)' : 'var(--fg-3)');
  return (
    <div ref={ref}>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${compact ? 132 : 168}px, 1fr))` }}>
        {SUPAKERNEL_GATES.map((g, i) => (
          <div
            key={g.id}
            className="border px-2.5 py-2"
            style={{ ...resultStyle(g.result), opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(6px)', transition: `opacity .35s ease ${i * 35}ms, transform .45s ease ${i * 35}ms` }}
          >
            <p className="mono flex items-center justify-between gap-2 text-[0.68rem] leading-tight">
              <span className="truncate">{g.id}</span>
              <span style={{ color: color(g.result) }} aria-label={t(RESULT_LABEL[g.result])}>
                {glyph(g.result)}
              </span>
            </p>
            {!compact && <p className="mono mt-1 text-[0.6rem] fg-3">sha256 {g.hash}…</p>}
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mt-6">
          <p className="label fg-3">{t(s('Outside the release gates', 'Fuera de los gates de release'))}</p>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
            {SUPAKERNEL_EVIDENCE.map((g) => (
              <div key={g.id} className="border px-2.5 py-2" style={resultStyle(g.result)}>
                <p className="mono flex items-center justify-between gap-2 text-[0.68rem]">
                  <span className="truncate">{g.id}</span>
                  <span style={{ color: color(g.result) }}>{glyph(g.result)}</span>
                </p>
                <p className="mono mt-1 text-[0.6rem] fg-3">{t(RESULT_LABEL[g.result])}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.74rem] fg-2">
        {(['pass', 'artifact-only', 'blocked'] as GateResult[]).map((r) => (
          <span key={r} className="flex items-center gap-1.5">
            <span style={{ color: color(r) }}>{glyph(r)}</span> {t(RESULT_LABEL[r])}
          </span>
        ))}
      </div>
      <Source>{`supakernel · release/manifest.json · git ${SUPAKERNEL_RELEASE.git} · ${SUPAKERNEL_RELEASE.date}`}</Source>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * SupaDiff — 27 capabilities × 6 real targets.
 * -------------------------------------------------------------------- */
const LEVEL_LABEL: Record<Exclude<CapLevel, 'none'>, T> = {
  exact: s('exact', 'exacto'),
  approximate: s('accepted approximation', 'aproximación aceptada'),
  experimental: s('experimental', 'experimental'),
  unsupported: s('unsupported — refused, not faked', 'no soportado — se rechaza, no se finge'),
};

function levelStyle(l: CapLevel): CSSProperties {
  switch (l) {
    case 'exact':
      return { background: 'var(--fg)' };
    case 'approximate':
      return { background: 'linear-gradient(135deg, var(--fg) 50%, transparent 50%)', boxShadow: 'inset 0 0 0 1px var(--fg)' };
    case 'experimental':
      return { boxShadow: 'inset 0 0 0 1.5px var(--warn)', background: 'color-mix(in srgb, var(--warn) 18%, transparent)' };
    case 'unsupported':
      return { boxShadow: 'inset 0 0 0 1px var(--line-2)' };
    default:
      return {};
  }
}

const TARGET_SHORT = ['hosted', 'local', 'lite·sqlite', 'lite·sqlite→pg', 'lite·pglite', 'lite·postgres'];

export function CapabilityMatrix({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  const rows = compact ? SUPADIFF_MATRIX.filter((r) => !r.cap.startsWith('data.') || r.cap === 'data.insert') : SUPADIFF_MATRIX;
  return (
    <div ref={ref}>
      <div className="scroll-x">
        <table className="min-w-[520px] border-separate border-spacing-[3px]" aria-label="SupaDiff capability matrix">
          <thead>
            <tr>
              <th />
              {SUPADIFF_TARGETS.map((tg, i) => (
                <th key={tg} scope="col" className="h-[5.6rem] w-[2.4rem] align-bottom" title={tg}>
                  <span className="mono inline-block origin-bottom-left translate-x-[1.1rem] -rotate-[55deg] whitespace-nowrap text-[0.64rem] font-normal fg-2">
                    {TARGET_SHORT[i]}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={r.cap}>
                <th scope="row" className="mono pr-3 text-left text-[0.66rem] font-normal fg-2 whitespace-nowrap">
                  {r.cap}
                </th>
                {r.levels.map((l, ci) => (
                  <td key={ci} className="p-0">
                    <span
                      className="block h-[15px] w-full min-w-[2.2rem]"
                      title={`${r.cap} · ${SUPADIFF_TARGETS[ci]} · ${l}`}
                      style={{
                        ...levelStyle(l),
                        opacity: seen ? 1 : 0,
                        transition: `opacity .3s ease ${ri * 22 + ci * 30}ms`,
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.74rem] fg-2">
        {(Object.keys(LEVEL_LABEL) as Exclude<CapLevel, 'none'>[]).map((l) => (
          <span key={l} className="flex items-center gap-2">
            <i className="block h-3 w-4" style={levelStyle(l)} />
            {t(LEVEL_LABEL[l])}
          </span>
        ))}
      </div>
      <Source>{`supadiff · release-evidence/v1.0.0.json · targets[].capabilities${compact ? ' · data.* rows folded' : ''}`}</Source>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Ferrol — the catalogue collapsing into the work it actually needs.
 * -------------------------------------------------------------------- */
export function FerrolFunnel() {
  const { t, lang } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  const { products, families, searches, saved } = FERROL_FUNNEL;
  const rows = [
    { v: products, l: s('products in the real catalogue', 'productos en el catálogo real') },
    { v: families, l: s('visual families — one photo can serve a family', 'familias visuales — una foto puede servir a toda la familia') },
    { v: searches, l: s('image searches actually needed', 'búsquedas de imagen realmente necesarias') },
  ];
  return (
    <div ref={ref} className="grid gap-4">
      {rows.map((r, i) => (
        <div key={i}>
          <div className="flex items-baseline justify-between gap-4">
            <p className="num text-[2.4rem] sm:text-[3rem]">{fmt(r.v, lang)}</p>
            <p className="text-right text-[0.8rem] leading-snug fg-2">{t(r.l)}</p>
          </div>
          <div className="mt-2 h-3 bg-[var(--bg-2)]">
            <div
              className="h-full"
              style={{
                width: seen ? `${(r.v / products) * 100}%` : '0%',
                background: i === 0 ? 'var(--fg)' : 'var(--accent)',
                transition: `width 1.1s cubic-bezier(.22,1,.36,1) ${i * 220}ms`,
              }}
            />
          </div>
        </div>
      ))}
      <p className="text-[0.84rem] fg-2">
        <span className="num mr-2 text-[1.6rem] accent">{saved}%</span>
        {t(s('of the searches saved, measured on the first grouping run against the production database.', 'de las búsquedas ahorradas, medido en la primera corrida del agrupador contra la base de producción.'))}
      </p>
    </div>
  );
}

export function FerrolRubric() {
  const { t } = useI18n();
  return (
    <div>
      <div className="grid gap-px border border-[var(--line)] bg-[var(--line)]">
        {FERROL_RUBRIC.map((r) => (
          <div key={r.signal.en} className="flex items-center justify-between bg-[var(--panel)] px-3 py-2 text-[0.86rem]">
            <span>{t(r.signal)}</span>
            <span className="mono" style={{ color: r.points < 0 ? '#c0392b' : 'var(--ok)' }}>
              {r.points > 0 ? `+${r.points}` : `−${Math.abs(r.points)}`}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between bg-[var(--panel)] px-3 py-2 text-[0.86rem] font-semibold">
          <span>{t(s('Keep the photo at', 'Conservar la foto desde'))}</span>
          <span className="mono">≥ {FERROL_THRESHOLD}</span>
        </div>
      </div>
      <div className="mt-4 border-l-2 border-[#c0392b] pl-4">
        <p className="mono text-[0.76rem] fg-2">TOR SOCKET C/CILINDRO NGO NC - 1/4-20 x 4</p>
        <p className="mt-1 text-[0.86rem] leading-relaxed">
          {t(s('The first search result was “Download Tor Browser”. Under the rubric it scores', 'El primer resultado era «Download Tor Browser». Con la rúbrica suma'))}{' '}
          <span className="mono font-semibold text-[#c0392b]">−{Math.abs(FERROL_TOR_SCORE)}</span>
          {t(s(' — so the screw stays without a photo, and the reason is recorded.', ' — así que el tornillo se queda sin foto, y se registra el motivo.'))}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Índice Cero — four courses, one square per unit.
 * -------------------------------------------------------------------- */
export function CourseBlocks() {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  let k = 0;
  return (
    <div ref={ref} className="grid gap-5">
      {INDICE_COURSES.map((c) => (
        <div key={c.name.en}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-[0.95rem] font-semibold">
              {t(c.name)} <span className="mono ml-1 text-[0.7rem] font-normal fg-3">{c.lang}</span>
            </p>
            <p className="mono text-[0.72rem] fg-2">
              {c.lessons} {t(s('lessons', 'lecciones'))} · {c.practices} {t(s('practices', 'prácticas'))}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-[4px]">
            {Array.from({ length: c.units }, (_, i) => {
              const unpublished = c.published !== undefined && i >= c.published;
              const idx = k++;
              return (
                <span
                  key={i}
                  className="block h-7 w-7 sm:h-8 sm:w-8"
                  style={{
                    background: unpublished ? 'transparent' : seen ? 'var(--fg)' : 'var(--off)',
                    boxShadow: unpublished ? 'inset 0 0 0 1px var(--line-2)' : undefined,
                    transition: `background-color .3s ease ${idx * 18}ms`,
                  }}
                  title={unpublished ? t(s('unit not yet published', 'unidad aún no publicada')) : undefined}
                />
              );
            })}
          </div>
        </div>
      ))}
      <p className="text-[0.78rem] fg-3">
        {t(s('One square per unit — 56 in all. Outlined: written but not yet published.', 'Un cuadro por unidad — 56 en total. En contorno: escritas pero aún no publicadas.'))}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * ACREDITA-BACH — 177 topics in 7 areas, one dot each.
 * -------------------------------------------------------------------- */
export function AreaDots() {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>();
  let k = 0;
  return (
    <div ref={ref} className="grid gap-2">
      {ACREDITA_AREAS.map((a) => (
        <div key={a.name.en} className="grid grid-cols-[9.5rem_1fr] items-center gap-3 max-sm:grid-cols-1 max-sm:gap-1">
          <p className="text-[0.8rem] leading-tight">
            {t(a.name)} <span className="mono text-[0.68rem] fg-3">{a.topics}</span>
          </p>
          <div className="flex flex-wrap gap-[3px]">
            {Array.from({ length: a.topics }, (_, i) => {
              const idx = k++;
              return (
                <span
                  key={i}
                  className="block h-[9px] w-[9px] rounded-full"
                  style={{ background: seen ? a.color : 'var(--off)', transition: `background-color .25s ease ${idx * 6}ms` }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- *
 * Ennard — what runs by itself, and what always asks.
 * -------------------------------------------------------------------- */
export function ToolPolicy() {
  const { t } = useI18n();
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <p className="num text-[3rem]">{ENNARD_TOOLS.automatic}</p>
        <p className="label mt-1 fg-2">{t(s('Look — run without asking', 'Mirar — corren sin preguntar'))}</p>
        <div className="mt-3 flex flex-wrap gap-[3px]" aria-hidden="true">
          {Array.from({ length: ENNARD_TOOLS.automatic }, (_, i) => (
            <span key={i} className="block h-5 w-5 border border-[var(--line-2)]" />
          ))}
        </div>
        <p className="mt-3 text-[0.82rem] leading-relaxed fg-2">
          {t(s('Files, search, git status / log / diff, processes, system status.', 'Archivos, búsqueda, git status / log / diff, procesos, estado del sistema.'))}
        </p>
      </div>
      <div>
        <p className="num text-[3rem] accent">{ENNARD_TOOLS.approval.length}</p>
        <p className="label mt-1 fg-2">{t(s('Change or leave the machine — always ask', 'Cambiar o salir de la máquina — siempre preguntan'))}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ENNARD_TOOLS.approval.map((n) => (
            <span key={n} className="mono border border-[var(--accent)] px-1.5 py-0.5 text-[0.7rem] accent">
              {n}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[0.82rem] leading-relaxed fg-2">
          {t(s('Without an interactive terminal, approval is denied automatically.', 'Sin terminal interactiva, la aprobación se niega sola.'))}
        </p>
      </div>
    </div>
  );
}
