import { CATEGORIES, PROJECTS, TAGS, projectsIn, type Project } from '../data/projects';
import { getTech } from '../data/technical';
import { useI18n } from '../i18n/context';
import { Link, paths } from '../router';
import { ExternalLink, Rise, Status } from '../components/primitives';

export function Projects() {
  const { c, t } = useI18n();
  const k = c.projects;

  return (
    <div className="shell pt-10 pb-20 sm:pt-14 md:pb-28">
      <header className="grid gap-6 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-8">
          <p className="label">{k.eyebrow}</p>
          <h1 className="display mt-4 text-[2.8rem] leading-[0.98] sm:text-[3.8rem] md:text-[4.4rem]">{k.title}</h1>
          <p className="prose-lede mt-5 max-w-[56ch]">{k.lede}</p>
          <p className="mono mt-4 text-[var(--ink-3)]">{k.count(PROJECTS.length, CATEGORIES.length)}</p>
        </div>

        <nav className="self-end md:col-span-4" aria-label={k.jump}>
          <ol className="border-t border-[var(--ink)]">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="border-b border-[var(--rule)]">
                <a href={`#${cat.id}`} className="flex items-baseline justify-between gap-3 py-2 text-[0.88rem] transition-colors hover:text-[var(--accent)]">
                  <span>{t(cat.name)}</span>
                  <span className="mono text-[var(--ink-3)]">{projectsIn(cat.id).length}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      {CATEGORIES.map((cat) => {
        const items = projectsIn(cat.id);
        const cards = items.filter((p) => p.weight !== 'minor');
        const minors = items.filter((p) => p.weight === 'minor');

        return (
          <section key={cat.id} id={cat.id} className="mt-16 md:mt-24" aria-labelledby={`${cat.id}-title`}>
            <Rise className="border-t border-[var(--ink)] pt-5 md:pt-6">
              <div className="grid gap-2 md:grid-cols-12 md:gap-12">
                <h2 id={`${cat.id}-title`} className="display text-[2rem] leading-[1.02] sm:text-[2.4rem] md:col-span-5">
                  {t(cat.name)}
                </h2>
                <p className="max-w-[52ch] self-end text-[0.9rem] leading-relaxed text-[var(--ink-2)] md:col-span-7">{t(cat.blurb)}</p>
              </div>
            </Rise>

            {cards.length > 0 && (
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {cards.map((p) => {
                  const layout = layoutFor(p, cards);
                  return (
                    <Rise key={p.slug} className={layout === 'half' ? '' : 'md:col-span-2'}>
                      <ProjectCard p={p} layout={layout} />
                    </Rise>
                  );
                })}
              </div>
            )}

            {minors.length > 0 && (
              <ul className="mt-6">
                {minors.map((p) => (
                  <li key={p.slug}>
                    <Rise>
                      <MinorRow p={p} />
                    </Rise>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      <p className="mono mt-20 border-t border-[var(--rule)] pt-5 text-[var(--ink-3)]">
        <ExternalLink href="https://github.com/CesarManzoCode" className="link">
          github.com/CesarManzoCode
        </ExternalLink>
      </p>
    </div>
  );
}

type Layout = 'wide' | 'half' | 'compact';

/* Major work gets a full row; two majors alone sit side by side as peers;
   standard entries pair up, and a lone one takes a quieter full row. */
function layoutFor(p: Project, cards: Project[]): Layout {
  const majors = cards.filter((x) => x.weight === 'major');
  const standards = cards.filter((x) => x.weight === 'standard');
  if (p.weight === 'major') return majors.length === 2 && standards.length === 0 ? 'half' : 'wide';
  if (standards.length % 2 === 1 && standards[standards.length - 1] === p) return 'compact';
  return 'half';
}

function TechBadge({ p }: { p: Project }) {
  const { c } = useI18n();
  const doc = getTech(p.slug);
  if (!doc) return null;
  return (
    <Link to={paths.tech(p.slug)} className="tech-badge">
      <span aria-hidden="true">▍</span>
      {c.projects.technical} · {c.depth[doc.depth].one}
    </Link>
  );
}

function Tags({ p }: { p: Project }) {
  const { t } = useI18n();
  return (
    <ul className="flex flex-wrap gap-1.5">
      {p.tags.map((id) => (
        <li key={id} className="tag">
          {t(TAGS[id])}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ p, layout }: { p: Project; layout: Layout }) {
  const { c, t } = useI18n();
  const wide = layout !== 'half';
  const major = layout === 'wide';

  return (
    <article className={`card flex h-full flex-col p-5 sm:p-7 ${major ? 'card-major' : ''}`}>
      <div className={wide ? 'grid gap-6 md:grid-cols-12 md:gap-10' : 'flex flex-1 flex-col'}>
        <div className={wide ? 'md:col-span-4' : ''}>
          <p className="mono text-[var(--ink-3)]">{t(p.kind)}</p>
          <h3 className={`display mt-2 leading-[0.98] ${major ? 'text-[2.4rem] sm:text-[2.8rem]' : 'text-[2rem] sm:text-[2.3rem]'}`}>
            <Link to={paths.project(p.slug)} className="transition-colors hover:text-[var(--accent)]">
              {p.name}
            </Link>
          </h3>
          <Status tone={p.statusTone} className="mt-3 text-[var(--ink-2)]">
            {t(p.status)}
          </Status>
          {wide && (
            <div className="mt-5 hidden md:block">
              <Tags p={p} />
            </div>
          )}
        </div>

        <div className={wide ? 'md:col-span-8' : 'mt-4 flex flex-1 flex-col'}>
          <p className="text-[1rem] leading-relaxed text-[var(--ink)]">{t(p.thesis)}</p>
          <p className="mt-3 text-[0.87rem] leading-relaxed text-[var(--ink-2)]">{t(p.why)}</p>
          {major && p.proof.length > 0 && (
            <ul className="mt-4 grid gap-1.5">
              {p.proof.map((pt) => (
                <li key={pt.en} className="proof text-[0.87rem] leading-relaxed text-[var(--ink-2)]">
                  {t(pt)}
                </li>
              ))}
            </ul>
          )}
          <div className={wide ? 'mt-5 md:hidden' : 'mt-5'}>
            <Tags p={p} />
          </div>

          <div className={wide ? 'mt-6' : 'mt-auto pt-6'}>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--rule)] pt-4 text-[0.85rem]">
            <Link to={paths.project(p.slug)} className="link">
              {c.projects.open} <span aria-hidden="true">→</span>
            </Link>
            <TechBadge p={p} />
            {p.links.map((l) => (
              <ExternalLink key={l.href} href={l.href} className="link text-[var(--ink-2)]">
                {t(l.label)}
              </ExternalLink>
            ))}
            {p.privateRepo && <span className="mono text-[0.72rem] text-[var(--ink-3)]">{c.projects.privateRepo}</span>}
          </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function MinorRow({ p }: { p: Project }) {
  const { c, t } = useI18n();
  return (
    <div className="grid gap-2 border-b border-[var(--rule)] py-4 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        <Link to={paths.project(p.slug)} className="mono font-medium transition-colors hover:text-[var(--accent)]">
          {p.name}
        </Link>
        <p className="mono mt-1 text-[0.7rem] text-[var(--ink-3)]">{t(p.kind)}</p>
      </div>
      <p className="text-[0.88rem] leading-relaxed text-[var(--ink-2)] md:col-span-5">{t(p.thesis)}</p>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-[0.8rem] md:col-span-3 md:justify-end">
        <TechBadge p={p} />
        {p.links.map((l) => (
          <ExternalLink key={l.href} href={l.href} className="link text-[var(--ink-2)]">
            {t(l.label)}
          </ExternalLink>
        ))}
        {p.privateRepo && <span className="mono text-[0.72rem] text-[var(--ink-3)]">{c.projects.privateRepo}</span>}
      </div>
    </div>
  );
}
