import { describe, expect, it } from "vitest";
import { DATE_FORMAT_ISO, getDefaultDateRange, parseDateParam } from "../date";

const ISO_REGEX = /^\d{4}-\d{2}-\d{2}$/;

describe("parseDateParam", () => {
  it("returns undefined for null or empty", () => {
    expect(parseDateParam(null)).toBeUndefined();
    expect(parseDateParam("")).toBeUndefined();
    expect(parseDateParam("   ")).toBeUndefined();
  });

  it("returns trimmed string for valid ISO date", () => {
    expect(parseDateParam("2024-01-15")).toBe("2024-01-15");
    expect(parseDateParam("  2024-06-01  ")).toBe("2024-06-01");
  });

  it("returns undefined for invalid date", () => {
    expect(parseDateParam("not-a-date")).toBeUndefined();
    expect(parseDateParam("2024-13-01")).toBeUndefined();
    expect(parseDateParam("2024-02-30")).toBeUndefined();
  });

  it("rejects wrong format", () => {
    expect(parseDateParam("01/15/2024")).toBeUndefined();
    expect(parseDateParam("15-01-2024")).toBeUndefined();
  });
});

describe("getDefaultDateRange", () => {
  it("returns from-date and to-date in ISO format", () => {
    const range = getDefaultDateRange();
    expect(range).toHaveProperty("from-date");
    expect(range).toHaveProperty("to-date");
    expect(range["from-date"]).toMatch(ISO_REGEX);
    expect(range["to-date"]).toMatch(ISO_REGEX);
  });

  it("to-date is today and from-date is 7 days earlier", () => {
    const range = getDefaultDateRange();
    const from = new Date(range["from-date"]);
    const to = new Date(range["to-date"]);
    expect(Number.isNaN(from.getTime())).toBe(false);
    expect(Number.isNaN(to.getTime())).toBe(false);
    const diffDays = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    expect(diffDays).toBe(7);
  });
});

describe("DATE_FORMAT_ISO", () => {
  it("is yyyy-MM-dd", () => {
    expect(DATE_FORMAT_ISO).toBe("yyyy-MM-dd");
  });
});
