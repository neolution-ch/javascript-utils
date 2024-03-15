import { newGuid, emptyGuid, isValidGuid } from "./guid";

describe("guid tests", () => {
  test("newGuid", () => {
    expect(newGuid()).toMatch(/^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/);
  });

  test("emptyGuid", () => {
    expect(emptyGuid).toBe("00000000-0000-0000-0000-000000000000");
  });

  test("isValidGuid", () => {
    expect(isValidGuid(newGuid().toString())).toBeTruthy();
    expect(isValidGuid("507956c7-30b3-4401-9800-e5e7f8f32761")).toBeTruthy();
    expect(isValidGuid("Im not a guid")).toBeFalsy();
    expect(isValidGuid("507956c7-30b3-4401-9800-e5e7f8f3276")).toBeFalsy();
  });
});
