import {
  type Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMergedRefs } from "./useMergedRefs";

export interface UseIntersectionObserverOptions<T extends HTMLElement = HTMLElement> {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  /** When true, isIntersecting stays true after first intersection and observer disconnects. */
  triggerOnce?: boolean;
  /** Optional ref to merge: the observed element is assigned to both the hook's ref and this ref. */
  ref?: Ref<T | null>;
}

/**
 * Observes element intersection with viewport.
 * Use for lazy loading, scroll-triggered content, or animations.
 * Pass options.ref when you need both observation and your own ref on the same element.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions<T> = {}
): { ref: Ref<T | null>; isIntersecting: boolean } {
  const { threshold = 0, rootMargin = "0px", root = null, triggerOnce = false, ref: refProp } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const hasIntersectedRef = useRef(false);
  const elementRef = useRef<T>(null);

  const handleIntersect = useCallback((entry: IntersectionObserverEntry) => {
    const intersecting = entry.isIntersecting;
    setIsIntersecting(intersecting);
    if (intersecting) hasIntersectedRef.current = true;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || (triggerOnce && hasIntersectedRef.current)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        handleIntersect(entry);
        if (entry.isIntersecting && triggerOnce) observer.disconnect();
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, root, triggerOnce, handleIntersect]);

  const ref = useMergedRefs<T | null>(elementRef, refProp);

  return { ref, isIntersecting };
}
