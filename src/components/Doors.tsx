/* ==================================================================== *
 * Doors — the opening of the root page: the five selected projects,
 * side by side, each in its own palette and with its own real output.
 *
 * On a wide screen they sit as five tall panels; the one under the
 * pointer (or keyboard focus) widens and shows more of its capture and
 * the evidence behind it. On a phone they stack as five bands. Each
 * door opens its chapter further down the same page.
 * ==================================================================== */
import type { CSSProperties } from 'react';
import { SUPADIFF_MATRIX, type CapLevel } from '../data/evidence';
import { MEDIA } from '../data/media';
import { SELECTION, getProject, type MediaKey, type SelectedSlug } from '../data/projects';
import { useI18n } from '../i18n/context';
import { useInView } from './primitives';
import { tone } from './Rooms';

/* Which part of each capture a narrow door frames. */
const ART: Record<SelectedSlug, { media?: MediaKey; pos?: string }> = {
  thalyx: { media: 'thalyx-authorisation', pos: 'left top' },
  ferrol: { media: 'ferrol-category', pos: '6% 10%' },
  'indice-cero': { media: 'indice-challenge', pos: '96% 4%' },
  orux: { media: 'orux-tentative', pos: '24% top' },
  supadiff: {},
};

function cell(l: CapLevel): CSSProperties {
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

/* SupaDiff has no screen to show: its output is the matrix itself —
   27 capabilities down, 6 real targets across. */
function Matrix({ seen }: { seen: boolean }) {
  return (
    <div className="absolute inset-3 grid grid-cols-6 gap-[3px]" style={{ gridTemplateRows: `repeat(${SUPADIFF_MATRIX.length}, minmax(0, 1fr))` }} aria-hidden="true">
      {SUPADIFF_MATRIX.flatMap((r, ri) =>
        r.levels.map((l, ci) => (
          <span key={`${ri}-${ci}`} className="block" style={{ ...cell(l), opacity: seen ? 1 : 0, transition: `opacity .35s ease ${400 + ri * 22 + ci * 14}ms` }} />
        )),
      )}
    </div>
  );
}

export function Doors() {
  const { c, t } = useI18n();
  const [ref, seen] = useInView<HTMLOListElement>('0px');

  return (
    <ol ref={ref} className="doors" aria-label={c.home.doors}>
      {SELECTION.map((sel, i) => {
        const p = getProject(sel.slug)!;
        const art = ART[sel.slug];
        const dark = tone(p.slug) === 'dark';
        return (
          <li
            key={p.slug}
            className="door-slot"
            style={{
              opacity: seen ? 1 : 0,
              transform: seen ? 'none' : 'translateY(22px)',
              transition: `opacity .7s ease ${80 + i * 90}ms, transform 1s cubic-bezier(.22,1,.36,1) ${80 + i * 90}ms`,
            }}
          >
            <a href={`#${p.slug}`} data-tone={tone(p.slug)} className={`door surface room-${p.slug} ${dark ? 'tone-dark' : ''}`}>
              <span className="door-top">
                <span className="num text-[1.5rem] accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="label fg-2">{t(sel.short)}</span>
              </span>

              <span className="door-art">
                {art.media ? (
                  <img src={MEDIA[art.media]} alt="" style={{ objectPosition: art.pos }} loading="eager" decoding="async" />
                ) : (
                  <Matrix seen={seen} />
                )}
              </span>

              <span className="door-foot">
                <span className="door-name name">
                  {p.name.split(' ').map((w, k) => (
                    <span key={w}>
                      {w}
                      {k < p.name.split(' ').length - 1 && <span className="sr-only"> </span>}
                    </span>
                  ))}
                </span>
                <span className="door-against">
                  <span className="label fg-3">{c.room.against}</span>
                  <span className="door-against-value accent">{t(sel.against)}</span>
                </span>
                <span className="door-verdict">
                  <span>
                    {t(sel.verdict)}{' '}
                    <span className="door-go accent" aria-hidden="true">
                      ↓
                    </span>
                  </span>
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
