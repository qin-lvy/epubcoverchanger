import JSZip from "jszip";
import { checkDRM, readPackageDocument, updateEpubModifiedDate } from "./epub.ts";

export interface EpubMetadata {
  title: string;
  authors: string[];
  language: string;
  publisher: string;
  description: string;
}

export interface LoadedEpubMetadata {
  zip: JSZip;
  metadata: EpubMetadata;
  hasLanguage: boolean;
  isDrmProtected: boolean;
}

export type MetadataField = keyof EpubMetadata;

/** BCP 47 shape check: "en", "pt-BR", "zh-Hant", "es-419". */
export function isValidLanguageTag(value: string): boolean {
  return /^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(value.trim());
}

interface DcElement {
  start: number;
  end: number;
  attrs: string;
  text: string;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

function decodeXml(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, body: string) => {
      if (body[0] !== "#") return NAMED_ENTITIES[body.toLowerCase()];
      const code = body[1].toLowerCase() === "x" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : entity;
    })
    .trim();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function readAttr(attrs: string, name: string): string | null {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match ? match[2] : null;
}

function removeAttr(attrs: string, name: string): string {
  return attrs.replace(new RegExp(`\\s+${name}\\s*=\\s*(["']).*?\\1`, "gi"), "");
}

function findDcElements(block: string, name: string): DcElement[] {
  const pattern = new RegExp(`<dc:${name}\\b([^>]*?)(?:\\/>|>([\\s\\S]*?)<\\/dc:${name}\\s*>)`, "gi");
  return [...block.matchAll(pattern)].map((match) => ({
    start: match.index,
    end: match.index + match[0].length,
    attrs: match[1],
    text: decodeXml(match[2] ?? ""),
  }));
}

function findMetadataBlock(opf: string) {
  const match = opf.match(/(<(?:[\w-]+:)?metadata\b[^>]*>)([\s\S]*?)(<\/(?:[\w-]+:)?metadata\s*>)/i);
  if (!match || match.index === undefined) return null;
  const start = match.index + match[1].length;
  return { start, end: start + match[2].length, content: match[2] };
}

export function readMetadataFromOpf(opf: string): { metadata: EpubMetadata; hasLanguage: boolean } {
  const block = findMetadataBlock(opf)?.content ?? "";
  const first = (name: string) => findDcElements(block, name)[0]?.text ?? "";
  return {
    metadata: {
      title: first("title"),
      authors: findDcElements(block, "creator").map((element) => element.text).filter(Boolean),
      language: first("language"),
      publisher: first("publisher"),
      description: first("description"),
    },
    hasLanguage: findDcElements(block, "language").some((element) => element.text !== ""),
  };
}

/**
 * Removes EPUB 3 <meta refines="#id"> entries for an element. When only the
 * text changed, just the sort/transliteration hints go stale; role and
 * display order still apply to the renamed person.
 */
function removeRefines(block: string, id: string, properties?: string[]): string {
  return block.replace(/[ \t]*<meta\b([^>]*?)(?:\/>|>[\s\S]*?<\/meta\s*>)[ \t]*\r?\n?/gi, (tag, attrs: string) => {
    if (readAttr(attrs, "refines") !== `#${id}`) return tag;
    if (properties && !properties.includes(readAttr(attrs, "property") ?? "")) return tag;
    return "";
  });
}

const STALE_ON_RENAME = ["file-as", "alternate-script"];

function renderElement(name: string, attrs: string, value: string) {
  return `<dc:${name}${attrs}>${escapeXml(value)}</dc:${name}>`;
}

/** Cuts start..end, plus the whole line when the element sat on a line of its own. */
function removeRange(text: string, start: number, end: number): string {
  const lineStart = text.lastIndexOf("\n", start - 1) + 1;
  const lineEnd = text.slice(end).match(/^[ \t]*\r?\n/);
  if (/^[ \t]*$/.test(text.slice(lineStart, start)) && lineEnd) {
    return text.slice(0, lineStart) + text.slice(end + lineEnd[0].length);
  }
  return text.slice(0, start) + text.slice(end);
}

function uniqueId(opf: string, base: string): string {
  let index = 1;
  while (new RegExp(`\\bid\\s*=\\s*["']${base}-${index}["']`).test(opf)) index += 1;
  return `${base}-${index}`;
}

function indentBefore(block: string, position: number): string {
  const lineStart = block.lastIndexOf("\n", position - 1) + 1;
  return block.slice(lineStart, position).match(/^[ \t]*/)?.[0] ?? "";
}

