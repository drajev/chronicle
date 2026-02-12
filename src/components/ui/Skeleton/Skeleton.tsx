import { cn } from "@/lib/utils";
import classes from "./Skeleton.module.scss";

export type SkeletonVariant =
  | "text"
  | "block"
  | "card"
  | "button-sm"
  | "button-icon-sm"
  | "list-line";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Variant: layout (text, block) or component-matching (card, button-sm, button-icon-sm, list-line).
   */
  variant?: SkeletonVariant;
  /**
   * Typography for variant="text" (line height).
   */
  typography?: "body1" | "body2" | "body3" | "subtitle1" | "subtitle2" | "subtitle3" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  width?: string | number;
  height?: string | number;
  fullWidth?: boolean;
}

const VARIANT_CLASS_MAP: Partial<Record<SkeletonVariant, string>> = {
  text: classes.text,
  block: classes.block,
  card: classes.card,
  "button-sm": classes.buttonSm,
  "button-icon-sm": classes.buttonIconSm,
  "list-line": classes.listLine,
};

const Skeleton = ({
  className,
  variant = "block",
  typography,
  width,
  height,
  fullWidth,
  style,
  ...props
}: SkeletonProps) => {
  const variantClass = VARIANT_CLASS_MAP[variant] ?? classes.block;
  const typographyClass = variant === "text" && typography ? classes[typography as keyof typeof classes] : undefined;

  const resolvedStyle = {
    ...style,
    ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height !== undefined && {
      height: typeof height === "number" ? `${height}px` : height,
    }),
    ...(fullWidth !== undefined && fullWidth && { width: "100%" }),
  };

  return (
    <div
      className={cn(classes.root, variantClass, typographyClass, className)}
      style={resolvedStyle}
      aria-hidden
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";

export default Skeleton;
