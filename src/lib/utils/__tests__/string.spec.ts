import { describe, expect, it } from "vitest";
import {
  camelCase,
  capitalize,
  capitalizeFirstLetter,
  kebabCase,
  pascalCase,
  slugify,
  uncapitalize,
} from "../string";

describe("string utils", () => {
  describe("camelCase", () => {
    it("converts various string formats to camelCase", () => {
      expect(camelCase("foo-bar")).toBe("fooBar");
      expect(camelCase("foo_bar")).toBe("fooBar");
      expect(camelCase("Foo Bar")).toBe("fooBar");
      expect(camelCase("foo bar baz")).toBe("fooBarBaz");
      expect(camelCase("  foo  bar  ")).toBe("fooBar");
      expect(camelCase("")).toBe("");
      expect(camelCase("   ")).toBe("");
      expect(camelCase("123")).toBe("123");
      expect(camelCase("foo--bar")).toBe("fooBar");
      expect(camelCase("foo__bar")).toBe("fooBar");
      expect(camelCase("FOO_BAR")).toBe("fooBar");
    });

    it("handles edge cases with special patterns", () => {
      expect(camelCase("foo-")).toBe("foo");
      expect(camelCase("foo_")).toBe("foo");
      expect(camelCase("-foo")).toBe("foo");
      expect(camelCase("_foo")).toBe("foo");
      expect(camelCase("-foo-bar")).toBe("fooBar");
      expect(camelCase("_foo_bar")).toBe("fooBar");
    });
  });

  describe("pascalCase", () => {
    it("converts various string formats to PascalCase", () => {
      expect(pascalCase("foo-bar")).toBe("FooBar");
      expect(pascalCase("foo_bar")).toBe("FooBar");
      expect(pascalCase("foo bar")).toBe("FooBar");
      expect(pascalCase("foo123bar")).toBe("Foo123Bar");
      expect(pascalCase("")).toBe("");
      expect(pascalCase("   ")).toBe("");
      expect(pascalCase("123")).toBe("123");
      expect(pascalCase("FOO_BAR_BAZ")).toBe("FooBarBaz");
    });
  });

  describe("capitalizeFirstLetter", () => {
    it("capitalizes the first letter of a string", () => {
      expect(capitalizeFirstLetter("hello")).toBe("Hello");
      expect(capitalizeFirstLetter("world")).toBe("World");
      expect(capitalizeFirstLetter("")).toBe("");
    });
  });

  describe("kebabCase", () => {
    it("converts various string formats to kebab-case", () => {
      expect(kebabCase("fooBar")).toBe("foo-bar");
      expect(kebabCase("FooBar")).toBe("foo-bar");
      expect(kebabCase("foo bar")).toBe("foo-bar");
      expect(kebabCase("Foo123Bar")).toBe("foo123-bar");
      expect(kebabCase("")).toBe("");
      expect(kebabCase("   ")).toBe("");
      expect(kebabCase("123")).toBe("123");
      expect(kebabCase("FOO_BAR-BAZ")).toBe("foo-bar-baz");
      expect(kebabCase("XMLHttpRequest")).toBe("xml-http-request");
    });
  });

  describe("slugify", () => {
    it("converts strings to URL-friendly slugs", () => {
      expect(slugify("Hello World!")).toBe("hello-world");
      expect(slugify("__FOO--BAR  ")).toBe("foo-bar");
      expect(slugify("")).toBe("");
      expect(slugify("   ")).toBe("");
      expect(slugify("123")).toBe("123");
    });
  });

  describe("capitalize", () => {
    it("capitalizes strings", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("world")).toBe("World");
      expect(capitalize("")).toBe("");
    });
  });

  describe("uncapitalize", () => {
    it("uncapitalizes strings", () => {
      expect(uncapitalize("Hello")).toBe("hello");
      expect(uncapitalize("World")).toBe("world");
      expect(uncapitalize("")).toBe("");
    });
  });
});
