/* ==================================================================== *
 * Atlas — the opening of the index: the whole body of work at a glance,
 * as a wall of real captures and charts drawn from real evidence files.
 * Each tile opens its project.
 * ==================================================================== */
import type { CSSProperties, ReactNode } from 'react';
import { KERNEL_SCALING, SUPADIFF_MATRIX, SUPAKERNEL_GATES } from '../data/evidence';
import { CATEGORIES, getProject, ordered, type MediaKey } from '../data/projects';
import { MEDIA } from '../data/media';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { useInView } from './primitives';
import { tone } from './Rooms';

type Tile = {
  slug: string;
  media?: MediaKey;
  pos?: string;
  art?: 'kernel' | 'gates' | 'matrix' | 'tools';
  area: string;
};

/* Desktop: a 12-column wall, four rows. Phone: two columns. */
const TILES: Tile[] = [
  { slug: 'thalyx', media: 'thalyx-authorisation', pos: 'left top', area: 'lg:col-[1/6] lg:row-[1/3] col-span-2' },
  { slug: 'orux', media: 'orux-tentative', pos: '22% top', area: 'lg:col-[6/10] lg:row-[1/3] col-span-2 sm:col-span-1' },
  { slug: 'ferrol', media: 'ferrol-category', pos: 'left 12%', area: 'lg:col-[10/13] lg:row-[1/2]' },
  { slug: 'thalyx-kernel', art: 'kernel', area: 'lg:col-[10/13] lg:row-[2/3]' },
  { slug: 'indice-cero', media: 'indice-challenge', pos: 'right top', area: 'lg:col-[1/5] lg:row-[3/5] col-span-2 sm:col-span-1' },
  { slug: 'acredita-bach', media: 'acredita-today', pos: 'left top', area: 'lg:col-[5/9] lg:row-[3/4]' },
  { slug: 'supadiff', art: 'matrix', area: 'lg:col-[9/13] lg:row-[3/4]' },
  { slug: 'studymation', media: 'studymation-brief', pos: '30% 12%', area: 'lg:col-[5/8] lg:row-[4/5]' },
  { slug: 'supakernel', art: 'gates', area: 'lg:col-[8/11] lg:row-[4/5]' },
  { slug: 'ennard', art: 'tools', area: 'lg:col-[11/13] lg:row-[4/5] col-span-2 sm:col-span-1' },
];

function KernelArt({ seen }: { seen: boolean }) {
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
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={18} x2={W - 18} y1={y(i * 4000)} y2={y(i * 4000)} stroke="var(--line)" />
      ))}
      <path d={d(KERNEL_SCALING.linux)} fill="none" stroke="var(--fg)" strokeWidth="1.4" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      <path d={d(KERNEL_SCALING.baseline)} fill="none" stroke="var(--fg-3)" strokeWidth="1.4" pathLength={1} style={draw(200)} vectorEffect="non-scaling-stroke" />
      <path d={d(KERNEL_SCALING.split)} fill="none" stroke="var(--accent)" strokeWidth="2.4" pathLength={1} style={draw(600)} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function GatesArt({ seen }: { seen: boolean }) {
  return (
    <div className="absolute inset-x-4 top-4 grid grid-cols-11 gap-[3px]" aria-hidden="true">
      {SUPAKERNEL_GATES.map((g, i) => (
        <span
          key={g.id}
          className="block aspect-square"
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

function MatrixArt({ seen }: { seen: boolean }) {
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

function ToolsArt() {
  return (
    <div className="absolute inset-x-4 top-4 flex flex-wrap gap-[3px]" aria-hidden="true">
      {Array.from({ length: 22 }, (_, i) => (
        <span key={i} className="block h-4 w-4" style={i < 15 ? { boxShadow: 'inset 0 0 0 1px var(--line-2)' } : { background: 'var(--accent)' }} />
      ))}
    </div>
  );
}

export function Atlas() {
  const { t } = useI18n();
  const [ref, seen] = useInView<HTMLDivElement>('0px');
  const all = ordered();
  const n = (slug: string) => String(all.findIndex((p) => p.slug === slug) + 1).padStart(2, '0');

  return (
    <div ref={ref} className="grid auto-rows-[9.5rem] grid-cols-2 gap-2 sm:auto-rows-[11rem] sm:gap-2.5 lg:auto-rows-[minmax(9.5rem,15vh)] lg:grid-cols-12">
      {TILES.map((tile, i) => {
        const p = getProject(tile.slug)!;
        const cat = CATEGORIES.find((k) => k.id === p.category)!;
        let art: ReactNode = null;
        if (tile.art === 'kernel') art = <KernelArt seen={seen} />;
        else if (tile.art === 'gates') art = <GatesArt seen={seen} />;
        else if (tile.art === 'matrix') art = <MatrixArt seen={seen} />;
        else if (tile.art === 'tools') art = <ToolsArt />;
        return (
          <Link
            key={tile.slug}
            to={paths.project(tile.slug)}
            className={`atlas-tile surface room-${tile.slug} ${tone(tile.slug) === 'dark' ? 'tone-dark' : ''} ${tile.area}`}
            style={{
              opacity: seen ? 1 : 0,
              transform: seen ? 'none' : 'translateY(14px)',
              transition: `opacity .7s ease ${120 + i * 70}ms, transform .9s cubic-bezier(.22,1,.36,1) ${120 + i * 70}ms`,
            }}
          >
            {tile.media ? (
              <img src={MEDIA[tile.media]} alt="" className="shot" style={{ objectPosition: tile.pos }} loading={i < 4 ? 'eager' : 'lazy'} decoding="async" />
            ) : (
              art
            )}
            <span className="tag">
              <span className="min-w-0">
                <span className="mono mr-2 text-[0.64rem] opacity-60">{n(tile.slug)}</span>
                <b className="text-[0.95rem] font-[680] transition-colors" style={{ fontStretch: '88%' }}>
                  {p.name}
                </b>
              </span>
              <span className="label hidden truncate text-[0.56rem] opacity-70 sm:block">{t(cat.name)}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
