"use client";

type EventData = Record<string, unknown>;
const SUPPORTED_LOCALES = new Set(["en", "ru", "uz"]);

const getTrackingContext = () => {
  if (typeof window === "undefined") {
    return { pagePath: "", locale: "default" };
  }

  const pagePath = window.location.pathname;
  const firstSegment = pagePath.split("/")[1] || "";
  const locale = SUPPORTED_LOCALES.has(firstSegment) ? firstSegment : "default";

  return { pagePath, locale };
};

export function trackEvent(eventName: string, data: EventData = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const { pagePath, locale } = getTrackingContext();

  window.gtag("event", eventName, {
    ...data,
    page_path: pagePath,
    locale,
  });
}
