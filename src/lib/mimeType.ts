import { isNullOrEmpty } from "./string";

/**
 * Private helper function to check if a MIME type matches a main type pattern
 * @param mimeType The MIME type to check
 * @param mainType The main MIME type (e.g., "image", "video")
 * @returns true if the MIME type matches the pattern
 */
function isMainMimeType(mimeType: string, mainType: string): boolean {
  const normalizedMimeType = mimeType.toLowerCase().trim();
  return normalizedMimeType.startsWith(`${mainType}/`) && normalizedMimeType.length > mainType.length + 1;
}

/**
 * Check if the MIME type represents an image
 * @param mimeType The MIME type to check
 * @returns true if the MIME type is for an image
 */
export function isImageMimeType(mimeType?: string): boolean {
  if (isNullOrEmpty(mimeType)) {
    return false;
  }

  return isMainMimeType(mimeType!, "image");
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

  return isMainMimeType(mimeType!, "video");
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

  return isMainMimeType(mimeType!, "audio");
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

  return isMainMimeType(mimeType!, "text");
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

  return isMainMimeType(mimeType!, "application");
}
