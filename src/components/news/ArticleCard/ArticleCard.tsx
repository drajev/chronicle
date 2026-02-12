"use client";

import type { GuardianArticle } from "@/lib/schemas/guardianArticle";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import classes from "./ArticleCard.module.scss";

export interface ArticleCardProps {
  article: GuardianArticle;
  className?: string;
}

const ArticleCard = ({ article, className }: ArticleCardProps) => {
  const date = new Date(article.webPublicationDate);
  const title = article.fields?.headline ?? article.webTitle;
  const byline = article.fields?.byline ?? null;
  const snippet = article.fields?.trailText ?? null;

  return (
    <a
      href={article.webUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(classes.card, className)}
    >
      <h3 className={classes.title}>{title}</h3>
      <p className={classes.meta}>
        {format(date, "MMM d, yyyy")}
        {byline ? ` · ${byline}` : ""}
        {article.sectionName ? ` · ${article.sectionName}` : ""}
      </p>
      {snippet && <p className={classes.snippet}>{snippet}</p>}
    </a>
  );
};

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
