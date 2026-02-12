import Link from "next/link";
import Spinner from "@/components/ui/Spinner/Spinner";
import classes from "./Button.module.scss";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  className,
  href,
  icon,
  iconPosition = "left",
  ref,
  disabled,
  ...props
}: ButtonProps) => {
  const variantClass =
    variant === "primary"
      ? classes.primary
      : variant === "secondary"
        ? classes.secondary
        : variant === "ghost"
          ? classes.ghost
          : classes.danger;

  const sizeClass =
    size === "sm" ? classes.sm : size === "lg" ? classes.lg : classes.md;

  const buttonClasses = cn(
    classes.root,
    variantClass,
    sizeClass,
    isLoading && classes.loading,
    fullWidth && classes.fullWidth,
    !children && icon && classes.iconOnly,
    className,
  );

  const content = (
    <>
      {isLoading && (
        <Spinner size={size} className={classes.spinner} aria-label="Loading" />
      )}
      {icon && iconPosition === "left" && !isLoading && (
        <span className={classes.icon}>{icon}</span>
      )}
      {children && <span>{children}</span>}
      {icon && iconPosition === "right" && !isLoading && (
        <span className={classes.icon}>{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={buttonClasses}
      disabled={Boolean(disabled) || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
