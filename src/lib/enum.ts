/**
 * The standard enum type
 */
export type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

/**
 * Returns the name of an enum from its value
 * @param enumVariable The enum for which you want to get the name
 * @param enumValue The value of the enum for which you want to get the name
 * @returns A string containing the name of the enum
 */
export function getEnumNameFromValue<T>(enumVariable: StandardEnum<T>, enumValue: T): string {
  return Object.keys(enumVariable)[Object.values(enumVariable).findIndex((x) => x === enumValue)];
}

/**
 * Returns the value of an enum from its name
 * @param enumVariable The enum for which you want to get the value
 * @param enumName The name of the enum for which you want to get the value
 * @returns A string containing the value of the enum
 */
export function getEnumValueFromName<T>(enumVariable: StandardEnum<T>, enumName: string): number | string {
  const value = Object.values(enumVariable)[Object.keys(enumVariable).findIndex((x) => x === enumName)] as string;
  return isEnumString(enumVariable) ? value : Number.parseInt(value);
}

/**
 * Returns all the names of an enum
 * @param enumVariable The enum for which you want to get the names
 * @returns A string array containing the names of the enum
 */
export function getEnumNames<T>(enumVariable: StandardEnum<T>) {
  const names = Object.values(enumVariable);

  // If enum is with values integer, object.values returns a list of [names, values].
  return isEnumString(enumVariable) ? Object.keys(enumVariable) : names.slice(0, names.length / 2);
}

/**
 * Returns all the values of an enum
 * @param enumVariable The enum for which you want to get the values
 * @returns A string or number array containing the values of the enum
 */
export function getEnumValues<T>(enumVariable: StandardEnum<T>) {
  const keys = Object.keys(enumVariable);

  // If enum is with values integer, object.keys returns a list of [values, names].
  return isEnumString(enumVariable) ? Object.values(enumVariable) : keys.slice(0, keys.length / 2).map((value) => Number.parseInt(value));
}

/**
 * Returns if it's a enum with string value
 * @param enumVariable The enum
 * @returns A bool
 */
function isEnumString<T>(enumVariable: StandardEnum<T>) {
  const keys = Object.keys(enumVariable);

  return keys.length > 0 && !/^\d+$/.test(keys.at(0) as string);
}
