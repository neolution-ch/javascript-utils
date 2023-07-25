/**
 * The standard enum type
 */
type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

/**
 * Returns the name of an enum from its value
 * @param enumVariable The enum for which you want to get the name
 * @param enumValue The value of the enum for which you want to get the name
 * @returns A string containing the name of the enum
 */
function getEnumNameFromValue<T>(enumVariable: StandardEnum<T>, enumValue: T): string {
  return Object.keys(enumVariable)[Object.values(enumVariable).findIndex((x) => x === enumValue)];
}

export { getEnumNameFromValue };
