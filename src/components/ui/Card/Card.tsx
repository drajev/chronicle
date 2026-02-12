import classes from "./Card.module.scss";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClassMap = {
  default: classes.default,
  outlined: classes.outlined,
  elevated: classes.elevated,
} as const;

const paddingClassMap = {
  none: classes.paddingNone,
  sm: classes.paddingSm,
  md: classes.paddingMd,
  lg: classes.paddingLg,
} as const;

const Card = ({
  children,
  variant = "default",
  padding = "md",
  className,
  ref,
  ...props
}: CardProps) => {
  const cardClasses = cn(
    classes.root,
    variantClassMap[variant],
    paddingClassMap[padding],
    className,
  );

  return (
    <div ref={ref} className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.displayName = "Card";

export default Card;
