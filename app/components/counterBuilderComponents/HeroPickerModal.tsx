import type { HeroLite } from "@/lib/types";
import SearchBar from "@/app/components/SearchBar";
import BuilderHeroCard from "./BuilderHeroCard";

type HeroPickerModalProps = {
  roleLabel: string;
  heroes: HeroLite[];
  query: string;
  onQueryChange: (value: string) => void;
  onSelect: (heroId: string) => void;
  onClose: () => void;
};

const HeroPickerModal = ({
  roleLabel,
  heroes,
  query,
  onQueryChange,
  onSelect,
  onClose,
}: HeroPickerModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-3xl flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[var(--text)]">
            Pick a {roleLabel}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] hover:text-orange-400"
          >
            ×
          </button>
        </div>

        <SearchBar value={query} onChange={onQueryChange} />

        <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 md:grid-cols-4">
          {heroes.map((hero) => (
            <BuilderHeroCard
              key={hero.id}
              hero={hero}
              roleLabel={roleLabel}
              onClick={() => onSelect(hero.id)}
            />
          ))}
          {heroes.length === 0 && (
            <p className="col-span-full text-sm text-[var(--muted)]">
              No heroes for that role.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroPickerModal;
