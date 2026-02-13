"use client";

import {
  VirtualScroll,
  type VirtualScrollProps,
} from "@/components/ui/VirtualScroll/VirtualScroll";
import { Link, Skeleton, Spinner } from "@/components/ui";
import { useIntersectionObserver } from "@/hooks";
import { ROUTES } from "@/lib/constants/navigation";
import { useLazySearchArticlesQuery } from "@/lib/api/guardianApi";
import type { GuardianArticle } from "@/lib/schemas/guardianArticle";
import { getDefaultDateRange } from "@/lib/utils";
import { format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import classes from "./HeadlinesList.module.scss";

function HeadlinesVirtualScroll(props: VirtualScrollProps<GuardianArticle>) {
  return <VirtualScroll<GuardianArticle> {...props} />;
}

const PAGE_SIZE = 10;
const ROW_ESTIMATE = 56;
const SENTINEL_HEIGHT = 24;
const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;

export interface HeadlinesListProps {
  className?: string;
}

function HeadlineRow({
  item,
  measureRef,
}: {
  item: GuardianArticle;
  measureRef: (node: Element | null) => void;
}) {
  const title = item.fields?.headline ?? item.webTitle;
  const date = format(new Date(item.webPublicationDate), "MMM d");

  return (
    <div ref={measureRef} className={classes.row}>
      <a
        href={item.webUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.row__link}
      >
        <span className={classes.row__title}>{title}</span>
        <span className={classes.row__meta}>
          {date}
          {item.sectionName ? ` · ${item.sectionName}` : ""}
        </span>
      </a>
    </div>
  );
}

const SCROLL_VIEWPORT_SELECTOR = "[data-radix-scroll-area-viewport]";

export default function HeadlinesList({ className }: HeadlinesListProps) {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<GuardianArticle[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [scrollRoot, setScrollRoot] = useState<Element | null>(null);
  const initialLoadDoneRef = useRef(false);
  const nextPageRef = useRef(1);
  const totalPagesRef = useRef(1);
  const isFetchingRef = useRef(false);
  const itemsLengthRef = useRef(0);
  itemsLengthRef.current = items.length;

  const { "from-date": fromDate, "to-date": toDate } = getDefaultDateRange();

  const [trigger, { isLoading: isInitialLoading, isFetching }] = useLazySearchArticlesQuery();

  nextPageRef.current = nextPage;
  totalPagesRef.current = totalPages;
  isFetchingRef.current = isFetching;

  const mergePage = useCallback((result: { results: GuardianArticle[]; pages: number; currentPage: number }) => {
    setItems((prev) =>
      prev.length === 0 ? result.results : [...prev, ...result.results]
    );
    setTotalPages(result.pages);
    setNextPage(result.currentPage + 1);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || initialLoadDoneRef.current) return;
    initialLoadDoneRef.current = true;
    trigger({
      "from-date": fromDate,
      "to-date": toDate,
      "order-by": "newest",
      page: 1,
      pageSize: PAGE_SIZE,
    }).then((result) => {
      if (result.data) mergePage(result.data);
    });
  }, [mounted, fromDate, toDate, trigger, mergePage]);

  useEffect(() => {
    if (items.length > 0 && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(SCROLL_VIEWPORT_SELECTOR);
      setScrollRoot(viewport as Element | null);
    }
  }, [items.length]);

  const loadMore = useCallback(() => {
    if (itemsLengthRef.current === 0) return;
    const next = nextPageRef.current;
    const total = totalPagesRef.current;
    if (next > total || isFetchingRef.current) return;
    trigger({
      "from-date": fromDate,
      "to-date": toDate,
      "order-by": "newest",
      page: next,
      pageSize: PAGE_SIZE,
    }).then((result) => {
      if (result.data) mergePage(result.data);
    });
  }, [fromDate, toDate, trigger, mergePage]);

  useIntersectionObserver(
    sentinelRef,
    { root: scrollRoot, rootMargin: "100px 0px", threshold: 0 },
    loadMore
  );

  const hasMore = nextPage <= totalPages && items.length > 0;

  const renderHeadlineItem = useCallback<VirtualScrollProps<GuardianArticle>["renderItem"]>(
    ({ item, measureRef }) => <HeadlineRow item={item} measureRef={measureRef} />,
    []
  );

  if (!mounted || isInitialLoading) {
    return (
      <section className={cn(classes.section, className)} aria-label="Headlines loading">
        <div className={classes.header}>
          <h2 className={classes.title}>Headlines</h2>
          <span className={classes.skeletonLink} aria-hidden>
            View all
          </span>
        </div>
        <div className={classes.skeletonList}>
          {SKELETON_KEYS.map((key) => (
            <Skeleton key={key} variant="text" className={classes.skeletonRow} />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0 && !isFetching) {
    return (
      <section className={cn(classes.section, className)}>
        <div className={classes.header}>
          <h2 className={classes.title}>Headlines</h2>
        </div>
        <p className={classes.empty}>
          No headlines right now.{" "}
          <Link href={ROUTES.news} className={classes.link}>
            Browse news
          </Link>
        </p>
      </section>
    );
  }

  const sentinel = (
    <div
      ref={sentinelRef}
      className={classes.sentinel}
      style={{ minHeight: SENTINEL_HEIGHT }}
      role="presentation"
      aria-hidden
    />
  );

  return (
    <section className={cn(classes.section, className)} aria-label="Headlines">
      <div className={classes.header}>
        <h2 className={classes.title}>Headlines</h2>
        <Link href={ROUTES.news} className={classes.viewAll}>
          View all
        </Link>
      </div>
      <div className={classes.scrollWrapper}>
        <HeadlinesVirtualScroll
          scrollAreaRef={scrollAreaRef}
          items={items}
          estimateSize={ROW_ESTIMATE}
          overscan={5}
          getItemKey={(_, item) => item.id}
          className={classes.virtualScroll}
          footer={sentinel}
          footerHeight={SENTINEL_HEIGHT}
          renderItem={renderHeadlineItem}
        />
      </div>
      <div className={classes.loadingSlot} aria-hidden>
        {hasMore && isFetching ? (
          <div className={classes.loadingMore} aria-live="polite">
            <Spinner size="sm" aria-hidden />
          </div>
        ) : null}
      </div>
    </section>
  );
}

HeadlinesList.displayName = "HeadlinesList";
