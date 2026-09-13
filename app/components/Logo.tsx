type LogoProps = {
  size?: "sm" | "md" | "lg";
};

const SIZES = {
  sm: "text-xl",
  md: "text-4xl",
  lg: "text-7xl",
} as const;

export const Logo = ({ size = "md" }: LogoProps) => {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap font-bold tracking-tight select-none ${SIZES[size]}`}
    >
      <span>
        <span className="logo-text logo-text-over">Over</span>
        <span className="logo-text logo-text-rest">Countered</span>
      </span>
    </span>
  );
};

export default Logo;
