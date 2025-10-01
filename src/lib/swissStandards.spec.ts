import { isValidSwissIbanNumber, isValidSwissSocialInsuranceNumber, formatSwissIbanNumber } from "./swissStandards";

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
  ])("check if the swiss IBAN number is valid or not", (iBanNumberToCheck, expected) => {
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
  ])("check if the siwss IBAN number with letters is valid or not", (iBanNumberToCheck, expected) => {
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
    [null as unknown as string, null, false],
    [undefined as unknown as string, undefined, false],
    ["CH9300762011623852957", "CH93 0076 2011 6238 5295 7", true],
    ["ch9300762011623852957", "CH93 0076 2011 6238 5295 7", true],
    ["ch9301234567891011127", "CH93 0123 4567 8910 1112 7", false],
    ["DE93 00 76 2011 62385295 7", "DE93 00 76 2011 62385295 7", false],
    ["D 93 00 76 2011 62385295 7", "D 93 00 76 2011 62385295 7", false],
    ["Ch 93 0076 20 1 162385 295 7", "CH93 0076 2011 6238 5295 7", true],
  ])("Check if the IBAN number gets formatted correctly", (unformattedIbanNumber, expectedIbanNumber, expectedIsValid) => {
    const result = formatSwissIbanNumber(unformattedIbanNumber);

    expect(result.ibanNumber).toBe(expectedIbanNumber);
    expect(result.isValidSwissIbanNumber).toBe(expectedIsValid);
  });
});
