import { useI18n } from '../i18n/context';
import { Reveal } from './primitives';

/* The loop that every project on the site went through. */
export function Method({ id = 'method' }: { id?: string }) {
  const { c } = useI18n();
  const m = c.method;
  return (
    <section id={id} data-tone="light" className="surface py-24 md:py-36">
      <div className="wrap">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="label fg-3">{m.eyebrow}</p>
            <h2 className="display mt-4 text-[clamp(2.8rem,6vw,5.6rem)]">{m.title}</h2>
          </div>
          <p className="lede max-w-[52ch] self-end lg:col-span-6 lg:col-start-7">{m.lede}</p>
        </Reveal>
        <ol className="mt-16 grid border-t border-[var(--fg)] sm:grid-cols-2 lg:grid-cols-6">
          {m.loop.map((s, i) => (
            <Reveal as="li" key={s.step} delay={i * 70} className="border-b border-[var(--line)] py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-5 lg:first:pl-0 lg:last:border-r-0">
              <p className="num text-[2.6rem] accent">{s.step}</p>
              <h3 className="mt-3 text-[1.15rem] font-semibold">{s.title}</h3>
              <p className="mt-2 text-[0.86rem] leading-relaxed fg-2">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14 grid lg:grid-cols-12">
          <p className="text-[1.05rem] leading-relaxed fg-2 lg:col-span-7 lg:col-start-6">
            <span className="mr-3 inline-block h-[2px] w-8 translate-y-[-5px] bg-[var(--accent)]" aria-hidden="true" />
            {m.ends}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const { c } = useI18n();
  const k = c.contact;
  return (
    <section id="contact" data-tone="dark" className="surface surface-ink tone-dark pt-24 pb-20 md:pt-36 md:pb-28">
      <div className="wrap">
        <Reveal>
          <p className="label fg-3">{k.eyebrow}</p>
          <h2 className="name mt-5 text-[clamp(4rem,14vw,12rem)]">{k.title}</h2>
        </Reveal>
        <Reveal className="mt-10 grid gap-10 lg:grid-cols-12" delay={100}>
          <div className="lg:col-span-7">
            <a
              href={`mailto:${k.email}`}
              className="display inline-block break-all border-b-2 border-[var(--line-2)] pb-2 text-[clamp(1.7rem,4.4vw,3.6rem)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {k.email}
            </a>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="lede">{k.body}</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[0.9rem]">
              {k.channels.map((ch) => (
                <li key={ch.href}>
                  <a className="link" href={ch.href} target="_blank" rel="noreferrer noopener">
                    {ch.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono mt-6 fg-3">{k.place}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
