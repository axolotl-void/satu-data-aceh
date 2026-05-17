import { cn } from "@/lib/utils";
import { CinematicGlow } from "./cinematic-glow";
import { AnimatedGrid } from "./animated-grid";
import { BatikPattern } from "./batik-pattern";

interface HeroOverlayProps {
  className?: string;
  showGrid?: boolean;
  showBatik?: boolean;
  showGlows?: boolean;
}

/**
 * Composite hero background overlay combining:
 * - Animated grid
 * - Acehnese batik pattern
 * - Cinematic ambient glows
 */
export function HeroOverlay({
  className,
  showGrid = true,
  showBatik = true,
  showGlows = true,
}: HeroOverlayProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Gradient base */}
      <div className="bg-gradient-hero absolute inset-0" />

      {/* Grid */}
      {showGrid && <AnimatedGrid />}

      {/* Batik cultural pattern */}
      {showBatik && <BatikPattern opacity={0.035} variant="rencong" />}

      {/* Ambient glows */}
      {showGlows && (
        <>
          <CinematicGlow
            color="primary"
            size="xl"
            intensity="low"
            className="-top-40 left-1/4 -translate-x-1/2"
          />
          <CinematicGlow
            color="accent"
            size="lg"
            intensity="low"
            className="bottom-0 right-1/4 translate-x-1/2"
          />
        </>
      )}
    </div>
  );
}
