import Link from "next/link";
import Logo from "@/app/components/Logo";

const NavBar = () => {
  return (
    <nav className="mb-5 flex flex-col items-center gap-2 border-b border-orange-500/40 bg-[var(--nav-bg)] px-4 py-3 text-[var(--nav-text)] md:flex-row md:justify-between">
      <Link href="/landing" className="shrink-0">
        <Logo size="sm" />
      </Link>
      <ul className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-1 font-bold md:gap-12">
        <li>
          <Link href="/heroesList" className="transition-colors hover:text-orange-400">
            Heroes
          </Link>
        </li>
        <li>
          <Link href="/counters" className="transition-colors hover:text-orange-400">
            Team Counters
          </Link>
        </li>
        <li>Synergies</li>
      </ul>
    </nav>
  );
};

export default NavBar;
