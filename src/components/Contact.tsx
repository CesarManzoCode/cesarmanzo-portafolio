import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { Container } from './Container';
import { ButtonLink } from './ButtonLink';
import { Reveal } from './fx/Reveal';
import { TiltCard } from './fx/TiltCard';
import { SectionHeading } from './SectionHeading';

const methods = [
  { key: 'email', icon: Mail, accent: true },
  { key: 'github', icon: Github, accent: false },
  { key: 'linkedin', icon: Linkedin, accent: false },
] as const;

export function Contact() {
  const { c } = useI18n();

  return (
    <section id="contact" className="section-shell pb-24 sm:pb-32">
      <Container>
        <SectionHeading
          index="04"
          eyebrow={c.sections.contact.eyebrow}
          title={c.sections.contact.title}
          description={c.sections.contact.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="h-full">
            <TiltCard max={2.5} className="h-full">
              <div className="glass-strong border-glow spotlight relative h-full overflow-hidden p-7 sm:p-9">
                <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(56,225,255,0.18),transparent_60%)]" />
                <div className="relative">
                  <span className="kicker">
                    <span className="ping-dot" />
                    {c.portfolio.availability}
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
                    {c.contactUi.heading}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-300/90">{c.portfolio.summary}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <ButtonLink href={c.portfolio.socials.email.href} variant="primary" icon={<Mail size={18} />}>
                      {c.contactUi.ctaEmail}
                    </ButtonLink>
                    <ButtonLink href={c.portfolio.socials.github.href} icon={<Github size={18} />}>
                      {c.contactUi.cta2}
                    </ButtonLink>
                  </div>

                  <div className="mt-8 rounded-2xl border border-white/10 bg-[#04050b]/60 p-5">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">
                      {c.contactUi.noteLabel}
                    </p>
                    <p className="mt-2.5 text-sm leading-7 text-slate-300">{c.portfolio.contactNote}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="grid gap-5">
            {methods.map((method, index) => {
              const Icon = method.icon;
              const entry = c.portfolio.socials[method.key];
              const isMail = entry.href.startsWith('mailto:');

              return (
                <Reveal key={method.key} delay={index * 0.08} className="h-full">
                  <TiltCard max={5} className="h-full">
                    <a
                      href={entry.href}
                      target={isMail ? undefined : '_blank'}
                      rel={isMail ? undefined : 'noreferrer'}
                      className="glass spotlight group flex h-full items-center justify-between gap-4 p-6 transition hover:border-white/20"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                            method.accent
                              ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-200'
                              : 'border-white/10 bg-white/[0.04] text-slate-100'
                          }`}
                        >
                          <Icon size={20} />
                        </span>
                        <div>
                          <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">
                            {entry.label}
                          </p>
                          <p className="mt-1 text-sm font-medium text-slate-100">{entry.displayValue}</p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-100"
                      />
                    </a>
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
