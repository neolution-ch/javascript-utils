import { isNullOrEmpty } from "./string";

/**
 * Converts a string to a boolean
 * @param value The string to convert
 * @returns The parsed boolean
 */
export function parseBool(value?: string): boolean {
  // Similar to C# implementation that trims also null characters
  // https://github.com/dotnet/runtime/blob/main/src/libraries/System.Private.CoreLib/src/System/Boolean.cs#L277
  return !isNullOrEmpty(value) && value?.replace(/[\s\0]/g, "").toLowerCase() === "true";
}
