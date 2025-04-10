import {
  isDate,
  isValid,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isLeapYear,
  isWeekend,
  differenceInCalendarDays,
  addBusinessDays,
  startOfDay,
  endOfDay,
  lastDayOfYear,
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

/**
 * Get the start of a day for the given date
 * @param date The date
 * @returns The start of a day date
 */
export function getStartOfDay(date: Date): Date {
  return dateIsValid(date) ? startOfDay(date) : new Date(Number.NaN);
}

/**
 * Get the end of a day for the given date
 * @param date The date
 * @returns The end of a day date
 */
export function getEndOfDay(date: Date): Date {
  return dateIsValid(date) ? endOfDay(date) : new Date(Number.NaN);
}

/**
 * Get the first day of a year for the given date
 * @param date The date
 * @returns The first day of the date year
 */
export function getFirstDayOfYear(date: Date): Date {
  return dateIsValid(date) ? new Date(date.getFullYear(), 0, 1) : new Date(Number.NaN);
}

/**
 * Get the last day of a year for the given date
 * @param date The date
 * @returns The last day of the date year
 */
export function getLastDayOfYear(date: Date): Date {
  return dateIsValid(date) ? lastDayOfYear(date) : new Date(Number.NaN);
}
