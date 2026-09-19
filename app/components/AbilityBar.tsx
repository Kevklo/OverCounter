"use client";

import { useState } from "react";
import Image from "next/image";
import type { Ability } from "@/lib/types";

type AbilityBarProps = {
  abilities: Ability[];
};

const AbilityBar = ({ abilities }: AbilityBarProps) => {
  const [active, setActive] = useState(0);

  if (abilities.length === 0) {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-300">
        No abilities recorded yet.
      </p>
    );
  }

  const current = abilities[Math.min(active, abilities.length - 1)];

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row flex-wrap gap-3">
        {abilities.map((ability, index) => {
          const isActive = index === active;
          return (
            <button
              key={ability.name}
              type="button"
              aria-pressed={isActive}
              aria-label={ability.name}
              onClick={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className={`overflow-hidden rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 ${
                isActive
                  ? "border-orange-400 bg-[var(--surface-strong)] shadow-[0_0_14px_rgba(249,158,26,0.45)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-orange-300/50"
              }`}
            >
              <Image
                src={ability.icon}
                alt={ability.name}
                width={64}
                height={64}
                sizes="64px"
                className="h-16 w-16 object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <h3 className="mb-1 text-lg font-semibold text-[var(--text)]">
          {current.name}
        </h3>
        <p className="text-sm text-[var(--muted)]">{current.description}</p>
      </div>
    </div>
  );
};

export default AbilityBar;
