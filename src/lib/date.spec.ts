import { dateIsValid, dateIsLastDayOfMonth, dateDifferenceInDays } from "./date";

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
    [new Date(2014, 12, 31), true],
    [new Date(2014, 12, 30), false],
    [new Date(2015, 1, 1), false],
  ])("dateIsLastDayOfMonth", (date, expected) => {
    expect(dateIsLastDayOfMonth(date)).toBe(expected);
  });

  test.each([
    [new Date(2014, 3, 15), new Date(2014, 3, 15), 0],
    [new Date(2014, 3, 15), new Date(2014, 3, 16), 1],
    [new Date(2014, 3, 16), new Date(2014, 3, 15), 1],
    [new Date(2014, 3, 15, 0, 0), new Date(2014, 3, 15, 23, 59), 0],
    [new Date(2014, 3, 15, 23, 59), new Date(2014, 3, 16, 0, 0), 1],
    [null as unknown as Date, new Date(), Number.NaN],
    [new Date(), null as unknown as Date, Number.NaN],
  ])("dateDifferenceInDays", (dateFrom, dateTo, expected) => {
    expect(dateDifferenceInDays(dateFrom, dateTo)).toBe(expected);
  });
});
