import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../src/components/DownloadButton.tsx", import.meta.url),
  "utf8",
);
const coverReplacerSource = await readFile(
  new URL("../src/components/CoverReplacer.tsx", import.meta.url),
  "utf8",
);
const cropEditorSource = await readFile(
  new URL("../src/components/CoverCropEditor.tsx", import.meta.url),
  "utf8",
);

test("describes the iPhone system panel as saving or opening the EPUB", () => {
  assert.match(source, /Save or Open EPUB/);
  assert.match(source, /choose Save to Files or open it in Apple Books/);
  assert.doesNotMatch(source, />\s*Save EPUB to Files\s*</);
});

test("hides unreliable blob link fallbacks when iPhone sharing works", () => {
  assert.match(source, /const showLinkFallbacks = !isIosDevice/);
  assert.match(source, /showLinkFallbacks &&/);
});

test("explains that cover positioning is automatic but optional to adjust", () => {
  assert.match(coverReplacerSource, /Output size/);
  assert.match(cropEditorSource, /Review your cover position/);
  assert.match(cropEditorSource, /Centered automatically\. Adjust if needed\./);
  assert.doesNotMatch(coverReplacerSource, /Target platform/);
  assert.doesNotMatch(cropEditorSource, /Position your cover image/);
});
