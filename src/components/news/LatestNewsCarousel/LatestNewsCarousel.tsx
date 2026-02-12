"use client";

import { Card, Carousel, Skeleton } from "@/components/ui";
import { useSearchArticlesQuery } from "@/lib/api/guardianApi";
import { ROUTES } from "@/lib/constants/navigation";
import type { GuardianArticle } from "@/lib/schemas/guardianArticle";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import classes from "./LatestNewsCarousel.module.scss";

const CAROUSEL_ITEM_WIDTH = 280;
const CAROUSEL_GAP = 16;
const SKELETON_SLOT_KEYS = ["a", "b", "c", "d", "e"] as const;

function getDateRange(): { "from-date": string; "to-date": string } {
  const today = new Date();
  const from = subDays(today, 7);
  return {
    "from-date": format(from, "yyyy-MM-dd"),
    "to-date": format(today, "yyyy-MM-dd"),
  };
}

interface LatestNewsCarouselProps {
  /** Optional class for the section (e.g. transparent background when embedded in hero). */
  className?: string;
}

export default function LatestNewsCarousel({ className }: LatestNewsCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const { "from-date": fromDate, "to-date": toDate } = getDateRange();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, isError } = useSearchArticlesQuery(
    {
      "from-date": fromDate,
      "to-date": toDate,
      "order-by": "newest",
      page: 1,
    },
    { skip: !mounted }
  );

  const results = data?.results ?? [];

  if (!mounted || isLoading) {
    return (
      <section className={cn(classes.section, className)} aria-label="Latest news loading">
        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Latest news</h2>
          <span className={classes.skeletonViewAllPlaceholder} aria-hidden>
            View all
          </span>
        </div>
        <div className={classes.carouselSkeleton}>
          <div className={classes.carouselSkeletonViewport}>
            <div className={classes.carouselSkeletonRow}>
              {SKELETON_SLOT_KEYS.map((key) => (
                <div key={`skeleton-${key}`} className={classes.carouselSkeletonSlot}>
                  <Skeleton variant="card" className={classes.skeletonCard} />
                </div>
              ))}
            </div>
          </div>
          <div className={classes.carouselSkeletonControls}>
            <Skeleton variant="button-icon-sm" />
            <Skeleton variant="button-icon-sm" />
          </div>
        </div>
      </section>
    );
  }

  if (isError || results.length === 0) {
    return (
      <section className={cn(classes.section, className)}>
        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>Latest news</h2>
        </div>
        <p className={classes.empty}>
          No recent articles right now.{" "}
          <Link href={ROUTES.news} className={classes.link}>
            Search by date
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className={cn(classes.section, className)} aria-label="Latest news">
      <div className={classes.sectionHeader}>
        <h2 className={classes.sectionTitle}>Latest news</h2>
        <Link href={ROUTES.news} className={classes.viewAll}>
          View all
        </Link>
      </div>
      <div className={classes.carouselWrapper}>
        <Carousel<GuardianArticle>
          items={results}
          itemWidth={CAROUSEL_ITEM_WIDTH}
          gap={CAROUSEL_GAP}
          ariaLabel="Latest Guardian articles"
          prevLabel="Previous article"
          nextLabel="Next article"
          getItemKey={(item) => item.id}
          renderItem={(item) => (
            <Card variant="outlined" padding="md" className={classes.carouselCard}>
              <a
                href={item.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.cardLink}
              >
                <h3 className={classes.cardTitle}>{item.fields?.headline ?? item.webTitle}</h3>
                <p className={classes.cardMeta}>
                  {format(new Date(item.webPublicationDate), "MMM d, yyyy")}
                  {item.sectionName ? ` · ${item.sectionName}` : ""}
                </p>
                {item.fields?.trailText && (
                  <p className={classes.cardSnippet}>{item.fields.trailText}</p>
                )}
              </a>
            </Card>
          )}
        />
      </div>
    </section>
  );
}

LatestNewsCarousel.displayName = "LatestNewsCarousel";
