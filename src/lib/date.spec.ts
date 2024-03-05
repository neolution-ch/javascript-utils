import {
  dateIsValid,
  dateIsFirstDayOfMonth,
  dateIsLastDayOfMonth,
  dateIsLeapYear,
  dateIsWeekend,
  dateDifferenceInDays,
  getNextBusinessDate,
} from "./date";

describe("date tests", () => {
  test.each([
    // Valid dates
    [new Date(), true],
    [new Date(new Date()), true],
    [new Date("2014-03-15"), true],
    [new Date(2014, 3, 15), true],
    [new Date(42), true],

    // Invalid dates
    [new Date(Number.MAX_VALUE), false],
    [new Date(Number.NaN), false],
    [new Date("2014-03-36"), false],
    [null as unknown as Date, false],
    [undefined as unknown as Date, false],
    [42 as unknown as Date, false],
    ["2014-03-15" as unknown as Date, false],
    [{ year: 2014, month: 2, day: 15 } as unknown as Date, false],
  ])("dateIsValid", (date, expected) => {
    expect(dateIsValid(date)).toBe(expected);
  });

  test.each([
    [new Date(2015, 0, 1), true],
    [new Date(2015, 1, 1), true],
    [new Date(2015, 12, 30), false],
  ])("dateIsFirstDayOfMonth", (date, expected) => {
    expect(dateIsFirstDayOfMonth(date)).toBe(expected);
  });

  test.each([
    [new Date(2014, 12, 31), true],
    [new Date(2014, 12, 30), false],
    [new Date(2015, 1, 1), false],
  ])("dateIsLastDayOfMonth", (date, expected) => {
    expect(dateIsLastDayOfMonth(date)).toBe(expected);
  });

  test.each([
    [new Date(2000, 0, 1), true],
    [new Date(2004, 0, 1), true],
    [new Date(2008, 0, 1), true],
    [new Date(2009, 0, 1), false],
    [new Date(2010, 0, 1), false],
    [new Date(1900, 0, 1), false],
    [new Date(2100, 0, 1), false],
    [new Date(2200, 0, 1), false],
    [new Date(2300, 0, 1), false],
    [new Date(2400, 0, 1), true],
  ])("dateIsLeapYear", (date, expected) => {
    expect(dateIsLeapYear(date)).toBe(expected);
  });

  test.each([
    [new Date(2024, 0, 1), false], // Monday
    [new Date(2024, 0, 2), false], // Tuesday
    [new Date(2024, 0, 3), false], // Wednesday
    [new Date(2024, 0, 4), false], // Thursday
    [new Date(2024, 0, 5), false], // Friday
    [new Date(2024, 0, 6), true], // Saturday
    [new Date(2024, 0, 7), true], // Sunday
    [new Date(2024, 0, 8), false], // Monday
  ])("dateIsWeekend", (date, expected) => {
    expect(dateIsWeekend(date)).toBe(expected);
  });

  test.each([
    [new Date(2014, 3, 15), new Date(2014, 3, 15), 0],
    [new Date(2014, 3, 15), new Date(2014, 3, 16), 1],
    [new Date(2014, 3, 16), new Date(2014, 3, 15), 1],
    [new Date(2014, 3, 15, 0, 0), new Date(2014, 3, 15, 23, 59), 0],
    [new Date(2014, 3, 15, 23, 59), new Date(2014, 3, 16, 0, 0), 1],
    [null as unknown as Date, new Date(), Number.NaN],
    [new Date(), null as unknown as Date, Number.NaN],
    [undefined as unknown as Date, new Date(), Number.NaN],
    [new Date(), undefined as unknown as Date, Number.NaN],
    [42 as unknown as Date, new Date(), Number.NaN],
    [new Date(), 42 as unknown as Date, Number.NaN],
    ["2014-03-15" as unknown as Date, new Date(), Number.NaN],
    [new Date(), "2014-03-15" as unknown as Date, Number.NaN],
  ])("dateDifferenceInDays", (dateFrom, dateTo, expected) => {
    expect(dateDifferenceInDays(dateFrom, dateTo)).toBe(expected);
  });

  test.each([
    [new Date(2024, 0, 1), new Date(2024, 0, 2)],
    [new Date(2024, 0, 2), new Date(2024, 0, 3)],
    [new Date(2024, 0, 3), new Date(2024, 0, 4)],
    [new Date(2024, 0, 4), new Date(2024, 0, 5)],
    [new Date(2024, 0, 5), new Date(2024, 0, 8)],
    [new Date(2024, 0, 6), new Date(2024, 0, 8)],
    [new Date(2024, 0, 7), new Date(2024, 0, 8)],
    [new Date(2024, 0, 8), new Date(2024, 0, 9)],
    [null as unknown as Date, new Date(Number.NaN)],
    [undefined as unknown as Date, new Date(Number.NaN)],
    [42 as unknown as Date, new Date(Number.NaN)],
    ["test" as unknown as Date, new Date(Number.NaN)],
  ])("getNextBusinessDate", (date, expected) => {
    expect(getNextBusinessDate(date).getDate()).toBe(expected.getDate());
  });
});
