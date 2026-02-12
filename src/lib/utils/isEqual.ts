export const isEqual = <T, K>(obj: T | T[], objToCompare: K | K[]): boolean => {
  if (obj instanceof Date && objToCompare instanceof Date) {
    return obj.getTime() === objToCompare.getTime();
  }

  if (Array.isArray(obj) && Array.isArray(objToCompare)) {
    if (obj.length !== objToCompare.length) return false;
    for (let i = 0; i < obj.length; i++) {
      const a = obj[i];
      const b = objToCompare[i];
      if (a === undefined || b === undefined) return false;
      if (!isEqual(a, b)) return false;
    }
    return true;
  }

  if (obj instanceof Set && objToCompare instanceof Set) {
    if (obj.size !== objToCompare.size) return false;
    for (const item of obj) {
      if (!objToCompare.has(item)) return false;
    }
    return true;
  }

  if (obj instanceof Map && objToCompare instanceof Map) {
    if (obj.size !== objToCompare.size) return false;
    for (const [key, val] of obj) {
      if (!objToCompare.has(key) || !isEqual(val, objToCompare.get(key))) {
        return false;
      }
    }
    return true;
  }

  if (
    obj !== null &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    objToCompare !== null &&
    typeof objToCompare === "object" &&
    !Array.isArray(objToCompare)
  ) {
    const objKeys = Object.keys(obj) as Array<keyof T>;
    const objToCompareKeys = Object.keys(objToCompare) as Array<keyof K>;
    if (objKeys.length !== objToCompareKeys.length) return false;
    for (const key of objKeys) {
      if (!isEqual(obj[key], objToCompare[key as unknown as keyof K])) {
        return false;
      }
    }
    return true;
  }

  return obj === objToCompare;
};
