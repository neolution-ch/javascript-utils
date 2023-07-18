import { getEnumNameFromValue } from "./enum";

describe("enum tests", () => {
  test("getEnumNameFromValue", () => {
    enum TestEnum {
      A = 1,
      B = 2,
      C = 3,
    }

    const a = getEnumNameFromValue<TestEnum>(TestEnum, 2);

    expect(a).toBe("B");
  });
});
