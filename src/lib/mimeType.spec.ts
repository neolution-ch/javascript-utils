import { isImageMimeType, isPdfMimeType, isVideoMimeType, isAudioMimeType, isTextMimeType, isApplicationMimeType } from "./mimeType";

describe("mimeType tests", () => {
  // Common invalid inputs
  const invalidInputs: [string | null | undefined | number | Date, boolean][] = [
    [null as unknown as string, false],
    [undefined as unknown as string, false],
    [0 as unknown as string, false],
    [new Date() as unknown as string, false],
    ["", false],
    [" ", false],
    ["not-a-mime-type", false],
  ];

  test.each([
    ...invalidInputs,
    // Valid image MIME types
    ["image/jpeg", true],
    ["image/png", true],
    ["image/gif", true],
    ["image/webp", true],
    ["image/svg+xml", true],
    ["IMAGE/JPEG", true], // Case insensitive
    ["  image/gif  ", true], // Whitespace trimmed
    // Invalid cases
    ["application/pdf", false],
    ["text/plain", false],
    ["video/mp4", false],
    ["image", false],
    ["image/", false],
    ["/image", false],
  ])("isImageMimeType", (mimeType, expected) => {
    expect(isImageMimeType(mimeType as string)).toBe(expected);
  });

  test.each([
    ...invalidInputs,
    // Valid PDF MIME type
    ["application/pdf", true],
    ["APPLICATION/PDF", true], // Case insensitive
    ["  application/pdf  ", true], // Whitespace trimmed
    // Invalid cases
    ["image/jpeg", false],
    ["application/json", false],
    ["pdf", false],
    ["application/", false],
  ])("isPdfMimeType", (mimeType, expected) => {
    expect(isPdfMimeType(mimeType as string)).toBe(expected);
  });

  test.each([
    ...invalidInputs,
    // Valid video MIME types
    ["video/mp4", true],
    ["video/mpeg", true],
    ["video/webm", true],
    ["VIDEO/MP4", true], // Case insensitive
    ["  video/webm  ", true], // Whitespace trimmed
    // Invalid cases
    ["image/jpeg", false],
    ["audio/mp3", false],
    ["video", false],
    ["video/", false],
    ["/video", false],
  ])("isVideoMimeType", (mimeType, expected) => {
    expect(isVideoMimeType(mimeType as string)).toBe(expected);
  });

  test.each([
    ...invalidInputs,
    // Valid audio MIME types
    ["audio/mp3", true],
    ["audio/mpeg", true],
    ["audio/wav", true],
    ["AUDIO/MP3", true], // Case insensitive
    ["  audio/ogg  ", true], // Whitespace trimmed
    // Invalid cases
    ["video/mp4", false],
    ["image/jpeg", false],
    ["audio", false],
    ["audio/", false],
    ["/audio", false],
  ])("isAudioMimeType", (mimeType, expected) => {
    expect(isAudioMimeType(mimeType as string)).toBe(expected);
  });

  test.each([
    ...invalidInputs,
    // Valid text MIME types
    ["text/plain", true],
    ["text/html", true],
    ["text/css", true],
    ["TEXT/PLAIN", true], // Case insensitive
    ["  text/css  ", true], // Whitespace trimmed
    // Invalid cases
    ["application/pdf", false],
    ["image/jpeg", false],
    ["text", false],
    ["text/", false],
    ["/text", false],
  ])("isTextMimeType", (mimeType, expected) => {
    expect(isTextMimeType(mimeType as string)).toBe(expected);
  });

  test.each([
    ...invalidInputs,
    // Valid application MIME types
    ["application/pdf", true],
    ["application/json", true],
    ["application/xml", true],
    ["APPLICATION/PDF", true], // Case insensitive
    ["  application/xml  ", true], // Whitespace trimmed
    // Invalid cases
    ["text/plain", false],
    ["image/jpeg", false],
    ["application", false],
    ["application/", false],
    ["/application", false],
  ])("isApplicationMimeType", (mimeType, expected) => {
    expect(isApplicationMimeType(mimeType as string)).toBe(expected);
  });
});
