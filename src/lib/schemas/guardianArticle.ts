import { z } from "zod";

/** @see https://open-platform.theguardian.com/documentation/ */
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
