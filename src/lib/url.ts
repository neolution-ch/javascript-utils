/**
 * Validate the url
 * @param value The Url String
 * @returns The parsed boolean
 */
export function validateUrl(value?: string | number | null): boolean {
  try {
    if (!value || typeof value !== "string") {
      return false;
    }

    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      value = "http://".concat(value);
    }

    const urlPattern = /^(http|https):\/\/[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return urlPattern.test(value);
  } catch (err) {
    return false;
  }
}
