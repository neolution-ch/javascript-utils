import { newGuid, emptyGuid } from "./guid";

describe("guid tests", () => {
  test("newGuid", () => {
    expect(newGuid()).toMatch(/^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/);
  });

  test("emptyGuid", () => {
    expect(emptyGuid).toBe("00000000-0000-0000-0000-000000000000");
  });
});
