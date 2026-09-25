import Image from "next/image";
import type { ReactNode } from "react";
import type { HeroLite } from "@/lib/types";

type BuilderHeroCardProps = {
  hero?: HeroLite | null;
  roleLabel: string;
  metric?: ReactNode;
  onClick?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
};

const BuilderHeroCard = ({
  hero,
  roleLabel,
  metric,
  onClick,
  onRemove,
  removeLabel,
}: BuilderHeroCardProps) => {
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onClick}
        className="grid h-20 w-full grid-cols-[auto_1fr] grid-rows-3 items-center gap-x-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-left transition-colors hover:border-orange-300/60"
      >
        <span className="col-start-1 row-span-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-700">
          {hero ? (
            hero.image_url ? (
              <Image
                src={hero.image_url}
                alt={hero.name}
                width={48}
                height={48}
                sizes="48px"
                className="h-12 w-12 object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-slate-300">
                {hero.name.charAt(0)}
              </span>
            )
          ) : (
            <span className="text-2xl leading-none text-[var(--muted)]">+</span>
          )}
        </span>

        {hero ? (
          <>
            <span className="col-start-2 row-start-1 truncate text-sm font-semibold text-[var(--text)]">
              {hero.name}
            </span>
            <span className="col-start-2 row-start-2 text-xs uppercase tracking-wide text-[var(--muted)]">
              {roleLabel}
            </span>
            <span className="col-start-2 row-start-3 flex min-w-0 items-center gap-2">
              {metric}
            </span>
          </>
        ) : (
          <span className="col-start-2 row-span-3 self-center text-xs uppercase tracking-wide text-[var(--muted)]">
            {roleLabel}
          </span>
        )}
      </button>

      {hero && onRemove && (
        <button
          type="button"
          aria-label={removeLabel ?? `Remove ${hero.name}`}
          onClick={onRemove}
          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-xs text-[var(--muted)] hover:text-orange-400"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default BuilderHeroCard;
