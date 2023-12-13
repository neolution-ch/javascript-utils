import * as uuid from "uuid";

/**
 * Create a new Guid (version 4 UUID)
 * @returns A new Guid
 */
export function newGuid() {
  return uuid.v4();
}

export const emptyGuid = uuid.NIL;
