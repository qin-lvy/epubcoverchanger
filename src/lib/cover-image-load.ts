import type { ImageDimensions } from "./cover-sizes.ts";

export type DetectedImageFormat = "jpeg" | "png" | "webp" | "gif" | "heic" | "avif" | "unknown";
export type OsFamily = "ios" | "android" | "other";

const HEIC_BRANDS = ["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1"];
const AVIF_BRANDS = ["avif", "avis"];

/** Identifies an image by its first bytes; the browser-reported type only reflects the file name. */
export function detectImageFormat(bytes: Uint8Array): DetectedImageFormat {
  const ascii = (start: number, end: number) => String.fromCharCode(...bytes.subarray(start, end));
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  if (bytes[0] === 0x89 && ascii(1, 4) === "PNG") return "png";
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "webp";
  if (ascii(0, 4) === "GIF8") return "gif";
  if (ascii(4, 8) === "ftyp") {
    const brand = ascii(8, 12);
    if (AVIF_BRANDS.includes(brand)) return "avif";
    if (HEIC_BRANDS.includes(brand)) return "heic";
  }
  return "unknown";
}

export function sizeBucket(bytes: number): "under_1mb" | "1_5mb" | "over_5mb" {
  if (bytes < 1024 * 1024) return "under_1mb";
  if (bytes < 5 * 1024 * 1024) return "1_5mb";
  return "over_5mb";
}

export function getOsFamily(userAgent: string, maxTouchPoints = 0): OsFamily {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  if (/Macintosh/i.test(userAgent) && maxTouchPoints > 1) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return "other";
}

export class CoverLoadError extends Error {
  readonly detectedFormat: DetectedImageFormat;
  readonly fileReadable: boolean;

  constructor(detectedFormat: DetectedImageFormat, fileReadable: boolean) {
    super("Failed to load image");
    this.detectedFormat = detectedFormat;
    this.fileReadable = fileReadable;
  }
}

export interface LoadedCover {
  file: File;
  dimensions: ImageDimensions;
  retried: boolean;
}

/**
 * Loads a chosen cover image. Phone photo pickers sometimes hand over a file
 * that is not readable yet (for example a cloud photo still downloading), so
 * one failed decode is retried from a fresh in-memory copy of the bytes.
 */
export async function loadCoverImage(
  file: File,
  getDimensions: (file: File) => Promise<ImageDimensions>,
): Promise<LoadedCover> {
  try {
    return { file, dimensions: await getDimensions(file), retried: false };
  } catch {
    // Fall through to the retry below.
  }

  let buffer: ArrayBuffer;
  try {
    buffer = await file.arrayBuffer();
  } catch {
    throw new CoverLoadError("unknown", false);
  }
  if (buffer.byteLength === 0) throw new CoverLoadError("unknown", false);

  const format = detectImageFormat(new Uint8Array(buffer, 0, Math.min(32, buffer.byteLength)));
  const copy = new File([buffer], file.name, { type: file.type, lastModified: file.lastModified });
  try {
    return { file: copy, dimensions: await getDimensions(copy), retried: true };
  } catch {
    throw new CoverLoadError(format, true);
  }
}
