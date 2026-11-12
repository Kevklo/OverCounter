import type { HeroLite } from "@/lib/types";
import { ROLE_LABEL } from "./constants";
import BuilderHeroCard from "./BuilderHeroCard";

export type TeamMember = {
  hero: HeroLite;
  total: number;
  bestRivalName?: string;
};

type YourTeamRowProps = {
  members: TeamMember[];
  divisor: number;
  average: number;
  hasRivals: boolean;
};

const YourTeamRow = ({ members, divisor, average, hasRivals }: YourTeamRowProps) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-lg font-bold text-[var(--text)] sm:text-xl">
          Your team
        </h2>
        {hasRivals && (
          <span className="text-xs text-[var(--muted)] sm:text-sm">
            Average counter: {(average * 100).toFixed(0)}%
          </span>
        )}
      </div>

      {!hasRivals ? (
        <p className="text-sm text-[var(--muted)]">
          Pick at least one rival to see the recommended team.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {members.map(({ hero, total, bestRivalName }) => (
            <BuilderHeroCard
              key={hero.id}
              hero={hero}
              roleLabel={ROLE_LABEL[hero.role]}
              metric={
                <>
                  <span className="text-sm font-bold text-orange-400">
                    {((total / divisor) * 100).toFixed(0)}%
                  </span>
                  {bestRivalName && (
                    <span className="truncate text-xs text-[var(--muted)]">
                      Best vs {bestRivalName}
                    </span>
                  )}
                </>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default YourTeamRow;
