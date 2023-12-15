import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from "./localStorage";

describe("localStorage tests", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("getLocalStorageItem not existing", () => {
    expect(getLocalStorageItem("test")).toBeUndefined();
  });

  test("getLocalStorageItem existing", () => {
    localStorage.setItem("test", '{"data":{"field1":"hello","field2":"world"}}');
    expect(getLocalStorageItem("test")).toMatchObject({ field1: "hello", field2: "world" });
  });

  test("getLocalStorageItem expired", () => {
    const expiredDate = new Date(new Date().getTime() - 1);
    localStorage.setItem("test", `{"data":true,"expirationDate":"${expiredDate.toISOString()}"}`);
    expect(localStorage.length).toBe(1);
    expect(getLocalStorageItem("test")).toBeUndefined();
    expect(localStorage.length).toBe(0);
  });

  test("setLocalStorageItem without expiration", () => {
    setLocalStorageItem("test", { field1: "hello", field2: "world" });
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem("test")).toBe('{"data":{"field1":"hello","field2":"world"}}');
  });

  test("setLocalStorageItem with expiration", () => {
    const expirationDate = new Date(2050, 1, 1, 16, 30, 45, 123);
    // Remove the system timezone to properly verify the serialized time
    const expirationDateWithoutTimezone = new Date(expirationDate.getTime() - expirationDate.getTimezoneOffset() * 60000);
    setLocalStorageItem("test", true, expirationDateWithoutTimezone);
    expect(localStorage.length).toBe(1);
    expect(localStorage.getItem("test")).toBe('{"data":true,"expirationDate":"2050-02-01T16:30:45.123Z"}');
  });

  test("removeLocalStorageItem", () => {
    localStorage.setItem("test", '{"data":true');
    expect(localStorage.length).toBe(1);
    removeLocalStorageItem("test");
    expect(localStorage.length).toBe(0);
  });
});
