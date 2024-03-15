import { newGuid, emptyGuid, validateGuid } from "./guid";

describe("guid tests", () => {
  test("newGuid", () => {
    expect(newGuid()).toMatch(/^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/);
  });

  test("emptyGuid", () => {
    expect(emptyGuid).toBe("00000000-0000-0000-0000-000000000000");
  });

  test("validateGuid", () => {
    expect(validateGuid(newGuid().toString())).toBeTruthy();
    expect(validateGuid("507956c7-30b3-4401-9800-e5e7f8f32761")).toBeTruthy();
    expect(validateGuid("Im not a guid")).toBeFalsy();
    expect(validateGuid("507956c7-30b3-4401-9800-e5e7f8f3276")).toBeFalsy();
  });
});
