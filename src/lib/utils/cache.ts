import { stringifyBigIntValues } from "./helpers";

const createCacheKey = (key: string): string => {
  if (key.startsWith("http://") || key.startsWith("https://")) {
    return key;
  }
  return `https://cache.internal/${key}`;
};

export const storageSetItem = async (
  cacheName: string,
  key: string,
  value: unknown
): Promise<void> => {
  const cache = await caches.open(cacheName);
  const serializedValue = JSON.stringify(value, stringifyBigIntValues);
  const response = new Response(serializedValue, {
    headers: { "Content-Type": "application/json" },
  });
  await cache.put(new Request(createCacheKey(key)), response);
};

export const storageGetItem = async <T>(cacheName: string, key: string): Promise<T | null> => {
  const cache = await caches.open(cacheName);
  const response = await cache.match(new Request(createCacheKey(key)));
  if (!response) return null;
  const serializedValue = await response.text();
  return JSON.parse(serializedValue) as T;
};

export const storageRemoveItem = async (cacheName: string, key: string): Promise<boolean> => {
  const cache = await caches.open(cacheName);
  return cache.delete(new Request(createCacheKey(key)));
};

export const storageClear = async (cacheName: string): Promise<void> => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (const request of keys) {
    await cache.delete(request);
  }
};

export const storageClearByPrefixOrSuffix = async (
  cacheName: string,
  str: string,
  isPrefix = true
): Promise<void> => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  for (const request of keys) {
    const urlParts = request.url.split("/");
    const key = urlParts[urlParts.length - 1] ?? "";
    if ((isPrefix && key.startsWith(str)) || (!isPrefix && key.endsWith(str))) {
      await cache.delete(request);
    }
  }
};

export const storageExists = async (cacheName: string, key: string): Promise<boolean> => {
  const cache = await caches.open(cacheName);
  const response = await cache.match(new Request(createCacheKey(key)));
  return response !== undefined;
};

export const storageGetAllKeys = async (cacheName: string): Promise<string[]> => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  return keys.map((request) => {
    const urlParts = request.url.split("/");
    return urlParts[urlParts.length - 1] ?? "";
  });
};

export const storageCalculateSize = async (
  cacheName: string,
  cacheKey?: string
): Promise<number> => {
  const cache = await caches.open(cacheName);

  if (cacheKey) {
    const response = await cache.match(new Request(createCacheKey(cacheKey)));
    if (response) {
      const clonedResponse = response.clone();
      const body = await clonedResponse.arrayBuffer();
      return body.byteLength;
    }
    return 0;
  }

  const keys = await cache.keys();
  let totalSize = 0;
  for (const request of keys) {
    const response = await cache.match(request);
    if (response) {
      const clonedResponse = response.clone();
      const body = await clonedResponse.arrayBuffer();
      totalSize += body.byteLength;
    }
  }
  return totalSize;
};
