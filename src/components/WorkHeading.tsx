import { useI18n } from '../i18n/context';
import { Rise } from './primitives';

/** The divider that opens the project run, and the one for the second tier. */
export function WorkHeading() {
  const { c } = useI18n();

  return (
    <div className="shell" id="work">
      <Rise className="border-t border-[var(--ink)] pt-6 md:pt-8">
        <div className="grid gap-4 md:grid-cols-12 md:gap-12">
          <p className="label md:col-span-4">{c.work.eyebrow}</p>
          <div className="md:col-span-8">
            <h2 className="display text-[2.4rem] leading-[1.02] sm:text-[3rem]">{c.work.title}</h2>
            <p className="mt-3 max-w-[56ch] text-[0.9rem] leading-relaxed text-[var(--ink-2)]">{c.work.note}</p>
          </div>
        </div>
      </Rise>
    </div>
  );
}

export function SecondaryHeading() {
  const { c } = useI18n();

  return (
    <div className="shell">
      <Rise className="border-t border-[var(--ink)] pt-6">
        <h2 className="label">{c.secondaryLabel}</h2>
      </Rise>
    </div>
  );
}
