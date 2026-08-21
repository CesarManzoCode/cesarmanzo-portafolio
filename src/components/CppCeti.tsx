import { useI18n } from '../i18n/context';
import { Figure, PointList, ProjectHead, Rise } from './primitives';
import lesson from '../assets/work/cpp-lesson.webp';
import challenge from '../assets/work/cpp-challenge.webp';
import course from '../assets/work/cpp-course.webp';

export function CppCeti() {
  const { c } = useI18n();
  const p = c.cpp;
  const f = p.figures;

  return (
    <section id="cpp" className="shell py-16 sm:py-20 md:py-24">
      <Rise>
        <ProjectHead head={p} />
      </Rise>

      {/* Read, write, run — one step of a lesson, whole. */}
      <Rise className="mt-10 md:mt-14">
        <Figure src={lesson} alt={f.lesson} caption={f.lesson} zoom="lg" swipeHint={c.a11y.swipe} />
      </Rise>

      <Rise className="mt-12 md:mt-16">
        <PointList points={p.points} columns={3} />
      </Rise>

      {/* The failing attempt is the argument: this is what feedback looks like. */}
      <Rise className="mt-12 md:mt-16">
        <Figure src={challenge} alt={f.challenge} caption={f.challenge} zoom="lg" swipeHint={c.a11y.swipe} />
      </Rise>

      <Rise className="mt-12 grid items-start gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
        <Figure
          className="md:col-span-7"
          src={course}
          alt={f.course}
          caption={f.course}
          zoom="lg"
          swipeHint={c.a11y.swipe}
        />

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
      </Rise>
    </section>
  );
}
