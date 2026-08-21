import { useI18n } from '../i18n/context';
import { Figure, PointList, ProjectHead, Rise } from './primitives';
import today from '../assets/work/acredita-today.webp';
import syllabus from '../assets/work/acredita-syllabus.webp';

export function Acredita() {
  const { c } = useI18n();
  const a = c.acredita;

  return (
    <section id="acredita" className="shell py-16 sm:py-20 md:py-24">
      <Rise>
        <ProjectHead head={a} />
      </Rise>

      <Rise className="mt-10 md:mt-14">
        <Figure src={today} alt={a.figures.today} caption={a.figures.today} zoom="lg" swipeHint={c.a11y.swipe} />
      </Rise>

      <Rise className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
        <Figure
          className="md:col-span-7"
          src={syllabus}
          alt={a.figures.syllabus}
          caption={a.figures.syllabus}
          zoom="md"
          swipeHint={c.a11y.swipe}
        />
        <div className="md:col-span-5">
          <PointList points={a.points} columns={1} />
        </div>
      </Rise>
    </section>
  );
}
