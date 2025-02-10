import { dateIsValid } from "./date";

/**
 * The localStorage item
 */
interface LocalStorageItem<T> {
  /**
   * The data
   */
  data: T;

  /**
   * The expiration date
   */
  expirationDate?: Date;
}

/**
 * Check if the localStorage is supported
 */
const checkLocalStorageSupport = () => {
  if (typeof localStorage === "undefined") {
    throw new TypeError("localStorage not supported");
  }
};

/**
 * Get an item from the localStorage
 * @param key The key
 * @returns The item
 */
export function getLocalStorageItem<T>(key: string): T | undefined {
  checkLocalStorageSupport();

  const item = localStorage.getItem(key);
  if (!item) {
    return undefined;
  }

  const parsedItem = JSON.parse(item) as LocalStorageItem<T>;

  if (parsedItem.expirationDate) {
    const revivedExpirationDate = new Date(parsedItem.expirationDate);
    if (dateIsValid(revivedExpirationDate) && revivedExpirationDate < new Date()) {
      localStorage.removeItem(key);
      return undefined;
    }
  }

  return parsedItem.data;
}

/**
 * Set an item in the localStorage
 * @param key The key
 * @param data The item data
 * @param expirationDate The expiration date
 */
export function setLocalStorageItem<T>(key: string, data: T, expirationDate?: Date): void {
  checkLocalStorageSupport();
  localStorage.setItem(key, JSON.stringify({ data, expirationDate }));
}

/**
 * Remove an item from the localStorage
 * @param key The key
 */
export function removeLocalStorageItem(key: string): void {
  checkLocalStorageSupport();
  localStorage.removeItem(key);
}
