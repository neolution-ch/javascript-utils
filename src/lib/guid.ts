import * as uuid from "uuid";

/**
 * Create a new Guid (version 4 UUID)
 * @returns A new Guid
 */
export function newGuid() {
  return uuid.v4();
}

/**
 * Check whether a string it is a valid Guid
 * @param str The string to test whether it is a valid Guid
 * @returns A value indicating whether the string is a valid Guid
 */
export function isValidGuid(str: string) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return typeof str === "string" && regex.test(str);
}

/**
 * The empty Guid (an identifier containing all zeros)
 */
export const emptyGuid = uuid.NIL;
