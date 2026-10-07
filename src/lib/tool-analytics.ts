export const TOOL_FUNNEL_EVENTS = [
  "tool_epub_selected",
  "tool_epub_parsed",
  "tool_cover_selected",
  "tool_cover_prepared",
  "tool_download_clicked",
  "tool_download_succeeded",
] as const;

export const TOOL_FAILURE_EVENT = "tool_failed";

export const TOOL_FAILURE_STAGES = ["epub_validation", "epub_parse", "cover_validation", "cover_prepare", "download"] as const;
export const TOOL_FAILURE_REASONS = ["invalid_file_type", "file_too_large", "drm_protected", "parse_error", "image_load_error", "generation_error"] as const;
export const TOOL_ALLOWED_PROPERTY_KEYS = ["workflow_id", "stage", "reason", "has_existing_cover", "image_type", "target_preset", "preparation_mode"] as const;

type ToolFunnelEvent = (typeof TOOL_FUNNEL_EVENTS)[number];
type ToolFailureStage = (typeof TOOL_FAILURE_STAGES)[number];
type ToolFailureReason = (typeof TOOL_FAILURE_REASONS)[number];
export type ToolEvent = ToolFunnelEvent | typeof TOOL_FAILURE_EVENT;
export type ToolEventProperties = {
  workflow_id: string;
  stage?: ToolFailureStage;
  reason?: ToolFailureReason;
  has_existing_cover?: boolean;
  image_type?: string;
  target_preset?: string;
  preparation_mode?: string;
};

export function sanitizeToolProperties(properties: Record<string, unknown>): Record<string, string | number | boolean | null | undefined> {
  return Object.fromEntries(TOOL_ALLOWED_PROPERTY_KEYS.flatMap((key) => key in properties ? [[key, properties[key]]] : [])) as Record<string, string | number | boolean | null | undefined>;
}


export function createWorkflowId(): string {
  if (typeof crypto?.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `workflow_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
