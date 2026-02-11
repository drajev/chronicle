import { nanoid } from "nanoid";

export const uid = (length = 8): string => {
  return nanoid(length);
};

export const sleep = (ms: number): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const stringifyBigIntValues = (_key: string, value: unknown) => {
  return typeof value === "bigint" ? value.toString() : value;
};

export const deepCopy = <T>(obj: T): T => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Set) {
    return new Set([...obj]) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as T;
  }

  const copy = {} as Record<string, unknown>;

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy as T;
};
