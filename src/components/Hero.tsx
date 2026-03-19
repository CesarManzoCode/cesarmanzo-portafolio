import { ArrowUpRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { ButtonLink } from './ButtonLink';
import { Reveal } from './Reveal';

const signalItems = [
  { label: 'Enfoque', value: 'Arquitectura backend y servicios confiables' },
  { label: 'Automatización', value: 'Sistemas que eliminan trabajo manual' },
  { label: 'IA aplicada', value: 'Integración útil para productos reales' },
  { label: 'Data mindset', value: 'Pipelines, métricas e insights accionables' },
];

const statusLines = [
  '$ stack.status --all',
  'backend: online',
  'automation: active',
  'ai-workflows: ready',
  'data-layer: operational',
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="section-shell pt-16 sm:pt-24 lg:pt-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <span className="section-kicker">
                <Sparkles size={14} />
                Backend · AI · Data Engineering
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
                {portfolioData.role}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="gradient-text">{portfolioData.name}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                {portfolioData.pitch}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                {portfolioData.summary}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href={portfolioData.socials.github.href} variant="primary" icon={<Github size={18} />}>
                  GitHub{' '}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </ButtonLink>
                <ButtonLink href={portfolioData.socials.linkedin.href} icon={<Linkedin size={18} />}>
                  LinkedIn{' '}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </ButtonLink>
                <ButtonLink href={portfolioData.socials.email.href} icon={<Mail size={18} />}>
                  Contacto
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                {portfolioData.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10 inline-flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.75)]" />
                {portfolioData.availability}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:justify-self-end">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card-strong panel-glow relative overflow-hidden p-6 sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.18),transparent_30%)]" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                      SYSTEM SIGNAL
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-white">Panel de ingeniería</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 font-mono text-sm text-slate-300">
                  {statusLines.map((line, index) => (
                    <p key={line} className={index === 0 ? 'text-cyan-200' : 'mt-2'}>
                      {line}
                    </p>
                  ))}
                </div>

                <div className="mt-6 grid gap-4">
                  {signalItems.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-cyan-200/20"
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-100 sm:text-base">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
