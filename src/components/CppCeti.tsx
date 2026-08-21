import { useI18n } from '../i18n/context';
import { PointList, ProjectHead, Rise } from './primitives';

export function CppCeti() {
  const { c } = useI18n();
  const p = c.cpp;
  const ex = p.exercise;

  return (
    <section id="cpp" className="shell py-16 sm:py-20 md:py-24">
      <Rise>
        <ProjectHead head={p} />
      </Rise>

      <Rise className="mt-10 md:mt-14">
        <PointList points={p.points} columns={3} />
      </Rise>

      <Rise className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
        {/* The curriculum is the product: ten units, in order. */}
        <div className="md:col-span-5">
          <p className="label">{p.curriculumLabel}</p>
          <ol className="mt-4 border-t border-[var(--ink)]">
            {p.curriculum.map((unit, i) => (
              <li key={unit} className="flex items-baseline gap-4 border-b border-[var(--rule)] py-3">
                <span className="mono text-[var(--ink-3)]">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[0.92rem] leading-snug">{unit}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* One exercise, verbatim from the seeded course content. */}
        <div className="md:col-span-7">
          <p className="label">{ex.label}</p>

          <div className="mt-4 border-t border-[var(--ink)] pt-5">
            <p className="mono text-[var(--ink-3)]">{ex.unit}</p>
            <h4 className="display mt-1 text-[1.7rem] leading-none">{ex.title}</h4>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--ink-2)]">{ex.brief}</p>

            <pre className="mt-5 overflow-x-auto border border-[var(--rule-strong)] bg-[var(--card)] p-4 font-mono text-[0.78rem] leading-[1.65]">
              <code>{ex.code}</code>
            </pre>

            <p className="label mt-6">{ex.casesLabel}</p>
            <ul className="mt-2">
              {ex.cases.map((t) => (
                <li
                  key={t.stdin}
                  className="mono flex flex-wrap items-baseline gap-x-3 border-b border-[var(--rule)] py-2"
                >
                  <span className="text-[var(--ink-3)]">stdin</span>
                  <span>{t.stdin}</span>
                  <span className="text-[var(--ink-3)]" aria-hidden="true">
                    →
                  </span>
                  <span>{t.stdout}</span>
                  <span className="ml-auto text-[var(--ink-3)]">{t.note}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-[0.85rem] leading-relaxed text-[var(--ink-2)]">{ex.note}</p>
          </div>
        </div>
      </Rise>
    </section>
  );
}
