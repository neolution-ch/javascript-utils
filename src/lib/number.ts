/**
 * Returns a number whose value is limited to the given range
 * @param value The initial value
 * @param min The lower boundary
 * @param max The upper boundary
 * @returns A number in the range (min, max)
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new Error(`'${min}' cannot be greater than '${max}'.`);
  }
  return Math.min(Math.max(value, min), max);
}

/**
 * Round a number with the specified precision
 * @param value The number to round
 * @param precision The desired precision
 * @returns The number rounded with the specified precision
 */
export function roundPrecision(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}
