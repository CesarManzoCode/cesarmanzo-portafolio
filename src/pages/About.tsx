import { useI18n } from '../i18n/context';
import { Contact, Method } from '../components/Sections';
import { Reveal } from '../components/primitives';

export function About() {
  const { c } = useI18n();
  const a = c.about;
  return (
    <>
      <section data-tone="light" className="surface pt-[calc(var(--header-h)+3.5rem)] pb-10">
        <div className="wrap">
          <p className="label fg-3">{a.eyebrow}</p>
          <h1 className="display mt-5 max-w-[14ch] text-[clamp(3rem,8vw,7.4rem)]">{a.title}</h1>
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              {a.body.map((p, i) => (
                <p key={p} className={`lede max-w-[60ch] ${i > 0 ? 'mt-6' : ''}`}>
                  {p}
                </p>
              ))}
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="label fg-3">{a.practiceLabel}</p>
              <dl className="mt-4">
                {a.practice.map((p) => (
                  <div key={p.area} className="border-t border-[var(--line)] py-4">
                    <dt className="text-[1rem] font-semibold">{p.area}</dt>
                    <dd className="mt-1 text-[0.88rem] leading-relaxed fg-2">{p.detail}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
      <Method />
      <Contact />
    </>
  );
}
