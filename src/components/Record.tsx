/* ==================================================================== *
 * The engineering record — the technical layer of a project page.
 * One dark ground for every project, so a technical reader finds the
 * same structure everywhere; the project’s accent carries over.
 * ==================================================================== */
import type { Project } from '../data/projects';
import type { Block, TechDoc, TechSection } from '../data/technical';
import { useI18n } from '../i18n/context';
import { ExternalLink, Figure, Rich } from './primitives';

const warnKinds = new Set(['failures', 'limitations', 'notProven', 'nonClaims']);
const sectionId = (s: TechSection, i: number) => `${s.kind}-${i}`;

export function Record({ p, doc }: { p: Project; doc: TechDoc }) {
  const { c, t } = useI18n();
  const k = c.project;

  return (
    <section id="record" data-tone="dark" className={`surface room-${p.slug} surface-record tone-dark py-20 md:py-32`} aria-labelledby="record-title">
      <div className="wrap">
        <header className="grid gap-8 border-t border-[var(--line-2)] pt-5 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="label accent">
              {c.depth[doc.depth].one} · {p.name}
            </p>
            <h2 id="record-title" className="display mt-5 text-[clamp(2.8rem,6vw,5.4rem)]">
              {k.record}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[0.92rem] leading-relaxed fg-3">{k.recordLede}</p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.5]">
              <Rich text={t(doc.abstract)} />
            </p>
            {doc.headline.length > 0 && (
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                {doc.headline.map((m) => (
                  <li key={m.label.en} className="border-t border-[var(--line)] pt-3">
                    <span className="num block break-words text-[2.3rem] accent sm:text-[2.7rem]">{t(m.value)}</span>
                    <span className="mt-2 block text-[0.76rem] leading-snug fg-3">{t(m.label)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="limits mt-10 p-5">
              <p className="label" style={{ color: 'var(--warn)' }}>
                {k.caveat}
              </p>
              <p className="mt-2 text-[0.95rem] leading-relaxed">
                <Rich text={t(doc.caveat)} />
              </p>
            </div>
          </div>
        </header>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-14">
          <nav className="lg:col-span-3" aria-label={k.contents}>
            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <p className="label fg-3">{k.contents}</p>
              <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-2 lg:block lg:space-y-2">
                {doc.sections.map((s, i) => (
                  <li key={sectionId(s, i)}>
                    <a
                      href={`#${sectionId(s, i)}`}
                      className="mono text-[0.76rem] transition-colors hover:text-[var(--accent)]"
                      style={{ color: warnKinds.has(s.kind) ? 'var(--warn)' : 'var(--fg-2)' }}
                    >
                      <span className="mr-2 fg-3">{String(i + 1).padStart(2, '0')}</span>
                      {t(s.title ?? { en: c.section[s.kind], es: c.section[s.kind] })}
                    </a>
                  </li>
                ))}
              </ol>
              {doc.sources.length > 0 && (
                <div className="mt-8 border-t border-[var(--line)] pt-5">
                  <p className="label fg-3">{k.sources}</p>
                  <ul className="mt-3 space-y-2 text-[0.82rem]">
                    {doc.sources.map((s) => (
                      <li key={s.href}>
                        <ExternalLink href={s.href} className="link fg-2">
                          {t(s.label)}
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          <div className="min-w-0 lg:col-span-9">
            {doc.sections.map((s, i) => {
              const warn = warnKinds.has(s.kind);
              return (
                <section key={sectionId(s, i)} id={sectionId(s, i)} className={i > 0 ? 'mt-16 md:mt-20' : ''}>
                  <div className="flex items-baseline gap-4 border-t pt-4" style={{ borderColor: warn ? 'var(--warn)' : 'var(--line-2)' }}>
                    <span className="mono text-[0.72rem] fg-3">{String(i + 1).padStart(2, '0')}</span>
                    <h3>
                      <span className="label" style={{ color: warn ? 'var(--warn)' : 'var(--accent)' }}>
                        {c.section[s.kind]}
                      </span>
                      {s.title && <span className="mt-2 block text-[1.35rem] font-semibold leading-snug tracking-[-0.01em]">{t(s.title)}</span>}
                    </h3>
                  </div>
                  <div className={`mt-6 space-y-7 ${warn ? 'border-l-2 pl-5 sm:pl-7' : ''}`} style={warn ? { borderColor: 'color-mix(in srgb, var(--warn) 45%, transparent)' } : undefined}>
                    {s.blocks.map((b, j) => (
                      <BlockView key={j} b={b} />
                    ))}
                  </div>
                </section>
              );
            })}
            {p.privateRepo && <p className="mono mt-16 border-t border-[var(--line)] pt-5 leading-relaxed fg-3">{k.privateSources}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlockView({ b }: { b: Block }) {
  const { t } = useI18n();

  if ('p' in b) {
    return (
      <p className="max-w-[74ch] text-[0.98rem] leading-[1.7] fg-2">
        <Rich text={t(b.p)} />
      </p>
    );
  }

  if ('list' in b) {
    return (
      <ul className="max-w-[74ch] space-y-3">
        {b.list.map((item) => (
          <li key={item.en} className="relative pl-6 text-[0.95rem] leading-relaxed fg-2">
            <span className="absolute left-0 top-[0.72em] h-px w-3 bg-[var(--accent)]" aria-hidden="true" />
            <Rich text={t(item)} />
          </li>
        ))}
      </ul>
    );
  }

  if ('items' in b) {
    return (
      <dl className="grid gap-x-10 md:grid-cols-2">
        {b.items.map((it) => (
          <div key={it.title.en} className="border-t border-[var(--line)] py-5">
            <dt className="text-[1rem] font-semibold leading-snug tracking-[-0.005em]">
              <Rich text={t(it.title)} />
            </dt>
            <dd className="mt-2 text-[0.9rem] leading-relaxed fg-2">
              <Rich text={t(it.body)} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  if ('table' in b) {
    return (
      <div className="scroll-x">
        <table className="data-table min-w-[560px]">
          <thead>
            <tr>
              {b.table.head.map((h) => (
                <th key={h.en} scope="col">
                  {t(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className={typeof cell === 'string' ? 'mono whitespace-nowrap text-[0.8rem]' : ''}>
                    <Rich text={t(cell)} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if ('code' in b) {
    return (
      <figure>
        <pre className="code-block">
          <code>{b.code}</code>
        </pre>
        {b.caption && <figcaption className="caption">{t(b.caption)}</figcaption>}
      </figure>
    );
  }

  return <Figure f={{ media: b.figure, alt: b.alt, caption: b.caption, zoom: b.zoom, dark: b.dark }} kind="bare" />;
}
