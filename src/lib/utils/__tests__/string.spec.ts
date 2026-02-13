import { describe, expect, it } from "vitest";
import { stripHtml } from "../string";

describe("stripHtml", () => {
  it("removes HTML tags and trims", () => {
    expect(stripHtml("<strong>Hello</strong>")).toBe("Hello");
    expect(stripHtml("  <p>text</p>  ")).toBe("text");
  });

  it("returns empty string when only tags", () => {
    expect(stripHtml("<span></span>")).toBe("");
  });

  it("leaves plain text unchanged", () => {
    expect(stripHtml("No tags here")).toBe("No tags here");
  });
});
