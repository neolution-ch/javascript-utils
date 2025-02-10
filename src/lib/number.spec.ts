import { clamp, roundPrecision } from "./number";

describe("number tests", () => {
  test.each([
    // eslint-disable-next-line unicorn/no-null
    [null as unknown as number, null as unknown as number, null as unknown as number, 0],
    // eslint-disable-next-line unicorn/no-null
    [null as unknown as number, null as unknown as number, 2, 0],
    // eslint-disable-next-line unicorn/no-null
    [null as unknown as number, 1, 2, 1],
    [undefined as unknown as number, undefined as unknown as number, undefined as unknown as number, Number.NaN],
    [undefined as unknown as number, undefined as unknown as number, 2, Number.NaN],
    [undefined as unknown as number, 1, 2, Number.NaN],
    [1, undefined as unknown as number, undefined as unknown as number, Number.NaN],
    [1, undefined as unknown as number, 2, Number.NaN],
    [1, 1, undefined as unknown as number, Number.NaN],
    ["test" as unknown as number, "test" as unknown as number, "test" as unknown as number, Number.NaN],
    ["test" as unknown as number, 1, 2, Number.NaN],
    [1, "test" as unknown as number, "test" as unknown as number, Number.NaN],
    [-1, -1, 1, -1],
    [0, -1, 1, 0],
    [1, -1, 1, 1],
    [-2, -1, 1, -1],
    [2, -1, 1, 1],
  ])("clamp", (value, min, max, expected) => {
    expect(clamp(value, min, max)).toBe(expected);
  });

  test("clamp min greater than max", () => {
    expect(() => {
      clamp(0, 1, 0);
    }).toThrow("'1' cannot be greater than '0'.");
  });

  test.each([
    // eslint-disable-next-line unicorn/no-null
    [null as unknown as number, null as unknown as number, 0],
    // eslint-disable-next-line unicorn/no-null
    [null as unknown as number, 2, 0],
    // eslint-disable-next-line unicorn/no-null
    [2, null as unknown as number, 2],
    [undefined as unknown as number, undefined as unknown as number, Number.NaN],
    [undefined as unknown as number, 2, Number.NaN],
    [2, undefined as unknown as number, Number.NaN],
    [0, 0, 0],
    [0, 1, 0],
    [0, 2, 0],
    [0.4, 0, 0],
    [0.4, 1, 0.4],
    [0.4, 2, 0.4],
    [0.5, 0, 1],
    [0.5, 1, 0.5],
    [0.5, 2, 0.5],
    [0.44, 0, 0],
    [0.44, 1, 0.4],
    [0.44, 2, 0.44],
    [0.45, 0, 0],
    [0.45, 1, 0.5],
    [0.45, 2, 0.45],
    [0.454, 0, 0],
    [0.454, 1, 0.5],
    [0.454, 2, 0.45],
    [0.455, 0, 0],
    [0.455, 1, 0.5],
    [0.455, 2, 0.46],
  ])("roundPrecision", (value, precision, expected) => {
    expect(roundPrecision(value, precision)).toBe(expected);
  });
});
