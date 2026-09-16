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
  role = "Role",
  archetype = "Archetype",
  id = "",
  description = "LOREM IPSUM",
  portrait = null,
}: HeroCardProps) => {

  return (
    <Link href={`/hero/${id}`}>
      <article className="bg-[hsl(215_40%_35%/_0.25)] p-5 sm:p-5">
        <div className="flex flex-row items-center gap-4 sm:grid sm:grid-cols-[10%_10%_50%] sm:gap-6">
          <div className="w-16 shrink-0 sm:col-span-2 sm:col-start-1 sm:row-start-2 sm:w-full">
            {portrait ? (
              <Image
                src={portrait}
                alt={"portait of " + name}
                width={512}
                height={512}
                className="h-16 w-16 rounded object-cover object-top sm:aspect-square sm:h-auto sm:w-full sm:rounded-none"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded bg-slate-100 text-2xl font-bold text-slate-300 sm:aspect-square sm:h-auto sm:w-full sm:rounded-none sm:text-7xl">
                {name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-1 sm:col-span-2 sm:col-start-1 sm:row-start-1 sm:flex-row sm:items-center sm:gap-3">
            <h1 className="min-w-0 text-base font-semibold sm:truncate sm:text-xl">{name}</h1>
            <div className="hidden shrink-0 sm:block">
              <Pills kind={"archetype"} value={archetype}></Pills>
            </div>
          </div>
          <p className="hidden sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:line-clamp-3 sm:block sm:text-sm">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default HeroCard;
