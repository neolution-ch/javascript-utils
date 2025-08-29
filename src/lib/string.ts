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
 * Validation of social insurance number with checking the checksum
 * Validation according to https://www.sozialversicherungsnummer.ch/aufbau-neu.htm
 * @param socialInsuranceNumber The social insurance number to check
 * Must be in one of the following formats:
 * - "756.XXXX.XXXX.XX" with dots as separators
 * - "756XXXXXXXXXX" with digits only
 * @returns The result if the social insurance number is valid or not
 */
export function isValidSwissSocialSecurityNumber(socialInsuranceNumber: string): boolean {
  if (isNullOrWhitespace(socialInsuranceNumber)) {
    return false;
  }

  const socialInsuranceNumberWithDots = new RegExp(/^756.?\d{4}.?\d{4}.?\d{2}$/);

  if (!socialInsuranceNumberWithDots.test(socialInsuranceNumber)) {
    return false;
  }

  /**
   * Validates a Swiss social security number (AHV number).
   *
   * Validation steps:
   * - The number must start with 756, be 13 digits long and follow one of the accepted formats:
   *   - "756.XXXX.XXXX.XX" or "756XXXXXXXXXX".
   * - Remove dots → 13 digits remain.
   * - The last digit is the check digit.
   * - To calculate the check digit:
   *   - Take the first 12 digits and reverse them.
   *   - Multiply digits at even positions by 3, and digits at odd positions by 1.
   *   - Sum all results.
   *   - Look at the last digit of the sum (sum % 10).
   *   - The check digit is the value needed to reach the next multiple of 10.
   * - The number is valid if this check digit matches the last digit.
   */

  const compactNumber = socialInsuranceNumber.replaceAll(".", "");
  const digits = compactNumber.slice(0, -1);
  const reversedDigits = [...digits].reverse().join("");
  const reversedDigitsArray = [...reversedDigits];

  let sum = 0;
  for (const [i, element] of reversedDigitsArray.entries()) {
    sum += i % 2 === 0 ? Number(element) * 3 : Number(element) * 1;
  }

  const checksum = (10 - (sum % 10)) % 10;
  const checknumber = Number.parseInt(compactNumber.slice(-1));

  return checksum === checknumber;
}
