export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

// GA4 event payloads are intentionally flexible and schema-less.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventParams = Record<string, any>;

const canTrack = (): boolean => {
  return Boolean(GA_ID) && typeof window !== "undefined" && typeof window.gtag === "function";
};

/**
 * Sends a GA4 page_view for manual SPA route tracking.
 *
 * Import:
 * `import { pageview } from "~/lib/gtag";`
 */
export const pageview = (url: string): void => {
  if (!canTrack()) {
    return;
  }

  window.gtag?.("config", GA_ID, {
    page_path: url,
  });
};

/**
 * Sends a GA4 custom event.
 *
 * Recommended GA4 event names for conversion funnels:
 * - `signup_click`
 * - `login`
 * - `purchase`
 * - `form_submit`
 *
 * These events can later be marked as conversions in:
 * Google Analytics Admin -> Events.
 *
 * Import:
 * `import { event } from "~/lib/gtag";`
 *
 * Example:
 * `event("signup_click", { event_category: "engagement", event_label: "homepage_signup" });`
 */
export const trackEvent = (eventName: string, params: EventParams = {}): void => {
  if (!canTrack()) {
    return;
  }

  window.gtag?.("event", eventName, params);
};

// Backward-compatible alias for existing imports.
export const event = trackEvent;
