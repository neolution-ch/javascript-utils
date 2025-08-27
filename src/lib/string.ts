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
 * Validation of Social insurance number with regex and checking of checksum
 * Validation according to https://www.sozialversicherungsnummer.ch/aufbau-neu.htm
 * @param socialInsuranceNumber The social insurance number to check
 * @returns the result if the social insurance number is valid or not
 */
export function isValidSwissSocialSecurityNumber(socialInsuranceNumber: string): boolean {
  if (!isNullOrEmpty(socialInsuranceNumber)) {
    const compactInsuranceNumber = socialInsuranceNumber.replaceAll(/[\s.]+/g, "");
    if (!/^756\d{10}$/.test(compactInsuranceNumber)) return false;
    const number = socialInsuranceNumber.slice(0, -1);

    const reversedNumber = [...number.split(".").join("")].reverse().join("");
    const reversedNumberArray = [...reversedNumber];
    let sum = 0;
    for (const [i, element] of reversedNumberArray.entries()) {
      sum += i % 2 === 0 ? Number(element) * 3 : Number(element) * 1;
    }

    const checksum = Math.ceil(sum / 10) * 10 - sum;
    const checknumber = Number.parseInt(socialInsuranceNumber.slice(-1));

    if (checksum !== checknumber) {
      return false;
    }
    return true;
  }
  return false;
}
