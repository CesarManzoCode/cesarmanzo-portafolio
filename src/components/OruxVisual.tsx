type Owner = { name: string; tag: string; bar: string };

type Row = {
  w: number;
  indent: number;
  kw?: boolean;
  owner?: Owner;
};

const ana: Owner = { name: 'ana', tag: 'border-cyan-300/40 bg-cyan-300/10 text-cyan-200', bar: 'bg-cyan-400' };
const leo: Owner = { name: 'leo', tag: 'border-violet-300/40 bg-violet-300/10 text-violet-200', bar: 'bg-violet-400' };

const rows: Row[] = [
  { w: 58, indent: 0, kw: true },
  { w: 80, indent: 1 },
  { w: 44, indent: 1, owner: ana },
  { w: 66, indent: 2 },
  { w: 52, indent: 1, kw: true },
  { w: 72, indent: 0, owner: leo },
  { w: 38, indent: 1 },
];

/** Stylized "multiplayer editor" mock that sells what Orux does. */
export function OruxVisual() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_0%,rgba(56,225,255,0.18),transparent_62%)]" />

      <div className="glass-strong border-glow relative overflow-hidden rounded-3xl p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
            <span className="ml-2 font-mono text-[0.7rem] text-slate-500">team-aurora / server.py</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-2 py-0.5 font-mono text-[0.6rem] text-cyan-200">
              ana
            </span>
            <span className="rounded-full border border-violet-300/40 bg-violet-300/10 px-2 py-0.5 font-mono text-[0.6rem] text-violet-200">
              leo
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[0.6rem] text-slate-400">
              +2
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2.5">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-4 shrink-0 text-right font-mono text-[0.6rem] text-slate-600">{i + 1}</span>
              <div className="flex min-w-0 flex-1 items-center gap-2" style={{ paddingLeft: row.indent * 14 }}>
                <span
                  className={`h-[9px] rounded-full bg-gradient-to-r ${
                    row.kw ? 'from-cyan-400/50 to-slate-600/30' : 'from-slate-500/55 to-slate-700/30'
                  }`}
                  style={{ width: `${row.w}%` }}
                />
                {row.owner && (
                  <span className="flex items-center gap-1.5">
                    <span className={`h-4 w-[2px] rounded-full ${row.owner.bar} animate-[blink_1.05s_step-end_infinite]`} />
                    <span className={`rounded-md border px-1.5 py-0.5 font-mono text-[0.58rem] leading-none ${row.owner.tag}`}>
                      {row.owner.name}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[0.62rem] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            sin colisiones
          </span>
          <span>ownership · ana → líneas 3</span>
        </div>
      </div>
    </div>
  );
}
