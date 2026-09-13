import { archetypeColors, pillColor, roleColors } from "@/app/components/pillColors";

type PillsProps = {
  kind: "role" | "archetype";
  value: string;
};

const Pills = ({ kind, value }: PillsProps) => {
  const colors = kind === "role" ? roleColors : archetypeColors;
  const { text, background } = pillColor(colors, value);

  return (
    <span
      className="rounded-full px-[0.8em] py-[0.2em] text-[0.625em] font-medium uppercase tracking-wide"
      style={{ backgroundColor: background, color: text }}
    >
      {value}
    </span>
  );
};

export default Pills;
