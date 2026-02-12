"use client";

import { ArticleCard } from "@/components/news/ArticleCard";
import type { GuardianArticle } from "@/lib/schemas/guardianArticle";
import classes from "./ArticleList.module.scss";

export interface ArticleListProps {
  results: GuardianArticle[];
  emptyMessage?: string;
  className?: string;
}

const ArticleList = ({
  results,
  emptyMessage = "No articles found.",
  className,
}: ArticleListProps) => {
  if (results.length === 0) {
    return <p className={classes.empty}>{emptyMessage}</p>;
  }

  return (
    <ul className={className}>
      {results.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
};

ArticleList.displayName = "ArticleList";

export default ArticleList;
