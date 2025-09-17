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

/**
 * Get the full path of a nested object property from a lambda expression
 * @param expression A function that accesses properties on an object
 * @returns The property path as a string (e.g., "prop1.prop2.prop3")
 */
export const pathOf = <T extends object>(expression: (obj: T) => unknown): string => {
  const path: string[] = [];

  /**
   * Create a proxy that tracks property access
   * @param currentPath The current path being tracked
   * @returns A proxy object that captures property access
   */
  const createProxy = (currentPath: string[] = []): T => {
    return new Proxy({} as T, {
      /**
       * Intercept property access and build the path
       * @param _target The proxy target (unused)
       * @param prop The property being accessed
       * @returns A new proxy for continued property access
       */
      get(_target, prop) {
        if (typeof prop === "string") {
          const newPath = [...currentPath, prop];
          path.splice(0, path.length, ...newPath);
          return createProxy(newPath);
        }
        return;
      },
    });
  };

  try {
    expression(createProxy());
  } catch {
    // Ignore errors that might occur during property access
  }

  return path.join(".");
};
