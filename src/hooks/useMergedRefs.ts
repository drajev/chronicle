import {
  type Ref,
  type RefCallback,
  useCallback,
} from "react";

type PossibleRef<T> = Ref<T> | undefined;

const assignRef = <T>(ref: PossibleRef<T>, value: T) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && typeof ref === "object" && "current" in ref) {
    (ref as { current: T }).current = value;
  }
};

const mergeRefs = <T>(...refs: PossibleRef<T>[]) => {
  return (node: T) => {
    for (const ref of refs) {
      if (ref) {
        assignRef(ref, node);
      }
    }
  };
};

export const useMergedRefs = <T>(...refs: PossibleRef<T>[]) => {
  return useCallback(mergeRefs(...refs), [...refs]) as RefCallback<T>;
};
