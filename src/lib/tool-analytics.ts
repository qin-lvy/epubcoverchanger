export const TOOL_FUNNEL_EVENTS = [
  "tool_epub_selected",
  "tool_epub_parsed",
  "tool_cover_selected",
  "tool_cover_prepared",
  "tool_download_clicked",
  "tool_epub_generated",
] as const;

export const TOOL_SAVE_EVENT = "tool_save_clicked";

export const TOOL_FAILURE_EVENT = "tool_failed";

/** Metadata editor funnel; failures reuse TOOL_FAILURE_EVENT with tool "metadata". */
export const METADATA_EVENTS = [
  "metadata_epub_selected",
  "metadata_epub_parsed",
  "metadata_epub_generated",
] as const;

export const TOOL_FAILURE_STAGES = ["epub_validation", "epub_parse", "cover_validation", "cover_prepare", "download"] as const;
export const TOOL_FAILURE_REASONS = ["invalid_file_type", "file_too_large", "drm_protected", "parse_error", "image_load_error", "generation_error"] as const;
export const TOOL_ALLOWED_PROPERTY_KEYS = ["workflow_id", "tool", "stage", "reason", "has_existing_cover", "image_type", "target_preset", "preparation_mode", "had_language", "changed_fields"] as const;

type ToolFunnelEvent = (typeof TOOL_FUNNEL_EVENTS)[number];
type ToolFailureStage = (typeof TOOL_FAILURE_STAGES)[number];
type ToolFailureReason = (typeof TOOL_FAILURE_REASONS)[number];
export type ToolEvent =
  | ToolFunnelEvent
  | (typeof METADATA_EVENTS)[number]
  | typeof TOOL_SAVE_EVENT
  | typeof TOOL_FAILURE_EVENT;
export type ToolEventProperties = {
  workflow_id: string;
  tool?: "metadata";
  stage?: ToolFailureStage;
  reason?: ToolFailureReason;
  has_existing_cover?: boolean;
  image_type?: string;
  target_preset?: string;
  preparation_mode?: string;
  had_language?: boolean;
  /** Comma-separated field names, e.g. "title,language" — never the values. */
  changed_fields?: string;
};

export function sanitizeToolProperties(properties: Record<string, unknown>): Record<string, string | number | boolean | null | undefined> {
  return Object.fromEntries(TOOL_ALLOWED_PROPERTY_KEYS.flatMap((key) => key in properties ? [[key, properties[key]]] : [])) as Record<string, string | number | boolean | null | undefined>;
}


const PRODUCTION_HOSTS = ["epubcoverchanger.com", "www.epubcoverchanger.com"];

/** Vercel previews and local builds share the PostHog token, so only the live site reports. */
export function isProductionHost(hostname: string): boolean {
  return PRODUCTION_HOSTS.includes(hostname);
}

export function createWorkflowId(): string {
  if (typeof crypto?.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `workflow_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
