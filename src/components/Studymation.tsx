import { useI18n } from '../i18n/context';
import { Figure, PointList, ProjectHead, Rise } from './primitives';
import brief from '../assets/work/studymation-brief.webp';
import run from '../assets/work/studymation-run.webp';
import docx from '../assets/work/studymation-document.webp';

export function Studymation() {
  const { c } = useI18n();
  const s = c.studymation;
  const f = s.figures;

  return (
    <section id="studymation" className="bg-[var(--paper-alt)] py-16 sm:py-20 md:py-24">
      <div className="shell">
        <Rise>
          <ProjectHead head={s} />
        </Rise>

        {/* What the student actually fills in. The rubric is the contract. */}
        <Rise className="mt-10 md:mt-14">
          <Figure src={brief} alt={f.brief} caption={f.brief} zoom="lg" swipeHint={c.a11y.swipe} />
        </Rise>

        {/* The four steps of the real pipeline, drawn as a figure rather
            than described in a paragraph. */}
        <Rise className="mt-12 md:mt-16">
          <p className="label">{s.pipelineLabel}</p>
          <ol className="mt-4 grid border-t border-[var(--ink)] sm:grid-cols-2 lg:grid-cols-4">
            {s.pipeline.map((p, i) => (
              <li
                key={p.step}
                className={`border-b border-[var(--rule)] px-0 py-6 sm:px-5 lg:border-b-0 ${
                  i > 0 ? 'sm:border-l sm:border-[var(--rule)]' : 'sm:pl-0'
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[var(--accent)]">{p.step}</span>
                  <h4 className="display text-[1.5rem] leading-none">{p.title}</h4>
                </div>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-[var(--ink-2)]">{p.body}</p>
              </li>
            ))}
          </ol>
        </Rise>

        {/* Those steps, running. The screen is a narrow centred panel, so the
            figure is too, rather than a wide frame around empty space. */}
        <Rise className="mt-12 md:mt-16">
          <Figure
            className="mx-auto w-full max-w-[44rem]"
            src={run}
            alt={f.run}
            caption={f.run}
            zoom="md"
            swipeHint={c.a11y.swipe}
          />
        </Rise>

        <Rise className="mt-12 md:mt-16">
          <Figure src={docx} alt={f.document} caption={f.document} zoom="lg" swipeHint={c.a11y.swipe} />
        </Rise>

        <Rise className="mt-12 md:mt-16">
          <PointList points={s.points} />
          <div className="mt-8 grid gap-x-10 gap-y-2 border-t border-[var(--rule)] pt-5 md:grid-cols-12">
            <p className="label md:col-span-3">{s.stackLabel}</p>
            <p className="mono leading-relaxed text-[var(--ink-2)] md:col-span-9">{s.stack}</p>
          </div>
        </Rise>
      </div>
    </section>
  );
}