/** Inserts new elements after the last existing one of that name, or at the end of <metadata>. */
function insertElements(block: string, name: string, tags: string[]): string {
  if (!tags.length) return block;
  const existing = findDcElements(block, name);
  const anchor = existing.at(-1);
  if (anchor) {
    const indent = indentBefore(block, anchor.start);
    return block.slice(0, anchor.end) + tags.map((tag) => `\n${indent}${tag}`).join("") + block.slice(anchor.end);
  }
  const trimmed = block.replace(/\s*$/, "");
  const trailing = block.slice(trimmed.length);
  const lastElement = trimmed.lastIndexOf("<");
  const indent = lastElement >= 0 ? indentBefore(trimmed, lastElement) : "  ";
  return trimmed + tags.map((tag) => `\n${indent}${tag}`).join("") + (trailing || "\n");
}

/**
 * Sets the values of every <dc:name> element. Unchanged elements keep their
 * exact bytes; changed ones keep their attributes except stale sort keys;
 * removed ones take their refinements with them.
 */
function setElementValues(block: string, opf: string, name: string, values: string[]): string {
  const elements = findDcElements(block, name);
  let output = block;

  for (let index = elements.length - 1; index >= 0; index -= 1) {
    const element = elements[index];
    const value = values[index];
    const id = readAttr(element.attrs, "id");

    if (value === undefined) {
      output = removeRange(output, element.start, element.end);
      if (id) output = removeRefines(output, id);
      continue;
    }
    if (value === element.text) continue;

    const attrs = removeAttr(element.attrs, "opf:file-as");
    output = output.slice(0, element.start) + renderElement(name, attrs, value) + output.slice(element.end);
    if (id) output = removeRefines(output, id, STALE_ON_RENAME);
  }

  const additions: string[] = [];
  let ids = opf;
  for (const value of values.slice(elements.length)) {
    if (name === "creator") {
      const id = uniqueId(ids, "ecc-creator");
      ids += ` id="${id}"`;
      additions.push(renderElement(name, ` id="${id}"`, value));
    } else {
      additions.push(renderElement(name, "", value));
    }
  }
  return insertElements(output, name, additions);
}

export function applyMetadataToOpf(opf: string, next: EpubMetadata): string {
  const title = next.title.trim();
  if (!title) throw new Error("The title cannot be empty.");
  const language = next.language.trim();
  if (language && !isValidLanguageTag(language)) throw new Error("Invalid language code.");

  const located = findMetadataBlock(opf);
  if (!located) throw new Error("Invalid EPUB: the package file has no <metadata> section.");

  const single = (value: string) => (value.trim() ? [value.trim()] : []);
  const current = findDcElements(located.content, "title").map((element) => element.text);

  let block = located.content;
  // Only the main title is editable; subtitles and other <dc:title>s stay.
  block = setElementValues(block, opf, "title", [title, ...current.slice(1)]);
  block = setElementValues(block, opf, "creator", next.authors.map((author) => author.trim()).filter(Boolean));
  if (language) {
    const languages = findDcElements(block, "language").map((element) => element.text);
    block = setElementValues(block, opf, "language", [language, ...languages.slice(1)]);
  }
  block = setElementValues(block, opf, "publisher", single(next.publisher));
  block = setElementValues(block, opf, "description", single(next.description));

  return opf.slice(0, located.start) + block + opf.slice(located.end);
}

export async function loadEpubMetadata(file: File | Blob): Promise<LoadedEpubMetadata> {
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const pkg = await readPackageDocument(zip);
  if (!pkg) throw new Error("Invalid EPUB: cannot find the package file.");
  return { zip, ...readMetadataFromOpf(pkg.content), isDrmProtected: checkDRM(zip) };
}

export function changedFields(before: EpubMetadata, after: EpubMetadata): MetadataField[] {
  const clean = (metadata: EpubMetadata) => ({
    title: metadata.title.trim(),
    authors: metadata.authors.map((author) => author.trim()).filter(Boolean).join("\n"),
    language: metadata.language.trim(),
    publisher: metadata.publisher.trim(),
    description: metadata.description.trim(),
  });
  const a = clean(before);
  const b = clean(after);
  return (Object.keys(a) as MetadataField[]).filter((key) => a[key] !== b[key]);
}

export async function saveEpubMetadata(zip: JSZip, next: EpubMetadata, fileName: string): Promise<File> {
  const pkg = await readPackageDocument(zip);
  if (!pkg) throw new Error("Invalid EPUB: cannot find the package file.");
  zip.file(pkg.opfPath, applyMetadataToOpf(pkg.content, next));
  await updateEpubModifiedDate(zip);
  // OCF requires "mimetype" to be the first entry and stored uncompressed.
  zip.file("mimetype", "application/epub+zip", { compression: "STORE" });
  const blob = await zip.generateAsync({
    type: "blob",
    mimeType: "application/epub+zip",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
  return new File([blob], fileName, { type: "application/epub+zip" });
}
