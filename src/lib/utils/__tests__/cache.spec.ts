import { beforeEach, describe, expect, it, vi } from "vitest";
import { storageClear, storageGetItem, storageRemoveItem, storageSetItem } from "../cache";

const mockCache = {
  put: vi.fn(),
  match: vi.fn(),
  delete: vi.fn(),
  keys: vi.fn(),
};

const mockCaches = {
  open: vi.fn().mockResolvedValue(mockCache),
};

(globalThis as unknown as { caches: typeof mockCaches }).caches = mockCaches;

describe("Cache API Utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCache.put.mockReset();
    mockCache.match.mockReset();
    mockCache.delete.mockReset();
    mockCache.keys.mockReset();
  });

  describe("storageSetItem", () => {
    it("should store value in cache", async () => {
      const value = { test: "data" };
      await storageSetItem("testCache", "testKey", value);
      expect(mockCaches.open).toHaveBeenCalledWith("testCache");
      expect(mockCache.put).toHaveBeenCalledWith(expect.any(Request), expect.any(Response));
      const request = mockCache.put.mock.calls[0][0] as Request;
      expect(request.url).toBe("https://cache.internal/testKey");
    });
  });

  describe("storageGetItem", () => {
    it("should retrieve stored value", async () => {
      const mockValue = { test: "data" };
      mockCache.match.mockResolvedValue(new Response(JSON.stringify(mockValue)));
      const result = await storageGetItem("testCache", "testKey");
      expect(result).toEqual(mockValue);
      expect(mockCache.match).toHaveBeenCalledWith(expect.any(Request));
    });

    it("should return null for non-existent key", async () => {
      mockCache.match.mockResolvedValue(null);
      const result = await storageGetItem("testCache", "nonExistentKey");
      expect(result).toBeNull();
    });
  });

  describe("storageRemoveItem", () => {
    it("should remove item from cache", async () => {
      await storageRemoveItem("testCache", "testKey");
      expect(mockCache.delete).toHaveBeenCalledWith(expect.any(Request));
      const request = mockCache.delete.mock.calls[0][0] as Request;
      expect(request.url).toBe("https://cache.internal/testKey");
    });
  });

  describe("storageClear", () => {
    it("should clear all items from cache", async () => {
      mockCache.keys.mockResolvedValue([
        new Request("https://cache.internal/testKey1"),
        new Request("https://cache.internal/testKey2"),
      ]);
      await storageClear("testCache");
      expect(mockCache.delete).toHaveBeenCalledTimes(2);
    });
  });
});
