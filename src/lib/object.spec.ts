import { isObject, convertNullToUndefined, pathOf } from "./object";

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
    // Invalid objects
    [null as unknown as object, null],
    [undefined as unknown as object, undefined],

    // Valid objects
    [{}, {}],
    [{ hello: "world" }, { hello: "world" }],
    [{ hello: null }, {}],
    [{ hello: "world", other: null }, { hello: "world" }],
    [{ nested: { prop1: "test", prop2: null } }, { nested: { prop1: "test" } }],
    [{ nested: [{ prop1: "test", prop2: null }] }, { nested: [{ prop1: "test" }] }],
    [{ nested: [1, 2, null, 3, 4] }, { nested: [1, 2, undefined, 3, 4] }],
    [
      [{ hello: "world" }, null, { nested: { prop1: "test", prop2: null } }],
      [{ hello: "world" }, undefined, { nested: { prop1: "test" } }],
    ],
  ])("convertNullToUndefined", (obj, expected) => {
    convertNullToUndefined(obj);
    expect(obj).toStrictEqual(expected);
  });

  describe("pathOf", () => {
    interface TestObject {
      prop1: string;
      nested: {
        prop2: string;
        deepNested: {
          prop3: string;
        };
      };
      Recursion: {
        Recursion: {
          Recursion: {
            Recursion: string;
          };
        };
      };
    }

    test("should return correct path for simple property access", () => {
      expect(pathOf((x: TestObject) => x.prop1)).toBe("prop1");
    });

    test("should return correct path for nested property access", () => {
      expect(pathOf((x: TestObject) => x.nested.prop2)).toBe("nested.prop2");
    });

    test("should return correct path for deep nested property access", () => {
      expect(pathOf((x: TestObject) => x.nested.deepNested.prop3)).toBe("nested.deepNested.prop3");
    });

    test("should return correct path for recursive property access (matching C# example)", () => {
      expect(pathOf((x: TestObject) => x.Recursion.Recursion.Recursion.Recursion)).toBe("Recursion.Recursion.Recursion.Recursion");
    });

    test("should handle different property types", () => {
      expect(pathOf((x: { id: number }) => x.id)).toBe("id");
      expect(pathOf((x: { name: string }) => x.name)).toBe("name");
    });

    test("should return empty string for expression that doesn't access properties", () => {
      expect(pathOf(() => "constant")).toBe("");
    });

    test("should handle expressions that access properties on returned values", () => {
      interface ComplexObject {
        getData: {
          value: string;
        };
      }

      // This should work as it's accessing a property, not calling a function
      const path = pathOf((x: ComplexObject) => x.getData.value);
      expect(path).toBe("getData.value");
    });

    test("should handle expressions that may throw errors", () => {
      interface TestObject {
        prop: string;
      }

      // This expression might throw an error during execution, but the path should still be captured
      const path = pathOf((x: TestObject) => {
        // This would throw in normal execution, but we want to capture the path
        return x.prop.toString();
      });
      expect(path).toBe("prop.toString");
    });
  });
});
