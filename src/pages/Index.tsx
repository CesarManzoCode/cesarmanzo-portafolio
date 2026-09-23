import { CATEGORIES, ordered, projectsIn } from '../data/projects';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Reveal, Shot, Status } from '../components/primitives';
import { tone } from '../components/Rooms';

export function Index() {
  const { c, t } = useI18n();
  const all = ordered();
  const n = (slug: string) => String(all.findIndex((p) => p.slug === slug) + 1).padStart(2, '0');

  return (
    <div data-tone="light" className="surface pt-[calc(var(--header-h)+3.5rem)]">
      <div className="wrap">
        <p className="label fg-3">{c.index.eyebrow}</p>
        <h1 className="display mt-5 max-w-[14ch] text-[clamp(3rem,8vw,7.4rem)]">{c.index.title}</h1>
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <p className="lede max-w-[56ch] lg:col-span-7">{c.index.lede}</p>
          <p className="mono self-end fg-3 lg:col-span-4 lg:col-start-9 lg:text-right">{c.index.count(all.length, CATEGORIES.length)}</p>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        {CATEGORIES.map((cat) => (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="pb-2">
            <div className="wrap">
              <div className="grid gap-2 border-t border-[var(--fg)] py-5 md:grid-cols-12">
                <h2 id={`cat-${cat.id}`} className="label md:col-span-4">
                  {t(cat.name)}
                </h2>
                <p className="text-[0.86rem] fg-2 md:col-span-8">{t(cat.blurb)}</p>
              </div>
            </div>
            <ul>
              {projectsIn(cat.id).map((p) => (
                <li key={p.slug}>
                  <Reveal>
                    <Link
                      to={paths.project(p.slug)}
                      data-tone={tone(p.slug)}
                      className={`surface room-${p.slug} ${tone(p.slug) === 'dark' ? 'tone-dark' : ''} group block`}
                    >
                      <div className="wrap grid items-center gap-6 py-8 md:grid-cols-12 md:py-10">
                        <div className="md:col-span-5">
                          <p className="mono text-[0.7rem] fg-3">
                            {n(p.slug)} · {p.year}
                          </p>
                          <p className={`name mt-2 break-words transition-colors group-hover:text-[var(--accent)] ${p.name.length > 14 ? "text-[clamp(2rem,3.6vw,3.2rem)]" : "text-[clamp(2.6rem,6vw,5.2rem)]"}`}>
                            {p.name}
                          </p>
                          <p className="mono mt-3 text-[0.74rem] fg-2">{t(p.kind)}</p>
                        </div>
                        <div className="md:col-span-4">
                          <p className="text-[0.98rem] leading-relaxed">{t(p.thesis)}</p>
                          <Status tone={p.statusTone} className="mt-4 fg-3">
                            {t(p.status)}
                          </Status>
                        </div>
                        <div className="flex items-center justify-between gap-6 md:col-span-3">
                          {p.cover ? (
                            <div className="w-full overflow-hidden rounded-md border border-[var(--line)] max-md:max-w-[22rem]">
                              <Shot media={p.cover} alt="" className="aspect-[16/10] object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.04]" />
                            </div>
                          ) : p.stats[0] ? (
                            <div>
                              <p className="num text-[3.4rem] accent">{p.stats[0].value}</p>
                              <p className="mt-1 max-w-[22ch] text-[0.78rem] leading-snug fg-2">{t(p.stats[0].label)}</p>
                            </div>
                          ) : null}
                          <span className="arrow text-[1.4rem] accent max-md:hidden" aria-hidden="true">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="h-24" />
    </div>
  );
}
