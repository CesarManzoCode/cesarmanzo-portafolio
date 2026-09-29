import { getProject } from '../data/projects';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Contact, Method } from '../components/Sections';
import { Reveal } from '../components/primitives';
import { Preview } from '../components/Previews';
import { tone } from '../components/Rooms';

export function About() {
  const { c } = useI18n();
  const a = c.about;
  return (
    <>
      <section data-tone="light" className="surface pt-[calc(var(--header-h)+3.5rem)] pb-20 md:pb-28">
        <div className="wrap">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
            <h1 className="display text-[clamp(3rem,8vw,7.4rem)] lg:col-span-7">{a.title}</h1>
            <dl className="self-end border-t border-[var(--fg)] lg:col-span-4 lg:col-start-9">
              {a.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-[var(--line-2)] py-2.5 text-[0.92rem]">
                  <dt className="fg-3">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-8 md:mt-20 lg:grid-cols-12">
            <p className="thesis lg:col-span-7">{a.body[0]}</p>
            <p className="lede self-end lg:col-span-5">{a.body[1]}</p>
          </div>

          <div className="mt-20 md:mt-28">
            <h2 className="display text-[clamp(2rem,3.6vw,3.2rem)]">{a.practiceLabel}</h2>
            <ul className="mt-8 border-t border-[var(--fg)]">
              {a.practice.map((pr, i) => (
                <Reveal as="li" key={pr.area} delay={i * 50} className="grid gap-x-14 gap-y-4 border-b border-[var(--line-2)] py-6 lg:grid-cols-12">
                  <div className="lg:col-span-3">
                    <p className="text-[1.3rem] font-semibold tracking-[-0.01em]">{pr.area}</p>
                  </div>
                  <p className="text-[0.95rem] leading-relaxed fg-2 lg:col-span-4">{pr.detail}</p>
                  <div className="lg:col-span-5">
                    <p className="sr-only">{a.seenIn}</p>
                    <ul className="grid grid-cols-3 gap-2">
                      {pr.work.map((slug) => {
                        const p = getProject(slug)!;
                        return (
                          <li key={slug}>
                            <Link to={paths.project(slug)} className="group block">
                              <span
                                data-tone={tone(slug)}
                                className={`surface room-${slug} ${tone(slug) === 'dark' ? 'tone-dark' : ''} relative block h-[4.6rem] overflow-hidden rounded-[5px] border border-[var(--line)] sm:h-[5.6rem]`}
                              >
                                <Preview slug={slug} />
                              </span>
                              <span className="mt-2 block truncate text-[0.8rem] font-semibold transition-colors group-hover:text-[var(--accent)]">{p.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Method dark />
      <Contact />
    </>
  );
}
