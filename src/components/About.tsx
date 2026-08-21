import { useI18n } from '../i18n/context';
import { Rise } from './primitives';

export function About() {
  const { c } = useI18n();
  const a = c.about;

  return (
    <section id="about" className="bg-[var(--paper-alt)] py-16 sm:py-20 md:py-28">
      <div className="shell">
        <Rise>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4">
              <p className="label">{a.eyebrow}</p>
              <h2 className="display mt-3 text-[2.4rem] leading-[1.02] sm:text-[3rem]">{a.title}</h2>
            </div>
            <div className="md:col-span-8">
              {a.body.map((p, i) => (
                <p key={p} className={`prose-lede max-w-[62ch] ${i > 0 ? 'mt-5' : ''}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Rise>

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
      </div>
    </section>
  );
}
