"use client";

import { event } from "~/lib/gtag";

/**
 * Example reusable CTA that tracks a GA4 signup intent event.
 */
export default function SignupButton() {
  const handleClick = () => {
    event("signup_click", {
      event_category: "engagement",
      event_label: "homepage_signup",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center rounded-lg bg-[#0066FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0050cc]"
    >
      Sign up now
    </button>
  );
}

