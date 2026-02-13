import { type RefObject, useEffect, useRef } from "react";

function getRootEl(root: RefObject<Element | null> | Element | null | undefined): Element | null {
  if (root == null) return null;
  if (typeof root === "object" && "current" in root) return root.current;
  return root as Element;
}

export interface UseIntersectionObserverOptions {
  root?: RefObject<Element | null> | Element | null;
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver(
  targetRef: RefObject<Element | null>,
  options: UseIntersectionObserverOptions,
  onIntersect: () => void
): void {
  const { root = null, rootMargin = "0px", threshold = 0 } = options;
  const onIntersectRef = useRef(onIntersect);
  onIntersectRef.current = onIntersect;
  const rootEl = getRootEl(root);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    if (root != null && !rootEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) onIntersectRef.current();
      },
      { root: rootEl, rootMargin, threshold }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetRef, root, rootEl, rootMargin, threshold]);
}
