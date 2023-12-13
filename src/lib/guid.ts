import * as uuid from "uuid";

/**
 * Create a new Guid (version 4 UUID)
 * @returns A new Guid
 */
export function newGuid() {
  return uuid.v4();
}

/**
 * The empty Guid (an identifier containing all zeros)
 */
export const emptyGuid = uuid.NIL;
