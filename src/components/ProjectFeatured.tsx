import { ArrowUpRight, Github, Lock, Star } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { accentMap } from '../lib/accents';
import { ButtonLink } from './ButtonLink';
import { StatusBadge } from './StatusBadge';
import { OruxVisual } from './OruxVisual';
import { Reveal } from './fx/Reveal';
import { TiltCard } from './fx/TiltCard';

export function ProjectFeatured({ project }: { project: Project }) {
  const a = accentMap[project.accent];

  return (
    <Reveal>
      <TiltCard max={2.5}>
        <article className="group glass-strong relative overflow-hidden rounded-[2rem] p-6 sm:p-9 lg:p-10">
          <div
            aria-hidden
            className={`pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-gradient-to-br ${a.gradient} blur-3xl`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), ${a.glow}, transparent 60%)` }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
                  <Star size={12} className="fill-amber-300/80" />
                  Proyecto destacado
                </span>
                <StatusBadge status={project.status} privateRepo={project.repoPrivate} />
              </div>

              <h3 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {project.name}
              </h3>
              <p className={`mt-2 text-lg font-medium ${a.text}`}>{project.tagline}</p>
              <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-slate-300/90">{project.description}</p>

              <div className="mt-7 grid max-w-md grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3 text-center">
                    <div className={`font-display text-2xl font-semibold ${a.text}`}>{m.value}</div>
                    <div className="mt-1 text-[0.62rem] uppercase tracking-wide text-slate-500">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <ButtonLink href={project.liveUrl} variant="primary">
                    Visitar {project.domain}
                    <ArrowUpRight size={16} />
                  </ButtonLink>
                )}
                {project.githubUrl && (
                  <ButtonLink href={project.githubUrl} icon={<Github size={18} />}>
                    Código
                  </ButtonLink>
                )}
                {project.repoPrivate && (
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-slate-400">
                    <Lock size={14} />
                    Repo privado
                  </span>
                )}
              </div>
            </div>

            <div className="relative">
              <OruxVisual />
            </div>
          </div>
        </article>
      </TiltCard>
    </Reveal>
  );
}
