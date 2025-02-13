import { isObject, convertNullToUndefined } from "./object";

describe("object tests", () => {
  test.each([
    // Invalid objects

    [null as unknown as object, false],
    [undefined as unknown as object, false],
    [0 as unknown as object, false],
    [10 as unknown as object, false],
    ["" as unknown as object, false],
    ["test" as unknown as object, false],
    [true as unknown as object, false],
    [false as unknown as object, false],
    [new Date(), false],
    [[], false],
    [/ab+c/, false],
    [() => true, false],

    // Valid objects
    [Object.create(null) as unknown as object, true],
    [Object.create({ hello: "world" }) as unknown as object, true],
    [{}, true],
    [{ hello: "world" }, true],
  ])("isObject", (obj, expected) => {
    expect(isObject(obj)).toBe(expected);
  });

  test.each([
    [{}, {}],
    [{ hello: "world" }, { hello: "world" }],

    [{ hello: null }, {}],

    [{ hello: "world", other: null }, { hello: "world" }],

    [{ nested: { prop1: "test", prop2: null } }, { nested: { prop1: "test" } }],
  ])("convertNullToUndefined", (obj, expected) => {
    convertNullToUndefined(obj);
    expect(obj).toStrictEqual(expected);
  });
});
