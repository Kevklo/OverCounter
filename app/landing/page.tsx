import Logo from "@/app/components/Logo";

const LandingPage = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <Logo size="lg" />
      <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        Read the matchup, build the counter team, and climb with the current
        meta.
      </p>
    </main>
  );
};

export default LandingPage;
