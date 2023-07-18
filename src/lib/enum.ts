type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

function getEnumNameFromValue<T>(enumVariable: StandardEnum<T>, enumValue: T): string {
  return Object.keys(enumVariable)[Object.values(enumVariable).findIndex((x) => x === enumValue)];
}

export { getEnumNameFromValue };
