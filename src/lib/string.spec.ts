import {
  isNullOrEmpty,
  isNullOrWhitespace,
  capitalize,
  uncapitalize,
  truncate,
  splitLine,
  isValidSwissIbanNumber,
  isValidSwissSocialSecurityNumber,
} from "./string";

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
    ["", []],
    ["hello world", ["hello world"]],
    ["hello world\n", ["hello world", ""]],
    ["hello world\n\n", ["hello world", "", ""]],
    ["hello world\r\r", ["hello world", "", ""]],
    ["hello world\r\n\r\n", ["hello world", "", ""]],
  ])("splitLine without the parameter to remove the empty entries", (str, expected) => {
    expect(splitLine(str)).toEqual(expected);
  });

  test.each([
    ["", []],
    [null as unknown as string, []],
    [undefined as unknown as string, []],
    ["hello world", ["hello world"]],
    ["hello world\n", ["hello world"]],
    ["hello world\n\n", ["hello world"]],
    ["hello world\r\r", ["hello world"]],
    ["hello world\r\n\r\n", ["hello world"]],
    ["hello world 1\nhello world 2\nhello world 3", ["hello world 1", "hello world 2", "hello world 3"]],
    ["hello world 1\nhello world 2\rhello world 3", ["hello world 1", "hello world 2", "hello world 3"]],
    ["hello world 1\rhello world 2\rhello world 3", ["hello world 1", "hello world 2", "hello world 3"]],
    ["hello world 1\r\nhello world 2\r\nhello world 3", ["hello world 1", "hello world 2", "hello world 3"]],
    ["hello world 1\r\nhello world 2\nhello world 3\rhello world 4", ["hello world 1", "hello world 2", "hello world 3", "hello world 4"]],
  ])("splitLine with the parameter to remove empty entries", (str, expected) => {
    expect(splitLine(str, true)).toEqual(expected);
  });

  test.each([
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    ["CH9300762011623852957", true],
    ["CH93 0076 2011 6238 5295 7", true],
    ["CH930076 20116238 5295 7", false],
    ["CH93-0076-2011-6238-5295-7", false],
    ["CH93 0000 0000 0000 0000 1", false],
    ["ch93 0076 2011 6238 5295 7", false],
    ["DE93 0076 2011 6238 5295 7", false],
  ])("check if this swiss IBAN is valid or not", (unformattedIbanNumber, expected) => {
    expect(isValidSwissIbanNumber(unformattedIbanNumber)).toBe(expected);
  });

  test.each([
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    ["7561234567891", false],
    ["7569217076985", true],
    ["756.92170769.85", false],
    ["756.9217.0769.85", true],
    ["756..9217.0769.85", false],
    ["756.1234.5678.91", false],
    ["test756.9217.0769.85", false],
    ["7.56..9217...0769.85", false],
  ])("check if the social insurance number is valid or not", (ahvNumber, expected) => {
    expect(isValidSwissSocialSecurityNumber(ahvNumber)).toBe(expected);
  });
});
