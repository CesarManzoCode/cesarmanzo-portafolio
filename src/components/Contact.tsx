import { useI18n } from '../i18n/context';
import { Rise } from './primitives';

export function Contact() {
  const { c } = useI18n();
  const k = c.contact;

  return (
    <section id="contact" className="shell py-16 sm:py-20 md:py-28">
      <Rise>
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="label">{k.eyebrow}</p>
            <h2 className="display mt-3 text-[2.4rem] leading-[1.02] sm:text-[3rem]">{k.title}</h2>
          </div>

          <div className="md:col-span-8">
            <p className="prose-lede max-w-[52ch]">{k.body}</p>

            <a
              href={`mailto:${k.email}`}
              className="display mt-7 inline-block break-all border-b border-[var(--rule-strong)] pb-1 text-[1.75rem] leading-tight transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:text-[2.4rem]"
            >
              {k.email}
            </a>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {k.channels.map((ch) => (
                <li key={ch.href}>
                  <a className="link" href={ch.href} target="_blank" rel="noreferrer noopener">
                    {ch.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mono mt-8 text-[var(--ink-3)]">{k.place}</p>
          </div>
        </div>
      </Rise>
    </section>
  );
}
