import { type GuardianArticle, guardianSearchResponseSchema } from "@/lib/schemas/guardianArticle";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GUARDIAN_BASE = "https://content.guardianapis.com";

export interface ArticleSearchParams {
  q?: string;
  section?: string;
  "from-date"?: string;
  "to-date"?: string;
  page?: number;
  pageSize?: number;
  "order-by"?: "newest" | "oldest";
}

export interface ArticleSearchResult {
  results: GuardianArticle[];
  total: number;
  pages: number;
  currentPage: number;
}

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

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
        const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, arg.pageSize ?? DEFAULT_PAGE_SIZE));
        const params: Record<string, string | number | undefined> = {
          "api-key": apiKey,
          "from-date": arg["from-date"],
          "to-date": arg["to-date"],
          "order-by": arg["order-by"] ?? "newest",
          "page-size": pageSize,
          page: apiPage,
          "show-fields": "headline,byline,trailText,shortUrl",
        };
        if (arg.section?.trim()) params.section = arg.section.trim();
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
          id: `${arg.section ?? ""}-${arg["from-date"] ?? ""}-${arg["to-date"] ?? ""}-${arg.q ?? ""}-${arg.page ?? 1}-${arg.pageSize ?? DEFAULT_PAGE_SIZE}`,
        },
      ],
    }),
  }),
});

export const { useSearchArticlesQuery, useLazySearchArticlesQuery } = guardianApi;
