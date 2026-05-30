import type { Accent } from '../types/portfolio';

type AccentTokens = {
  text: string;
  dot: string;
  ring: string;
  gradient: string;
  glow: string;
};

export const accentMap: Record<Accent, AccentTokens> = {
  cyan: {
    text: 'text-cyan-300',
    dot: 'bg-cyan-400',
    ring: 'border-cyan-300/30',
    gradient: 'from-cyan-400/25 to-sky-500/10',
    glow: 'rgba(56, 225, 255, 0.18)',
  },
  violet: {
    text: 'text-violet-300',
    dot: 'bg-violet-400',
    ring: 'border-violet-300/30',
    gradient: 'from-violet-400/25 to-fuchsia-500/10',
    glow: 'rgba(167, 139, 255, 0.18)',
  },
  emerald: {
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
    ring: 'border-emerald-300/30',
    gradient: 'from-emerald-400/25 to-teal-500/10',
    glow: 'rgba(79, 224, 176, 0.18)',
  },
  amber: {
    text: 'text-amber-300',
    dot: 'bg-amber-400',
    ring: 'border-amber-300/30',
    gradient: 'from-amber-400/25 to-orange-500/10',
    glow: 'rgba(255, 197, 107, 0.18)',
  },
};
