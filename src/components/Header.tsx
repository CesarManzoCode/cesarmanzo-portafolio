import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useI18n } from '../i18n/context';
import { Container } from './Container';
import { IconLink } from './IconLink';
import { LanguageToggle } from './LanguageToggle';

const navConfig = [
  { key: 'about', href: '#about', id: 'about' },
  { key: 'projects', href: '#projects', id: 'projects' },
  { key: 'skills', href: '#skills', id: 'skills' },
  { key: 'contact', href: '#contact', id: 'contact' },
] as const;

export function Header() {
  const { c } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  const navItems = navConfig.map((n) => ({ ...n, label: c.nav[n.key] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', ...navConfig.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-white/8 bg-[#05060c]/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-4">
          <a href="#home" className="group flex items-center gap-3">
            <span className="border-glow flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04] font-display text-sm font-bold tracking-[0.18em] text-white">
              CM
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-semibold text-white">{c.portfolio.shortName}</span>
              <span className="block text-xs text-slate-400">{c.brandRole}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <div className="hidden items-center gap-2 md:flex">
              <IconLink href={c.portfolio.socials.github.href} label="GitHub">
                <Github size={18} />
              </IconLink>
              <IconLink href={c.portfolio.socials.linkedin.href} label="LinkedIn">
                <Linkedin size={18} />
              </IconLink>
            </div>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_10px_30px_-12px_rgba(79,157,255,0.8)] transition hover:-translate-y-0.5 sm:inline-flex"
            >
              {c.nav.cta}
              <ArrowUpRight size={16} />
            </a>

            <button
              type="button"
              aria-label={c.a11y.menu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:bg-white/[0.08] lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/8 bg-[#05060c]/95 backdrop-blur-xl lg:hidden"
          >
            <Container>
              <nav className="flex flex-col gap-1 py-4">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base text-slate-200 transition hover:bg-white/[0.05]"
                  >
                    {item.label}
                    <ArrowUpRight size={16} className="text-slate-500" />
                  </motion.a>
                ))}
                <div className="mt-3 flex items-center gap-2 px-3">
                  <IconLink href={c.portfolio.socials.github.href} label="GitHub">
                    <Github size={18} />
                  </IconLink>
                  <IconLink href={c.portfolio.socials.linkedin.href} label="LinkedIn">
                    <Linkedin size={18} />
                  </IconLink>
                  <IconLink href={c.portfolio.socials.email.href} label="Email" accent>
                    <Mail size={18} />
                  </IconLink>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
