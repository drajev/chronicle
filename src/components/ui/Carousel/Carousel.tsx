"use client";

import Button from "@/components/ui/Button/Button";
import { cn } from "@/lib/utils";
import { type ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import classes from "./Carousel.module.scss";

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth: number;
  getItemKey?: (item: T, index: number) => string | number;
  ariaLabel?: string;
  visibleCount?: number;
  gap?: number;
  transitionMs?: number;
  className?: string;
  viewportClassName?: string;
  prevLabel?: string;
  nextLabel?: string;
}

const DEFAULT_GAP = 16;
const DEFAULT_TRANSITION_MS = 300;

const Carousel = <T,>({
  items,
  renderItem,
  itemWidth,
  getItemKey,
  ariaLabel = "Carousel",
  gap = DEFAULT_GAP,
  transitionMs = DEFAULT_TRANSITION_MS,
  className,
  viewportClassName,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
}: CarouselProps<T>) => {
  const n = items.length;
  if (n === 0) return null;

  const slotWidth = itemWidth + gap;
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(n);
  const disableTransitionRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(n);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionResetKey, setTransitionResetKey] = useState(0);
  const baseId = useId();

  currentIndexRef.current = currentIndex;

  const duplicatedItems: T[] = useMemo(() => [...items, ...items, ...items], [items]);

  const slotKeys = useMemo(
    () =>
      Array.from(
        { length: 3 * n },
        (_, idx) => `carousel-${baseId}-${idx % n}-copy-${Math.floor(idx / n)}`
      ),
    [n, baseId]
  );
  const offsetPx = -currentIndex * slotWidth;

  const jumpTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isTransitioning]);

  const goNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== trackRef.current || e.propertyName !== "transform") return;
      const idx = currentIndexRef.current;
      if (idx === 0) {
        disableTransitionRef.current = true;
        jumpTo(n);
        setTransitionResetKey((k) => k + 1);
      } else if (idx === 2 * n) {
        disableTransitionRef.current = true;
        jumpTo(n);
        setTransitionResetKey((k) => k + 1);
      }
      setIsTransitioning(false);
    },
    [jumpTo, n]
  );

  useEffect(() => {
    if (transitionResetKey === 0 || !disableTransitionRef.current) return;
    const id = requestAnimationFrame(() => {
      disableTransitionRef.current = false;
    });
    return () => cancelAnimationFrame(id);
  }, [transitionResetKey]);

  const noTransition = disableTransitionRef.current;

  return (
    <section
      className={cn(classes.wrapper, className)}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div className={cn(classes.viewport, viewportClassName)}>
        <div
          ref={trackRef}
          className={classes.track}
          style={{
            transform: `translateX(${offsetPx}px)`,
            transition: noTransition ? "none" : `transform ${transitionMs}ms ease-out`,
            gap: `${gap}px`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {duplicatedItems.map((item, i) => {
            const originalIndex = i % n;
            const copyIndex = Math.floor(i / n);
            const key = getItemKey
              ? `${getItemKey(item, originalIndex)}-copy-${copyIndex}`
              : slotKeys[i];
            const isCurrent = i === currentIndex;
            return (
              <div
                key={key}
                className={classes.slot}
                style={{ width: itemWidth, minWidth: itemWidth }}
                aria-current={isCurrent ? "true" : undefined}
                aria-hidden={!isCurrent}
              >
                {renderItem(item, originalIndex)}
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.controls} aria-label="Carousel controls">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={goPrev}
          aria-label={prevLabel}
          disabled={isTransitioning}
          icon={<HiOutlineChevronLeft />}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={goNext}
          aria-label={nextLabel}
          disabled={isTransitioning}
          icon={<HiOutlineChevronRight />}
          iconPosition="right"
        />
      </div>
    </section>
  );
};

Carousel.displayName = "Carousel";

export default Carousel;
