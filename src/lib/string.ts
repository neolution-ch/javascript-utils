/**
 * Indicates whether a specified string is null/undefined or empty
 * @param value The string to test
 * @returns true if the value parameter is null/undefined or empty
 */
export function isNullOrEmpty(value?: string): boolean {
  if (!value || typeof value !== "string") {
    return true;
  }

  return value.length === 0;
}

/**
 * Indicates whether a specified string is null/undefined, empty, or consists only of white-space characters
 * @param value The string to test
 * @returns true if the value parameter is null/undefined, Empty, or if value consists exclusively of white-space characters
 */
export function isNullOrWhitespace(value?: string): boolean {
  return isNullOrEmpty(value) || (value as string).trim().length === 0;
}

/**
 * Capitalize the string
 * @param value The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(value?: string): string | undefined {
  if (!value || isNullOrWhitespace(value)) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Uncapitalize the string
 * @param value The string to uncapitalize
 * @returns The uncapitalized string
 */
export function uncapitalize(value?: string): string | undefined {
  if (!value || isNullOrWhitespace(value)) {
    return value;
  }

  return value.charAt(0).toLowerCase() + value.slice(1);
}

/**
 * Truncates a string to a maximum length, adding a suffix if truncated
 * @param value The string to truncate
 * @param maxLength The maximum length of the resulting string
 * @param suffix The suffix to append if truncated (default: "")
 * @returns The truncated string
 */
export function truncate(value: string | undefined, maxLength: number, suffix = ""): string | undefined {
  if (!value || isNullOrWhitespace(value)) {
    return value;
  }

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}${suffix}`;
}

/**
 * Removes all occurrences of needle from the beginning and end of value
 * @param value The string to trim
 * @param needle The string to remove (default: " ")
 * @returns The trimmed string
 */
export function trim(value?: string, needle = " "): string | undefined {
  if (!value || isNullOrWhitespace(value)) {
    return value;
  }

  const trimmed = ltrim(value, needle);
  return rtrim(trimmed, needle);
}

/**
 * Removes all occurrences of needle from the beginning of value
 * @param value The string to trim
 * @param needle The string to remove (default: " ")
 * @returns The trimmed string
 */
export function ltrim(value?: string, needle = " "): string | undefined {
  if (!value || isNullOrWhitespace(value)) {
    return value;
  }

  if (!needle || typeof needle !== "string") {
    return value;
  }

  const needleLen = needle.length;
  if (needleLen === 0 || value.length === 0) {
    return value;
  }

  let offset = 0;

  while (value.indexOf(needle, offset) === offset) {
    offset = offset + needleLen;
  }
  return value.slice(offset);
}

/**
 * Removes all occurrences of needle from the end of value
 * @param value The string to trim
 * @param needle The string to remove (default: " ")
 * @returns The trimmed string
 */
export function rtrim(value?: string, needle = " "): string | undefined {
  if (!value || isNullOrWhitespace(value)) {
    return value;
  }

  if (!needle || typeof needle !== "string") {
    return value;
  }

  const needleLen = needle.length;
  const valueLen = value.length;

  if (needleLen === 0 || valueLen === 0) {
    return value;
  }

  let offset = valueLen;
  let idx = -1;

  while (true) {
    idx = value.lastIndexOf(needle, offset - 1);
    if (idx === -1 || idx + needleLen !== offset) {
      break;
    }
    if (idx === 0) {
      return "";
    }
    offset = idx;
  }

  return value.slice(0, offset);
}

/**
 * Splits a string into lines using various line separators (\r\n, \r, \n)
 * @param value The string to split
 * @returns An array of lines
 */
export function splitLines(value?: string): string[] {
  if (!value || typeof value !== "string") {
    return value === "" ? [""] : [];
  }

  return value.split(/\r\n|\r|\n/);
}
