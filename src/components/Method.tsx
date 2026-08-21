import { useI18n } from '../i18n/context';
import { Rise } from './primitives';

/* -------------------------------------------------------------------- *
 * The piece that sits between the six projects and the About: what the
 * six have in common. Same vocabulary as the rest of the page — a rule,
 * a numbered run, and paragraphs. No new device.
 * -------------------------------------------------------------------- */
export function Method() {
  const { c } = useI18n();
  const m = c.method;

  return (
    <section id="method" className="py-16 sm:py-20 md:py-24">
      <div className="shell">
        <Rise className="border-t border-[var(--ink)] pt-6 md:pt-8">
          <div className="grid gap-4 md:grid-cols-12 md:gap-12">
            <p className="label md:col-span-4">{m.eyebrow}</p>
            <div className="md:col-span-8">
              <h2 className="display text-[2.4rem] leading-[1.02] sm:text-[3rem]">{m.title}</h2>
              <p className="prose-lede mt-4 max-w-[58ch]">{m.lede}</p>
            </div>
          </div>
        </Rise>

        <Rise className="mt-10 md:mt-12">
          <div className="grid gap-x-12 gap-y-2 border-t border-[var(--rule)] pt-5 md:grid-cols-12">
            <p className="label md:col-span-4">{m.toolingLabel}</p>
            <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-[var(--ink-2)] md:col-span-8">
              {m.tooling}
            </p>
          </div>
        </Rise>

        {/* The loop, drawn the way Studymation's pipeline is: numbering,
            rules and type, nothing else. */}
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
      </div>
    </section>
  );
}
