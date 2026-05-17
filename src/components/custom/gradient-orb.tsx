import { cn } from "@/lib/utils";

interface GradientOrbProps {
  className?: string;
  variant?: "primary" | "accent" | "mixed";
}

/**
 * Decorative gradient orb for hero and section backgrounds
 */
export function GradientOrb({ className, variant = "mixed" }: GradientOrbProps) {
  const gradients = {
    primary: "from-primary/30 via-primary/10 to-transparent",
    accent: "from-accent/30 via-accent/10 to-transparent",
    mixed: "from-primary/20 via-accent/10 to-transparent",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-radial blur-2xl",
        gradients[variant],
        className
      )}
      aria-hidden="true"
    />
  );
}
