import { newGuid, emptyGuid, isValidGuid } from "./guid";

describe("guid tests", () => {
  test("newGuid", () => {
    expect(newGuid()).toMatch(/^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/);
  });

  test("emptyGuid", () => {
    expect(emptyGuid).toBe("00000000-0000-0000-0000-000000000000");
  });

  test.each([
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    [0 as unknown as string, false],
    [10 as unknown as string, false],
    [new Date() as unknown as string, false],
    ["", false],
    [" ", false],
    ["507956c7-30b3-4401-9800-e5e7f8f3276X", false],
    ["507956c7-30b3-4401-9800-e5e7f8f32761", true],
    ["f094d99a-347e-4fe5-eea2-08dbc5deb2a0", true],
    [newGuid(), true],
    [emptyGuid, true],
    ["3B467B14-CD99-4199-8E35-82B3C37182BA", true],
    ["ffffffff-ffff-ffff-ffff-ffffffffffff", true],
  ])("isValidGuid", (value, expected) => {
    expect(isValidGuid(value)).toBe(expected);
  });
});
