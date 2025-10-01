import { formatSwissSocialInsuranceNumber, isValidSwissIbanNumber, isValidSwissSocialInsuranceNumber } from "./swissStandards";

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
  ])("check if the social insurance number is valid or not", (socialInsuranceNumberToCheck, expected) => {
    expect(isValidSwissSocialInsuranceNumber(socialInsuranceNumberToCheck)).toBe(expected);
  });

  test.each([
    [null as unknown as string, null, false],
    ["7569217076985", "756.9217.0769.85", true],
    ["7561234567891", "756.1234.5678.91", false],
    ["75 61 23 456789 1", "756.1234.5678.91", false],
    ["75 69 21 707698 5", "756.9217.0769.85", true],
  ])(
    "Check if the social insurance number gets formatted correctly",
    (unformattedSocialInsuranceNumber, expectedSocialInsuranceNumber, expectedIsValid) => {
      const result = formatSwissSocialInsuranceNumber(unformattedSocialInsuranceNumber);

      expect(result.socialInsuranceNumber).toBe(expectedSocialInsuranceNumber);
      expect(result.isValidSwissSocialInsuranceNumber).toBe(expectedIsValid);
    },
  );
});
