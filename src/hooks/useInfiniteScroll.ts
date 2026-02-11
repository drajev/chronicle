import { useRef, useEffect } from "react";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore?: boolean;
}

export function useInfiniteScroll({
  onLoadMore,
  isLoading,
  hasMore = true,
}: UseInfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const handleScroll = () => {
      if (!loaderRef.current || isLoading) return;

      const loaderRect = loaderRef.current.getBoundingClientRect();
      const isLoaderVisible = loaderRect.top <= window.innerHeight;

      if (isLoaderVisible) {
        onLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onLoadMore, isLoading, hasMore]);

  return loaderRef;
}
