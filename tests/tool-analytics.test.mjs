import assert from "node:assert/strict";
import test from "node:test";

import {
  TOOL_FAILURE_EVENT,
  TOOL_FAILURE_REASONS,
  TOOL_FAILURE_STAGES,
  TOOL_FUNNEL_EVENTS,
  TOOL_SAVE_EVENT,
  sanitizeToolProperties,
} from "../src/lib/tool-analytics.ts";

test("defines the six approved funnel events in order", () => {
  assert.deepEqual(TOOL_FUNNEL_EVENTS, [
    "tool_epub_selected",
    "tool_epub_parsed",
    "tool_cover_selected",
    "tool_cover_prepared",
    "tool_download_clicked",
    "tool_epub_generated",
  ]);
});

test("keeps save intent outside the core funnel", () => {
  assert.equal(TOOL_SAVE_EVENT, "tool_save_clicked");
  assert.equal(TOOL_FUNNEL_EVENTS.includes(TOOL_SAVE_EVENT), false);
});

test("uses one separate event for categorized failures", () => {
  assert.equal(TOOL_FAILURE_EVENT, "tool_failed");
  assert.deepEqual(TOOL_FAILURE_STAGES, ["epub_validation", "epub_parse", "cover_validation", "cover_prepare", "download"]);
  assert.deepEqual(TOOL_FAILURE_REASONS, ["invalid_file_type", "file_too_large", "drm_protected", "parse_error", "image_load_error", "generation_error"]);
});

test("removes private and free-text properties from tool analytics", () => {
  assert.deepEqual(sanitizeToolProperties({
    workflow_id: "anonymous-workflow", stage: "epub_parse", reason: "parse_error",
    file_name: "private.epub", book_title: "Private title", email: "reader@example.com",
    file_content: "private bytes", raw_error: "private stack trace",
  }), { workflow_id: "anonymous-workflow", stage: "epub_parse", reason: "parse_error" });
});
