import { ArrowUpRight, Github, Lock } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { accentMap } from '../lib/accents';
import { useI18n } from '../i18n/context';
import { StatusBadge } from './StatusBadge';
import { TiltCard } from './fx/TiltCard';

type ProjectCardProps = {
  project: Project;
  index: number;
};

const MAX_TECH = 6;

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { c } = useI18n();
  const a = accentMap[project.accent];
  const extraTech = project.technologies.length - MAX_TECH;

  const primaryHref = project.liveUrl ?? project.githubUrl;
  const primaryLabel = project.liveUrl
    ? `${c.projectsUi.visit} ${project.domain ?? ''}`.trim()
    : c.projectsUi.viewCode;

  return (
    <TiltCard max={6} className="h-full">
      <article className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${a.glow}, transparent 62%)` }}
        />

        <div className="relative flex items-center justify-between">
          <span className={`font-mono text-sm font-medium ${a.text}`}>
            {String(index).padStart(2, '0')}
          </span>
          <StatusBadge status={project.status} privateRepo={project.repoPrivate} />
        </div>

        <h3 className="relative mt-5 font-display text-2xl font-semibold text-white">{project.name}</h3>
        <p className={`relative mt-1 text-sm font-medium ${a.text}`}>{project.tagline}</p>
        <p className="relative mt-4 flex-1 text-sm leading-7 text-slate-400">{project.description}</p>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <span
              key={m.label}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-slate-400"
            >
              <span className={`font-semibold ${a.text}`}>{m.value}</span>
              {m.label}
            </span>
          ))}
        </div>

        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, MAX_TECH).map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
          {extraTech > 0 && <span className="chip">+{extraTech}</span>}
        </div>

        <div className="relative mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
          {primaryHref && (
            <a
              href={primaryHref}
              target="_blank"
              rel="noreferrer"
              className="group/cta inline-flex items-center gap-1.5 text-sm font-medium text-slate-100 transition-colors hover:text-white"
            >
              {primaryLabel}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </a>
          )}

          <div className="ml-auto flex items-center gap-2">
            {project.repoPrivate ? (
              <span
                title={c.projectsUi.privateRepo}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-slate-500"
              >
                <Lock size={15} />
              </span>
            ) : (
              project.githubUrl && project.liveUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} · GitHub`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <Github size={15} />
                </a>
              )
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
