"use client";

type EventData = Record<string, unknown>;

const getTrackingContext = () => {
  if (typeof window === "undefined") {
    return { pagePath: "", locale: "default" };
  }

  const pagePath = window.location.pathname;
  const locale = pagePath.split("/")[1] || "default";

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
