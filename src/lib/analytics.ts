type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

const DISTINCT_ID_KEY = "ecc_distinct_id";

function getPostHogConfig() {
  return {
    token: process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN,
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  };
}

function getDistinctId() {
  if (typeof window === "undefined") return "server";

  const existing = window.localStorage.getItem(DISTINCT_ID_KEY);
  if (existing) return existing;

  const id =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `anon_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  window.localStorage.setItem(DISTINCT_ID_KEY, id);
  return id;
}

export function captureEvent(
  event: string,
  properties: AnalyticsProperties = {},
) {
  if (typeof window === "undefined") return;

  const { token, host } = getPostHogConfig();
  if (!token || !host) return;

  const payload = {
    api_key: token,
    event,
    distinct_id: getDistinctId(),
    properties: {
      ...properties,
      app: "epubcoverchanger",
      $current_url: window.location.href,
      $pathname: window.location.pathname,
      current_url: window.location.href,
      path: window.location.pathname,
    },
  };

  const body = JSON.stringify(payload);
  const endpoint = `${host.replace(/\/$/, "")}/capture/`;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics must never break the product experience.
  });
}

export function capturePageView(path: string) {
  captureEvent("$pageview", { path });
}
