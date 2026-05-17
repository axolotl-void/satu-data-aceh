import { cn } from "@/lib/utils";

interface CinematicGlowProps {
  color?: "primary" | "accent" | "custom";
  customColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  intensity?: "low" | "medium" | "high";
}

const sizeMap = {
  sm: "h-32 w-32",
  md: "h-64 w-64",
  lg: "h-96 w-96",
  xl: "h-[600px] w-[600px]",
};

const intensityMap = {
  low: "opacity-20",
  medium: "opacity-40",
  high: "opacity-60",
};

/**
 * Cinematic ambient glow orb for atmospheric depth
 */
export function CinematicGlow({
  color = "primary",
  customColor,
  size = "lg",
  intensity = "medium",
  className,
}: CinematicGlowProps) {
  const colorMap = {
    primary: "bg-primary",
    accent: "bg-accent",
    custom: "",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        sizeMap[size],
        intensityMap[intensity],
        colorMap[color],
        className
      )}
      style={customColor ? { backgroundColor: customColor } : undefined}
      aria-hidden="true"
    />
  );
}
