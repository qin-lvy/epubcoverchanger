import assert from "node:assert/strict";
import test from "node:test";

import {
  getCoverEditorDisplayDimensions,
  mapDisplayTransformToOutput,
} from "../src/lib/cover-sizes.ts";

test("fits the cover preview to both the viewport width and height", () => {
  const compactPhone = getCoverEditorDisplayDimensions(375, 667, 1600, 2400);
  const tallPhone = getCoverEditorDisplayDimensions(430, 932, 1600, 2400);
  const landscapePhone = getCoverEditorDisplayDimensions(844, 390, 1600, 2560);
  const desktop = getCoverEditorDisplayDimensions(1440, 900, 1600, 2400);

  assert.deepEqual(compactPhone, { width: 200, height: 300 });
  assert.deepEqual(tallPhone, { width: 280, height: 420 });
  assert.deepEqual(landscapePhone, { width: 110, height: 176 });
  assert.deepEqual(desktop, { width: 360, height: 540 });
});

test("preserves the target ratio for different platform presets", () => {
  const kindle = getCoverEditorDisplayDimensions(390, 844, 1600, 2560);
  const kobo = getCoverEditorDisplayDimensions(390, 844, 1500, 2000);

  assert.ok(Math.abs(kindle.height / kindle.width - 1.6) < 0.005);
  assert.ok(Math.abs(kobo.height / kobo.width - 4 / 3) < 0.005);
});

test("maps the preview position and scale to the same output position", () => {
  const mapped = mapDisplayTransformToOutput(
    { mode: "fill", scale: 0.25, x: -12, y: -18, background: "white" },
    { width: 1414, height: 2000 },
    200,
    1600,
  );

  assert.deepEqual(mapped, {
    x: -96,
    y: -144,
    width: 2828,
    height: 4000,
  });
});
