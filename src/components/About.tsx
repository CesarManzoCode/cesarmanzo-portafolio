import { Layers, Radio, BrainCircuit, Rocket } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { Container } from './Container';
import { Reveal } from './fx/Reveal';
import { TiltCard } from './fx/TiltCard';
import { SectionHeading } from './SectionHeading';

const pillarMeta = [
  { icon: Layers, accent: 'text-cyan-300' },
  { icon: Radio, accent: 'text-sky-300' },
  { icon: BrainCircuit, accent: 'text-violet-300' },
];

export function About() {
  const { c } = useI18n();

  return (
    <section id="about" className="section-shell">
      <Container>
        <SectionHeading
          index="01"
          eyebrow={c.sections.about.eyebrow}
          title={c.sections.about.title}
          description={c.sections.about.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="h-full">
            <TiltCard max={3} className="h-full">
              <div className="glass spotlight relative h-full overflow-hidden p-7 sm:p-9">
                <div className="space-y-5 text-base leading-8 text-slate-300/90">
                  {c.portfolio.about.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-400/10 text-emerald-300">
                    <Rocket size={18} />
                  </span>
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">
                      {c.about.nowLabel}
                    </p>
                    <p className="text-sm font-medium text-slate-100">{c.about.nowText}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="grid gap-5">
            {c.about.pillars.map((pillar, index) => {
              const { icon: Icon, accent } = pillarMeta[index] ?? { icon: Layers, accent: 'text-cyan-300' };
              return (
                <Reveal key={pillar.title} delay={index * 0.08} className="h-full">
                  <TiltCard max={4} className="h-full">
                    <div className="glass spotlight group flex h-full items-start gap-4 p-6">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] ${accent} transition group-hover:scale-105`}>
                        <Icon size={22} />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-white">{pillar.title}</h3>
                        <p className="mt-1.5 text-sm leading-7 text-slate-400">{pillar.description}</p>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
