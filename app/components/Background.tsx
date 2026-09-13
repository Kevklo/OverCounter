export const Background = () => {
  return (
    <div
      aria-hidden
      className="mesh-base pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-1/2 h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2 rotate-45">
        <div className="mesh-bg absolute inset-0" />
      </div>

      <div className="glow-pulse absolute left-1/2 top-0 h-[70vh] w-[120vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-orange-400/35 blur-[120px]" />
      <div className="glow-pulse absolute bottom-0 left-1/4 h-[60vh] w-[70vw] rounded-full bg-amber-500/25 blur-[120px]" />

      <div className="mesh-vignette absolute inset-0" />
    </div>
  );
};

export default Background;
