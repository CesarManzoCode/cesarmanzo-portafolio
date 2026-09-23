import { getProject, type Project } from '../data/projects';
import { MEDIA } from '../data/media';
import type { Block, TechDoc, TechSection } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { ExternalLink, Figure, Rich } from '../components/primitives';

function sectionId(s: TechSection, i: number) {
  return `${s.kind}-${i}`;
}

export function TechDetail({ doc }: { doc: TechDoc }) {
  const { c, t } = useI18n();
  const k = c.technical;
  const p = getProject(doc.slug) as Project;

  return (
    <article className="pt-10 pb-20 sm:pt-14 md:pb-28">
      <div className="shell">
        <p className="mono text-[var(--ink-3)]">
          <Link to={paths.technical} className="transition-colors hover:text-[var(--accent)]">
            ← {k.back}
          </Link>
          <span className="px-2">/</span>
          <span>{c.depth[doc.depth].one}</span>
        </p>

        <header className="mt-6 border-b border-[var(--rule)] pb-8 sm:pb-10">
          <p className="mono text-[var(--accent)]">{t(p.kind)}</p>
          <h1 className="display mt-1 text-[2.9rem] leading-[0.95] sm:text-[3.8rem] md:text-[4.6rem]">{p.name}</h1>
          <p className="prose-lede mt-5 max-w-[68ch] text-[var(--ink)]">
            <Rich text={t(doc.abstract)} />
          </p>

          {doc.headline.length > 0 && (
            <ul className="mt-8 grid grid-cols-2 border-t border-[var(--rule)] sm:grid-cols-4">
              {doc.headline.map((m) => (
                <li key={m.label.en} className="border-b border-[var(--rule)] py-4 pr-4">
                  <span className="display block text-[2rem] leading-none break-words text-[var(--accent)] sm:text-[2.4rem]">{t(m.value)}</span>
                  <span className="mt-2 block text-[0.75rem] leading-snug text-[var(--ink-3)]">{t(m.label)}</span>
                </li>
              ))}
            </ul>
          )}

          <p className="caveat mt-6 max-w-[72ch]">
            <span className="label text-[var(--warn)]">{k.caveat}</span> <Rich text={t(doc.caveat)} />
          </p>

          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem]">
            <Link to={paths.project(p.slug)} className="link">
              {k.toProject} <span aria-hidden="true">→</span>
            </Link>
            {doc.sources.map((s) => (
              <ExternalLink key={s.href} href={s.href} className="link text-[var(--ink-2)]">
                {t(s.label)}
              </ExternalLink>
            ))}
          </p>
          {p.note && <p className="note mt-5">{t(p.note)}</p>}
        </header>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-12">
          {/* Contents: the section list doubles as the page’s argument. */}
          <nav className="lg:col-span-3" aria-label={k.contents}>
            <div className="lg:sticky lg:top-24">
              <p className="label">{k.contents}</p>
              <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 lg:block lg:space-y-1.5">
                {doc.sections.map((s, i) => (
                  <li key={sectionId(s, i)}>
                    <a href={`#${sectionId(s, i)}`} className={`mono text-[0.75rem] transition-colors hover:text-[var(--accent)] ${warnKinds.has(s.kind) ? 'text-[var(--warn)]' : 'text-[var(--ink-2)]'}`}>
                      {t(s.title ?? c.section[s.kind])}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 lg:col-span-9">
            {doc.sections.map((s, i) => (
              <section key={sectionId(s, i)} id={sectionId(s, i)} className={`tech-section ${i > 0 ? 'mt-12 md:mt-16' : ''}`}>
                <h2 className={`label border-t pt-4 ${warnKinds.has(s.kind) ? 'border-[var(--warn)] text-[var(--warn)]' : 'border-[var(--ink)] text-[var(--ink)]'}`}>
                  {c.section[s.kind]}
                  {s.title && <span className="block pt-1 text-[var(--ink-3)] normal-case tracking-normal">{t(s.title)}</span>}
                </h2>
                <div className="mt-5 space-y-6">
                  {s.blocks.map((b, j) => (
                    <BlockView key={j} b={b} />
                  ))}
                </div>
              </section>
            ))}

            {p.privateRepo && <p className="mono mt-14 border-t border-[var(--rule)] pt-5 leading-relaxed text-[var(--ink-3)]">{k.privateSources}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Sections that record what does not hold — styled so they cannot be skimmed past. */
const warnKinds = new Set(['failures', 'limitations', 'notProven', 'nonClaims']);

function BlockView({ b }: { b: Block }) {
  const { t } = useI18n();

  if ('p' in b) {
    return (
      <p className="max-w-[72ch] text-[0.95rem] leading-relaxed text-[var(--ink-2)]">
        <Rich text={t(b.p)} />
      </p>
    );
  }

  if ('list' in b) {
    return (
      <ul className="max-w-[72ch] space-y-2.5">
        {b.list.map((item) => (
          <li key={item.en} className="bullet text-[0.93rem] leading-relaxed text-[var(--ink-2)]">
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
          <div key={it.title.en} className="border-t border-[var(--rule)] py-5">
            <dt className="text-[0.95rem] font-semibold leading-snug tracking-[-0.01em] text-[var(--ink)]">
              <Rich text={t(it.title)} />
            </dt>
            <dd className="mt-2 text-[0.88rem] leading-relaxed text-[var(--ink-2)]">
              <Rich text={t(it.body)} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  if ('table' in b) {
    return (
      <div className="table-scroll">
        <table className="evidence-table">
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
                  <td key={j} className={j === 0 ? 'first' : ''}>
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

  return <Figure src={MEDIA[b.figure]} alt={t(b.alt)} caption={t(b.caption)} zoom={b.zoom} dark={b.dark} />;
}
