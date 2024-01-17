import { getEnumNameFromValue, StandardEnum } from "./enum";
import { isNullOrWhitespace } from "./string";

/**
 * Methods to help caching data of any type.
 * Data is put in containers and may be identified by a string key.
 * Data can be saved, retrieved and reset.
 * Based on Neolution.Abstractions.Caching.CacheProvider<TEnum>
 * Ref: https://github.com/neolution-ch/Neolution.Abstractions/blob/main/Neolution.Abstractions/Caching/CacheProvider.cs
 */
export class CacheProvider<TEnum> {
  /**
   * The enum variable
   */
  private readonly enumVariable: StandardEnum<TEnum>;

  /**
   * The name of the cache
   */
  private readonly cacheName: string;

  /**
   * The cache
   */
  private readonly cache = new Map<string, object>();

  /**
   * Initializes a new instance of the CacheProvider<TEnum> class
   * @param enumVariable The enum variable
   * @param cacheName The name of the cache
   */
  constructor(enumVariable: StandardEnum<TEnum>, cacheName: string) {
    this.enumVariable = enumVariable;
    this.cacheName = cacheName;
  }

  /**
   * Creates the cache key
   * @param container The container
   * @param key The key
   * @returns The cache key
   */
  private createCacheKey(container: TEnum, key?: string): string {
    let containerName = getEnumNameFromValue(this.enumVariable, container);

    if (key && !isNullOrWhitespace(key)) {
      containerName = `${containerName}_${key}`;
    }

    return `${this.cacheName}:${containerName}`;
  }

  /**
   * Gets cached data from the specified container
   * @param container The container
   * @param key The key
   * @returns The data from cache
   */
  getObject<T>(container: TEnum, key?: string): T | undefined {
    return this.cache.get(this.createCacheKey(container, key)) as T;
  }

  /**
   * Sets cached data identified by a key in the specified container
   * @param container The container
   * @param key The key
   * @param cacheObject The cache object
   */
  setObject<T>(container: TEnum, key: string | undefined, cacheObject: T): void {
    this.cache.set(this.createCacheKey(container, key), cacheObject as object);
  }

  /**
   * Resets cached data identified by a key of the specified container
   * @param container The container
   * @param key The key
   */
  reset(container: TEnum, key?: string): void {
    this.cache.delete(this.createCacheKey(container, key));
  }
}
