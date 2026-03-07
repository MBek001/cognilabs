"use client";

import { useEffect } from "react";

type Locale = "en" | "uz" | "ru";

type ReverseGeocodeResponse = {
  countryCode?: string;
  countryName?: string;
};

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

export default function GeoLocalePermissionDebug() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const localeInPath = getLocaleFromPath(window.location.pathname);
    const localeInCookie = getCookieLocale();
    console.log("[geo-debug] Locale context", {
      pathname: window.location.pathname,
      localeInPath: localeInPath ?? "unknown",
      localeInCookie: localeInCookie ?? "none",
      browserLanguage: navigator.language,
      secureContext: window.isSecureContext,
    });

    if (!("geolocation" in navigator)) {
      console.log("[geo-debug] Geolocation API is not available in this browser.");
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
