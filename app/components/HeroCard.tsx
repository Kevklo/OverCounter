import Image from "next/image";
import Link from "next/link";
import Pills from "@/app/components/Pills";

type HeroCardProps = {
  name?: string;
  role?: string;
  archetype?: string;
  id?: string;
  portrait?: string | null;
};

export const HeroCard = ({
  name = "Hero name",
  role = "Role",
  archetype = "Archetype",
  id = "",
  portrait = null,
}: HeroCardProps) => {
  return (
    <Link href={`/hero/${id}`}>
      <article className="flex flex-col overflow-hidden rounded-xl border border-slate-300 bg-linear-to-b from-slate-50 via-slate-200 to-slate-400 shadow-md transition-transform duration-100 hover:scale-105">
        <header className="flex flex-col items-center justify-between gap-2 px-3 py-1.5">
          <h2 className="truncate text-base font-semibold text-black">{name}</h2>
          <div className="flex flex-row gap-1">
            <Pills kind="role" value={role} />
            <Pills kind="archetype" value={archetype} />
          </div>
        </header>
        <div className="relative flex aspect-square items-center justify-center bg-slate-100">
          {portrait ? (
            <Image
              src={portrait}
              alt={`Portrait of ${name}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 256px"
              className="object-cover"
            />
          ) : (
            <span className="text-7xl font-bold text-slate-300">
              {name.charAt(0)}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
};

export default HeroCard;
