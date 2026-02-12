import { isObject } from "./assertion";
import type { TDict } from "./types";

export const omit = <T extends TDict, K extends keyof T>(object: T, keys: K[]) => {
  const acc = { ...object };
  for (const key of keys) {
    delete acc[key];
  }
  return acc as Omit<T, K>;
};

export const pick = <T extends TDict, K extends keyof T>(object: T, keys: K[]) => {
  const result = {} as { [P in K]: T[P] };
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
};

export const merge = <T extends object>(target: T, ...sources: Partial<T>[]): T => {
  return Object.assign(target, ...sources);
};

export const deepMerge = <T extends object>(target: T, ...sources: Partial<T>[]): T => {
  if (!sources.length) return target;
  const source = sources.shift();
  if (source === undefined) return target;

  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      const sourceValue = source[key as keyof T];
      if (isObject(sourceValue)) {
        if (!target[key as keyof T]) {
          Object.assign(target, { [key]: {} });
        }
        const targetValue = target[key as keyof T];
        if (isObject(targetValue)) {
          deepMerge(targetValue as object, sourceValue as object);
        }
      } else {
        Object.assign(target, { [key]: sourceValue });
      }
    }
  }

  return deepMerge(target, ...sources);
};
