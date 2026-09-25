import type { HeroLite, HeroRole } from "@/lib/types";
import { ROLE_LABEL } from "./constants";
import BuilderHeroCard from "./BuilderHeroCard";

type RivalTeamRowProps = {
  slots: HeroRole[];
  heroes: (HeroLite | null)[];
  onOpen: (slot: number) => void;
  onClear: (slot: number) => void;
};

const RivalTeamRow = ({ slots, heroes, onOpen, onClear }: RivalTeamRowProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-[var(--text)]">Rival team</h2>
      <div className="flex flex-col gap-3">
        {slots.map((role, slot) => (
          <BuilderHeroCard
            key={slot}
            hero={heroes[slot]}
            roleLabel={ROLE_LABEL[role]}
            onClick={() => onOpen(slot)}
            onRemove={() => onClear(slot)}
          />
        ))}
      </div>
    </section>
  );
};

export default RivalTeamRow;
