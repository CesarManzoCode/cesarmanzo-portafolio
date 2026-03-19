import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../types/portfolio';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group glass-card project-card-hover relative overflow-hidden p-6 sm:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_28%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            Proyecto {String(index + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir repositorio de ${project.name}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
            >
              <Github size={18} />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir demo de ${project.name}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/16"
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-white">{project.name}</h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-slate-400 sm:text-base">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/8 pt-5 text-sm text-slate-400">
          <span>Placeholder editable</span>
          <div className="inline-flex items-center gap-2 text-slate-200">
            Ver repo y demo
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </article>
  );
}
