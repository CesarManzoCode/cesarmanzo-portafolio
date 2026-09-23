import { useI18n } from '../i18n/context';
import { Contact } from '../components/Contact';
import { Rise } from '../components/primitives';

export function About() {
  const { c } = useI18n();
  const a = c.about;
  const m = c.method;

  return (
    <>
      <section className="shell pt-10 sm:pt-14">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="label">{a.eyebrow}</p>
            <h1 className="display mt-3 text-[2.8rem] leading-[1.0] sm:text-[3.4rem]">{a.title}</h1>
          </div>
          <div className="md:col-span-8">
            {a.body.map((p, i) => (
              <p key={p} className={`prose-lede max-w-[62ch] ${i > 0 ? 'mt-5' : ''}`}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <Rise className="mt-12 md:mt-16">
          <p className="label">{a.practiceLabel}</p>
          <dl className="mt-4 grid gap-x-12 sm:grid-cols-2">
            {a.practice.map((p) => (
              <div key={p.area} className="border-t border-[var(--rule)] py-4">
                <dt className="text-[0.95rem] font-semibold tracking-[-0.01em]">{p.area}</dt>
                <dd className="mt-1 text-[0.875rem] leading-relaxed text-[var(--ink-2)]">{p.detail}</dd>
              </div>
            ))}
          </dl>
        </Rise>
      </section>

      {/* The method: what the projects have in common. */}
      <section id="method" className="shell pt-16 sm:pt-20 md:pt-24">
        <Rise className="border-t border-[var(--ink)] pt-6 md:pt-8">
          <div className="grid gap-4 md:grid-cols-12 md:gap-12">
            <p className="label md:col-span-4">{m.eyebrow}</p>
            <div className="md:col-span-8">
              <h2 className="display text-[2.4rem] leading-[1.02] sm:text-[3rem]">{m.title}</h2>
              <p className="prose-lede mt-4 max-w-[58ch]">{m.lede}</p>
            </div>
          </div>
        </Rise>

        <Rise className="mt-10 md:mt-14">
          <p className="label">{m.loopLabel}</p>
          <ol className="mt-4 grid border-t border-[var(--ink)] sm:grid-cols-2 lg:grid-cols-3">
            {m.loop.map((s, i) => (
              <li
                key={s.step}
                className={[
                  'border-b border-[var(--rule)] py-6 sm:px-6',
                  i % 2 === 1 ? 'sm:border-l sm:border-[var(--rule)]' : 'sm:pl-0',
                  i % 3 === 0 ? 'lg:border-l-0 lg:pl-0' : 'lg:border-l lg:border-[var(--rule)] lg:pl-6',
                  i % 3 === 2 ? 'lg:pr-0' : 'lg:pr-6',
                ].join(' ')}
              >
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[var(--accent)]">{s.step}</span>
                  <h3 className="display text-[1.5rem] leading-none">{s.title}</h3>
                </div>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-[var(--ink-2)]">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mono mt-4 text-[var(--ink-3)]">{m.loopNote}</p>
        </Rise>

        <Rise className="mt-10 md:mt-14">
          <div className="grid gap-x-12 gap-y-3 border-t border-[var(--rule)] pt-5 md:grid-cols-12">
            <p className="label md:col-span-4">{m.endsLabel}</p>
            <p className="prose-lede max-w-[62ch] md:col-span-8">{m.ends}</p>
          </div>
        </Rise>
      </section>

      <Contact />
    </>
  );
}
