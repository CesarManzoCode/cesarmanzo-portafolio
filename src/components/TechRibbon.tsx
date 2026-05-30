import { useI18n } from '../i18n/context';
import { Marquee } from './fx/Marquee';

export function TechRibbon() {
  const { c } = useI18n();

  return (
    <section aria-label="Stack" className="relative border-y border-white/[0.06] bg-white/[0.012] py-6">
      <div className="[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <Marquee>
          {c.portfolio.marquee.map((tech) => (
            <span
              key={tech}
              className="mx-4 inline-flex items-center gap-4 font-display text-base font-medium text-slate-400 transition-colors hover:text-white sm:text-lg"
            >
              {tech}
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400/70 to-violet-400/70" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
