"use client";

import { ArticleList } from "@/components/news/ArticleList";
import { Button, Input } from "@/components/ui";
import Spinner from "@/components/ui/Spinner/Spinner";
import { useSearchArticlesQuery } from "@/lib/api/guardianApi";
import type { ArticleSearchParams } from "@/lib/api/guardianApi";
import { parse } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import classes from "./page.module.scss";

const DATE_FORMAT = "yyyy-MM-dd";

function parseDateParam(value: string | null): string | undefined {
  if (!value) return undefined;
  const parsed = parse(value, DATE_FORMAT, new Date());
  if (Number.isNaN(parsed.getTime())) return undefined;
  return value;
}

export default function NewsClient() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  const date = parseDateParam(searchParams.get("date"));
  const endDate = parseDateParam(searchParams.get("end_date"));
  const q = searchParams.get("q") ?? undefined;
  const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10));

  const queryArg: ArticleSearchParams = {
    "order-by": "newest",
    page,
  };
  if (date) {
    queryArg["from-date"] = date;
    queryArg["to-date"] = endDate ?? date;
  }
  if (q?.trim()) queryArg.q = q.trim();

  const { data, isLoading, isError, error } = useSearchArticlesQuery(queryArg, {
    skip: !date || !mounted,
  });

  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const dateInput = form.elements.namedItem("date") as HTMLInputElement;
      const endInput = form.elements.namedItem("end_date") as HTMLInputElement | null;
      const qInput = form.elements.namedItem("q") as HTMLInputElement | null;
      const dateVal = dateInput?.value?.trim() || null;
      const endVal = endInput?.value?.trim() || null;
      const qVal = qInput?.value?.trim() || null;
      setParams({
        date: dateVal,
        end_date: endVal,
        q: qVal,
      });
    },
    [setParams]
  );

  const setPage = useCallback(
    (nextPage: number) => {
      const next = new URLSearchParams(searchParams.toString());
      if (nextPage <= 1) next.delete("page");
      else next.set("page", String(nextPage));
      router.push(`${pathname}?${next.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const totalHits = data?.total ?? 0;
  const totalPages = data?.pages ?? 0;
  const currentPage = data?.currentPage ?? page;
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return (
    <div className={classes.news}>
      <h1 className={classes.news__title}>News</h1>
      <p className={classes.news__description}>
        Search The Guardian articles by date. Enter a date (and optional end date or keyword) and
        click Search.
      </p>

      <form
        key={[date, endDate, q].filter(Boolean).join("-") || "empty"}
        className={classes.searchForm}
        onSubmit={handleSubmit}
        aria-label="Search news by date"
      >
        <div className={classes.searchForm__field}>
          <label className={classes.searchForm__label} htmlFor="news-date">
            Date
          </label>
          <Input
            id="news-date"
            name="date"
            type="date"
            defaultValue={date}
            required
            aria-required
          />
        </div>
        <div className={classes.searchForm__field}>
          <label className={classes.searchForm__label} htmlFor="news-end-date">
            End date (optional)
          </label>
          <Input
            id="news-end-date"
            name="end_date"
            type="date"
            defaultValue={endDate ?? undefined}
          />
        </div>
        <div className={`${classes.searchForm__field} ${classes.searchForm__fieldFull}`}>
          <label className={classes.searchForm__label} htmlFor="news-q">
            Keyword (optional)
          </label>
          <Input
            id="news-q"
            name="q"
            type="search"
            placeholder="Search in headline, byline, body…"
            defaultValue={q}
            autoComplete="off"
          />
        </div>
        <div className={classes.searchForm__actions}>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
      </form>

      {!date && (
        <p className={classes.emptyState}>Enter a date above to load articles from The Guardian.</p>
      )}

      {date && isLoading && (
        <div className={classes.emptyState} aria-live="polite">
          <Spinner /> Loading…
        </div>
      )}

      {date && isError && (
        <div className={classes.errorState} role="alert">
          {error && "status" in error && error.status === 401
            ? "Invalid or missing API key. Set NEXT_PUBLIC_GUARDIAN_API_KEY in your environment."
            : "Failed to load articles. Try again later."}
        </div>
      )}

      {date && data && !isLoading && !isError && (
        <>
          <p className={classes.resultsMeta}>
            {totalHits.toLocaleString()} result{totalHits !== 1 ? "s" : ""}
            {totalPages >= 1 && ` · Page ${currentPage} of ${totalPages}`}
          </p>
          <ArticleList results={data.results} className={classes.articleList} />

          {totalPages > 1 && (
            <nav className={classes.pagination} aria-label="Pagination">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={!hasPrev}
                onClick={() => setPage(currentPage - 1)}
              >
                Previous
              </Button>
              <span className={classes.pagination__info}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={!hasNext}
                onClick={() => setPage(currentPage + 1)}
              >
                Next
              </Button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
