import {
  isDate,
  isValid,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isLeapYear,
  isWeekend,
  differenceInCalendarDays,
  addBusinessDays,
} from "date-fns";

/**
 * Check whether the date is valid
 * @param date The date
 * @returns A boolean indicating whether the date is valid
 */
export function dateIsValid(date: Date): boolean {
  return isDate(date) && isValid(date);
}

/**
 * Check whether the date is the first day of the month
 * @param date The date
 * @returns A boolean indicating whether the date is the first day of the month
 */
export function dateIsFirstDayOfMonth(date: Date): boolean {
  return dateIsValid(date) && isFirstDayOfMonth(date);
}

/**
 * Check whether the date is the last day of the month
 * @param date The date
 * @returns A boolean indicating whether the date is the last day of the month
 */
export function dateIsLastDayOfMonth(date: Date): boolean {
  return dateIsValid(date) && isLastDayOfMonth(date);
}

/**
 * Check whether the date is a leap year
 * @param date The date
 * @returns A boolean indicating whether the date is a leap year
 */
export function dateIsLeapYear(date: Date): boolean {
  return dateIsValid(date) && isLeapYear(date);
}

/**
 * Check whether the date is a weekend
 * @param date The date
 * @returns A boolean indicating whether the date is a weekend
 */
export function dateIsWeekend(date: Date): boolean {
  return dateIsValid(date) && isWeekend(date);
}

/**
 * Calculate the difference in days between two dates
 * The order is not relevant hence the result is always positive
 * @param from The start date
 * @param to The end date
 * @returns The difference in days between two dates
 */
export function dateDifferenceInDays(from: Date, to: Date): number {
  return dateIsValid(from) && dateIsValid(to) ? Math.abs(differenceInCalendarDays(from, to)) : Number.NaN;
}

/**
 * Get the next business date
 * @param date The date
 * @returns The next business date
 */
export function getNextBusinessDate(date: Date): Date {
  return dateIsValid(date) ? addBusinessDays(date, 1) : new Date(Number.NaN);
}
