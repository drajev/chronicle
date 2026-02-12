import { z } from "zod";

/**
 * Guardian Content API response shapes.
 * @see https://open-platform.theguardian.com/documentation/
 */

/** Optional fields returned when requested via show-fields. */
export const guardianArticleFieldsSchema = z
  .object({
    headline: z.string().optional(),
    byline: z.string().optional(),
    trailText: z.string().optional(),
    shortUrl: z.string().url().optional(),
    publication: z.string().optional(),
    wordcount: z.string().optional(),
  })
  .passthrough()
  .optional();

/** Single article from Guardian Content API search. */
export const guardianArticleSchema = z.object({
  id: z.string(),
  webTitle: z.string(),
  webUrl: z.string().url(),
  webPublicationDate: z.string(),
  sectionName: z.string().optional(),
  sectionId: z.string().optional(),
  type: z.string().optional(),
  apiUrl: z.string().url().optional(),
  fields: guardianArticleFieldsSchema,
});

/** Search response meta. */
export const guardianSearchResponseMetaSchema = z.object({
  status: z.string(),
  userTier: z.string().optional(),
  total: z.number(),
  startIndex: z.number().optional(),
  pageSize: z.number(),
  currentPage: z.number(),
  pages: z.number(),
  orderBy: z.string().optional(),
});

/** Full Guardian Content API search response. */
export const guardianSearchResponseSchema = z.object({
  response: z.object({
    status: z.string(),
    userTier: z.string().optional(),
    total: z.number(),
    startIndex: z.number().optional(),
    pageSize: z.number(),
    currentPage: z.number(),
    pages: z.number(),
    orderBy: z.string().optional(),
    results: z.array(guardianArticleSchema),
  }),
});

export type GuardianArticle = z.infer<typeof guardianArticleSchema>;
export type GuardianArticleFields = z.infer<typeof guardianArticleFieldsSchema>;
export type GuardianSearchResponseMeta = z.infer<typeof guardianSearchResponseMetaSchema>;
export type GuardianSearchResponse = z.infer<typeof guardianSearchResponseSchema>;
