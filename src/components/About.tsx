import { BrainCircuit, Boxes, Workflow } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const pillars = [
  {
    title: 'Backend engineering',
    description:
      'Servicios, APIs y arquitectura orientada a confiabilidad, rendimiento y crecimiento sostenido.',
    icon: Boxes,
  },
  {
    title: 'Automatización inteligente',
    description:
      'Flujos que reducen fricción operativa y conectan herramientas, procesos y datos con lógica útil.',
    icon: Workflow,
  },
  {
    title: 'IA aplicada a producto',
    description:
      'Integración de capacidades de IA para acelerar decisiones, clasificación, análisis e interacción.',
    icon: BrainCircuit,
  },
];

export function About() {
  return (
    <section id="about" className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Sobre mí"
          title="Ingeniería backend con foco en automatización, IA y datos"
          description="Desarrollo sistemas backend y soluciones de IA enfocadas en automatización y procesamiento eficiente de datos."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="glass-card p-6 sm:p-8">
            <div className="space-y-5 text-base leading-8 text-slate-300">
              {portfolioData.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <Reveal key={pillar.title} delay={index * 0.06} className="glass-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{pillar.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
