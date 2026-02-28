"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "~/lib/gtag";

const sanitizeToken = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
};

const getPageName = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  const localeRegex = /^[a-z]{2}$/;
  const pathWithoutLocale = localeRegex.test(segments[0] ?? "") ? segments.slice(1) : segments;
  const raw = pathWithoutLocale.length ? pathWithoutLocale.join("_") : "home";
  return sanitizeToken(raw) || "home";
};

const getButtonName = (element: Element): string => {
  const htmlEl = element as HTMLElement;
  const textFromContent = htmlEl.innerText || htmlEl.textContent || "";
  const inputValue =
    element instanceof HTMLInputElement || element instanceof HTMLButtonElement
      ? element.value
      : "";
  const raw =
    textFromContent ||
    inputValue ||
    element.getAttribute("aria-label") ||
    element.getAttribute("name") ||
    element.getAttribute("id") ||
    "unknown";

  return sanitizeToken(raw) || "unknown";
};

const getFormName = (form: HTMLFormElement): string => {
  const raw =
    form.getAttribute("name") ||
    form.getAttribute("id") ||
    form.getAttribute("aria-label") ||
    "unknown";

  return sanitizeToken(raw) || "unknown";
};

/**
 * Global delegated analytics tracker.
 *
 * How it works:
 * - Listens on `document` for click + submit (event delegation).
 * - Generates readable GA4 event names from route + target metadata.
 * - Re-runs on route changes so SPA navigation keeps page context correct.
 *
 * Event examples in GA4:
 * - button_click_home_apply
 * - button_click_careers_submit_application
 * - form_submit_careers_application
 */
export default function AutoAnalyticsTracker() {
  const pathname = usePathname();
  const pageName = useMemo(() => getPageName(pathname || "/"), [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      const button = target.closest(
        "button, [role='button'], input[type='button'], input[type='submit']",
      );
      if (!button) return;

      const buttonName = getButtonName(button);
      const eventName = `button_click_${pageName}_${buttonName}`;

      trackEvent(eventName, {
        page: pageName,
        element_type: button.tagName.toLowerCase(),
        element_id: button.getAttribute("id") || undefined,
        element_name: button.getAttribute("name") || undefined,
        element_label: button.getAttribute("aria-label") || undefined,
      });
    };

    const onSubmit = (event: SubmitEvent) => {
      const target = event.target as HTMLFormElement | null;
      if (!target || target.tagName.toLowerCase() !== "form") return;

      const formName = getFormName(target);
      const eventName = `form_submit_${pageName}_${formName}`;

      trackEvent(eventName, {
        page: pageName,
        form_id: target.getAttribute("id") || undefined,
        form_name: target.getAttribute("name") || undefined,
      });
    };

    // Delegated listeners keep overhead low and cover future dynamic elements.
    document.addEventListener("click", onClick, { passive: true });
    document.addEventListener("submit", onSubmit);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("submit", onSubmit);
    };
  }, [pageName]);

  return null;
}

