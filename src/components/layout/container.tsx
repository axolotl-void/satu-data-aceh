import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types";

interface ContainerProps extends BaseComponentProps {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

/**
 * Reusable centered layout container with responsive padding
 */
export function Container({
  as: Tag = "div",
  size = "xl",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}
