import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { ButtonLink } from './ButtonLink';
import { Reveal } from './fx/Reveal';
import { RotatingText } from './fx/RotatingText';
import { Typewriter, type TypewriterLine } from './fx/Typewriter';

const logLines: TypewriterLine[] = [
  { text: '$ ssh deploy@orux.space', className: 'text-slate-400' },
  { text: '› build ............. passing', className: 'text-slate-300' },
  { text: '› tests ............. 478 passed', className: 'text-emerald-300/90' },
  { text: '› containers ........ 4 up', className: 'text-slate-300' },
  { text: '▲ live → orux.space', className: 'text-cyan-300' },
];

const signals = [
  { k: 'En producción', v: 'orux.space · cpp-ceti.vercel.app' },
  { k: 'Foco', v: 'Tiempo real · IA aplicada · Pagos' },
  { k: 'Forma de construir', v: 'Por capas, con tests desde el commit 1' },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="home" ref={ref} className="section-shell pt-14 sm:pt-20 lg:pt-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div style={reduce ? undefined : { y: contentY }}>
            <Reveal y={14} blur={false}>
              <span className="kicker">
                <span className="ping-dot" />
                Disponible · remoto / Guadalajara
              </span>
            </Reveal>

            <Reveal delay={0.06} y={14}>
              <p className="mt-7 flex items-center gap-2 font-mono text-sm text-slate-400">
                <MapPin size={14} className="text-cyan-300/80" />
                Software Engineer — Full-Stack
              </p>
            </Reveal>

            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="gradient-text">{portfolioData.shortName}</span>
            </h1>

            <div className="mt-4 text-xl font-medium text-slate-200 sm:text-2xl">
              <span className="font-mono text-cyan-300/80">{'> '}</span>
              <RotatingText items={portfolioData.roles} className="align-middle" />
            </div>

            <Reveal delay={0.18}>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300/90">
                {portfolioData.pitch}
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="#projects" variant="primary">
                  Ver proyectos
                  <ArrowUpRight size={16} />
                </ButtonLink>
                <ButtonLink href={portfolioData.socials.github.href} icon={<Github size={18} />}>
                  GitHub
                </ButtonLink>
                <ButtonLink href={portfolioData.socials.linkedin.href} icon={<Linkedin size={18} />}>
                  LinkedIn
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {portfolioData.highlights.map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: panelY, opacity: panelOpacity }}
            className="lg:justify-self-end"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="glass-strong border-glow relative w-full max-w-md overflow-hidden p-5 sm:p-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,225,255,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(167,139,255,0.16),transparent_42%)]" />

              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400/90" />
                    <span className="h-3 w-3 rounded-full bg-amber-300/90" />
                    <span className="h-3 w-3 rounded-full bg-emerald-300/90" />
                  </div>
                  <span className="font-mono text-xs text-slate-500">deploy.log</span>
                </div>

                <Typewriter
                  lines={logLines}
                  className="mt-5 min-h-[7.5rem] rounded-2xl border border-white/10 bg-[#04050b]/80 p-4 font-mono text-[0.8rem] leading-6"
                />

                <div className="mt-5 grid gap-3">
                  {signals.map((s) => (
                    <div
                      key={s.k}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition hover:border-cyan-200/20"
                    >
                      <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">
                        {s.k}
                      </p>
                      <p className="mt-1.5 text-sm font-medium text-slate-100">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          aria-label="Ir a la siguiente sección"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 hidden items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-300 lg:flex"
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2"
          >
            <ArrowDown size={14} />
            Scroll
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}
