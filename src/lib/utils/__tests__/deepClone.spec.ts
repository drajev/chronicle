import { describe, expect, it } from "vitest";
import { deepClone } from "../deepClone";

describe("deepClone", () => {
  it("returns primitives as-is", () => {
    expect(deepClone(1)).toBe(1);
    expect(deepClone("a")).toBe("a");
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it("clones plain objects", () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  it("clones arrays", () => {
    const arr = [1, 2, [3, 4]];
    const cloned = deepClone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[2]).not.toBe(arr[2]);
  });

  it("clones Date", () => {
    const d = new Date("2024-01-01");
    const cloned = deepClone(d);
    expect(cloned).toEqual(d);
    expect(cloned).not.toBe(d);
    expect(cloned.getTime()).toBe(d.getTime());
  });

  it("clones RegExp", () => {
    const re = /foo/gi;
    const cloned = deepClone(re);
    expect(cloned.source).toBe(re.source);
    expect(cloned.flags).toBe(re.flags);
    expect(cloned).not.toBe(re);
  });

  it("clones Set", () => {
    const set = new Set([1, 2, 3]);
    const cloned = deepClone(set);
    expect(cloned).toEqual(set);
    expect(cloned).not.toBe(set);
  });

  it("clones Map", () => {
    const map = new Map([
      ["a", 1],
      ["b", 2],
    ]);
    const cloned = deepClone(map);
    expect(cloned).toEqual(map);
    expect(cloned).not.toBe(map);
  });

  it("handles circular references", () => {
    const obj: { self?: unknown } = {};
    obj.self = obj;
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned.self).toBe(cloned);
  });
});
