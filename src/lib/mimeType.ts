import { isNullOrEmpty } from "./string";

/**
 * Check if the MIME type represents an image
 * @param mimeType The MIME type to check
 * @returns true if the MIME type is for an image
 */
export function isImageMimeType(mimeType?: string): boolean {
  if (isNullOrEmpty(mimeType)) {
    return false;
  }

  const normalizedMimeType = mimeType!.toLowerCase().trim();
  return normalizedMimeType.startsWith("image/") && normalizedMimeType.length > 6;
}

/**
 * Check if the MIME type represents a PDF document
 * @param mimeType The MIME type to check
 * @returns true if the MIME type is for a PDF document
 */
export function isPdfMimeType(mimeType?: string): boolean {
  if (isNullOrEmpty(mimeType)) {
    return false;
  }

  const normalizedMimeType = mimeType!.toLowerCase().trim();
  return normalizedMimeType === "application/pdf";
}

/**
 * Check if the MIME type represents a video
 * @param mimeType The MIME type to check
 * @returns true if the MIME type is for a video
 */
export function isVideoMimeType(mimeType?: string): boolean {
  if (isNullOrEmpty(mimeType)) {
    return false;
  }

  const normalizedMimeType = mimeType!.toLowerCase().trim();
  return normalizedMimeType.startsWith("video/") && normalizedMimeType.length > 6;
}

/**
 * Check if the MIME type represents an audio file
 * @param mimeType The MIME type to check
 * @returns true if the MIME type is for an audio file
 */
export function isAudioMimeType(mimeType?: string): boolean {
  if (isNullOrEmpty(mimeType)) {
    return false;
  }

  const normalizedMimeType = mimeType!.toLowerCase().trim();
  return normalizedMimeType.startsWith("audio/") && normalizedMimeType.length > 6;
}

/**
 * Check if the MIME type represents a text file
 * @param mimeType The MIME type to check
 * @returns true if the MIME type is for a text file
 */
export function isTextMimeType(mimeType?: string): boolean {
  if (isNullOrEmpty(mimeType)) {
    return false;
  }

  const normalizedMimeType = mimeType!.toLowerCase().trim();
  return normalizedMimeType.startsWith("text/") && normalizedMimeType.length > 5;
}

/**
 * Check if the MIME type represents an application file
 * @param mimeType The MIME type to check
 * @returns true if the MIME type is for an application file
 */
export function isApplicationMimeType(mimeType?: string): boolean {
  if (isNullOrEmpty(mimeType)) {
    return false;
  }

  const normalizedMimeType = mimeType!.toLowerCase().trim();
  return normalizedMimeType.startsWith("application/") && normalizedMimeType.length > 12;
}
