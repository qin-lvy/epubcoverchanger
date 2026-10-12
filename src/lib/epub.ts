import JSZip from "jszip";

export interface ExtractResult {
  coverBlob: Blob | null;
  coverPath: string | null;
  zip: JSZip;
  fileName: string;
  fileSize: number;
}

export interface GenerateEpubResult {
  success: boolean;
  file?: File;
  error?: string;
}

export async function extractCover(epubFile: File): Promise<ExtractResult> {
  const arrayBuffer = await epubFile.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const containerFile = zip.file("META-INF/container.xml");
  if (!containerFile) {
    throw new Error("Invalid EPUB: missing META-INF/container.xml");
  }

  const containerXml = await containerFile.async("text");
  const opfPathMatch = containerXml.match(/full-path="([^"]+)"/);
  if (!opfPathMatch) {
    throw new Error(
      "Invalid EPUB: cannot find OPF file path in container.xml",
    );
  }

  const opfPath = opfPathMatch[1];
  const opfFile = zip.file(opfPath);
  if (!opfFile) {
    throw new Error(`Invalid EPUB: OPF file not found at ${opfPath}`);
  }

  const opfContent = await opfFile.async("text");
  const opfDir = opfPath.includes("/")
    ? opfPath.substring(0, opfPath.lastIndexOf("/") + 1)
    : "";

  let coverHref: string | null = null;

  const coverMetaMatch = opfContent.match(
    /<meta\s+[^>]*name\s*=\s*["']cover["'][^>]*content\s*=\s*["']([^"']+)["']/i,
  );
  if (!coverMetaMatch) {
    const altMatch = opfContent.match(
      /<meta\s+[^>]*content\s*=\s*["']([^"']+)["'][^>]*name\s*=\s*["']cover["']/i,
    );
    if (altMatch) {
      coverHref = findItemHrefById(opfContent, altMatch[1]);
    }
  } else {
    coverHref = findItemHrefById(opfContent, coverMetaMatch[1]);
  }

  if (!coverHref) {
    const propsMatch = opfContent.match(
      /<item[^>]+properties\s*=\s*["'][^"']*cover-image[^"']*["'][^>]+href\s*=\s*["']([^"']+)["']/i,
    );
    if (!propsMatch) {
      const altPropsMatch = opfContent.match(
        /<item[^>]+href\s*=\s*["']([^"']+)["'][^>]+properties\s*=\s*["'][^"']*cover-image[^"']*["']/i,
      );
      if (altPropsMatch) coverHref = altPropsMatch[1];
    } else {
      coverHref = propsMatch[1];
    }
  }

  if (!coverHref) {
    const commonPaths = [
      "cover.jpg",
      "cover.jpeg",
      "cover.png",
      "cover.webp",
      "Cover.jpg",
      "Cover.jpeg",
      "Cover.png",
      "images/cover.jpg",
      "images/cover.jpeg",
      "images/cover.png",
      "Images/cover.jpg",
      "Images/cover.jpeg",
      "Images/cover.png",
      "OEBPS/images/cover.jpg",
      "OEBPS/Images/cover.jpg",
      "OPS/images/cover.jpg",
    ];
    for (const path of commonPaths) {
      if (zip.file(path)) {
        coverHref = path;
        break;
      }
    }
  }

  let coverFullPath: string | null = null;
  if (coverHref) {
    const relativePath = opfDir + coverHref;
    if (zip.file(relativePath)) {
      coverFullPath = relativePath;
    } else if (zip.file(coverHref)) {
      coverFullPath = coverHref;
    } else {
      const cleaned = coverHref.replace(/^\.\.\//, "");
      if (zip.file(cleaned)) {
        coverFullPath = cleaned;
      }
    }
  }

  let coverBlob: Blob | null = null;
  if (coverFullPath) {
    const coverFile = zip.file(coverFullPath);
    if (coverFile) {
      coverBlob = await coverFile.async("blob");
    }
  }

  return {
    coverBlob,
    coverPath: coverFullPath,
    zip,
    fileName: epubFile.name,
    fileSize: epubFile.size,
  };
}

function findItemHrefById(opfContent: string, itemId: string): string | null {
  const escapedId = itemId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match1 = opfContent.match(
    new RegExp(
      `<item[^>]+id\\s*=\\s*["']${escapedId}["'][^>]+href\\s*=\\s*["']([^"']+)["']`,
      "i",
    ),
  );
  if (match1) return match1[1];

  const match2 = opfContent.match(
    new RegExp(
      `<item[^>]+href\\s*=\\s*["']([^"']+)["'][^>]+id\\s*=\\s*["']${escapedId}["']`,
      "i",
    ),
  );
  if (match2) return match2[1];

  return null;
}

async function updateEpubModifiedDate(zip: JSZip): Promise<void> {
  const containerFile = zip.file("META-INF/container.xml");
  if (!containerFile) return;

  const containerXml = await containerFile.async("text");
  const opfPath = containerXml.match(/full-path=["\x27]([^"\x27]+)["\x27]/)?.[1];
  if (!opfPath) return;

  const opfFile = zip.file(opfPath);
  if (!opfFile) return;

  const opfContent = await opfFile.async("text");
  const modifiedPattern =
    /(<meta\b[^>]*\bproperty\s*=\s*["\x27]dcterms:modified["\x27][^>]*>)[\s\S]*?(<\/meta>)/i;
  if (!modifiedPattern.test(opfContent)) return;

  const modifiedAt = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  zip.file(
    opfPath,
    opfContent.replace(modifiedPattern, `$1${modifiedAt}$2`),
  );
}

type CoverMimeType = "image/jpeg" | "image/png";

export type ConvertImage = (file: File, mimeType: CoverMimeType) => Promise<File>;

interface PackageDocument {
  opfPath: string;
  opfDir: string;
  content: string;
}

interface ManifestItem {
  tag: string;
  id: string | null;
  mediaType: string | null;
}

const NEW_COVER_ID = "ecc-cover-image";

function getAttribute(tag: string, name: string): string | null {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? match[1] : null;
}

function setAttribute(tag: string, name: string, value: string): string {
  const pattern = new RegExp(`(\\b${name}\\s*=\\s*["'])[^"']*(["'])`, "i");
  if (pattern.test(tag)) return tag.replace(pattern, `$1${value}$2`);
  return tag.replace(/\s*(\/?)>$/, ` ${name}="${value}"$1>`);
}

function normalizePath(path: string): string {
  const parts: string[] = [];
  for (const part of path.split("/")) {
    if (part === "..") parts.pop();
    else if (part !== "." && part !== "") parts.push(part);
  }
  return parts.join("/");
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function relativeHref(opfDir: string, fullPath: string): string {
  if (fullPath.startsWith(opfDir)) return fullPath.slice(opfDir.length);
  const depth = opfDir.split("/").filter(Boolean).length;
  return "../".repeat(depth) + fullPath;
}

async function readPackageDocument(zip: JSZip): Promise<PackageDocument | null> {
  const containerXml = await zip.file("META-INF/container.xml")?.async("text");
  const opfPath = containerXml?.match(/full-path=["']([^"']+)["']/)?.[1];
  if (!opfPath) return null;
  const content = await zip.file(opfPath)?.async("text");
  if (content === undefined) return null;
  const opfDir = opfPath.includes("/")
    ? opfPath.substring(0, opfPath.lastIndexOf("/") + 1)
    : "";
  return { opfPath, opfDir, content };
}

function findManifestItem(pkg: PackageDocument, fullPath: string): ManifestItem | null {
  const target = normalizePath(fullPath);
  for (const tag of pkg.content.match(/<item\b[^>]*>/gi) ?? []) {
    const href = getAttribute(tag, "href");
    if (href && normalizePath(pkg.opfDir + safeDecode(href)) === target) {
      return { tag, id: getAttribute(tag, "id"), mediaType: getAttribute(tag, "media-type") };
    }
  }
  return null;
}

function uniqueCoverPath(zip: JSZip, opfDir: string): string {
  let path = `${opfDir}images/cover.jpg`;
  for (let i = 1; zip.file(path); i += 1) {
    path = `${opfDir}images/cover-${i}.jpg`;
  }
  return path;
}

/**
 * Makes sure readers (Kindle in particular) can find the cover: the image is
 * listed in the manifest with the right media type, carries the EPUB 3
 * cover-image property, and is named by the legacy <meta name="cover">.
 */
function registerCover(
  pkg: PackageDocument,
  coverPath: string,
  existingItem: ManifestItem | null,
  mimeType: CoverMimeType,
): string {
  let content = pkg.content;
  const isEpub3 = /^3/.test(getAttribute(content.match(/<package\b[^>]*>/i)?.[0] ?? "", "version") ?? "");
  let coverId = existingItem?.id ?? null;

  if (existingItem) {
    let tag = setAttribute(existingItem.tag, "media-type", mimeType);
    const properties = getAttribute(tag, "properties");
    if (isEpub3 && !properties?.split(/\s+/).includes("cover-image")) {
      tag = setAttribute(tag, "properties", properties ? `${properties} cover-image` : "cover-image");
    }
    content = content.replace(existingItem.tag, tag);
  } else {
    const manifestOpen = content.match(/<manifest\b[^>]*>/i)?.[0];
    if (!manifestOpen) return content;
    coverId = NEW_COVER_ID;
    const properties = isEpub3 ? ` properties="cover-image"` : "";
    const item = `<item id="${coverId}" href="${relativeHref(pkg.opfDir, coverPath)}" media-type="${mimeType}"${properties}/>`;
    content = content.replace(manifestOpen, manifestOpen + item);
  }

  const hasCoverMeta = /<meta\b[^>]*\bname\s*=\s*["']cover["'][^>]*>/i.test(content);
  if (coverId && !hasCoverMeta && /<\/metadata>/i.test(content)) {
    content = content.replace(/<\/metadata>/i, `<meta name="cover" content="${coverId}"/></metadata>`);
  }
  return content;
}

export const convertImageFile: ConvertImage = async (file, mimeType) => {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    if (mimeType === "image/jpeg") {
      // JPEG has no transparency; keep transparent areas white instead of black.
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mimeType, 0.95),
    );
    if (!blob) throw new Error("Failed to convert cover image");
    return new File([blob], file.name, { type: mimeType });
  } finally {
    URL.revokeObjectURL(url);
  }
};

export async function generateUpdatedEpub(
  zip: JSZip,
  coverPath: string | null,
  newCoverFile: File,
  originalFileName: string,
  { convertImage = convertImageFile }: { convertImage?: ConvertImage } = {},
): Promise<GenerateEpubResult> {
  try {
    const pkg = await readPackageDocument(zip);
    const existingItem = pkg && coverPath ? findManifestItem(pkg, coverPath) : null;
    const targetPath =
      coverPath ?? (pkg ? uniqueCoverPath(zip, pkg.opfDir) : "images/cover.jpg");
    const declaredType = existingItem?.mediaType?.toLowerCase();
    const targetMime: CoverMimeType =
      declaredType === "image/png" ||
      (!existingItem && coverPath !== null && /\.png$/i.test(coverPath))
        ? "image/png"
        : "image/jpeg";

    const coverFile =
      newCoverFile.type === targetMime
        ? newCoverFile
        : await convertImage(newCoverFile, targetMime);
    zip.file(targetPath, await coverFile.arrayBuffer());

    if (pkg) {
      const updated = registerCover(pkg, targetPath, existingItem, targetMime);
      if (updated !== pkg.content) zip.file(pkg.opfPath, updated);
    }
    await updateEpubModifiedDate(zip);
    // OCF requires "mimetype" to be the first entry and stored uncompressed;
    // Send to Kindle and strict readers reject EPUBs that compress it.
    zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

    const newEpubBlob = await zip.generateAsync({
      type: "blob",
      mimeType: "application/epub+zip",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const baseName = originalFileName.replace(/\.epub$/i, "");
    const newFileName = `${baseName}-new-cover.epub`;
    const file = new File([newEpubBlob], newFileName, {
      type: "application/epub+zip",
    });

    return { success: true, file };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function saveGeneratedEpub(file: File): Promise<void> {
  const fileSaver = await import("file-saver");
  fileSaver.saveAs(file, file.name);
}

export function checkDRM(zip: JSZip): boolean {
  if (zip.file("META-INF/encryption.xml")) return true;
  if (zip.file("META-INF/rights.xml")) return true;
  return false;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isValidEpub(file: File): boolean {
  return file.name.toLowerCase().endsWith(".epub");
}

export function isValidCoverImage(file: File): boolean {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  return validTypes.includes(file.type);
}

export function isCoverTooLarge(file: File): boolean {
  return file.size > 10 * 1024 * 1024;
}
