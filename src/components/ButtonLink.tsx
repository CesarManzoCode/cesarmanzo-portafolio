import type { ReactNode } from 'react';

const baseClasses =
  'group inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-sm font-medium transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-slate-950';

const variants = {
  primary:
    'border-cyan-300/20 bg-cyan-300/10 text-cyan-100 hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/16',
  secondary:
    'border-white/10 bg-white/[0.03] text-slate-100 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]',
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: keyof typeof variants;
};

export function ButtonLink({ href, children, icon, variant = 'secondary' }: ButtonLinkProps) {
  const isMail = href.startsWith('mailto:');

  return (
    <a
      className={`${baseClasses} ${variants[variant]}`}
      href={href}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noreferrer'}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
