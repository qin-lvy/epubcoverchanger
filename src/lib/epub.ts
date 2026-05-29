import JSZip from "jszip";
import { saveAs } from "file-saver";

export interface ExtractResult {
  coverBlob: Blob | null;
  coverPath: string | null;
  zip: JSZip;
  fileName: string;
  fileSize: number;
}

export interface ReplaceResult {
  success: boolean;
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

export async function replaceCoverAndDownload(
  zip: JSZip,
  coverPath: string,
  newCoverFile: File,
  originalFileName: string,
): Promise<ReplaceResult> {
  try {
    const newCoverData = await newCoverFile.arrayBuffer();
    zip.file(coverPath, newCoverData);

    const newEpubBlob = await zip.generateAsync({
      type: "blob",
      mimeType: "application/epub+zip",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const baseName = originalFileName.replace(/\.epub$/i, "");
    const newFileName = `${baseName}-new-cover.epub`;
    saveAs(newEpubBlob, newFileName);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
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
