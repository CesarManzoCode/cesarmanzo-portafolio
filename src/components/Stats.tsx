import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { Reveal } from './fx/Reveal';
import { TiltCard } from './fx/TiltCard';
import { AnimatedCounter } from './fx/AnimatedCounter';

export function Stats() {
  return (
    <section className="relative pt-16 sm:pt-20">
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {portfolioData.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="h-full">
              <TiltCard max={4} className="h-full">
                <div className="glass spotlight h-full rounded-3xl p-6">
                  <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    <span className="gradient-text">
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-snug text-slate-400">{stat.label}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
