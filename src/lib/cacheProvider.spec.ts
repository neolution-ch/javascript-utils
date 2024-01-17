import { CacheProvider } from "./cacheProvider";

enum CacheContainer {
  Colors,
  Seasons,
}

const redColor = { hex: "#FF0000", rgb: "255,0,0" };
const greenColor = { hex: "#00FF00", rgb: "0,255,0" };
const blueColor = { hex: "#0000FF", rgb: "0,0,255" };
const seasons = ["Spring", "Summer", "Fall", "Winter"];

let cacheProvider: CacheProvider<CacheContainer>;

const insertTestData = () => {
  cacheProvider.setObject(CacheContainer.Colors, "Red", redColor);
  cacheProvider.setObject(CacheContainer.Colors, "Green", greenColor);
  cacheProvider.setObject(CacheContainer.Colors, "Blue", blueColor);
  cacheProvider.setObject(CacheContainer.Seasons, undefined, seasons);
};

describe("CacheProvider tests", () => {
  beforeEach(() => {
    cacheProvider = new CacheProvider<CacheContainer>(CacheContainer, "CacheContainer");
  });

  test.each([
    [CacheContainer.Colors, null, "CacheContainer:Colors"],
    [CacheContainer.Colors, undefined, "CacheContainer:Colors"],
    [CacheContainer.Colors, "", "CacheContainer:Colors"],
    [CacheContainer.Colors, "Red", "CacheContainer:Colors_Red"],
  ])("createCacheKey", (container, key, expected) => {
    expect(cacheProvider["createCacheKey"](container, key as unknown as string)).toBe(expected);
  });

  test("setObject with key", () => {
    expect(cacheProvider["cache"].size).toBe(0);
    cacheProvider.setObject(CacheContainer.Colors, "Red", redColor);
    expect(cacheProvider["cache"].size).toBe(1);
    expect(cacheProvider["cache"].get("CacheContainer:Colors_Red")).toBe(redColor);
    cacheProvider.setObject(CacheContainer.Colors, "Green", greenColor);
    expect(cacheProvider["cache"].size).toBe(2);
    expect(cacheProvider["cache"].get("CacheContainer:Colors_Green")).toBe(greenColor);
    cacheProvider.setObject(CacheContainer.Colors, "Blue", blueColor);
    expect(cacheProvider["cache"].size).toBe(3);
    expect(cacheProvider["cache"].get("CacheContainer:Colors_Blue")).toBe(blueColor);
  });

  test("setObject without key", () => {
    expect(cacheProvider["cache"].size).toBe(0);
    cacheProvider.setObject(CacheContainer.Seasons, undefined, seasons);
    expect(cacheProvider["cache"].size).toBe(1);
    expect(cacheProvider["cache"].get("CacheContainer:Seasons")).toBe(seasons);
  });

  test("getObject with/without key", () => {
    insertTestData();
    expect(cacheProvider.getObject(CacheContainer.Colors)).toBe(undefined);
    expect(cacheProvider.getObject(CacheContainer.Colors, "Yellow")).toBe(undefined);
    expect(cacheProvider.getObject(CacheContainer.Colors, "Red")).toBe(redColor);
    expect(cacheProvider.getObject(CacheContainer.Colors, "Green")).toBe(greenColor);
    expect(cacheProvider.getObject(CacheContainer.Colors, "Blue")).toBe(blueColor);
    expect(cacheProvider.getObject(CacheContainer.Seasons)).toBe(seasons);
  });

  test("reset with key", () => {
    insertTestData();
    expect(cacheProvider["cache"].size).toBe(4);
    cacheProvider.reset(CacheContainer.Colors, "Blue");
    expect(cacheProvider["cache"].size).toBe(3);
    cacheProvider.reset(CacheContainer.Colors, "Green");
    expect(cacheProvider["cache"].size).toBe(2);
    cacheProvider.reset(CacheContainer.Colors, "Red");
    expect(cacheProvider["cache"].size).toBe(1);
  });

  test("reset without key", () => {
    insertTestData();
    expect(cacheProvider["cache"].size).toBe(4);
    cacheProvider.reset(CacheContainer.Seasons);
    expect(cacheProvider["cache"].size).toBe(3);
  });
});
