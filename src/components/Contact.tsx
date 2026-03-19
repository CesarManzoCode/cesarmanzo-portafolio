import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const contactItems = [
  {
    key: 'email',
    icon: Mail,
  },
  {
    key: 'github',
    icon: Github,
  },
  {
    key: 'linkedin',
    icon: Linkedin,
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="section-shell pb-24 sm:pb-32">
      <Container>
        <SectionHeading
          eyebrow="Contacto"
          title=""
          description=""
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="glass-card panel-glow p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
              Disponible para colaborar
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              ¿Buscas un perfil fuerte en backend, automatización e IA aplicada?
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Este portafolio está pensado para transmitir solidez técnica, criterio profesional y capacidad para construir soluciones reales listas para producción.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/65 p-5">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">Nota</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{portfolioData.contactNote}</p>
            </div>
          </Reveal>

          <div className="grid gap-6">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const entry = portfolioData.socials[item.key];
              const isMail = entry.href.startsWith('mailto:');

              return (
                <Reveal key={item.key} delay={index * 0.08} className="glass-card p-6">
                  <a
                    href={entry.href}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noreferrer'}
                    className="group block"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-100">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                            {entry.label}
                          </p>
                          <p className="mt-2 text-base font-medium text-slate-100">{entry.displayValue}</p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-100"
                      />
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
