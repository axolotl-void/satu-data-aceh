import { cn } from "@/lib/utils";

interface AnimatedGridProps {
  className?: string;
  fade?: boolean;
}

/**
 * Subtle animated grid background for cinematic depth
 * Fades toward edges for seamless blending
 */
export function AnimatedGrid({ className, fade = true }: AnimatedGridProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Grid lines */}
      <div className="animated-grid absolute inset-0" />

      {/* Radial fade mask */}
      {fade && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, var(--background) 100%)",
          }}
        />
      )}
    </div>
  );
}
