import { useI18n } from '../i18n/context';
import { Figure, PointList, ProjectHead, Rise } from './primitives';
import today from '../assets/work/acredita-today.webp';
import lesson from '../assets/work/acredita-lesson.webp';
import item from '../assets/work/acredita-item.webp';

export function Acredita() {
  const { c } = useI18n();
  const a = c.acredita;
  const f = a.figures;

  return (
    <section id="acredita" className="shell py-16 sm:py-20 md:py-24">
      <Rise>
        <ProjectHead head={a} />
      </Rise>

      <Rise className="mt-10 md:mt-14">
        <Figure src={today} alt={f.today} caption={f.today} zoom="lg" swipeHint={c.a11y.swipe} />
      </Rise>

      {/* Two steps of the same session, six apart: the rule the product is
          built on, shown instead of claimed. */}
      <Rise className="mt-12 grid items-start gap-10 md:mt-16 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-7">
          <p className="label">{f.taught.step}</p>
          <Figure
            className="mt-3"
            src={lesson}
            alt={f.taught.caption}
            caption={f.taught.caption}
            zoom="md"
            swipeHint={c.a11y.swipe}
          />
        </div>
        <div className="min-w-0 md:col-span-5">
          <p className="label">{f.asked.step}</p>
          <Figure
            className="mt-3"
            src={item}
            alt={f.asked.caption}
            caption={f.asked.caption}
            zoom="md"
            swipeHint={c.a11y.swipe}
          />
        </div>
      </Rise>

      <Rise className="mt-12 md:mt-16">
        <PointList points={a.points} />
      </Rise>
    </section>
  );
}
