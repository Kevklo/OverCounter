export const Background = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--glow-orange)] blur-[120px]" />

      <div className="glow-pulse absolute left-1/2 top-0 h-[70vh] w-[120vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gray-400/35 blur-[120px]" />
      <div className="glow-pulse absolute bottom-0 left-1/4 h-[60vh] w-[70vw] rounded-full bg-[hsl(215_14%_34%/_0.25)] blur-[120px]" />
    </div>
  );
};

export default Background;
