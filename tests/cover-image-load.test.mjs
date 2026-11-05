import assert from "node:assert/strict";
import test from "node:test";

import {
  CoverLoadError,
  detectImageFormat,
  getOsFamily,
  loadCoverImage,
  sizeBucket,
} from "../src/lib/cover-image-load.ts";
import { sanitizeToolProperties } from "../src/lib/tool-analytics.ts";

const bytes = (...parts) => {
  const out = [];
  for (const part of parts) {
    if (typeof part === "string") out.push(...[...part].map((c) => c.charCodeAt(0)));
    else out.push(...part);
  }
  return new Uint8Array(out);
};
const ftyp = (brand) => bytes([0, 0, 0, 0x18], "ftyp", brand, [0, 0, 0, 0]);

test("detects image formats from the file header, not the name", () => {
  assert.equal(detectImageFormat(bytes([0xff, 0xd8, 0xff, 0xe0])), "jpeg");
  assert.equal(detectImageFormat(bytes([0x89], "PNG", [0x0d, 0x0a])), "png");
  assert.equal(detectImageFormat(bytes("RIFF", [0, 0, 0, 0], "WEBP")), "webp");
  assert.equal(detectImageFormat(bytes("GIF89a")), "gif");
  assert.equal(detectImageFormat(ftyp("heic")), "heic");
  assert.equal(detectImageFormat(ftyp("mif1")), "heic");
  assert.equal(detectImageFormat(ftyp("avif")), "avif");
  assert.equal(detectImageFormat(bytes("hello world")), "unknown");
  assert.equal(detectImageFormat(new Uint8Array()), "unknown");
});

test("buckets sizes and recognises phone systems", () => {
  assert.equal(sizeBucket(200_000), "under_1mb");
  assert.equal(sizeBucket(3 * 1024 * 1024), "1_5mb");
  assert.equal(sizeBucket(9 * 1024 * 1024), "over_5mb");
  assert.equal(getOsFamily("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)"), "ios");
  assert.equal(getOsFamily("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 5), "ios");
  assert.equal(getOsFamily("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", 0), "other");
  assert.equal(getOsFamily("Mozilla/5.0 (Linux; Android 14; Pixel 8)"), "android");
});

const jpegFile = () => new File([bytes([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3])], "cover.jpg", { type: "image/jpeg" });

test("returns the original file when it loads first time", async () => {
  const file = jpegFile();
  const result = await loadCoverImage(file, async () => ({ width: 10, height: 20 }));
  assert.equal(result.file, file);
  assert.equal(result.retried, false);
  assert.deepEqual(result.dimensions, { width: 10, height: 20 });
});

test("retries once from a fresh copy of the bytes", async () => {
  const file = jpegFile();
  let calls = 0;
  const result = await loadCoverImage(file, async (f) => {
    calls += 1;
    if (f === file) throw new Error("not ready");
    return { width: 1600, height: 2400 };
  });
  assert.equal(calls, 2);
  assert.equal(result.retried, true);
  assert.notEqual(result.file, file);
  assert.equal(result.file.name, "cover.jpg");
  assert.equal(result.file.type, "image/jpeg");
  assert.deepEqual(new Uint8Array(await result.file.arrayBuffer()), new Uint8Array(await file.arrayBuffer()));
});

test("reports HEIC data saved under a .jpg name", async () => {
  const file = new File([ftyp("heic")], "IMG_0001.jpg", { type: "image/jpeg" });
  await assert.rejects(
    loadCoverImage(file, async () => { throw new Error("decode failed"); }),
    (error) => error instanceof CoverLoadError && error.detectedFormat === "heic" && error.fileReadable === true,
  );
});

test("reports files whose bytes cannot be read", async () => {
  const unreadable = { name: "cloud.jpg", type: "image/jpeg", lastModified: 0, arrayBuffer: async () => { throw new Error("NotReadableError"); } };
  await assert.rejects(
    loadCoverImage(unreadable, async () => { throw new Error("decode failed"); }),
    (error) => error instanceof CoverLoadError && error.fileReadable === false,
  );
  const empty = new File([], "empty.jpg", { type: "image/jpeg" });
  await assert.rejects(
    loadCoverImage(empty, async () => { throw new Error("decode failed"); }),
    (error) => error instanceof CoverLoadError && error.fileReadable === false,
  );
});

test("analytics keep the new diagnostics and nothing about the image itself", () => {
  assert.deepEqual(
    sanitizeToolProperties({
      workflow_id: "w", reason: "image_load_error", detected_format: "heic", file_readable: true,
      size_bucket: "1_5mb", os_family: "android", load_retried: true, file_name: "IMG_0001.jpg",
    }),
    { workflow_id: "w", reason: "image_load_error", detected_format: "heic", file_readable: true, size_bucket: "1_5mb", os_family: "android", load_retried: true },
  );
});
