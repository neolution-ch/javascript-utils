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

export function getEnumValueFromName<T>(enumVariable: StandardEnum<T>, enumName: string): number | string {
  const value = Object.values(enumVariable)[Object.keys(enumVariable).findIndex((x) => x === enumName)] as string;

  return isEnumString(enumVariable) ? value : Number.parseInt(value);
}

export function getEnumNames<T>(enumVariable: StandardEnum<T>) {
  const names = Object.values(enumVariable);

  // If enum is with values integer, object.values returns a list of [names, values].
  return isEnumString(enumVariable) ? Object.keys(enumVariable) : names.slice(0, names.length / 2);
}

export function getEnumValues<T>(enumVariable: StandardEnum<T>) {
  const keys = Object.keys(enumVariable);

  // If enum is with values integer, object.keys returns a list of [values, names].
  return isEnumString(enumVariable) ? Object.values(enumVariable) : keys.slice(0, keys.length / 2).map((value) => Number.parseInt(value));
}

function isEnumString<T>(enumVariable: StandardEnum<T>) {
  const keys = Object.keys(enumVariable);
  return keys.length > 0 && isNaN(Number(keys.at(0)));
}

export { getEnumNameFromValue };
