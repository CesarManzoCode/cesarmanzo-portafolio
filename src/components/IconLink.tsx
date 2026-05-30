import type { ReactNode } from 'react';

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  accent?: boolean;
};

/** Square glass icon button used for social / contact links. */
export function IconLink({ href, label, children, accent = false }: IconLinkProps) {
  const isMail = href.startsWith('mailto:');

  return (
    <a
      href={href}
      aria-label={label}
      target={isMail ? undefined : '_blank'}
      rel={isMail ? undefined : 'noreferrer'}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition duration-300 hover:-translate-y-0.5 ${
        accent
          ? 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100 hover:border-cyan-200/50 hover:bg-cyan-300/20'
          : 'border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/25 hover:bg-white/[0.08]'
      }`}
    >
      {children}
    </a>
  );
}
