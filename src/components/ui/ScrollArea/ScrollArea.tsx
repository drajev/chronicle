import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { ComponentPropsWithoutRef, ComponentRef, Ref } from "react";
import classes from "./ScrollArea.module.scss";

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.Root>>;
  viewportClassName?: string;
}

const ScrollArea = ({ className, children, viewportClassName, ref, ...props }: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    type="always"
    className={cn(classes.root, className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={cn(classes.viewport, viewportClassName)}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

ScrollArea.displayName = "ScrollArea";

export interface ScrollBarProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
  ref?: Ref<ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>>;
}

const ScrollBar = ({ className, orientation = "vertical", ref, ...props }: ScrollBarProps) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      classes.scrollbar,
      orientation === "vertical" && classes.vertical,
      orientation === "horizontal" && classes.horizontal,
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={classes.thumb} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
