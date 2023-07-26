import { getEnumNames, getEnumNameFromValue, getEnumValueFromName, getEnumValues } from "./enum";

describe("enum tests", () => {
  test("getEnumNameFromValue or Name with integer values", () => {
    enum TestEnum {
      A = 1,
      B = 2,
      C = 3,
    }

    const name = getEnumNameFromValue<TestEnum>(TestEnum, TestEnum.B);
    expect(name).toBe("B");

    const value = getEnumValueFromName<TestEnum>(TestEnum, "B");
    expect(value).toBe(TestEnum.B);
  });

  test("getEnumValueFromName or Value with string values", () => {
    enum TestEnum {
      A = "Test3",
      B = "Test1",
      C = "Test4",
    }

    const name = getEnumNameFromValue<TestEnum>(TestEnum, TestEnum.B);
    expect(name).toBe("B");

    const value = getEnumValueFromName<TestEnum>(TestEnum, "B");
    expect(value).toBe(TestEnum.B);
  });

  test("getEnumNames or Values with integer values", () => {
    enum TestEnum {
      A = 1,
      B = 2,
      C = 3,
    }

    const names = getEnumNames<TestEnum>(TestEnum);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues<TestEnum>(TestEnum);
    expect(values).toStrictEqual([TestEnum.A, TestEnum.B, TestEnum.C]);
  });

  test("getEnumNames or Labels with unspecified values", () => {
    enum TestEnum {
      A,
      B,
      C,
    }
    const names = getEnumNames<TestEnum>(TestEnum);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues<TestEnum>(TestEnum);
    expect(values).toStrictEqual([0, 1, 2]);
  });

  test("getEnumNames or Labels with progressive values", () => {
    enum TestEnum {
      A = 10,
      B,
      C,
    }
    const names = getEnumNames<TestEnum>(TestEnum);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues<TestEnum>(TestEnum);
    expect(values).toStrictEqual([10, 11, 12]);
  });

  test("getEnumNames or Labels with constants values", () => {
    enum TestEnum {
      None,
      Read = 1 << 1,
      Write = 1 << 2,
      ReadWrite = Read | Write,
    }

    const names = getEnumNames<TestEnum>(TestEnum);
    expect(names).toStrictEqual(["None", "Read", "Write", "ReadWrite"]);

    const values = getEnumValues<TestEnum>(TestEnum);
    expect(values).toStrictEqual([0, 2, 4, 6]);
  });

  test("getEnumNames or Values with string values", () => {
    enum TestEnum {
      A = "Test3",
      B = "Test1",
      C = "Test4",
    }

    const names = getEnumNames<TestEnum>(TestEnum);
    expect(names).toStrictEqual(["A", "B", "C"]);

    const values = getEnumValues<TestEnum>(TestEnum);
    expect(values).toStrictEqual([TestEnum.A, TestEnum.B, TestEnum.C]);
  });
});
