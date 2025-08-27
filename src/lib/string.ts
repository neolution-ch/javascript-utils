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
 * Checks if the provided string is a valid Swiss IBAN number
 * @param iBanNumber The provided IBAN number to check
 * @returns The result of the IBAN number check
 */
export function isValidSwissIbanNumber(iBanNumber: string): boolean {
  if (!isNullOrEmpty(iBanNumber)) {
    const compactIban = iBanNumber.replaceAll(/\s+/g, "");
    if (!/^CH\d{19}$/.test(compactIban)) return false;
    const rearrangedIban = compactIban.slice(4) + compactIban.slice(0, 4).toString();

    const numericStr = Array.from(rearrangedIban, (ch) => {
      if (/[A-Z]/.test(ch)) {
        const code = ch.codePointAt(0);
        // code is never undefined!
        return (code! - 55).toString();
      }
      return ch;
    }).join("");

    let restOfCalculation = 0;
    for (const digit of numericStr) {
      restOfCalculation = (restOfCalculation * 10 + Number(digit)) % 97;
    }

    return restOfCalculation === 1;
  }
  return false;
}
