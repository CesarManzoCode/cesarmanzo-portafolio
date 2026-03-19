import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { ButtonLink } from './ButtonLink';

const navItems = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Contacto', href: '#contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/6 bg-slate-950/55 backdrop-blur-xl">
      <Container>
        <div className="py-4">
          <div className="flex items-center justify-between gap-4">
            <a href="#hero" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold tracking-[0.22em] text-cyan-100">
                CMO
              </span>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white">{portfolioData.name}</p>
                <p className="text-xs text-slate-400">Backend · Automation · AI · Data</p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={portfolioData.socials.email.href}
                aria-label="Contacto por email"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-100 transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/16 md:hidden"
              >
                <Mail size={18} />
              </a>

              <div className="hidden items-center gap-3 md:flex">
                <a
                  href={portfolioData.socials.github.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <Github size={18} />
                </a>
                <a
                  href={portfolioData.socials.linkedin.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <Linkedin size={18} />
                </a>
                <ButtonLink href={portfolioData.socials.email.href} variant="primary" icon={<Mail size={18} />}>
                  Contacto{' '}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </ButtonLink>
              </div>
            </div>
          </div>

          <nav className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
