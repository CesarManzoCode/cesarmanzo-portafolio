import { useI18n } from '../i18n/context';
import { Figure, PointList, ProjectHead, Rise } from './primitives';
import authorisation from '../assets/work/thalyx-authorisation.svg';
import architecture from '../assets/work/thalyx-architecture.svg';
import atomicCommit from '../assets/work/thalyx-atomic-commit.svg';

export function Thalyx() {
  const { c } = useI18n();
  const t = c.thalyx;

  return (
    <section id="thalyx" className="band-dark py-16 sm:py-20 md:py-28">
      <div className="shell">
        <Rise>
          <ProjectHead head={t} dark />
        </Rise>

        {/* The authorisation frame is the thesis in one capture. */}
        <Rise className="mt-10 md:mt-14">
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <Figure
              className="md:col-span-7"
              src={authorisation}
              alt={t.figures.authorisation}
              caption={t.figures.authorisation}
              zoom="md"
              swipeHint={c.a11y.swipe}
              dark
            />
            <blockquote className="self-center md:col-span-5">
              <p className="display text-[1.9rem] leading-[1.12] sm:text-[2.3rem]">“{t.quote}”</p>
            </blockquote>
          </div>
        </Rise>

        <Rise className="mt-14 md:mt-20">
          <PointList points={t.points} dark />
        </Rise>

        <Rise className="mt-14 md:mt-20">
          <Figure
            src={architecture}
            alt={t.figures.architecture}
            caption={t.figures.architecture}
            zoom="lg"
            swipeHint={c.a11y.swipe}
            dark
          />
        </Rise>

        <Rise className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-12">
          <Figure
            className="md:col-span-5"
            src={atomicCommit}
            alt={t.figures.atomic}
            caption={t.figures.atomic}
            zoom="md"
            swipeHint={c.a11y.swipe}
            dark
          />

          <div className="md:col-span-7">
            <p className="label text-[var(--dark-ink-2)]">{t.evidenceLabel}</p>
            <dl className="mt-4">
              {t.evidence.map((e) => (
                <div key={e.when} className="grid gap-x-6 gap-y-1 border-t border-[var(--dark-rule)] py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="mono text-[var(--dark-accent)]">{e.when}</dt>
                  <dd className="text-[0.9rem] leading-relaxed text-[var(--dark-ink)]">{e.what}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-[var(--dark-rule)] pt-6 text-[0.875rem] leading-relaxed text-[var(--dark-ink-2)]">
              {t.honest}
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}
