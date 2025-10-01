import { isNullOrEmpty, isNullOrWhitespace, capitalize, uncapitalize, truncate, splitLines, trimStart, trimEnd, trim } from "./string";

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
    [null as unknown as string, 10, "", null],
    [undefined as unknown as string, 10, "", undefined],
    ["", 10, "", ""],
    ["hello", 10, "", "hello"],
    ["hello", 5, "", "hello"],
    ["hello world", 5, "", "hello"],
    ["hello world", 8, "", "hello wo"],
    ["hello world", 11, "", "hello world"],
    ["hello world", 0, "", ""],
    ["hello", 3, ">>", "hel>>"],
    ["test", 2, "", "te"],
    ["hello world", 5, "...", "hello..."],
    ["hello world", 8, "...", "hello wo..."],
    ["hello world", 0, "...", "..."],
  ])("truncate", (value, maxLength, suffix, expected) => {
    expect(truncate(value, maxLength, suffix)).toBe(expected);
  });

  test.each([
    [null as unknown as string, 10, null],
    [undefined as unknown as string, 10, undefined],
    ["", 10, ""],
    ["hello", 10, "hello"],
    ["hello", 5, "hello"],
    ["hello world", 5, "hello"],
    ["hello world", 8, "hello wo"],
    ["hello world", 11, "hello world"],
    ["hello world", 0, ""],
    ["test", 2, "te"],
    ["a very long string", 6, "a very"],
    ["short", 10, "short"],
  ])("truncate without suffix parameter", (value, maxLength, expected) => {
    expect(truncate(value, maxLength)).toBe(expected);
  });

  test.each([
    [null as unknown as string, " ", null as unknown as string],
    [undefined as unknown as string, " ", undefined as unknown as string],
    ["hello world", "hello world", ""],
    ["hello world", " ", "hello world"],
    [" hello world", " ", "hello world"],
    ["hello world hello world", "hello world", " hello world"],
    ["hello worldhello world", "hello world", ""],
  ])("left trim", (haystack, needle, expected) => {
    expect(trimStart(haystack, needle)).toBe(expected);
  });

  test.each([
    [null as unknown as string, " ", null as unknown as string],
    [undefined as unknown as string, " ", undefined as unknown as string],
    ["hello world", "hello world", ""],
    ["hello world ", " ", "hello world"],
    ["hello world", " ", "hello world"],
    ["hello world hello world", "hello world", "hello world "],
    ["hello worldhello world", "hello world", ""],
  ])("right trim", (haystack, needle, expected) => {
    expect(trimEnd(haystack, needle)).toBe(expected);
  });

  test.each([
    [null as unknown as string, " ", null as unknown as string],
    [undefined as unknown as string, " ", undefined as unknown as string],
    ["hello world", "", "hello world"],
    [" hello world ", " ", "hello world"],
    ["hello world ", " ", "hello world"],
    [" hello world", " ", "hello world"],
    ["hello worldhello world", "hello world", ""],
  ])("trim", (haystack, needle, expected) => {
    expect(trim(haystack, needle)).toBe(expected);
  });

  test.each([
    ["", false, false, []],
    [null as unknown as string, false, false, []],
    [undefined as unknown as string, false, false, []],
    [" aaaa  \n\nbbbb  \n \ncccc", false, false, [" aaaa  ", "", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\rbbbb  \r \rcccc", false, false, [" aaaa  ", "", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\rbbbb  \n \r\ncccc", false, false, [" aaaa  ", "", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\n\r\nbbbb  \r\n \r\ncccc", false, false, [" aaaa  ", "", "bbbb  ", " ", "cccc"]],

    [" aaaa  \n\nbbbb  \n \ncccc", true, false, [" aaaa  ", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\rbbbb  \r \rcccc", true, false, [" aaaa  ", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\rbbbb  \n \r\ncccc", true, false, [" aaaa  ", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\n\r\nbbbb  \r\n \r\ncccc", true, false, [" aaaa  ", "bbbb  ", " ", "cccc"]],

    [" aaaa  \n\nbbbb  \n \ncccc", false, true, ["aaaa", "", "bbbb", "", "cccc"]],
    [" aaaa  \r\rbbbb  \r \rcccc", false, true, ["aaaa", "", "bbbb", "", "cccc"]],
    [" aaaa  \r\rbbbb  \n \r\ncccc", false, true, ["aaaa", "", "bbbb", "", "cccc"]],
    [" aaaa  \r\n\r\nbbbb  \r\n \r\ncccc", false, true, ["aaaa", "", "bbbb", "", "cccc"]],

    [" aaaa  \n\nbbbb  \n \ncccc", true, true, ["aaaa", "bbbb", "cccc"]],
    [" aaaa  \r\rbbbb  \r \rcccc", true, true, ["aaaa", "bbbb", "cccc"]],
    [" aaaa  \r\rbbbb  \n \r\ncccc", true, true, ["aaaa", "bbbb", "cccc"]],
  ])("splitLines with parameter removeEmptyEntries and trimEntries", (str, removeEmptyEntries, trimEntries, expected) => {
    expect(splitLines(str, removeEmptyEntries, trimEntries)).toEqual(expected);
  });

  test.each([
    ["", []],
    [null as unknown as string, []],
    [undefined as unknown as string, []],
    [" aaaa  \n\nbbbb  \n \ncccc", [" aaaa  ", "", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\rbbbb  \r \rcccc", [" aaaa  ", "", "bbbb  ", " ", "cccc"]],
    [" aaaa  \r\n\nbbbb  \r\n \r\ncccc", [" aaaa  ", "", "bbbb  ", " ", "cccc"]],
  ])("splitLines with just the string as a parameter", (str, expected) => {
    expect(splitLines(str)).toEqual(expected);
  });
});
