import assert from "node:assert/strict";
import test from "node:test";

import JSZip from "jszip";
import { generateUpdatedEpub } from "../src/lib/epub.ts";

const JPEG_BYTES = [0xff, 0xd8, 0xff, 0xe0, 1, 2];
const PNG_BYTES = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 3, 4];

function buildZip({ version = "3.0", manifestItems = "", metadata = "" } = {}) {
  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.file(
    "META-INF/container.xml",
    `<container><rootfiles><rootfile full-path="OEBPS/content.opf" /></rootfiles></container>`,
  );
  zip.file(
    "OEBPS/content.opf",
    `<package version="${version}" unique-identifier="id"><metadata><dc:identifier id="id">urn:test</dc:identifier>${metadata}</metadata><manifest><item id="ch1" href="ch1.xhtml" media-type="application/xhtml+xml"/>${manifestItems}</manifest><spine><itemref idref="ch1"/></spine></package>`,
  );
  zip.file("OEBPS/ch1.xhtml", "<html/>");
  return zip;
}

function imageFile(bytes, type, name) {
  return new File([new Uint8Array(bytes)], name, { type });
}

function fakeConverter(calls) {
  return async (file, mimeType) => {
    calls.push({ from: file.type, to: mimeType });
    const bytes = mimeType === "image/png" ? PNG_BYTES : JPEG_BYTES;
    return imageFile(bytes, mimeType, "converted");
  };
}

async function readOutput(result) {
  assert.equal(result.success, true, result.error);
  const zip = await JSZip.loadAsync(await result.file.arrayBuffer());
  const opf = await zip.file("OEBPS/content.opf").async("text");
  return { zip, opf };
}

test("registers a new cover when the EPUB had none", async () => {
  const calls = [];
  const result = await generateUpdatedEpub(
    buildZip(),
    null,
    imageFile(PNG_BYTES, "image/png", "new.png"),
    "book.epub",
    { convertImage: fakeConverter(calls) },
  );
  const { zip, opf } = await readOutput(result);

  assert.equal(zip.file("images/cover.jpg"), null, "must not write outside the package folder");
  const bytes = await zip.file("OEBPS/images/cover.jpg").async("uint8array");
  assert.deepEqual([...bytes], JPEG_BYTES);
  assert.deepEqual(calls, [{ from: "image/png", to: "image/jpeg" }]);
  assert.match(
    opf,
    /<item id="ecc-cover-image" href="images\/cover\.jpg" media-type="image\/jpeg" properties="cover-image"\/>/,
  );
  assert.match(opf, /<meta name="cover" content="ecc-cover-image"\/>/);
});

test("does not overwrite an unrelated file when adding a new cover", async () => {
  const zip = buildZip();
  zip.file("OEBPS/images/cover.jpg", new Uint8Array([7, 7, 7]));
  const result = await generateUpdatedEpub(
    zip,
    null,
    imageFile(JPEG_BYTES, "image/jpeg", "new.jpg"),
    "book.epub",
    { convertImage: fakeConverter([]) },
  );
  const { zip: out, opf } = await readOutput(result);

  assert.deepEqual([...(await out.file("OEBPS/images/cover.jpg").async("uint8array"))], [7, 7, 7]);
  assert.ok(out.file("OEBPS/images/cover-1.jpg"));
  assert.match(opf, /href="images\/cover-1\.jpg"/);
});

test("converts a PNG upload to match a JPEG cover declared in the manifest", async () => {
  const calls = [];
  const zip = buildZip({
    manifestItems: `<item id="cover-img" href="images/cover.jpg" media-type="image/jpeg" properties="cover-image"/>`,
    metadata: `<meta name="cover" content="cover-img"/>`,
  });
  zip.file("OEBPS/images/cover.jpg", new Uint8Array([0xff, 0xd8, 0xff, 0]));

  const result = await generateUpdatedEpub(
    zip,
    "OEBPS/images/cover.jpg",
    imageFile(PNG_BYTES, "image/png", "new.png"),
    "book.epub",
    { convertImage: fakeConverter(calls) },
  );
  const { zip: out, opf } = await readOutput(result);

  assert.deepEqual(calls, [{ from: "image/png", to: "image/jpeg" }]);
  assert.deepEqual([...(await out.file("OEBPS/images/cover.jpg").async("uint8array"))], JPEG_BYTES);
  assert.equal((opf.match(/<meta name="cover"/g) ?? []).length, 1);
  assert.equal((opf.match(/cover-image/g) ?? []).length, 1);
});

