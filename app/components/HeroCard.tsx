import Image from "next/image";
import Link from "next/link";
import Pills from "@/app/components/Pills";

type HeroCardProps = {
  name?: string;
  role?: string;
  archetype?: string;
  id?: string;
  description?: string;
  portrait?: string | null;
};

export const HeroCard = ({
  name = "Hero name",
  archetype = "Archetype",
  id = "",
  description = "LOREM IPSUM",
  portrait = null,
}: HeroCardProps) => {

  return (
    <Link href={`/hero/${id}`} className="card-laser">
      <article className="bg-[var(--surface)] p-3 sm:p-4">
        <div className="flex flex-row items-center gap-4 sm:grid sm:grid-cols-[1fr_3fr] sm:items-start sm:gap-4">
          <div className="w-16 shrink-0 sm:col-start-1 sm:row-start-2 sm:w-full">
            {portrait ? (
              <Image
                src={portrait}
                alt={"portait of " + name}
                sizes="(min-width: 640px) 80px 64px"
                width={512}
                height={512}
                className="h-16 w-16 rounded object-cover object-top sm:h-20 sm:w-auto sm:rounded-none"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded bg-slate-100 text-2xl font-bold text-slate-300 sm:h-20 sm:w-20 sm:rounded-none sm:text-7xl">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-col items-start gap-1 sm:contents">
            <h1 className="col-start-1 row-start-1 min-w-0 text-base font-semibold text-[var(--text)] sm:text-xl">{name}</h1>
            <div className="col-start-2 row-start-1 justify-self-start">
              <Pills kind={"archetype"} value={archetype}></Pills>
            </div>
          </div>
          <p className="hidden text-[var(--muted)] sm:col-start-2 sm:row-start-2 sm:line-clamp-3 sm:block sm:text-sm">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default HeroCard;
