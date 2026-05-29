export type CoverSizeSource =
  | "official-ideal"
  | "official-ratio"
  | "recommended-preset"
  | "original";

export interface CoverSize {
  id: string;
  label: string;
  width: number;
  height: number;
  ratio: string;
  description: string;
  source: CoverSizeSource;
  sourceLabel: string;
  note: string;
  premium?: boolean;
}

export type CoverFitMode = "fit" | "fill" | "original";
export type CoverBackground = "white" | "black" | "light-gray";

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface CoverTransform {
  mode: CoverFitMode;
  scale: number;
  x: number;
  y: number;
  background: CoverBackground;
}

export interface ExportCoverOptions {
  file: File;
  targetWidth: number;
  targetHeight: number;
  transform: CoverTransform;
  displayWidth?: number;
  mimeType?: string;
  quality?: number;
}

export const COVER_EDITOR_DISPLAY_WIDTH = 360;

/** MVP platform presets. Labels distinguish official fixed sizes from safe recommendations. */
export const COVER_SIZES: CoverSize[] = [
  {
    id: "epub-standard",
    label: "Standard EPUB",
    width: 1600,
    height: 2400,
    ratio: "2:3",
    description: "Universal 2:3 cover preset for most EPUB readers",
    source: "recommended-preset",
    sourceLabel: "Recommended preset",
    note: "EPUB itself has no single required cover size.",
  },
  {
    id: "kindle",
    label: "Amazon Kindle KDP",
    width: 1600,
    height: 2560,
    ratio: "5:8",
    description: "Amazon KDP ideal ebook cover size",
    source: "official-ideal",
    sourceLabel: "Official ideal",
    note: "Amazon recommends 1600 x 2560px for best quality.",
  },
  {
    id: "apple-books",
    label: "Apple Books",
    width: 1600,
    height: 2400,
    ratio: "2:3",
    description: "High-quality preset that satisfies Apple cover guidance",
    source: "recommended-preset",
    sourceLabel: "Recommended preset",
    note: "Apple requires a high-quality cover; this preset keeps the short side above 1400px.",
  },
  {
    id: "kobo",
    label: "Kobo",
    width: 1500,
    height: 2000,
    ratio: "3:4",
    description: "Kobo-friendly portrait ratio",
    source: "official-ratio",
    sourceLabel: "Official ratio",
    note: "Kobo guidance favors a 3:4 portrait ratio.",
  },
  {
    id: "google-play",
    label: "Google Play Books",
    width: 1600,
    height: 2400,
    ratio: "2:3",
    description: "High-quality preset within Google Play Books cover limits",
    source: "recommended-preset",
    sourceLabel: "Recommended preset",
    note: "Google sets file and pixel bounds rather than one fixed cover size.",
  },
  {
    id: "original",
    label: "Keep Original Size",
    width: 0,
    height: 0,
    ratio: "-",
    description: "Use the uploaded image exactly as-is",
    source: "original",
    sourceLabel: "No resize",
    note: "Best when your image is already the final cover.",
  },
];

export const FREE_SIZES = COVER_SIZES.filter((s) => !s.premium);
export const PREMIUM_SIZES = COVER_SIZES.filter((s) => s.premium);

export const BACKGROUND_COLORS: Record<CoverBackground, string> = {
  white: "#FFFFFF",
  black: "#111827",
  "light-gray": "#F3F4F6",
};

export function formatDimensions(dimensions?: ImageDimensions | null): string {
  if (!dimensions) return "Unknown size";
  return `${dimensions.width} x ${dimensions.height}px`;
}

export function getTargetDimensions(
  selectedSize: CoverSize,
  imageDimensions: ImageDimensions,
): ImageDimensions {
  if (selectedSize.width === 0 || selectedSize.height === 0) {
    return imageDimensions;
  }
  return {
    width: selectedSize.width,
    height: selectedSize.height,
  };
}

export function getInitialFitMode(
  imageDimensions: ImageDimensions,
  targetDimensions: ImageDimensions,
): CoverFitMode {
  const imageRatio = imageDimensions.width / imageDimensions.height;
  const targetRatio = targetDimensions.width / targetDimensions.height;
  const ratioDifference = Math.abs(imageRatio - targetRatio) / targetRatio;
  return ratioDifference > 0.02 ? "fit" : "fill";
}

export function getModeScale(
  mode: CoverFitMode,
  imageDimensions: ImageDimensions,
  displayDimensions: ImageDimensions,
): number {
  if (mode === "original") return 1;

  const scaleX = displayDimensions.width / imageDimensions.width;
  const scaleY = displayDimensions.height / imageDimensions.height;
  return mode === "fit" ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);
}

export function centerTransform(
  mode: CoverFitMode,
  imageDimensions: ImageDimensions,
  displayDimensions: ImageDimensions,
  background: CoverBackground = "white",
): CoverTransform {
  const scale = getModeScale(mode, imageDimensions, displayDimensions);
  return {
    mode,
    scale,
    x: (displayDimensions.width - imageDimensions.width * scale) / 2,
    y: (displayDimensions.height - imageDimensions.height * scale) / 2,
    background,
  };
}

export function clampCoverTransform(
  transform: CoverTransform,
  imageDimensions: ImageDimensions,
  displayDimensions: ImageDimensions,
): CoverTransform {
  if (transform.mode !== "fill") return transform;

  const scaledWidth = imageDimensions.width * transform.scale;
  const scaledHeight = imageDimensions.height * transform.scale;
  const minX = Math.min(0, displayDimensions.width - scaledWidth);
  const minY = Math.min(0, displayDimensions.height - scaledHeight);

  return {
    ...transform,
    x: Math.min(0, Math.max(minX, transform.x)),
    y: Math.min(0, Math.max(minY, transform.y)),
  };
}

export function getImageDimensions(file: File): Promise<ImageDimensions> {
  return getBlobDimensions(file);
}

export function getBlobDimensions(blob: Blob): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

export async function exportPositionedCover({
  file,
  targetWidth,
  targetHeight,
  transform,
  displayWidth = COVER_EDITOR_DISPLAY_WIDTH,
  mimeType,
  quality = 0.95,
}: ExportCoverOptions): Promise<File> {
  if (transform.mode === "original") {
    return file;
  }

  const imageDimensions = await getImageDimensions(file);
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.fillStyle = BACKGROUND_COLORS[transform.background];
  ctx.fillRect(0, 0, targetWidth, targetHeight);

  const outputScale = targetWidth / displayWidth;
  const outputX = transform.x * outputScale;
  const outputY = transform.y * outputScale;
  const outputWidth = imageDimensions.width * transform.scale * outputScale;
  const outputHeight = imageDimensions.height * transform.scale * outputScale;

  const img = await loadImage(file);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, outputX, outputY, outputWidth, outputHeight);

  const finalMime = mimeType || file.type || "image/jpeg";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, finalMime, quality),
  );

  if (!blob) throw new Error("Failed to create cover image");

  const extension = finalMime === "image/png" ? "png" : finalMime === "image/webp" ? "webp" : "jpg";
  const baseName = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}-${targetWidth}x${targetHeight}.${extension}`, {
    type: finalMime,
  });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}
