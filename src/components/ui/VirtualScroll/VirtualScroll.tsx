"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/ScrollArea/ScrollArea";
import { cn } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import { type ReactNode, useEffect, useImperativeHandle, useRef, useState } from "react";
import classes from "./VirtualScroll.module.scss";

const VIEWPORT_SELECTOR = "[data-radix-scroll-area-viewport]";

export interface VirtualScrollRef {
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void;
}

export interface VirtualScrollProps<T> {
  items: T[];
  renderItem: (params: {
    offset: number;
    index: number;
    measureRef: (node: Element | null) => void;
    item: T;
  }) => ReactNode;
  estimateSize?: number;
  overscan?: number;
  getItemKey?: (index: number, item: T) => string | number;
  className?: string;
  contentClassName?: string;
  scrollAreaRef?: React.RefObject<HTMLDivElement | null>;
  ref?: React.Ref<VirtualScrollRef>;
}

const VirtualScrollInner = <T,>({
  items,
  renderItem,
  estimateSize = 80,
  overscan = 10,
  getItemKey,
  className,
  contentClassName,
  scrollAreaRef: scrollAreaRefProp,
  ref,
}: VirtualScrollProps<T>) => {
  const localRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = scrollAreaRefProp ?? localRef;
  const [scrollableNode, setScrollableNode] = useState<HTMLElement | null>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollableNode,
    estimateSize: () => estimateSize,
    overscan,
    getItemKey: getItemKey ? (index) => String(getItemKey(index, items[index] as T)) : undefined,
  });

  useImperativeHandle(
    ref,
    () => ({
      scrollToIndex(index: number, behavior: ScrollBehavior = "instant") {
        const viewport = scrollAreaRef.current?.querySelector(
          VIEWPORT_SELECTOR
        ) as HTMLElement | null;
        const offsetInfo = virtualizer.getOffsetForIndex(index);
        const offset = offsetInfo?.[0] ?? 0;
        if (viewport) {
          viewport.scrollTo({ top: offset, behavior });
        }
      },
    }),
    [scrollAreaRef, virtualizer]
  );

  useEffect(() => {
    if (scrollAreaRef?.current) {
      const viewport = scrollAreaRef.current.querySelector(VIEWPORT_SELECTOR);
      setScrollableNode(viewport as HTMLElement);
    }
  }, [scrollAreaRef]);

  useEffect(() => {
    if (scrollableNode) {
      virtualizer.measure();
    }
  }, [virtualizer, scrollableNode]);

  return (
    <ScrollArea ref={scrollAreaRef} className={cn(classes.container, className)}>
      <div className={cn(classes.track, contentClassName)}>
        <div
          className={classes.sizer}
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              className={classes.virtualRow}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              {renderItem({
                offset: virtualRow.start,
                index: virtualRow.index,
                measureRef: virtualizer.measureElement,
                item: items[virtualRow.index] as T,
              })}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

VirtualScrollInner.displayName = "VirtualScroll";

export { VirtualScrollInner as VirtualScroll };
