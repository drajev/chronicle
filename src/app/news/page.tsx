import { Spinner } from "@/components/ui";
import type { Metadata } from "next";
import { Suspense } from "react";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "News | Chronicle",
  description:
    "Search and filter The Guardian articles by date and topic (business, sport, technology, and more).",
};

function NewsFallback() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Spinner />
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<NewsFallback />}>
      <NewsClient />
    </Suspense>
  );
}
