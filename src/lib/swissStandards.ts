import { isNullOrWhitespace } from "./string";

/**
 * Checks if the provided string is a valid swiss IBAN number
 * @param ibanNumber The provided IBAN number to check
 * Must be in one of the following formats:
 * - "CHXX XXXX XXXX XXXX XXXX X" with whitespaces
 * - "CHXXXXXXXXXXXXXXXXXXX" without whitespaces
 * @returns The result of the IBAN number check
 */
export function isValidSwissIbanNumber(ibanNumber: string): boolean {
  // 1. Reject null, undefined or whitespace-only strings
  if (isNullOrWhitespace(ibanNumber)) {
    return false;
  }

  // 2. Define allowed strict formats
  //    - with spaces: "CHXX XXXX XXXX XXXX XXXX X"
  const compactIbanNumberWithWhiteSpaces = new RegExp(/^CH\d{2}(?: \d{4}){4} \d{1}$/);
  //    - without spaces: "CHXXXXXXXXXXXXXXXXXXX"
  const compactIbanNumberWithoutWhiteSpaces = new RegExp(/^CH\d{19}$/);

  // 3. Check if input matches one of the allowed formats
  if (!compactIbanNumberWithWhiteSpaces.test(ibanNumber) && !compactIbanNumberWithoutWhiteSpaces.test(ibanNumber)) {
    return false;
  }

  // 4. Remove all spaces to get a compact IBAN string
  const compactIbanNumber = ibanNumber.replaceAll(" ", "");

  // 5. Rearrange IBAN for checksum calculation
  //    - move first 4 characters (CH + 2 check digits) to the end
  const rearrangedIban = compactIbanNumber.slice(4) + compactIbanNumber.slice(0, 4);

  // 6. Replace letters with numbers (A=10, B=11, ..., Z=35)
  const numericStr = rearrangedIban.replaceAll(/[A-Z]/g, (ch) => (ch.codePointAt(0)! - 55).toString());

  // 7. Perform modulo 97 calculation to validate IBAN
  let restOfCalculation = 0;
  for (const digit of numericStr) {
    restOfCalculation = (restOfCalculation * 10 + Number(digit)) % 97;
  }

  // 8. IBAN is valid only if the remainder equals 1
  return restOfCalculation === 1;
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
  // 1. Check if input is empty or only whitespace
  if (isNullOrWhitespace(socialInsuranceNumber)) {
    return false;
  }

  /**
   * 2. Check if input matches accepted formats:
   *    - With dots: 756.XXXX.XXXX.XX
   *    - Without dots: 756XXXXXXXXXX
   */
  const socialInsuranceNumberWithDots = new RegExp(/^756\.\d{4}\.\d{4}\.\d{2}$/);
  const socialInsuranceNumberWithoutDots = new RegExp(/^756\d{10}$/);

  if (!socialInsuranceNumberWithDots.test(socialInsuranceNumber) && !socialInsuranceNumberWithoutDots.test(socialInsuranceNumber)) {
    return false;
  }

  // 3. Remove all dots → get a string of 13 digits
  const compactNumber = socialInsuranceNumber.replaceAll(".", "");

  /**
   * 4. Separate digits for checksum calculation
   *    - first 12 digits: used to calculate checksum
   *    - last digit: actual check digit
   */
  const digits = compactNumber.slice(0, -1);
  const reversedDigits = [...digits].reverse().join("");
  const reversedDigitsArray = [...reversedDigits];

  /*
   * 5. Calculate weighted sum for checksum
   *    - Even positions (after reversing) ×3
   *    - Odd positions ×1
   */
  let sum = 0;
  for (const [i, element] of reversedDigitsArray.entries()) {
    sum += i % 2 === 0 ? Number(element) * 3 : Number(element) * 1;
  }

  /*
   * 6. Calculate expected check digit
   *    - Check digit = value to reach next multiple of 10
   */
  const checksum = (10 - (sum % 10)) % 10;
  const checknumber = Number.parseInt(compactNumber.slice(-1));

  /*
   * 7. Compare calculated check digit with actual last digit
   *    - If equal → valid AHV number
   */
  return checksum === checknumber;
}

/**
 * Formats a unformatted Swiss social insurance number to the standard format "756.XXXX.XXXX.XX"
 * @param unformattedSocialInsuranceNumber the unformatted Swiss social insurance number to format
 * @returns a object containing the formatted Swiss social insurance number and a boolean indicating if the number was valid or not
 */
export function formatSwissSocialInsuranceNumber(unformattedSocialInsuranceNumber: string): {
  /**
   * The formatted Swiss social insurance number or the original input if the Swiss social insurance number was invalid
   */
  socialInsuranceNumber: string;
  /**
   * The result if the social insurance number is a valid Swiss social insurance number or not
   */
  isValidSwissSocialInsuranceNumber: boolean;
} {
  // 1. Check if the unformatted Swiss social insurance number is empty or only a whitespace
  if (isNullOrWhitespace(unformattedSocialInsuranceNumber)) {
    return { socialInsuranceNumber: unformattedSocialInsuranceNumber, isValidSwissSocialInsuranceNumber: false };
  }

  // 2. Remove all non-digit characters, then format as Swiss social insurance number (XXX.XXXX.XXXX.XX)
  const cleaned = unformattedSocialInsuranceNumber.replaceAll(/\D+/g, "");
  const formattedSwissSocialInsuranceNumber = cleaned.replaceAll(/(\d{3})(\d{4})(\d{4})(\d{2})/g, "$1.$2.$3.$4");

  // 3. If the Swiss social insurance number is valid return the formatted number with the true status
  if (isValidSwissSocialSecurityNumber(formattedSwissSocialInsuranceNumber)) {
    return { socialInsuranceNumber: formattedSwissSocialInsuranceNumber, isValidSwissSocialInsuranceNumber: true };
  }
  // 4. If the Swiss social insurance number is not valid return the formatted number with the false status
  return { socialInsuranceNumber: formattedSwissSocialInsuranceNumber, isValidSwissSocialInsuranceNumber: false };
}
