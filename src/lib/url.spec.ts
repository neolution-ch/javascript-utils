import { validateUrl } from "./url";

describe("url tests", () => {
  test.each([
    ["google.com", true],
    ["https://www.example.com", true],
    ["http://localhost:3000", true],
    ["invalid_url", false],
    ["javascript:alert('XSS')", false],
    ["ftp://example.com", false],
    ["mailto:someone@example.com", false],
    ["", false],
    [123, false],
    [null, false],
    [undefined, false],
  ])('validateUrl("%s")', (value, expected) => {
    expect(validateUrl(value)).toBe(expected);
  });
});
