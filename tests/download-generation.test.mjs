import assert from "node:assert/strict";
import test from "node:test";

import JSZip from "jszip";
import { generateUpdatedEpub } from "../src/lib/epub.ts";

test("generates an updated EPUB without claiming that it was saved", async () => {
  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip");
  zip.file("OPS/cover.jpg", new Uint8Array([1, 2, 3]));

  const replacement = new File(
    [new Uint8Array([9, 8, 7, 6])],
    "replacement.jpg",
    { type: "image/jpeg" },
  );

  const result = await generateUpdatedEpub(
    zip,
    "OPS/cover.jpg",
    replacement,
    "sample.epub",
  );

  assert.equal(result.success, true);
  assert.equal(result.file?.name, "sample-new-cover.epub");
  assert.equal(result.file?.type, "application/epub+zip");

  const generatedZip = await JSZip.loadAsync(await result.file.arrayBuffer());
  const coverBytes = await generatedZip
    .file("OPS/cover.jpg")
    .async("uint8array");

  assert.deepEqual([...coverBytes], [9, 8, 7, 6]);
});
