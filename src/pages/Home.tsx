/* ==================================================================== *
 * The root page — the surface almost every visitor sees.
 *
 * It presents exactly the five selected projects (SELECTED in
 * src/data/projects.ts) and nothing else: an opening that shows all
 * five at once, then one chapter each, then the loop they share, a
 * door to the rest of the work, and contact. `npm test` guards that
 * no other project is presented here.
 * ==================================================================== */
import { PROJECTS, SELECTED, bySlugs, type Project } from '../data/projects';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Doors } from '../components/Doors';
import { RoomFoot, RoomHead, Showcase, tone } from '../components/Rooms';
import { Contact, Method } from '../components/Sections';
import { Reveal } from '../components/primitives';

const num = (i: number) => String(i + 1).padStart(2, '0');

function Chapter({ p, i }: { p: Project; i: number }) {
  const dark = tone(p.slug) === 'dark';
  return (
    <section
      id={p.slug}
      data-tone={tone(p.slug)}
      data-chapter={i}
      aria-labelledby={`${p.slug}-name`}
      className={`surface room-${p.slug} ${dark ? 'tone-dark' : ''} scroll-mt-0 py-20 md:py-32`}
    >
      <div className="wrap">
        <Reveal>
          <RoomHead p={p} n={num(i)} />
        </Reveal>
        <div className="mt-12 md:mt-20">
          <Showcase p={p} />
        </div>
        <Reveal>
          <RoomFoot p={p} />
        </Reveal>
      </div>
    </section>
  );
}

/* The one way out to everything that is not on this page. */
function Beyond() {
  const { c } = useI18n();
  const h = c.home;
  const doors = [
    { to: paths.projects, title: h.beyondIndex, body: h.beyondIndexBody(PROJECTS.length) },
    { to: paths.technical, title: h.beyondLedger, body: h.beyondLedgerBody },
  ];
  return (
    <section data-tone="light" className="surface py-20 md:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          <p className="label fg-3">{h.beyondLabel}</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,4.2vw,3.8rem)]">{h.beyondTitle}</h2>
          <p className="body mt-6 max-w-[48ch]">{h.beyondBody}</p>
        </Reveal>
        <Reveal as="div" delay={100} className="self-end lg:col-span-6 lg:col-start-7">
          <ul className="border-t border-[var(--fg)]">
            {doors.map((d) => (
              <li key={d.to} className="border-b border-[var(--line-2)]">
                <Link to={d.to} className="group flex items-end justify-between gap-6 py-6">
                  <span>
                    <span className="name block text-[clamp(2.4rem,4.6vw,4rem)] transition-colors group-hover:text-[var(--accent)]">{d.title}</span>
                    <span className="mt-3 block text-[0.92rem] fg-2">{d.body}</span>
                  </span>
                  <span className="arrow pb-1 text-[1.6rem] accent" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Home() {
  const { c } = useI18n();
  const h = c.home;
  const chapters = bySlugs(SELECTED);

  return (
    <>
      {/* ---- the statement, and all five at once ---- */}
      <section data-tone="dark" className="surface surface-ink tone-dark pt-[calc(var(--header-h)+2rem)] pb-14 md:pt-[calc(var(--header-h)+2.75rem)] md:pb-20 lg:pb-10">
        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="label fg-3">{h.who}</p>
            <p className="mono text-[0.72rem] fg-3">
              <span className="dot dot-active mr-2 inline-block translate-y-[-1px]" aria-hidden="true" />
              {h.available}{' '}
              <a href="#contact" className="text-[var(--fg)] underline decoration-[var(--line-2)] underline-offset-4 transition-colors hover:text-[var(--accent)]">
                {h.write}
              </a>
            </p>
          </div>

          <div className="mt-6 grid gap-6 lg:mt-7 lg:grid-cols-12 lg:gap-14">
            <h1 className="display text-[clamp(2.6rem,5.1vw,5.4rem)] lg:col-span-8">
              {h.headline[0]} <span className="fg-3">{h.headline[1]}</span>
            </h1>
            <p className="lede max-w-[44ch] self-end lg:col-span-4 lg:pb-1">{h.lead}</p>
          </div>

          <div className="mt-10 lg:mt-12">
            <Doors />
          </div>
        </div>
      </section>

      {/* ---- one chapter each ---- */}
      {chapters.map((p, i) => (
        <Chapter key={p.slug} p={p} i={i} />
      ))}

      <Method title={h.methodTitle} dark />
      <Beyond />
      <Contact />
    </>
  );
}
