import Link from "next/link";
import Logo from "@/app/components/Logo";

const NavBar = () => {
  return (
    <nav
      aria-label="Main"
      className="mb-5 flex flex-col items-center gap-2 border-b border-orange-500/40 bg-[var(--nav-bg)] px-4 py-3 text-[var(--nav-text)] sm:flex-row sm:justify-between"
    >
      <Link href="/landing" className="shrink-0">
        <Logo size="sm" />
      </Link>
      <ul className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-bold sm:gap-10 sm:text-base">
        <li>
          <Link
            href="/heroesList"
            className="rounded-sm transition-colors hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
          >
            Heroes
          </Link>
        </li>
        <li>
          <Link
            href="/counters"
            className="rounded-sm transition-colors hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400"
          >
            Team Counters
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
