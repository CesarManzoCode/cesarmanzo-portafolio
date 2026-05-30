import { GitBranch, Lock, Radio } from 'lucide-react';
import type { ProjectStatus } from '../types/portfolio';

type StatusBadgeProps = {
  status: ProjectStatus;
  privateRepo?: boolean;
};

export function StatusBadge({ status, privateRepo }: StatusBadgeProps) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
        <span className="ping-dot" />
        En vivo
        {privateRepo && <Lock size={12} className="opacity-70" />}
      </span>
    );
  }

  if (status === 'open-source') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300/25 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200">
        <GitBranch size={12} />
        Open source
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">
      <Radio size={12} />
      En construcción
    </span>
  );
}
