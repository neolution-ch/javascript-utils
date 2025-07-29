/**
 * Check whether the provided parameter is of type `object` but not `null`, an `array`, a `regexp`, nor a `date`
 * @param obj The object
 * @returns A boolean indicating whether the parameter is an object
 */
export const isObject = (obj: object): boolean =>
  typeof obj === "object" && obj !== null && !Array.isArray(obj) && !(obj instanceof RegExp) && !(obj instanceof Date);

/**
 * Convert null properties to undefined
 * @param obj The object
 */
export const convertNullToUndefined = (obj: object | object[]): void => {
  if (Array.isArray(obj)) {
    for (const item of obj as unknown as object[]) {
      if (item === null) {
        obj[obj.indexOf(item)] = undefined;
      } else if (isObject(item)) {
        convertNullToUndefined(item);
      }
    }
  } else if (!isObject(obj)) {
    return;
  }

  for (const key of Object.keys(obj)) {
    const value = obj[key as keyof typeof obj];
    if (value === null) {
      delete obj[key as keyof typeof obj];
    } else if (isObject(value) || Array.isArray(value)) {
      convertNullToUndefined(value);
    }
  }
};
