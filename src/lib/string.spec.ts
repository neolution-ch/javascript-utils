import { isNullOrEmpty, isNullOrWhitespace, capitalize, uncapitalize, truncate, trim, ltrim, rtrim, splitLines } from "./string";

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

  test.each([
    [null as unknown as string, null],
    [undefined as unknown as string, undefined],
    ["", ""],
    ["A", "a"],
    ["Hello", "hello"],
    ["Hello world", "hello world"],
    ["hello world", "hello world"],
  ])("uncapitalize", (value, expected) => {
    expect(uncapitalize(value)).toBe(expected);
  });

  test.each([
    [null as unknown as string, 10, "...", ""],
    [undefined as unknown as string, 10, "...", ""],
    ["", 10, "...", ""],
    ["hello", 10, "...", "hello"],
    ["hello", 5, "...", "hello"],
    ["hello world", 5, "...", "hello..."],
    ["hello world", 8, "...", "hello wo..."],
    ["hello world", 11, "...", "hello world"],
    ["hello world", 0, "...", "..."],
    ["hello", 3, ">>", "hel>>"],
    ["test", 2, "", "te"],
  ])("truncate", (value, maxLength, suffix, expected) => {
    expect(truncate(value, maxLength, suffix)).toBe(expected);
  });

  test.each([
    [null as unknown as string, " ", ""],
    [undefined as unknown as string, " ", ""],
    ["", " ", ""],
    ["hello", " ", "hello"],
    [" hello ", " ", "hello"],
    ["  hello  ", " ", "hello"],
    ["xxxhelloxxx", "xxx", "hello"],
    ["abcabchelloabcabc", "abc", "hello"],
    ["abcdefabcdef", "abc", "defabcdef"],
    ["abcdefabcdef", "def", "abcdefabc"],
    ["   hello   ", undefined as unknown as string, "hello"],
  ])("trim", (value, needle, expected) => {
    expect(trim(value, needle)).toBe(expected);
  });

  test.each([
    [null as unknown as string, " ", ""],
    [undefined as unknown as string, " ", ""],
    ["", " ", ""],
    ["hello", " ", "hello"],
    [" hello", " ", "hello"],
    ["  hello", " ", "hello"],
    ["hello ", " ", "hello "],
    ["xxxhello", "xxx", "hello"],
    ["abcabchello", "abc", "hello"],
    ["hello", "xyz", "hello"],
    ["", "abc", ""],
    ["abc", "", "abc"],
    ["hello", null as unknown as string, "hello"],
    ["hello", undefined as unknown as string, "hello"],
    ["", "", ""],
    ["hello", "", "hello"],
    ["", "xyz", ""],
  ])("ltrim", (value, needle, expected) => {
    expect(ltrim(value, needle)).toBe(expected);
  });

  test.each([
    [null as unknown as string, " ", ""],
    [undefined as unknown as string, " ", ""],
    ["", " ", ""],
    ["hello", " ", "hello"],
    ["hello ", " ", "hello"],
    ["hello  ", " ", "hello"],
    [" hello", " ", " hello"],
    ["helloxxx", "xxx", "hello"],
    ["helloabcabc", "abc", "hello"],
    ["hello", "xyz", "hello"],
    ["", "abc", ""],
    ["abc", "", "abc"],
    ["hello", null as unknown as string, "hello"],
    ["hello", undefined as unknown as string, "hello"],
    ["abc", "abc", ""],
    ["", "", ""],
    ["hello", "", "hello"],
    ["", "xyz", ""],
  ])("rtrim", (value, needle, expected) => {
    expect(rtrim(value, needle)).toBe(expected);
  });

  test.each([
    [null as unknown as string, []],
    [undefined as unknown as string, []],
    ["", [""]],
    ["hello", ["hello"]],
    ["hello\nworld", ["hello", "world"]],
    ["hello\r\nworld", ["hello", "world"]],
    ["hello\rworld", ["hello", "world"]],
    ["hello\n\nworld", ["hello", "", "world"]],
    ["hello\r\n\r\nworld", ["hello", "", "world"]],
    ["line1\nline2\rline3\r\nline4", ["line1", "line2", "line3", "line4"]],
    ["\n", ["", ""]],
    ["\r\n", ["", ""]],
    ["\r", ["", ""]],
    ["hello\n", ["hello", ""]],
    ["\nhello", ["", "hello"]],
  ])("splitLines", (value, expected) => {
    expect(splitLines(value)).toEqual(expected);
  });
});
