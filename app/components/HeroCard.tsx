import Link from "next/link";

type HeroCardProps = {
  name?: string;
  role?: string;
  archetype?: string;
  id?: number;
};

export const HeroCard = ({
  name = "Nombre del héroe",
  role = "Rol",
  archetype = "archetype",
  id = -1,
}: HeroCardProps) => {
  return (
    <Link href={"/hero/" + id}>
      <article className="flex w-64 flex-col overflow-hidden rounded-xl border border-slate-300 bg-linear-to-b from-slate-50 via-slate-200 to-slate-400 shadow-md transition-transform duration-100 hover:scale-105">
        <header className="flex flex-row items-center justify-between gap-2 px-3 py-1.5">
          <h2 className="truncate text-base font-semibold text-slate-900">
            {name}
          </h2>
          <div className="flex shrink-0 flex-row gap-1">
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-orange-700">
              {role}
            </span>
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-orange-700">
              {archetype}
            </span>
          </div>
        </header>

        <div className="flex aspect-square items-center justify-center bg-slate-100">
          <span className="text-7xl font-bold text-slate-300">
            {name.charAt(0)}
          </span>
        </div>
      </article>
    </Link>
  );
};

export default HeroCard;
