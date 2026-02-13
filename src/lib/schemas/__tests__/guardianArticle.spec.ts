import { describe, expect, it } from "vitest";
import {
  guardianArticleSchema,
  guardianSearchResponseSchema,
} from "../guardianArticle";

const validArticle = {
  id: "world/2024/jan/01/sample",
  webTitle: "Sample headline",
  webUrl: "https://www.theguardian.com/world/2024/jan/01/sample",
  webPublicationDate: "2024-01-01T12:00:00Z",
  sectionName: "World news",
  fields: { headline: "Sample headline", trailText: "A short summary." },
};

describe("guardianArticleSchema", () => {
  it("parses valid article", () => {
    const result = guardianArticleSchema.safeParse(validArticle);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.webTitle).toBe("Sample headline");
      expect(result.data.fields?.headline).toBe("Sample headline");
    }
  });

  it("parses article with minimal required fields", () => {
    const minimal = {
      id: "a/1",
      webTitle: "Title",
      webUrl: "https://example.com/a",
      webPublicationDate: "2024-01-01T00:00:00Z",
      fields: undefined,
    };
    const result = guardianArticleSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });

  it("fails when required field is missing", () => {
    const noId = { ...validArticle, id: undefined };
    expect(guardianArticleSchema.safeParse(noId).success).toBe(false);

    const noWebUrl = { ...validArticle, webUrl: undefined };
    expect(guardianArticleSchema.safeParse(noWebUrl).success).toBe(false);
  });

  it("fails when webUrl is not a URL", () => {
    const bad = { ...validArticle, webUrl: "not-a-url" };
    expect(guardianArticleSchema.safeParse(bad).success).toBe(false);
  });
});

describe("guardianSearchResponseSchema", () => {
  it("parses valid search response", () => {
    const response = {
      response: {
        status: "ok",
        total: 100,
        pageSize: 10,
        currentPage: 1,
        pages: 10,
        results: [validArticle],
      },
    };
    const result = guardianSearchResponseSchema.safeParse(response);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.response.results).toHaveLength(1);
      expect(result.data.response.results[0].webTitle).toBe("Sample headline");
    }
  });

  it("fails when response.results is not an array", () => {
    const bad = {
      response: {
        status: "ok",
        total: 0,
        pageSize: 10,
        currentPage: 1,
        pages: 0,
        results: "not-array",
      },
    };
    expect(guardianSearchResponseSchema.safeParse(bad).success).toBe(false);
  });
});
