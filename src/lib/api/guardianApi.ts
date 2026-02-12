import { type GuardianArticle, guardianSearchResponseSchema } from "@/lib/schemas/guardianArticle";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GUARDIAN_BASE = "https://content.guardianapis.com";

/** Query params for Guardian Content API search. Dates in YYYY-MM-DD. */
export interface ArticleSearchParams {
  /** Optional text query. */
  q?: string;
  /** Start date inclusive (YYYY-MM-DD). */
  "from-date"?: string;
  /** End date inclusive (YYYY-MM-DD). For exact date, set both to same value. */
  "to-date"?: string;
  /** Page (1-based); same as Guardian API. Omit or 1 for first page. */
  page?: number;
  /** Order: newest | oldest. */
  "order-by"?: "newest" | "oldest";
}

/** Normalized result from article search (after Zod parse). */
export interface ArticleSearchResult {
  results: GuardianArticle[];
  total: number;
  pages: number;
  currentPage: number;
}

const PAGE_SIZE = 10;

function getApiKey(): string {
  const key =
    typeof window !== "undefined"
      ? (process.env.NEXT_PUBLIC_GUARDIAN_API_KEY ?? "")
      : (process.env.NEXT_PUBLIC_GUARDIAN_API_KEY ?? "");
  return key;
}

export const guardianApi = createApi({
  reducerPath: "guardianApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GUARDIAN_BASE,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["ArticleSearch"],
  endpoints: (build) => ({
    searchArticles: build.query<ArticleSearchResult, ArticleSearchParams>({
      query: (arg) => {
        const apiKey = getApiKey();
        const apiPage = arg.page ?? 1;
        const params: Record<string, string | number | undefined> = {
          "api-key": apiKey,
          "from-date": arg["from-date"],
          "to-date": arg["to-date"],
          "order-by": arg["order-by"] ?? "newest",
          "page-size": PAGE_SIZE,
          page: apiPage,
          "show-fields": "headline,byline,trailText,shortUrl",
        };
        if (arg.q?.trim()) params.q = arg.q.trim();
        const filtered: Record<string, string | number> = {};
        for (const [k, v] of Object.entries(params)) {
          if (v !== undefined && v !== "") filtered[k] = v;
        }
        return { url: "search", params: filtered };
      },
      transformResponse: (raw: unknown): ArticleSearchResult => {
        const parsed = guardianSearchResponseSchema.safeParse(raw);
        if (!parsed.success) {
          throw new Error(`Guardian API response validation failed: ${parsed.error.message}`);
        }
        const r = parsed.data.response;
        return {
          results: r.results,
          total: r.total,
          pages: r.pages,
          currentPage: r.currentPage,
        };
      },
      providesTags: (_result, _err, arg) => [
        {
          type: "ArticleSearch",
          id: `${arg["from-date"] ?? ""}-${arg["to-date"] ?? ""}-${arg.q ?? ""}-${arg.page ?? 1}`,
        },
      ],
    }),
  }),
});

export const { useSearchArticlesQuery, useLazySearchArticlesQuery } = guardianApi;
