import { isDate, isValid, isLastDayOfMonth, differenceInCalendarDays } from "date-fns";

/**
 * Check whether the date is valid
 * @param date The date
 * @returns A boolean indicating whether the date is valid
 */
export function dateIsValid(date: Date): boolean {
  return isDate(date) && isValid(date);
}

/**
 * Check whether the date is the last day of the month
 * @param date The date
 * @returns A boolean indicating whether the date is the last day of the month
 */
export function dateIsLastDayOfMonth(date: Date): boolean {
  return isDate(date) && isLastDayOfMonth(date);
}

/**
 * Calculate the difference in days between two dates
 * The order is not relevant hence the result is always positive
 * @param from The start date
 * @param to The end date
 * @returns The difference in days between two dates
 */
export function dateDifferenceInDays(from: Date, to: Date): number {
  return Math.abs(differenceInCalendarDays(from, to));
}
