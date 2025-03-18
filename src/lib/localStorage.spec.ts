import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from "./localStorage";

describe("localStorage tests", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("localStorage not supported", () => {
    const { localStorage } = global;
    delete (global as Partial<typeof global>).localStorage;
    expect(() => {
      getLocalStorageItem("test");
    }).toThrow("localStorage not supported");
    global.localStorage = localStorage;
  });

  test("getLocalStorageItem not existing", () => {
    expect(getLocalStorageItem("test")).toBeUndefined();
  });

  test("getLocalStorageItem existing", () => {
    const testData = { field1: "hello", field2: "world" };
    localStorage.setItem("test", JSON.stringify({ data: testData }));
    expect(getLocalStorageItem("test")).toEqual(testData);
  });

  test("getLocalStorageItem expired", () => {
    const expirationDate = new Date(new Date().getTime() - 1);
    localStorage.setItem("test", JSON.stringify({ data: true, expirationDate: expirationDate.toISOString() }));
    expect(localStorage.length).toBe(1);
    expect(getLocalStorageItem("test")).toBeUndefined();
    expect(localStorage.length).toBe(0);
  });

  test("setLocalStorageItem without expiration", () => {
    const testData = { field1: "hello", field2: "world" };
    setLocalStorageItem("test", testData);
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem("test")).toBe(JSON.stringify({ data: testData }));
  });

  test("setLocalStorageItem with expiration", () => {
    const expirationDate = new Date(2050, 1, 1, 16, 30, 45, 123);
    setLocalStorageItem("test", true, expirationDate);
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem("test")).toBe(JSON.stringify({ data: true, expirationDate: expirationDate.toISOString() }));
  });

  test("removeLocalStorageItem", () => {
    localStorage.setItem("test", JSON.stringify({ data: true }));
    expect(localStorage.length).toBe(1);
    removeLocalStorageItem("test");
    expect(localStorage.length).toBe(0);
  });
});
