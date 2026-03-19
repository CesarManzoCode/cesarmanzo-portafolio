import { BrainCircuit, Server, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import type { SkillCategory } from '../types/portfolio';
import { Container } from './Container';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<SkillCategory, typeof Server> = {
  backend: Server,
  'ai-data': BrainCircuit,
  tools: Wrench,
};

const accentMap: Record<SkillCategory, string> = {
  backend: 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100',
  'ai-data': 'border-violet-300/20 bg-violet-300/10 text-violet-100',
  tools: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100',
};

export function Skills() {
  return (
    <section id="skills" className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Habilidades"
          title="Stack organizado por especialidad y valor técnico"
          description="Especializado en backend, automatización, inteligencia artificial y análisis de datos."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portfolioData.skillGroups.map((group, index) => {
            const Icon = iconMap[group.category];

            return (
              <Reveal key={group.title} delay={index * 0.08} className="glass-card p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${accentMap[group.category]}`}
                  >
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{group.description}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-slate-900/70 px-3.5 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-slate-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
