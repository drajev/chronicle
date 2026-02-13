"use client";

import { ArticleCard } from "@/components/news";
import { Carousel, Link, Skeleton } from "@/components/ui";
import { useSearchArticlesQuery } from "@/lib/api/guardianApi";
import { ROUTES } from "@/lib/constants/navigation";
import { getTopicById } from "@/lib/constants/topics";
import type { GuardianArticle } from "@/lib/schemas/guardianArticle";
import { getDefaultDateRange } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { TopicCategory } from "@/types";
import { useEffect, useState } from "react";
import classes from "./LatestNewsCarousel.module.scss";

const CAROUSEL_ITEM_WIDTH = 280;
const CAROUSEL_GAP = 16;
const SKELETON_SLOT_KEYS = ["a", "b", "c"] as const;

interface LatestNewsCarouselProps {
  className?: string;
  topicId?: TopicCategory;
}

export default function LatestNewsCarousel({ className, topicId }: LatestNewsCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const { "from-date": fromDate, "to-date": toDate } = getDefaultDateRange();
  const section = topicId ? getTopicById(topicId)?.section : undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading, isError } = useSearchArticlesQuery(
    {
      "from-date": fromDate,
      "to-date": toDate,
      "order-by": "newest",
      page: 1,
      ...(section && { section }),
    },
    { skip: !mounted }
  );

  const sectionLabel = topicId ? getTopicById(topicId)?.label : null;
  const title = sectionLabel ? `Latest in ${sectionLabel}` : "Featured";

  const results = data?.results ?? [];

  if (!mounted || isLoading) {
    return (
      <section className={cn(classes.section, className)} aria-label={`${title} loading`}>
        <div className={classes.sectionHeader}>
          <h2 className={classes.sectionTitle}>{title}</h2>
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
          <h2 className={classes.sectionTitle}>{title}</h2>
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
    <section className={cn(classes.section, className)} aria-label={title}>
      <div className={classes.sectionHeader}>
        <h2 className={classes.sectionTitle}>{title}</h2>
        <Link href={ROUTES.news} className={classes.viewAll}>
          View all
        </Link>
      </div>
      <div className={classes.carouselWrapper}>
        <Carousel<GuardianArticle>
          items={results}
          itemWidth={CAROUSEL_ITEM_WIDTH}
          gap={CAROUSEL_GAP}
          viewportClassName={classes.carouselViewport}
          ariaLabel="Latest Guardian articles"
          prevLabel="Previous article"
          nextLabel="Next article"
          getItemKey={(item) => item.id}
          renderItem={(item) => (
            <ArticleCard article={item} className={cn(classes.carouselCard, classes.cardLink)} />
          )}
        />
      </div>
    </section>
  );
}

LatestNewsCarousel.displayName = "LatestNewsCarousel";
