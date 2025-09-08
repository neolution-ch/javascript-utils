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
export function ltrim(haystack: string, needle: string): string {
  if (isNullOrEmpty(haystack) || isNullOrEmpty(needle)) {
    return haystack;
  }

  const needleLength = needle.length;

  let offset = 0;

  while (haystack.indexOf(needle, offset) === offset) {
    offset = offset + needleLength;
  }
  return haystack.slice(offset);
}

/**
 * Removes all occurrences of needle from the end of haystack
 * @param haystack string to trim
 * @param needle the thing to trim
 * @returns the string trimmed from the right side
 */
export function rtrim(haystack: string, needle: string): string {
  if (isNullOrEmpty(haystack) || isNullOrEmpty(needle)) {
    return haystack;
  }

  const needleLength = needle.length,
    haystackLength = haystack.length;

  let offset = haystackLength,
    idx = -1;

  while (true) {
    idx = haystack.lastIndexOf(needle, offset - 1);
    if (idx === -1 || idx + needleLength !== offset) {
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
  const trimmed = ltrim(haystack, needle);
  return rtrim(trimmed, needle);
}
