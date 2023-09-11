import { DateHandler } from "./dateHandler";

describe("DateHandler.cy.tsx", () => {
  test("get date string", () => {
    expect(DateHandler.getDateString("2022-10-15")).toBe("15.10.2022");
  });

  test("get date string formatted", () => {
    DateHandler.setMonthTranslationMethod((month) => (month === 11 ? "November" : month.toString()));
    expect(DateHandler.getDateFormatted(new Date(2022, 10, 15, 12, 33), "dd MMMM yyyy hh:mm")).toBe("15 November 2022 12:33");
  });

  test("get date string default", () => {
    const testDate = undefined as unknown as Date;
    expect(DateHandler.getDateFormattedWithDefault(testDate, "dd MMMM yyyy hh:mm", "01.01.1999")).toBe("01.01.1999");
  });
});
