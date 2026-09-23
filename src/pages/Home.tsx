import { ALSO, EXHIBIT, bySlugs, ordered, type Project } from '../data/projects';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { Atlas } from '../components/Atlas';
import { AlsoCard, RoomFoot, RoomHead, Showcase, tone } from '../components/Rooms';
import { Contact, Method } from '../components/Sections';
import { Reveal } from '../components/primitives';

const num = (i: number) => String(i + 1).padStart(2, '0');

function Room({ p, i }: { p: Project; i: number }) {
  return (
    <section
      id={p.slug}
      data-tone={tone(p.slug)}
      aria-labelledby={`${p.slug}-name`}
      className={`surface room-${p.slug} ${tone(p.slug) === 'dark' ? 'tone-dark' : ''} py-20 md:py-32`}
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

export function Home() {
  const { c, t } = useI18n();
  const h = c.home;
  const rooms = bySlugs(EXHIBIT);
  const also = bySlugs(ALSO);
  const verifyAt = rooms.findIndex((p) => p.slug === 'supadiff');

  return (
    <>
      {/* ---- the statement and the wall of work ---- */}
      <section data-tone="dark" className="surface surface-ink tone-dark relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-16 md:pt-[calc(var(--header-h)+3.5rem)] md:pb-24">
        <div className="wrap">
          <p className="label fg-3">{h.who}</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <h1 className="display text-[clamp(2.7rem,5.6vw,6.2rem)]">
                {h.headline[0]} <span className="fg-3">{h.headline[1]}</span>
              </h1>
              <p className="lede mt-8 max-w-[60ch]">{h.lead}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex flex-wrap gap-3">
                  <a href="#work" className="btn btn-solid">
                    {h.ctaWork} <span aria-hidden="true">↓</span>
                  </a>
                  <Link to={paths.technical} className="btn">
                    {h.ctaLedger} <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
                <p className="mono text-[0.74rem] fg-3">
                  <span className="dot dot-active mr-2 inline-block translate-y-[-1px]" aria-hidden="true" />
                  {h.available}
                </p>
              </div>
            </div>
            {/* The range, as a table of contents. */}
            <nav aria-label={c.a11y.rooms} className="hidden self-end lg:col-span-4 lg:block xl:col-span-3 xl:col-start-10">
              <ol className="border-t border-[var(--line-2)]">
                {ordered().map((p, i) => (
                  <li key={p.slug}>
                    <Link to={paths.project(p.slug)} className="group flex items-baseline gap-3 border-b border-[var(--line)] py-[5px] text-[0.8rem]">
                      <span className="mono w-5 text-[0.62rem] fg-3">{num(i)}</span>
                      <span className="font-semibold transition-colors group-hover:text-[var(--accent)]">{p.name}</span>
                      <span className="ml-auto truncate text-[0.72rem] fg-3">{t(p.kind).split(' · ')[0]}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="mt-12 md:mt-14">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <p className="label fg-2">{h.atlasLabel}</p>
              <p className="max-w-[70ch] text-[0.78rem] fg-3">{h.atlasNote}</p>
            </div>
            <Atlas />
          </div>
        </div>
      </section>

      {/* ---- the rooms ---- */}
      <div id="work" aria-label={c.a11y.rooms}>
        {rooms.map((p, i) => (
          <div key={p.slug}>
            {i === verifyAt && (
              <section data-tone="light" className="surface room-supadiff border-b border-[var(--line)] pt-20 md:pt-32">
                <div className="wrap">
                  <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
                    <h2 className="display text-[clamp(2.4rem,5.2vw,4.8rem)] lg:col-span-7">{h.verification}</h2>
                    <p className="lede max-w-[50ch] self-end lg:col-span-5">{h.verificationBody}</p>
                  </Reveal>
                </div>
              </section>
            )}
            <Room p={p} i={i} />
          </div>
        ))}
      </div>

      {/* ---- the smaller rooms ---- */}
      <section data-tone="light" className="surface py-24 md:py-32">
        <div className="wrap">
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="label fg-3">{h.moreLabel}</p>
              <h2 className="display mt-4 text-[clamp(2.6rem,5.4vw,5rem)]">{h.moreTitle}</h2>
            </div>
            <p className="lede max-w-[52ch] self-end lg:col-span-5">{h.moreBody}</p>
          </Reveal>
          <div className="mt-14 grid gap-2.5 lg:grid-cols-12">
            {also.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={(i % 2) * 80}
                className={['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-12'][i] + ' flex'}
              >
                <AlsoCard p={p} className="w-full" />
              </Reveal>
            ))}
          </div>
          <p className="mt-10">
            <Link to={paths.projects} className="link text-[0.95rem]">
              {h.allWork} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      <Method />
      <Contact />
    </>
  );
}
