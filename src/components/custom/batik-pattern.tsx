import { cn } from "@/lib/utils";

interface BatikPatternProps {
  className?: string;
  opacity?: number;
  variant?: "rencong" | "pinto-aceh" | "geometric";
}

/**
 * Acehnese cultural pattern overlay — geometric motif inspired by
 * traditional Aceh batik and rencong symbolism
 */
export function BatikPattern({
  className,
  opacity = 0.04,
  variant = "geometric",
}: BatikPatternProps) {
  // SVG patterns inspired by Acehnese geometric motifs
  const patterns = {
    geometric: `
      <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'>
        <path d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='currentColor' stroke-width='0.5'/>
        <path d='M30 10 L50 30 L30 50 L10 30 Z' fill='none' stroke='currentColor' stroke-width='0.5'/>
        <circle cx='30' cy='30' r='4' fill='none' stroke='currentColor' stroke-width='0.5'/>
      </svg>
    `,
    rencong: `
      <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'>
        <path d='M40 5 L75 40 L40 75 L5 40 Z' fill='none' stroke='currentColor' stroke-width='0.6'/>
        <path d='M40 15 L65 40 L40 65 L15 40 Z' fill='none' stroke='currentColor' stroke-width='0.4'/>
        <path d='M40 25 L55 40 L40 55 L25 40 Z' fill='none' stroke='currentColor' stroke-width='0.3'/>
        <circle cx='40' cy='40' r='3' fill='currentColor' opacity='0.3'/>
      </svg>
    `,
    "pinto-aceh": `
      <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
        <rect x='10' y='10' width='80' height='80' fill='none' stroke='currentColor' stroke-width='0.5' rx='4'/>
        <rect x='25' y='25' width='50' height='50' fill='none' stroke='currentColor' stroke-width='0.4' rx='2'/>
        <path d='M10 50 L90 50 M50 10 L50 90' stroke='currentColor' stroke-width='0.3'/>
        <circle cx='50' cy='50' r='8' fill='none' stroke='currentColor' stroke-width='0.4'/>
      </svg>
    `,
  };

  const svgEncoded = encodeURIComponent(patterns[variant].trim());

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgEncoded}")`,
        backgroundRepeat: "repeat",
        opacity,
        color: "var(--primary)",
      }}
      aria-hidden="true"
    />
  );
}
