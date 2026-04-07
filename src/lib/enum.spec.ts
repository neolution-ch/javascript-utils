import { getEnumNames, getEnumNameFromValue, getEnumValueFromName, getEnumValues, parseEnum } from "./enum";

enum TestEnum {
  A = 1,
  B = 2,
  C = 3,
}

enum TestEnumString {
  A = "Test3",
  B = "Test1",
  C = "Test4",
}

describe("enum tests", () => {
  test("getEnumNameFromValue/getEnumValueFromName with integer values", () => {
    const name = getEnumNameFromValue(TestEnum, TestEnum.B);
    expect(name).toBe("B");

    const value = getEnumValueFromName(TestEnum, "B");
    expect(value).toBe(TestEnum.B);
  });

  test("getEnumValueFromName/getEnumNameFromValue with string values", () => {
    const name = getEnumNameFromValue(TestEnumString, TestEnumString.B);
    expect(name).toBe("B");

    const value = getEnumValueFromName(TestEnumString, "B");
    expect(value).toBe(TestEnumString.B);
  });

  test("getEnumNames/getEnumValues with integer values", () => {
    const names = getEnumNames(TestEnum);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues(TestEnum);
    expect(values).toStrictEqual([TestEnum.A, TestEnum.B, TestEnum.C]);
  });

  test("getEnumNames/getEnumValues with unspecified values", () => {
    enum TestEnumUnspecified {
      A,
      B,
      C,
    }
    const names = getEnumNames(TestEnumUnspecified);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues(TestEnumUnspecified);
    expect(values).toStrictEqual([0, 1, 2]);
  });

  test("getEnumNames/getEnumValues with progressive values", () => {
    enum TestEnumProgressive {
      A = 10,
      B,
      C,
    }
    const names = getEnumNames(TestEnumProgressive);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues(TestEnumProgressive);
    expect(values).toStrictEqual([10, 11, 12]);
  });

  test("getEnumNames/getEnumValues with constants values", () => {
    enum TestEnumConstants {
      None,
      Read = 1 << 1,
      Write = 1 << 2,
      ReadWrite = Read | Write,
    }

    const names = getEnumNames(TestEnumConstants);
    expect(names).toStrictEqual(["None", "Read", "Write", "ReadWrite"]);

    const values = getEnumValues(TestEnumConstants);
    expect(values).toStrictEqual([0, 2, 4, 6]);
  });

  test("getEnumNames/getEnumValues with string values", () => {
    const names = getEnumNames(TestEnumString);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues(TestEnumString);
    expect(values).toStrictEqual([TestEnumString.A, TestEnumString.B, TestEnumString.C]);
  });

  test("getEnumNames/getEnumValues with empty enum", () => {
    enum TestEnumEmpty {}

    const names = getEnumNames(TestEnumEmpty);
    expect(names).toStrictEqual([]);

    const values = getEnumValues(TestEnumEmpty);
    expect(values).toStrictEqual([]);
  });

  test.each([
    // Other types
    [null as unknown as string, undefined],
    [undefined as unknown as string, undefined],
    [0 as unknown as string, undefined],
    [2 as unknown as string, TestEnum.B],
    [10 as unknown as string, undefined],
    [new Date() as unknown as string, undefined],

    // Actual strings
    ["1", TestEnum.A],
    ["2", TestEnum.B],
    ["3", TestEnum.C],
    ["", undefined],
    ["   ", undefined],
    ["A", undefined],
    ["5", undefined],
    ["test", undefined],
  ])("parseEnum with integer values", (value, expected) => {
    expect(parseEnum(TestEnum, value)).toBe(expected);
  });

  test.each([
    // Other types
    [null as unknown as string, undefined],
    [undefined as unknown as string, undefined],
    [0 as unknown as string, undefined],
    [10 as unknown as string, undefined],
    [new Date() as unknown as string, undefined],

    // Actual strings
    ["Test3", TestEnumString.A],
    ["Test1", TestEnumString.B],
    ["Test4", TestEnumString.C],
    ["", undefined],
    ["   ", undefined],
    ["A", undefined],
    ["5", undefined],
    ["test", undefined],
  ])("parseEnum with string values", (value, expected) => {
    expect(parseEnum(TestEnumString, value)).toBe(expected);
  });
});
