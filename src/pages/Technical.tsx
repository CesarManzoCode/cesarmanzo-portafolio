import { getProject, type Depth } from '../data/projects';
import { TECH } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Rich, Rise } from '../components/primitives';

const ORDER: Depth[] = ['deep', 'breakdown', 'research', 'note'];

export function Technical() {
  const { c, t } = useI18n();
  const k = c.technical;

  return (
    <div className="shell pt-10 pb-20 sm:pt-14 md:pb-28">
      <header className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <p className="label text-[var(--accent)]">{k.eyebrow}</p>
          <h1 className="display mt-4 text-[2.8rem] leading-[0.98] sm:text-[3.8rem] md:text-[4.4rem]">{k.title}</h1>
          <p className="prose-lede mt-5 max-w-[56ch]">{k.lede}</p>
        </div>
        <ol className="self-end border-t border-[var(--rule-strong)] md:col-span-5">
          {k.rules.map((r, i) => (
            <li key={r} className="flex gap-3 border-b border-[var(--rule)] py-3 text-[0.85rem] leading-snug text-[var(--ink-2)]">
              <span className="mono text-[var(--accent)]">{String(i + 1).padStart(2, '0')}</span>
              {r}
            </li>
          ))}
        </ol>
      </header>

      {ORDER.map((depth) => {
        const docs = TECH.filter((d) => d.depth === depth);
        if (docs.length === 0) return null;
        return (
          <section key={depth} className="mt-16 md:mt-24" aria-labelledby={`depth-${depth}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-[var(--ink)] pt-4">
              <h2 id={`depth-${depth}`} className="label text-[var(--ink)]">
                {c.depth[depth].name} <span className="text-[var(--ink-3)]">· {docs.length}</span>
              </h2>
              <p className="text-[0.8rem] text-[var(--ink-3)]">{c.depth[depth].blurb}</p>
            </div>

            <ul>
              {docs.map((d) => {
                const p = getProject(d.slug)!;
                return (
                  <li key={d.slug} className="border-b border-[var(--rule)]">
                    <Rise>
                      <Link to={paths.tech(d.slug)} className="group grid gap-4 py-7 md:grid-cols-12 md:gap-10 md:py-9">
                        <div className="md:col-span-3">
                          <p className="display text-[1.9rem] leading-none transition-colors group-hover:text-[var(--accent)] sm:text-[2.2rem]">
                            {p.name}
                          </p>
                          <p className="mono mt-2 text-[0.7rem] text-[var(--ink-3)]">{t(p.kind)}</p>
                        </div>
                        <div className="md:col-span-9">
                          <p className="max-w-[72ch] text-[0.92rem] leading-relaxed text-[var(--ink-2)]"><Rich text={t(d.abstract)} /></p>
                          {d.headline.length > 0 && (
                            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                              {d.headline.slice(0, 4).map((m) => (
                                <li key={m.label.en} className="min-w-0">
                                  <span className="mono block text-[0.95rem] text-[var(--accent)]">{t(m.value)}</span>
                                  <span className="block max-w-[22ch] text-[0.72rem] leading-snug text-[var(--ink-3)]">{t(m.label)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          <p className="caveat mt-4 max-w-[72ch]">
                            <span className="label text-[var(--warn)]">{k.caveat}</span> <Rich text={t(d.caveat)} />
                          </p>
                          <p className="mono mt-4 text-[var(--ink-3)] transition-colors group-hover:text-[var(--accent)]">
                            {k.read} <span aria-hidden="true">→</span>
                          </p>
                        </div>
                      </Link>
                    </Rise>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