test("keeps PNG when the existing cover is declared as PNG", async () => {
  const calls = [];
  const zip = buildZip({
    manifestItems: `<item id="cover-img" href="cover.png" media-type="image/png"/>`,
    metadata: `<meta name="cover" content="cover-img"/>`,
  });
  zip.file("OEBPS/cover.png", new Uint8Array(PNG_BYTES));

  const result = await generateUpdatedEpub(
    zip,
    "OEBPS/cover.png",
    imageFile(PNG_BYTES, "image/png", "new.png"),
    "book.epub",
    { convertImage: fakeConverter(calls) },
  );
  await readOutput(result);
  assert.deepEqual(calls, []);
});

test("adds the legacy cover meta when an EPUB 3 book only marks cover-image", async () => {
  const zip = buildZip({
    manifestItems: `<item id="c" href="images/c.jpg" media-type="image/jpeg" properties="cover-image"/>`,
  });
  zip.file("OEBPS/images/c.jpg", new Uint8Array(JPEG_BYTES));

  const result = await generateUpdatedEpub(
    zip,
    "OEBPS/images/c.jpg",
    imageFile(JPEG_BYTES, "image/jpeg", "new.jpg"),
    "book.epub",
    { convertImage: fakeConverter([]) },
  );
  const { opf } = await readOutput(result);
  assert.match(opf, /<meta name="cover" content="c"\/>/);
});

test("marks the cover-image property when an EPUB 3 book only has the legacy meta", async () => {
  const zip = buildZip({
    manifestItems: `<item id="c" href="images/c.jpg" media-type="image/jpeg"/>`,
    metadata: `<meta name="cover" content="c"/>`,
  });
  zip.file("OEBPS/images/c.jpg", new Uint8Array(JPEG_BYTES));

  const result = await generateUpdatedEpub(
    zip,
    "OEBPS/images/c.jpg",
    imageFile(JPEG_BYTES, "image/jpeg", "new.jpg"),
    "book.epub",
    { convertImage: fakeConverter([]) },
  );
  const { opf } = await readOutput(result);
  assert.match(opf, /<item id="c" href="images\/c\.jpg" media-type="image\/jpeg" properties="cover-image"\/>/);
});

test("does not add EPUB 3 properties to an EPUB 2 package", async () => {
  const result = await generateUpdatedEpub(
    buildZip({ version: "2.0" }),
    null,
    imageFile(JPEG_BYTES, "image/jpeg", "new.jpg"),
    "book.epub",
    { convertImage: fakeConverter([]) },
  );
  const { opf } = await readOutput(result);
  assert.doesNotMatch(opf, /properties=/);
  assert.match(opf, /<item id="ecc-cover-image" href="images\/cover\.jpg" media-type="image\/jpeg"\/>/);
  assert.match(opf, /<meta name="cover" content="ecc-cover-image"\/>/);
});

test("stores the mimetype entry first and uncompressed as the EPUB spec requires", async () => {
  const result = await generateUpdatedEpub(
    buildZip(),
    null,
    imageFile(JPEG_BYTES, "image/jpeg", "new.jpg"),
    "book.epub",
    { convertImage: fakeConverter([]) },
  );
  const bytes = new Uint8Array(await result.file.arrayBuffer());
  const view = new DataView(bytes.buffer);
  assert.equal(view.getUint32(0, true), 0x04034b50, "local file header");
  assert.equal(view.getUint16(8, true), 0, "compression method must be STORE");
  const nameLength = view.getUint16(26, true);
  assert.equal(new TextDecoder().decode(bytes.slice(30, 30 + nameLength)), "mimetype");
});
