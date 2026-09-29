/* ==================================================================== *
 * /technical — the evidence ledger, kept like one: what was measured
 * on the left of the spine, what is not proven on the right, one line
 * per project, grouped by how deep its engineering record goes.
 * ==================================================================== */
import type { Depth } from '../data/projects';
import { ordered } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Reveal, Rich } from '../components/primitives';
import { Preview } from '../components/Previews';

const DEPTHS: Depth[] = ['deep', 'breakdown', 'research', 'note'];
/* The records whose evidence is a dataset the site can draw. */
const DRAWN = ['thalyx', 'thalyx-kernel', 'supakernel', 'supadiff'];

export function Ledger() {
  const { c, t } = useI18n();
  const l = c.ledger;
  const rows = ordered().map((p) => ({ p, doc: getTech(p.slug)! }));

  return (
    <div data-tone="dark" className="surface surface-ink tone-dark pt-[calc(var(--header-h)+3.5rem)] pb-24 md:pb-32">
      <div className="wrap">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="display text-[clamp(3rem,8vw,7.4rem)]">
              <span className="block">{l.title[0]}</span>
              <span className="block" style={{ color: 'var(--warn)' }}>
                {l.title[1]}
              </span>
            </h1>
            <p className="lede mt-8 max-w-[56ch]">{l.lede}</p>
          </div>
          <ol className="grid content-end gap-0 lg:col-span-4 lg:col-start-9">
            {l.rules.map((r, i) => (
              <li key={r} className="grid grid-cols-[2rem_1fr] border-t border-[var(--line)] py-3 text-[0.9rem] leading-relaxed fg-2">
                <span className="mono accent">0{i + 1}</span>
                {r}
              </li>
            ))}
          </ol>
        </div>

        {/* How deep each record goes, and a way straight to it. */}
        <nav className="mt-16 flex flex-wrap gap-x-10 gap-y-3 border-y border-[var(--line-2)] py-4 md:mt-20" aria-label={l.byDepth}>
          {DEPTHS.map((d) => {
            const count = rows.filter((r) => r.doc.depth === d).length;
            return (
              <a key={d} href={`#depth-${d}`} className="group flex items-baseline gap-2.5">
                <span className="num text-[1.8rem] transition-colors group-hover:text-[var(--accent)]">{count}</span>
                <span className="text-[0.88rem] fg-2">{c.depth[d].name}</span>
              </a>
            );
          })}
        </nav>

        <div className="ledger-cols mt-12 max-lg:hidden" aria-hidden="true">
          <p style={{ color: 'var(--ok)' }}>{l.cols.proven}</p>
          <span />
          <p style={{ color: 'var(--warn)' }}>{l.cols.limit}</p>
        </div>

        {DEPTHS.map((d) => {
          const group = rows.filter((r) => r.doc.depth === d);
          return (
            <section key={d} id={`depth-${d}`} aria-labelledby={`depth-${d}-title`} className="mt-14 md:mt-20">
              <h2 id={`depth-${d}-title`} className="flex items-baseline gap-3 text-[0.82rem] fg-3">
                <span className="text-[1.05rem] font-semibold text-[var(--fg)]">{c.depth[d].name}</span>
                <span className="mono">{String(group.length).padStart(2, '0')}</span>
              </h2>
              <ol className="mt-4 border-t border-[var(--line-2)]">
                {group.map(({ p, doc }) => (
                  <li key={p.slug} className={`surface room-${p.slug} surface-record border-b border-[var(--line)]`}>
                    <Reveal className="py-8 md:py-10">
                      <Link to={`${paths.project(p.slug)}#record`} className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                        <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                          <span
                            className={`name break-words transition-colors group-hover:text-[var(--accent)] ${p.name.length > 12 ? 'text-[clamp(1.7rem,2.6vw,2.4rem)]' : 'text-[clamp(2.1rem,3.4vw,3.1rem)]'}`}
                          >
                            {p.name}
                          </span>
                          <span className="mono text-[0.72rem] fg-3">{t(p.kind)}</span>
                        </span>
                        <span className="text-[0.82rem] fg-2">
                          {l.read} <span className="arrow accent">→</span>
                        </span>
                      </Link>
                      <div className="ledger-row mt-7">
                        <div className="min-w-0">
                          {doc.headline.length > 0 ? (
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                              {doc.headline.map((m) => (
                                <li key={m.label.en} className="min-w-0">
                                  <span className={`num block break-words accent ${t(m.value).length > 7 ? 'text-[1.6rem]' : 'text-[2.1rem]'}`}>{t(m.value)}</span>
                                  <span className="mt-1.5 block text-[0.74rem] leading-snug fg-3">{t(m.label)}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="max-w-[60ch] text-[0.95rem] leading-relaxed fg-2">
                              <Rich text={t(doc.abstract)} />
                            </p>
                          )}
                          {DRAWN.includes(p.slug) && (
                            <div className="relative mt-6 h-[6.5rem] overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--panel)]" aria-hidden="true">
                              <Preview slug={p.slug} evidence />
                            </div>
                          )}
                        </div>
                        <span className="ledger-spine" aria-hidden="true" />
                        <p className="ledger-limit">
                          <span className="sr-only">{l.cols.limit}: </span>
                          <Rich text={t(doc.caveat)} />
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
