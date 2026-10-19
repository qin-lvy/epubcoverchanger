import assert from "node:assert/strict";
import test from "node:test";

import JSZip from "jszip";
import {
  applyMetadataToOpf,
  changedFields,
  isValidLanguageTag,
  loadEpubMetadata,
  readMetadataFromOpf,
  saveEpubMetadata,
} from "../src/lib/epub-metadata.ts";

const EPUB3_OPF = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">urn:uuid:1234</dc:identifier>
    <dc:title id="t1">Old Title</dc:title>
    <meta refines="#t1" property="title-type">main</meta>
    <dc:creator id="c1">Jane Doe</dc:creator>
    <meta refines="#c1" property="role" scheme="marc:relators">aut</meta>
    <meta refines="#c1" property="file-as">Doe, Jane</meta>
    <dc:creator id="c2">John Roe</dc:creator>
    <meta refines="#c2" property="file-as">Roe, John</meta>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">2020-01-01T00:00:00Z</meta>
  </metadata>
  <manifest>
    <item id="ch1" href="ch1.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine><itemref idref="ch1"/></spine>
</package>`;

const EPUB2_OPF = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="uid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:identifier id="uid">urn:uuid:5678</dc:identifier>
    <dc:title>Chapter &amp; Verse</dc:title>
    <dc:creator opf:role="aut" opf:file-as="Doe, Jane">Jane Doe</dc:creator>
    <meta name="cover" content="cover-img"/>
  </metadata>
  <manifest>
    <item id="ch1" href="ch1.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine><itemref idref="ch1"/></spine>
</package>`;

function buildZip(opf) {
  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.file(
    "META-INF/container.xml",
    `<container><rootfiles><rootfile full-path="OEBPS/content.opf" /></rootfiles></container>`,
  );
  zip.file("OEBPS/content.opf", opf);
  zip.file("OEBPS/ch1.xhtml", "<html><body>Chapter one</body></html>");
  return zip;
}

const base = (opf) => readMetadataFromOpf(opf).metadata;

test("reads title, authors, language and decodes entities", () => {
  assert.deepEqual(readMetadataFromOpf(EPUB3_OPF), {
    metadata: {
      title: "Old Title",
      authors: ["Jane Doe", "John Roe"],
      language: "en",
      publisher: "",
      description: "",
    },
    hasLanguage: true,
  });
  assert.equal(base(EPUB2_OPF).title, "Chapter & Verse");
  assert.equal(base(EPUB2_OPF).language, "");
  assert.equal(readMetadataFromOpf(EPUB2_OPF).hasLanguage, false);
  assert.equal(base(EPUB3_OPF.replace("Old Title", "It&#39;s &#x4E66;")).title, "It's 书");
});

test("EPUB 3: renaming drops stale sort keys but keeps roles and ids", () => {
  const next = { ...base(EPUB3_OPF), title: "New Title", authors: ["Ann Smith", "John Roe"] };
  const opf = applyMetadataToOpf(EPUB3_OPF, next);

  assert.match(opf, /<dc:title id="t1">New Title<\/dc:title>/);
  assert.match(opf, /<meta refines="#t1" property="title-type">main<\/meta>/);
  assert.match(opf, /<dc:creator id="c1">Ann Smith<\/dc:creator>/);
  assert.match(opf, /refines="#c1" property="role"/);
  assert.doesNotMatch(opf, /Doe, Jane/);
  // The unchanged second author keeps its sort key.
  assert.match(opf, /<meta refines="#c2" property="file-as">Roe, John<\/meta>/);
});

test("EPUB 2: renaming removes opf:file-as but keeps opf:role", () => {
  const opf = applyMetadataToOpf(EPUB2_OPF, { ...base(EPUB2_OPF), authors: ["Ann Smith"] });
  assert.match(opf, /<dc:creator opf:role="aut">Ann Smith<\/dc:creator>/);
  assert.doesNotMatch(opf, /file-as/);
  assert.match(opf, /<meta name="cover" content="cover-img"\/>/);
});

test("adds a missing language", () => {
  const opf = applyMetadataToOpf(EPUB2_OPF, { ...base(EPUB2_OPF), language: "pt-BR" });
  assert.match(opf, /<dc:language>pt-BR<\/dc:language>/);
  assert.equal(readMetadataFromOpf(opf).hasLanguage, true);
});

