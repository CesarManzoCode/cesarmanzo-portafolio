import { useI18n } from '../i18n/context';
import { Figure, PointList, ProjectHead, Rise } from './primitives';
import home from '../assets/work/ferrol-home.webp';
import category from '../assets/work/ferrol-category.webp';
import mobile from '../assets/work/ferrol-mobile.webp';

export function Ferrol() {
  const { c } = useI18n();
  const f = c.ferrol;

  return (
    <section id="ferrol" className="bg-[var(--paper-alt)] py-16 sm:py-20 md:py-28">
      <div className="shell">
        <Rise>
          <ProjectHead head={f} />
        </Rise>

        <Rise className="mt-10 md:mt-14">
          <Figure src={home} alt={f.figures.desktop} caption={f.figures.desktop} zoom="md" swipeHint={c.a11y.swipe} />
        </Rise>

        {/* The dense listing next to the phone: the counter reads it there. */}
        <Rise className="mt-12 md:mt-16">
          <div className="grid items-start gap-8 md:grid-cols-12 md:gap-10">
            <Figure
              className="md:col-span-8"
              src={category}
              alt={f.figures.category}
              caption={f.figures.category}
              zoom="lg"
              swipeHint={c.a11y.swipe}
            />
            <Figure
              className="mx-auto w-full max-w-[17rem] md:col-span-4 md:mx-0"
              src={mobile}
              alt={f.figures.mobile}
              caption={f.figures.mobile}
            />
          </div>
        </Rise>

        <Rise className="mt-12 md:mt-16">
          <PointList points={f.points} />
          <p className="mono mt-8 border-t border-[var(--rule)] pt-5 leading-relaxed text-[var(--ink-3)]">
            {f.captureNote}
          </p>
        </Rise>
      </div>
    </section>
  );
}
