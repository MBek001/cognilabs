"use client";

import { useEffect } from "react";

type Locale = "en" | "uz" | "ru";

type ReverseGeocodeResponse = {
  countryCode?: string;
  countryName?: string;
};

const SUPPORTED_LOCALES = new Set<Locale>(["en", "uz", "ru"]);
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const INITIAL_GEO_LOCALE_DONE_KEY = "geo-locale-initialized-v1";

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

function getCookieLocale(): Locale | null {
  const localeCookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("NEXT_LOCALE="))
    ?.split("=")[1];

  if (localeCookie && SUPPORTED_LOCALES.has(localeCookie as Locale)) {
    return localeCookie as Locale;
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
    if (typeof window === "undefined") {
      return;
    }

    const localeInPath = getLocaleFromPath(window.location.pathname);
    const localeInCookie = getCookieLocale();
    const isGeoLocaleInitialized = window.localStorage.getItem(INITIAL_GEO_LOCALE_DONE_KEY) === "1";

    console.log("[geo-debug] Locale context", {
      pathname: window.location.pathname,
      localeInPath: localeInPath ?? "unknown",
      localeInCookie: localeInCookie ?? "none",
      browserLanguage: navigator.language,
      secureContext: window.isSecureContext,
      isGeoLocaleInitialized,
    });

    if (localeInCookie) {
      console.log("[geo-debug] Saved locale exists, skipping geolocation auto-switch.");
      return;
    }

    if (isGeoLocaleInitialized) {
      console.log("[geo-debug] Initial geolocation flow already completed, skipping.");
      return;
    }

    if (!("geolocation" in navigator)) {
      console.log("[geo-debug] Geolocation API is not available in this browser.");
      window.localStorage.setItem(INITIAL_GEO_LOCALE_DONE_KEY, "1");
      return;
    }

    const resolveCountryAndLocale = async (latitude: number, longitude: number, accuracy: number) => {
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

      console.log("[geo-debug] Location and locale", {
        latitude,
        longitude,
        accuracy,
        countryCode: countryCode ?? "unknown",
        countryName: countryName ?? "unknown",
        geoSuggestedLocale: selectedLocale,
        localeInPath: localeInPath ?? "unknown",
        localeInCookie: localeInCookie ?? "none",
      });

      setLocaleCookie(selectedLocale);
      console.log("[geo-debug] NEXT_LOCALE cookie updated", { selectedLocale });
      window.localStorage.setItem(INITIAL_GEO_LOCALE_DONE_KEY, "1");

      if (localeInPath && localeInPath !== selectedLocale) {
        const nextPathname = buildPathWithLocale(window.location.pathname, selectedLocale);
        const nextUrl = `${nextPathname}${window.location.search}${window.location.hash}`;
        console.log("[geo-debug] Redirecting to locale from geolocation", {
          from: localeInPath,
          to: selectedLocale,
          nextUrl,
        });
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
          console.log("[geo-debug] Geolocation permission granted");
          await resolveCountryAndLocale(latitude, longitude, accuracy);
        },
        (error) => {
          console.log("[geo-debug] Geolocation permission denied or failed", {
            code: error.code,
            message: error.message,
          });
          window.localStorage.setItem(INITIAL_GEO_LOCALE_DONE_KEY, "1");
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
