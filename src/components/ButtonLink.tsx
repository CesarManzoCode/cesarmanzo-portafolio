import type { ReactNode } from 'react';
import { Magnetic } from './fx/Magnetic';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-[transform,box-shadow,border-color,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060c]';

const variants = {
  primary:
    'shine text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-violet-300 shadow-[0_10px_34px_-10px_rgba(79,157,255,0.7)] hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-12px_rgba(79,157,255,0.85)]',
  secondary:
    'border border-white/12 bg-white/[0.04] text-slate-100 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]',
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: keyof typeof variants;
  magnetic?: boolean;
};

export function ButtonLink({ href, children, icon, variant = 'secondary', magnetic = true }: ButtonLinkProps) {
  const isMail = href.startsWith('mailto:');
  const isAnchor = href.startsWith('#');
  const external = !isMail && !isAnchor;

  const anchor = (
    <a
      className={`${base} ${variants[variant]}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {icon}
      <span>{children}</span>
    </a>
  );

  if (!magnetic) return anchor;

  return (
    <Magnetic className="inline-flex" strength={0.45}>
      {anchor}
    </Magnetic>
  );
}
