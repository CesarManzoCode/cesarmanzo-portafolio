import { useI18n } from '../i18n/context';
import { Figure, ProjectHead, Rise } from './primitives';
import tentative from '../assets/work/orux-tentative.webp';
import impact from '../assets/work/orux-impact.webp';
import review from '../assets/work/orux-review.webp';
import flow from '../assets/work/orux-flow.svg';

const IMAGES = [tentative, impact, review];

export function Orux() {
  const { c } = useI18n();
  const o = c.orux;

  return (
    <section id="orux" className="shell py-16 sm:py-20 md:py-28">
      <Rise>
        <ProjectHead head={o} />
      </Rise>

      {/* The model first, then the three moments it produces. */}
      <Rise className="mt-10 md:mt-14">
        <Figure src={flow} alt={o.flowCaption} caption={o.flowCaption} zoom="lg" swipeHint={c.a11y.swipe} />
      </Rise>

      <ol className="mt-14 md:mt-20">
        {o.steps.map((s, i) => (
          <Rise key={s.n} className={i > 0 ? 'mt-14 md:mt-20' : ''}>
            <li>
              <div className="grid gap-6 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-4">
                  <p className="mono text-[var(--accent)]">
                    {s.n} / {o.steps.length}
                  </p>
                  <h4 className="display mt-3 text-[1.65rem] leading-[1.1] sm:text-[2rem]">{s.title}</h4>
                </div>
                <p className="text-[0.95rem] leading-relaxed text-[var(--ink-2)] md:col-span-8">{s.body}</p>
              </div>

              <Figure
                className="mt-7"
                src={IMAGES[i] ?? tentative}
                alt={s.alt}
                caption={s.alt}
                zoom="lg"
                swipeHint={c.a11y.swipe}
              />
            </li>
          </Rise>
        ))}
      </ol>

      <Rise className="mt-14 grid gap-x-12 md:mt-20 md:grid-cols-2">
        {[o.underneath, o.omitted].map((p) => (
          <div key={p.title} className="border-t border-[var(--ink)] py-6">
            <h4 className="text-[0.95rem] font-semibold tracking-[-0.01em]">{p.title}</h4>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--ink-2)]">{p.body}</p>
          </div>
        ))}
      </Rise>
    </section>
  );
}
