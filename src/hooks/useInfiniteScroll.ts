import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

export interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore?: boolean;
  /** Root margin for the sentinel observer (e.g. "100px" to load before fully visible). */
  rootMargin?: string;
}

/**
 * Infinite scroll using IntersectionObserver. Attach the returned ref to a sentinel
 * element at the bottom of the list; when it enters the viewport, onLoadMore is called.
 * onLoadMore does not need to be stable (stored in a ref internally).
 */
export function useInfiniteScroll({
  onLoadMore,
  isLoading,
  hasMore = true,
  rootMargin = "100px",
}: UseInfiniteScrollProps) {
  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0,
    rootMargin,
    triggerOnce: false,
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      onLoadMoreRef.current();
    }
  }, [isIntersecting, hasMore, isLoading]);

  return ref;
}