test("escapes XML special characters", () => {
  const opf = applyMetadataToOpf(EPUB3_OPF, {
    ...base(EPUB3_OPF),
    title: `Tom & Jerry <2> "Q's"`,
  });
  assert.match(opf, /<dc:title id="t1">Tom &amp; Jerry &lt;2&gt; &quot;Q&apos;s&quot;<\/dc:title>/);
  assert.equal(base(opf).title, `Tom & Jerry <2> "Q's"`);
});

test("removing an author removes its refinements; adding one gets a unique id", () => {
  const removed = applyMetadataToOpf(EPUB3_OPF, { ...base(EPUB3_OPF), authors: ["Jane Doe"] });
  assert.doesNotMatch(removed, /John Roe|#c2/);
  assert.match(removed, /refines="#c1" property="file-as">Doe, Jane/);
  assert.doesNotMatch(removed, /\n\s*\n/, "no blank lines left behind");

  const added = applyMetadataToOpf(EPUB3_OPF, {
    ...base(EPUB3_OPF),
    authors: ["Jane Doe", "John Roe", "Third Person"],
  });
  assert.match(added, /<dc:creator id="ecc-creator-1">Third Person<\/dc:creator>/);
  assert.deepEqual(base(added).authors, ["Jane Doe", "John Roe", "Third Person"]);
});

test("adds, then clears, an optional field", () => {
  const added = applyMetadataToOpf(EPUB2_OPF, { ...base(EPUB2_OPF), publisher: "Acme" });
  assert.match(added, /<dc:publisher>Acme<\/dc:publisher>/);
  const cleared = applyMetadataToOpf(added, { ...base(added), publisher: " " });
  assert.doesNotMatch(cleared, /dc:publisher/);
});

test("unchanged metadata leaves the package file byte-for-byte identical", () => {
  assert.equal(applyMetadataToOpf(EPUB3_OPF, base(EPUB3_OPF)), EPUB3_OPF);
  assert.equal(applyMetadataToOpf(EPUB2_OPF, base(EPUB2_OPF)), EPUB2_OPF);
});

test("rejects an empty title and malformed language codes", () => {
  assert.throws(() => applyMetadataToOpf(EPUB3_OPF, { ...base(EPUB3_OPF), title: "  " }));
  assert.throws(() => applyMetadataToOpf(EPUB3_OPF, { ...base(EPUB3_OPF), language: "English" }));
  assert.ok(isValidLanguageTag("es-419"));
  assert.ok(isValidLanguageTag("zh-Hant"));
  assert.ok(!isValidLanguageTag("en_US"));
});

test("changedFields reports only real edits", () => {
  const before = base(EPUB3_OPF);
  assert.deepEqual(changedFields(before, { ...before, title: " Old Title " }), []);
  assert.deepEqual(changedFields(before, { ...before, authors: ["Jane Doe"], language: "fr" }), [
    "authors",
    "language",
  ]);
});

test("saved EPUB: mimetype first and stored, other files untouched, modified date updated", async () => {
  const zip = buildZip(EPUB3_OPF);
  const original = new File([await zip.generateAsync({ type: "uint8array" })], "book.epub");
  const loaded = await loadEpubMetadata(original);
  assert.equal(loaded.isDrmProtected, false);

  const saved = await saveEpubMetadata(loaded.zip, { ...loaded.metadata, title: "Saved" }, "book.epub");
  assert.equal(saved.name, "book.epub");

  const bytes = new Uint8Array(await saved.arrayBuffer());
  assert.equal(new TextDecoder().decode(bytes.slice(30, 38)), "mimetype");
  assert.equal(bytes[8] | (bytes[9] << 8), 0, "mimetype is stored, not compressed");

  const reopened = await JSZip.loadAsync(bytes);
  const opf = await reopened.file("OEBPS/content.opf").async("text");
  assert.equal(base(opf).title, "Saved");
  assert.doesNotMatch(opf, /2020-01-01T00:00:00Z/);
  assert.equal(await reopened.file("OEBPS/ch1.xhtml").async("text"), "<html><body>Chapter one</body></html>");
  assert.equal(opf.slice(opf.indexOf("<manifest>")), EPUB3_OPF.slice(EPUB3_OPF.indexOf("<manifest>")));
});

test("flags DRM-protected files", async () => {
  const zip = buildZip(EPUB3_OPF);
  zip.file("META-INF/rights.xml", "<rights/>");
  const file = new File([await zip.generateAsync({ type: "uint8array" })], "drm.epub");
  assert.equal((await loadEpubMetadata(file)).isDrmProtected, true);
});
