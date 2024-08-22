import { parseBool } from "./boolean";

describe("boolean tests", () => {
  test.each([
    // Test cases like in C#
    // https://github.com/dotnet/runtime/blob/main/src/libraries/System.Runtime/tests/System.Runtime.Tests/System/BooleanTests.cs
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    [0 as unknown as string, false],
    [1 as unknown as string, false],
    [10 as unknown as string, false],
    [new Date() as unknown as string, false],
    ["True", true],
    ["true", true],
    ["TRUE", true],
    ["tRuE", true],
    ["  True  ", true],
    ["True\0", true],
    [" \0 \0  True   \0 ", true],
    ["False", false],
    ["false", false],
    ["FALSE", false],
    ["fAlSe", false],
    ["False  ", false],
    ["False\0", false],
    ["  False \0\0\0  ", false],
    ["", false],
    [" ", false],
    ["Garbage", false],
    ["True\0Garbage", false],
    ["True\0True", false],
    ["True True", false],
    ["True False", false],
    ["False True", false],
    ["Fa lse", false],
    ["T", false],
    ["0", false],
    ["1", false],
  ])('parseBool("%s")', (value, expected) => {
    expect(parseBool(value)).toBe(expected);
  });
});
