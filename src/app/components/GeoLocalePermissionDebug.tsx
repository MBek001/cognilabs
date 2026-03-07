"use client";

import { useEffect } from "react";

type Locale = "en" | "uz" | "ru";

type ReverseGeocodeResponse = {
  countryCode?: string;
  countryName?: string;
};

const DEBUG_ENABLED = process.env.NEXT_PUBLIC_GEO_DEBUG_PERMISSION === "true";
const PROMPT_ONCE_KEY = "geo-locale-debug-prompted-v1";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const SUPPORTED_LOCALES = new Set<Locale>(["en", "uz", "ru"]);

function getLocaleFromCountry(countryCode?: string): Locale {
  switch (countryCode?.toUpperCase()) {
    case "UZ":
      return "uz";
    case "RU":
      return "ru";
    default:
      return "en";
  }
}

function getLocaleFromPath(pathname: string): Locale | null {
  const firstSegment = pathname.split("/", 3)[1];
  if (SUPPORTED_LOCALES.has(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return null;
}

function buildPathWithLocale(pathname: string, locale: Locale): string {
  const withoutLocalePrefix = pathname.replace(/^\/(en|uz|ru)(?=\/|$)/, "");
  return withoutLocalePrefix ? `/${locale}${withoutLocalePrefix}` : `/${locale}`;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`;
}

export default function GeoLocalePermissionDebug() {
  useEffect(() => {
    if (!DEBUG_ENABLED || typeof window === "undefined") {
      return;
    }

    if (window.localStorage.getItem(PROMPT_ONCE_KEY) === "1") {
      return;
    }
    window.localStorage.setItem(PROMPT_ONCE_KEY, "1");

    if (!("geolocation" in navigator)) {
      console.log("[geo-debug] Geolocation API is not available in this browser.");
      return;
    }

    const resolveCountryAndLocale = async (latitude: number, longitude: number) => {
      let countryCode: string | undefined;
      let countryName: string | undefined;

      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          { cache: "no-store" }
        );

        if (response.ok) {
          const data = (await response.json()) as ReverseGeocodeResponse;
          countryCode = data.countryCode;
          countryName = data.countryName;
        } else {
          console.log("[geo-debug] Reverse geocoding failed", { status: response.status });
        }
      } catch (error) {
        console.log("[geo-debug] Reverse geocoding request failed", { error });
      }

      const selectedLocale = getLocaleFromCountry(countryCode);
      const currentLocale = getLocaleFromPath(window.location.pathname);

      console.log("[geo-debug] Browser geolocation locale resolution", {
        countryCode: countryCode ?? "unknown",
        countryName: countryName ?? "unknown",
        selectedLocale,
        currentLocale: currentLocale ?? "unknown",
      });

      setLocaleCookie(selectedLocale);

      if (currentLocale && currentLocale !== selectedLocale) {
        const nextPathname = buildPathWithLocale(window.location.pathname, selectedLocale);
        const nextUrl = `${nextPathname}${window.location.search}${window.location.hash}`;
        window.location.replace(nextUrl);
      }
    };

    const requestLocation = async () => {
      if ("permissions" in navigator && navigator.permissions?.query) {
        try {
          const status = await navigator.permissions.query({ name: "geolocation" as PermissionName });
          console.log("[geo-debug] Geolocation permission state before request", {
            state: status.state,
          });
        } catch (error) {
          console.log("[geo-debug] Could not read geolocation permission state", { error });
        }
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log("[geo-debug] Geolocation permission granted", {
            latitude,
            longitude,
            accuracy,
          });
          await resolveCountryAndLocale(latitude, longitude);
        },
        (error) => {
          console.log("[geo-debug] Geolocation permission denied or failed", {
            code: error.code,
            message: error.message,
          });
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    };

    void requestLocation();
  }, []);

  return null;
}
