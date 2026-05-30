import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { Container } from './Container';
import { IconLink } from './IconLink';

export function Footer() {
  const { c } = useI18n();

  return (
    <footer className="relative border-t border-white/[0.06] py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="border-glow flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] font-display text-xs font-bold tracking-[0.18em] text-white">
              CM
            </span>
            <div>
              <p className="text-sm font-medium text-slate-200">{c.portfolio.shortName}</p>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} · {c.footer.builtWith}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <IconLink href={c.portfolio.socials.github.href} label="GitHub">
              <Github size={18} />
            </IconLink>
            <IconLink href={c.portfolio.socials.linkedin.href} label="LinkedIn">
              <Linkedin size={18} />
            </IconLink>
            <IconLink href={c.portfolio.socials.email.href} label="Email" accent>
              <Mail size={18} />
            </IconLink>
            <a
              href="#home"
              aria-label={c.a11y.backToTop}
              className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
