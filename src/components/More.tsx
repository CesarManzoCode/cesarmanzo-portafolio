import { useI18n } from '../i18n/context';
import { Rise } from './primitives';

export function More() {
  const { c } = useI18n();

  return (
    <div className="shell">
      <Rise className="border-t border-[var(--rule)] py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-12 md:gap-12">
          <p className="text-[0.95rem] leading-relaxed text-[var(--ink-2)] md:col-span-8">{c.more.text}</p>
          <p className="md:col-span-4 md:text-right">
            <a className="link mono" href={c.more.link.href} target="_blank" rel="noreferrer noopener">
              {c.more.link.label} <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </Rise>
    </div>
  );
}
