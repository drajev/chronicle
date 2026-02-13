import { cn } from "@/lib/utils";
import classes from "./Spinner.module.scss";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

const sizeClassMap = {
  sm: classes.sm,
  md: classes.md,
  lg: classes.lg,
} as const;

const Spinner = ({
  size = "md",
  className,
  "aria-label": ariaLabel = "Loading",
  ...props
}: SpinnerProps) => {
  return (
    <span
      className={cn(classes.root, sizeClassMap[size], className)}
      role="status"
      aria-label={ariaLabel}
      {...props}
    />
  );
};

Spinner.displayName = "Spinner";

export default Spinner;
