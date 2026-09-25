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
      <div className="flex flex-row items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold text-[var(--text)]">Your team</h2>
        {hasRivals && (
          <span className="text-sm text-[var(--muted)]">
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
