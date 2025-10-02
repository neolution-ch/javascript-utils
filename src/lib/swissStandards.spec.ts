import {
  isValidSwissIbanNumber,
  isValidSwissSocialInsuranceNumber,
  tryParseSwissIbanNumber,
  tryParseSwissSocialInsuranceNumber,
} from "./swissStandards";

describe("Swiss standards test", () => {
  test.each([
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    ["CH9300762011623852957", true],
    ["CH93 0076 2011 6238 5295 7", true],
    ["CH930076 20116238 5295 7", false],
    ["CH93-0076-2011-6238-5295-7", false],
    ["CH93 0000 0000 0000 0000 1", false],
    ["ch93 0076 2011 6238 5295 7", false],
    ["c93 0076 2011 6238 5295 7", false],
    ["DE93 0076 2011 6238 5295 7", false],
  ])("check if the Swiss IBAN number is valid or not", (iBanNumberToCheck, expected) => {
    expect(isValidSwissIbanNumber(iBanNumberToCheck)).toBe(expected);
  });

  test.each([
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    ["CH3400762ABC123DEF456", true],
    ["CH34 0076 2ABC 123D EF45 6", true],
    ["Some random string", false],
    ["DE34 0076 2ABC 123D EF45 3", false],
    ["CH34 0076 2ABC 123D EF45 \n6", false],
    ["CH34 0076 2ABC 123D EF45 !", false],
  ])("check if the Swiss IBAN number with letters is valid or not", (iBanNumberToCheck, expected) => {
    expect(isValidSwissIbanNumber(iBanNumberToCheck)).toBe(expected);
  });

  test.each([
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    ["7561234567891", false],
    ["7569217076985", true],
    ["756.92170769.85", false],
    ["756.9217.0769.85", true],
    ["756..9217.0769.85", false],
    ["756.1234.5678.91", false],
    ["test756.9217.0769.85", false],
    ["7.56..9217...0769.85", false],
  ])("check if the social insurance number is valid or not", (swissSocialInsuranceNumber, expected) => {
    expect(isValidSwissSocialInsuranceNumber(swissSocialInsuranceNumber)).toBe(expected);
  });

  test.each([
    [null as unknown as string, { isValid: false, iban: undefined, ibanFormatted: undefined }],
    [undefined as unknown as string, { isValid: false, iban: undefined, ibanFormatted: undefined }],
    ["", { isValid: false, iban: undefined, ibanFormatted: undefined }],
    ["CH94 0076 2011 6238 5295 7", { isValid: false, iban: undefined, ibanFormatted: undefined }],
    ["CH1000000ABC123DEF456", { isValid: false, iban: undefined, ibanFormatted: undefined }],
    ["CH93-0076,2011.6238\n5295\n7", { isValid: true, iban: "CH9300762011623852957", ibanFormatted: "CH93 0076 2011 6238 5295 7" }],
    ["CH9300762011623852957", { isValid: true, iban: "CH9300762011623852957", ibanFormatted: "CH93 0076 2011 6238 5295 7" }],
    ["CH3400762ABC123DEF456", { isValid: true, iban: "CH3400762ABC123DEF456", ibanFormatted: "CH34 0076 2ABC 123D EF45 6" }],
    ["CH93 0076 2011 6238 5295 7", { isValid: true, iban: "CH9300762011623852957", ibanFormatted: "CH93 0076 2011 6238 5295 7" }],
    ["CH34 0076 2ABC 123D EF45 6", { isValid: true, iban: "CH3400762ABC123DEF456", ibanFormatted: "CH34 0076 2ABC 123D EF45 6" }],
  ])("check if the Swiss IBAN number gets parsed correctly", (unformattedSwissIbanNumber, expected) => {
    expect(tryParseSwissIbanNumber(unformattedSwissIbanNumber)).toEqual(expected);
  });

  test.each([
    [
      undefined as unknown as string,
      { isValid: false, swissSocialInsuranceNumber: undefined, swissSocialInsuranceNumberFormatted: undefined },
    ],
    [null as unknown as string, { isValid: false, swissSocialInsuranceNumber: undefined, swissSocialInsuranceNumberFormatted: undefined }],
    [
      "7569217076985",
      { isValid: true, swissSocialInsuranceNumber: "7569217076985", swissSocialInsuranceNumberFormatted: "756.9217.0769.85" },
    ],
    [
      "756.9217.0769.85",
      { isValid: true, swissSocialInsuranceNumber: "7569217076985", swissSocialInsuranceNumberFormatted: "756.9217.0769.85" },
    ],
    [
      "7 56-9217.076 + 9.8 >5",
      { isValid: true, swissSocialInsuranceNumber: "7569217076985", swissSocialInsuranceNumberFormatted: "756.9217.0769.85" },
    ],
    [
      "7 56-9217.076 + 9.8 \n5",
      { isValid: true, swissSocialInsuranceNumber: "7569217076985", swissSocialInsuranceNumberFormatted: "756.9217.0769.85" },
    ],
    ["7561234567891", { isValid: false, swissSocialInsuranceNumber: undefined, swissSocialInsuranceNumberFormatted: undefined }],
  ])("check if the Swiss IBAN number gets parsed correctly", (unformattedSwissIbanNumber, expected) => {
    expect(tryParseSwissSocialInsuranceNumber(unformattedSwissIbanNumber)).toEqual(expected);
  });
});
