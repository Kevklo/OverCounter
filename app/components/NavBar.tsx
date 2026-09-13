import Link from "next/link";
import Logo from "@/app/components/Logo";

const NavBar = () => {
  return (
    <nav className="flex flex-col items-center gap-2 bg-orange-500 px-4 py-3 md:flex-row md:justify-between mb-5">
      <Link href="/landing" className="shrink-0">
        <Logo size="sm" />
      </Link>
      <ul className="flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-1 md:gap-12">
        <li>
          <Link href="/heroesList">Heroes</Link>
        </li>
        <li>Team Counters</li>
        <li>Synergies</li>
      </ul>
    </nav>
  );
};

export default NavBar;
