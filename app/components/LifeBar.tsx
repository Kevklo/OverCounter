import type { Hitpoints } from "@/lib/types";

type LifeBarProps = {
  hps: Hitpoints;
};

export const LifeBar = ({ hps }: LifeBarProps) => {
  const { total, health, armor, shields } = hps;

  const healthPct = (health / total) * 100;
  const armorPct = (armor / total) * 100;
  const shieldsPct = Math.max(0, 100 - healthPct - armorPct);

  return (
    <div
      role="img"
      aria-label={`Health ${health}, armor ${armor}, shields ${shields}, total ${total}`}
      className="relative flex h-15 w-full overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-800 shadow-md"
    >
      <div
        className="flex h-full items-center justify-center overflow-hidden bg-slate-200 text-sm font-bold text-slate-900"
        style={{ width: `${healthPct}%` }}
      >
        {health}
      </div>
      {armor > 0 && (
        <div
          className="flex h-full items-center justify-center overflow-hidden border-l-2 border-slate-700/40 bg-orange-500 text-sm font-bold text-white"
          style={{ width: `${armorPct}%` }}
        >
          {armor}
        </div>
      )}
      {shields > 0 && (
        <div
          className="flex h-full items-center justify-center overflow-hidden border-l-2 border-slate-700/40 bg-blue-500 text-sm font-bold text-white"
          style={{ width: `${shieldsPct}%` }}
        >
          {shields}
        </div>
      )}

      <span className="pointer-events-none absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center border-2 border-slate-700 bg-white shadow-sm">
        <span className="relative block h-3.5 w-3.5">
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-slate-800" />
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-slate-800" />
        </span>
      </span>
    </div>
  );
};

export default LifeBar;
