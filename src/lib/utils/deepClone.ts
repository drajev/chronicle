export type TCloneable =
  | object
  | number
  | string
  | boolean
  | symbol
  | bigint
  | null
  | undefined;

type Constructor<T> = new (...args: unknown[]) => T;

export const deepClone = <T extends TCloneable>(obj: T): T => {
  return internalDeepClone(obj, new WeakMap());
};

function internalDeepClone<T extends TCloneable>(
  obj: T,
  seen: WeakMap<object, unknown>,
): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const seenVal = seen.get(obj);
  if (seenVal) return seenVal as T;

  if (Array.isArray(obj)) {
    const len = obj.length;
    if (len < 32) {
      const arr = new Array(len);
      seen.set(obj, arr);
      for (let i = 0; i < len; i++) {
        if (i in obj) arr[i] = internalDeepClone(obj[i] as TCloneable, seen);
      }
      return arr as unknown as T;
    }

    const arr = new Array(len);
    seen.set(obj, arr);

    if (Object.keys(obj).length === len) {
      let i = 0;
      const remainder = len % 8;
      const limit = len - remainder;
      while (i < limit) {
        arr[i] = internalDeepClone(obj[i] as TCloneable, seen);
        arr[i + 1] = internalDeepClone(obj[i + 1] as TCloneable, seen);
        arr[i + 2] = internalDeepClone(obj[i + 2] as TCloneable, seen);
        arr[i + 3] = internalDeepClone(obj[i + 3] as TCloneable, seen);
        arr[i + 4] = internalDeepClone(obj[i + 4] as TCloneable, seen);
        arr[i + 5] = internalDeepClone(obj[i + 5] as TCloneable, seen);
        arr[i + 6] = internalDeepClone(obj[i + 6] as TCloneable, seen);
        arr[i + 7] = internalDeepClone(obj[i + 7] as TCloneable, seen);
        i += 8;
      }
      while (i < len) {
        arr[i] = internalDeepClone(obj[i] as TCloneable, seen);
        i++;
      }
    } else {
      for (let i = 0; i < len; i++) {
        if (i in obj) arr[i] = internalDeepClone(obj[i] as TCloneable, seen);
      }
    }
    return arr as unknown as T;
  }

  if (obj instanceof Date || obj instanceof RegExp) {
    const Ctor = obj.constructor as Constructor<Date | RegExp>;
    return new Ctor(obj) as T;
  }

  interface BufferLike {
    buffer: ArrayBuffer;
    byteLength: number;
    byteOffset?: number;
    length?: number;
    BYTES_PER_ELEMENT?: number;
  }

  if (typeof Buffer !== "undefined") {
    try {
      if (Buffer.isBuffer(obj)) {
        return Buffer.from(obj) as unknown as T;
      }
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  if (ArrayBuffer.isView(obj)) {
    const TypedArray = obj.constructor as Constructor<ArrayBufferView>;
    if ("buffer" in obj) {
      const view = obj as {
        buffer: ArrayBuffer;
        byteOffset: number;
        byteLength: number;
      };
      const newBuffer = view.buffer.slice(
        view.byteOffset,
        view.byteOffset + view.byteLength,
      );
      return new TypedArray(newBuffer) as unknown as T;
    }
    const dataView = obj as DataView;
    return new TypedArray(new ArrayBuffer(dataView.byteLength)) as unknown as T;
  }

  if (obj instanceof ArrayBuffer) {
    return obj.slice(0) as unknown as T;
  }

  if (
    obj &&
    typeof obj === "object" &&
    "buffer" in obj &&
    "byteLength" in obj
  ) {
    const bufferLike = obj as BufferLike;
    if (typeof Buffer === "undefined") {
      const view = new Uint8Array(
        bufferLike.buffer,
        bufferLike.byteOffset ?? 0,
        bufferLike.byteLength,
      );
      const copy = new Uint8Array(view.length);
      copy.set(view);
      return copy as unknown as T;
    }
    const result = {
      buffer:
        bufferLike.buffer instanceof ArrayBuffer
          ? bufferLike.buffer.slice(0)
          : new ArrayBuffer(bufferLike.byteLength),
      byteLength: bufferLike.byteLength,
      byteOffset: bufferLike.byteOffset ?? 0,
      length: bufferLike.length ?? bufferLike.byteLength,
      BYTES_PER_ELEMENT: bufferLike.BYTES_PER_ELEMENT ?? 1,
    };
    return result as unknown as T;
  }

  if (obj instanceof Set) {
    const set = new Set();
    seen.set(obj, set);
    const values = Array.from(obj);
    for (let i = 0; i < values.length; i++) {
      set.add(internalDeepClone(values[i] as TCloneable, seen));
    }
    return set as unknown as T;
  }

  if (obj instanceof Map) {
    const map = new Map();
    seen.set(obj, map);
    for (const [key, value] of obj) {
      map.set(key, internalDeepClone(value as TCloneable, seen));
    }
    return map as unknown as T;
  }

  if (Object.getPrototypeOf(obj) === Object.prototype) {
    const target = {} as Record<string | symbol, unknown>;
    seen.set(obj, target);

    const symbols = Object.getOwnPropertySymbols(obj);
    for (const sym of symbols) {
      const desc = Object.getOwnPropertyDescriptor(obj, sym);
      if (desc?.enumerable) {
        Object.defineProperty(target, sym, desc);
      }
    }

    const descriptors = Object.getOwnPropertyDescriptors(obj);
    const keys = Object.keys(obj);
    const len = keys.length;

    let hasAccessors = false;
    for (let i = 0; i < len; i++) {
      const key = keys[i];
      if (key === undefined) continue;
      const desc = descriptors[key];
      if (desc?.get || desc?.set) {
        hasAccessors = true;
        break;
      }
    }

    const source = obj as Record<string, unknown>;

    if (hasAccessors) {
      for (let i = 0; i < len; i++) {
        const key = keys[i];
        if (key === undefined) continue;
        const descriptor = descriptors[key];
        if (!descriptor?.enumerable) continue;
        if (descriptor.get || descriptor.set) {
          Object.defineProperty(target, key, descriptor);
        } else {
          const clonedValue = internalDeepClone(
            descriptor.value as TCloneable,
            seen,
          );
          Object.defineProperty(target, key, { ...descriptor, value: clonedValue });
        }
      }
    } else {
      let i = 0;
      const remainder = len % 8;
      const limit = len - remainder;
      while (i < limit) {
        const k1 = keys[i];
        const k2 = keys[i + 1];
        const k3 = keys[i + 2];
        const k4 = keys[i + 3];
        const k5 = keys[i + 4];
        const k6 = keys[i + 5];
        const k7 = keys[i + 6];
        const k8 = keys[i + 7];
        if (
          k1 !== undefined &&
          k2 !== undefined &&
          k3 !== undefined &&
          k4 !== undefined &&
          k5 !== undefined &&
          k6 !== undefined &&
          k7 !== undefined &&
          k8 !== undefined
        ) {
          target[k1] = internalDeepClone(source[k1] as TCloneable, seen);
          target[k2] = internalDeepClone(source[k2] as TCloneable, seen);
          target[k3] = internalDeepClone(source[k3] as TCloneable, seen);
          target[k4] = internalDeepClone(source[k4] as TCloneable, seen);
          target[k5] = internalDeepClone(source[k5] as TCloneable, seen);
          target[k6] = internalDeepClone(source[k6] as TCloneable, seen);
          target[k7] = internalDeepClone(source[k7] as TCloneable, seen);
          target[k8] = internalDeepClone(source[k8] as TCloneable, seen);
        }
        i += 8;
      }
      while (i < len) {
        const key = keys[i++];
        if (key !== undefined) {
          target[key] = internalDeepClone(source[key] as TCloneable, seen);
        }
      }
    }
    return target as unknown as T;
  }

  const proto = Object.getPrototypeOf(obj);
  const target = Object.create(proto) as T;
  seen.set(obj, target);

  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const keys = Object.keys(descriptors);
  for (const key of keys) {
    const descriptor = descriptors[key];
    if (!descriptor?.enumerable) continue;
    if (descriptor.get || descriptor.set) {
      Object.defineProperty(target, key, descriptor);
    } else {
      const clonedValue = internalDeepClone(
        descriptor.value as TCloneable,
        seen,
      );
      Object.defineProperty(target, key, { ...descriptor, value: clonedValue });
    }
  }

  const syms = Object.getOwnPropertySymbols(obj);
  for (const sym of syms) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (!descriptor?.enumerable) continue;
    Object.defineProperty(target, sym, descriptor);
  }

  return target;
}
