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
 * Removes all occurrences of needle from the start of haystack
 * @param haystack string to trim
 * @param needle the thing to trim
 * @returns the string trimmed from the left side
 */
export function trimStart(haystack: string, needle: string): string {
  if (isNullOrEmpty(haystack) || isNullOrEmpty(needle)) {
    return haystack;
  }

  let offset = 0;

  while (haystack.indexOf(needle, offset) === offset) {
    offset = offset + needle.length;
  }
  return haystack.slice(offset);
}

/**
 * Removes all occurrences of needle from the end of haystack
 * @param haystack string to trim
 * @param needle the thing to trim
 * @returns the string trimmed from the right side
 */
export function trimEnd(haystack: string, needle: string): string {
  if (isNullOrEmpty(haystack) || isNullOrEmpty(needle)) {
    return haystack;
  }

  let offset = haystack.length,
    idx = -1;

  while (true) {
    idx = haystack.lastIndexOf(needle, offset - 1);
    if (idx === -1 || idx + needle.length !== offset) {
      break;
    }
    if (idx === 0) {
      return "";
    }
    offset = idx;
  }

  return haystack.slice(0, offset);
}

/**
 * Removes all occurrences of needle from the start and the end of haystack
 * @param haystack string to trim
 * @param needle the thing to trim
 * @returns the string trimmed from the right and left side
 */
export function trim(haystack: string, needle: string): string {
  const trimmed = trimStart(haystack, needle);
  return trimEnd(trimmed, needle);
}

/**
 * Splits the string at line breaks
 * @param str the string to split
 * @param removeEmptyEntries the option to remove empty entries
 * @param trimEntries the option to trim the entries
 * @returns the individual lines as an array
 */
export function splitLines(str: string, removeEmptyEntries: boolean = false, trimEntries: boolean = false): string[] {
  if (isNullOrEmpty(str)) {
    return [];
  }

  let splitted = str.split(/\r\n|\r|\n/);

  if (trimEntries) {
    splitted = splitted.map((x) => x.trim());
  }

  if (removeEmptyEntries) {
    splitted = splitted.filter((line) => line.length > 0);
  }

  return splitted;
}
