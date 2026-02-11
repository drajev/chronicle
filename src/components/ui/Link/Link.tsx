import NextLink from "next/link";
import classes from "./Link.module.scss";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "default" | "primary" | "underline";
  external?: boolean;
}

const variantClassMap = {
  default: null,
  primary: classes.primary,
  underline: classes.underline,
} as const;

const Link = ({
  href,
  variant = "default",
  external = false,
  className,
  children,
  ...props
}: LinkProps) => {
  const variantClass = variantClassMap[variant];
  const linkClasses = cn(classes.root, variantClass, className);

  if (external) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClasses} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
