import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
}

/**
 * Reusable section title with eyebrow, title, and subtitle
 */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionTitleProps) {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={cn("flex flex-col gap-3", alignClass, className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-6 bg-primary" />
          {eyebrow}
          <span className="h-px w-6 bg-primary" />
        </span>
      )}

      <h2
        className={cn(
          "text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl",
          titleClassName
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
