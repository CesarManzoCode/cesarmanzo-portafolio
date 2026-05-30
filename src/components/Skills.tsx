import { BrainCircuit, Cloud, MonitorSmartphone, Server } from 'lucide-react';
import { useI18n } from '../i18n/context';
import type { SkillCategory } from '../types/portfolio';
import { Container } from './Container';
import { Reveal } from './fx/Reveal';
import { TiltCard } from './fx/TiltCard';
import { SectionHeading } from './SectionHeading';

const iconMap: Record<SkillCategory, typeof Server> = {
  backend: Server,
  frontend: MonitorSmartphone,
  'ai-data': BrainCircuit,
  infra: Cloud,
};

const accentMap: Record<SkillCategory, string> = {
  backend: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200',
  frontend: 'border-sky-300/25 bg-sky-300/10 text-sky-200',
  'ai-data': 'border-violet-300/25 bg-violet-300/10 text-violet-200',
  infra: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200',
};

export function Skills() {
  const { c } = useI18n();

  return (
    <section id="skills" className="section-shell">
      <Container>
        <SectionHeading
          index="03"
          eyebrow={c.sections.skills.eyebrow}
          title={c.sections.skills.title}
          description={c.sections.skills.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {c.portfolio.skillGroups.map((group, index) => {
            const Icon = iconMap[group.category];

            return (
              <Reveal key={group.title} delay={index * 0.08} className="h-full">
                <TiltCard max={3} className="h-full">
                  <div className="glass spotlight h-full p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${accentMap[group.category]}`}>
                        <Icon size={22} />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                        <p className="mt-1.5 text-sm leading-7 text-slate-400">{group.description}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
