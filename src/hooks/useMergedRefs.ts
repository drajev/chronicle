import { type Ref, type RefCallback, useCallback, useRef } from "react";

type PossibleRef<T> = Ref<T> | undefined;

function assignRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && typeof ref === "object" && "current" in ref) {
    (ref as { current: T }).current = value;
  }
}

/**
 * Returns a stable callback ref that assigns the node to all given refs.
 * Use when a single DOM node must be shared with multiple ref consumers
 * (e.g. intersection observer + parent ref, or measure ref + forwarded ref).
 */
export function useMergedRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  const refsRef = useRef(refs);
  refsRef.current = refs;
  return useCallback((node: T) => {
    for (const ref of refsRef.current) {
      if (ref) assignRef(ref, node);
    }
  }, []);
}
