import { isNullOrEmpty, isNullOrWhitespace, capitalize } from "./string";

describe("string tests", () => {
  test.each([
    // Other types

    [null as unknown as string, true],
    [undefined as unknown as string, true],
    [0 as unknown as string, true],
    [10 as unknown as string, true],
    [new Date() as unknown as string, true],

    // Actual strings
    ["", true],
    [" ", false],
    ["     ", false],
    ["Not empty", false],
  ])("isNullOrEmpty", (value, expected) => {
    expect(isNullOrEmpty(value)).toBe(expected);
  });

  test.each([
    // Other types

    [null as unknown as string, true],
    [undefined as unknown as string, true],
    [0 as unknown as string, true],
    [10 as unknown as string, true],
    [new Date() as unknown as string, true],

    // Actual strings
    ["", true],
    [" ", true],
    ["     ", true],
    ["Not empty", false],

    // String escape sequences
    ["\t", true], // Horizontal tab (0x0009)
    ["\n", true], // New line (0x000A)
    ["\v", true], // Vertical tab (0x000B)
    ["\f", true], // Form feed (0x000C)
    ["\r", true], // Carriage return (0x000D)

    // Unicode Characters of Category "Space Separator"
    ["\u0020", true], // Space
    ["\u00A0", true], // No-Break Space (nbsp)
    ["\u1680", true], // Ogham Space Mark
    ["\u2000", true], // En Quad
    ["\u2001", true], // Em Quad
    ["\u2002", true], // En Space
    ["\u2003", true], // Em Space
    ["\u2004", true], // Three-Per-Em Space
    ["\u2005", true], // Four-Per-Em Space
    ["\u2006", true], // Six-Per-Em Space
    ["\u2007", true], // Figure Space
    ["\u2008", true], // Punctuation Space
    ["\u2009", true], // Thin Space
    ["\u200A", true], // Hair Space
    ["\u2028", true], // Line Separator
    ["\u2029", true], // Paragraph Separator
    ["\u202F", true], // Narrow No-Break Space (nnbsp)
    ["\u205F", true], // Medium Mathematical Space
    ["\u3000", true], // Ideographic Space
  ])("isNullOrWhitespace", (value, expected) => {
    expect(isNullOrWhitespace(value)).toBe(expected);
  });

  test.each([
    [null as unknown as string, null],
    [undefined as unknown as string, undefined],
    ["", ""],
    ["hello", "Hello"],
    ["hello world", "Hello world"],
  ])("capitalize", (value, expected) => {
    expect(capitalize(value)).toBe(expected);
  });
});
