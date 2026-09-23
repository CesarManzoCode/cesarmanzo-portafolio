import { ordered } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Reveal, Rich } from '../components/primitives';

export function Ledger() {
  const { c, t } = useI18n();
  const l = c.ledger;
  const rows = ordered().map((p) => ({ p, doc: getTech(p.slug)! }));

  return (
    <div data-tone="dark" className="surface surface-ink tone-dark pt-[calc(var(--header-h)+3.5rem)] pb-24 md:pb-32">
      <div className="wrap">
        <p className="label accent">{l.eyebrow}</p>
        <h1 className="display mt-5 max-w-[16ch] text-[clamp(3rem,8vw,7.4rem)]">{l.title}</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-14">
          <p className="lede max-w-[56ch] lg:col-span-6">{l.lede}</p>
          <ol className="grid gap-3 lg:col-span-5 lg:col-start-8">
            {l.rules.map((r, i) => (
              <li key={r} className="flex gap-4 border-t border-[var(--line)] pt-3 text-[0.88rem] leading-relaxed fg-2">
                <span className="mono accent">0{i + 1}</span>
                {r}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20 hidden grid-cols-12 gap-6 border-b border-[var(--line-2)] pb-3 lg:grid">
          <p className="label col-span-3 fg-3">{l.cols.project}</p>
          <p className="label col-span-4 fg-3">{l.cols.proven}</p>
          <p className="label col-span-4 fg-3">{l.cols.limit}</p>
          <p className="label col-span-1 fg-3 text-right">{l.cols.depth}</p>
        </div>
        <ol className="max-lg:mt-16">
          {rows.map(({ p, doc }) => (
            <li key={p.slug}>
              <Reveal>
                <Link
                  to={`${paths.project(p.slug)}#record`}
                  className={`surface room-${p.slug} surface-record group grid gap-6 border-b border-[var(--line)] py-8 lg:grid-cols-12`}
                >
                  <div className="lg:col-span-3">
                    <p className="name text-[clamp(2.2rem,3.6vw,3.2rem)] transition-colors group-hover:text-[var(--accent)]">{p.name}</p>
                    <p className="mono mt-2 text-[0.7rem] fg-3">{t(p.kind)}</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-5 gap-y-4 self-start lg:col-span-4">
                    {doc.headline.slice(0, 4).map((m) => (
                      <li key={m.label.en}>
                        <span className="num block text-[1.9rem] accent">{t(m.value)}</span>
                        <span className="mt-1 block text-[0.72rem] leading-snug fg-3">{t(m.label)}</span>
                      </li>
                    ))}
                    {doc.headline.length === 0 && <li className="col-span-2 text-[0.86rem] fg-3">{t(doc.abstract)}</li>}
                  </ul>
                  <p className="text-[0.9rem] leading-relaxed lg:col-span-4">
                    <span className="label mr-2" style={{ color: 'var(--warn)' }}>
                      !
                    </span>
                    <Rich text={t(doc.caveat)} />
                  </p>
                  <p className="mono text-[0.72rem] fg-2 lg:col-span-1 lg:text-right">
                    {c.depth[doc.depth].one} <span className="arrow accent">→</span>
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
