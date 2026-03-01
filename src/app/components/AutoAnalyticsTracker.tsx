"use client";

/**
 * Disabled delegated tracker.
 *
 * Explicit event tracking is implemented on target buttons/forms to:
 * - keep event names standardized
 * - avoid duplicate GA4 fires
 * - keep page_view handling unchanged
 */
export default function AutoAnalyticsTracker() {
  return null;
}
