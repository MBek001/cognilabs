import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "uz", "ru"] as const;
const defaultLocale = "en";

type Locale = (typeof locales)[number];

const LOCALE_SET = new Set<string>(locales);
const STATIC_FILE_REGEX =
  /\.(?:avif|bmp|css|gif|ico|jpeg|jpg|js|json|map|mp3|mp4|pdf|png|svg|txt|webmanifest|webp|woff|woff2|xml)$/i;

function isValidLocale(value?: string | null): value is Locale {
  return !!value && LOCALE_SET.has(value);
}

function hasLocalePrefix(pathname: string): boolean {
  const firstSegment = pathname.split("/", 3)[1];
  return isValidLocale(firstSegment);
}

function isBypassedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/trpc") ||
    pathname.startsWith("/_vercel") ||
    STATIC_FILE_REGEX.test(pathname)
  );
}

function getCountryFromHeaders(request: NextRequest): string | undefined {
  return (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("cloudfront-viewer-country") ??
    request.headers.get("x-country-code") ??
    undefined
  );
}

function getLocaleFromCountry(country?: string): Locale {
  switch (country?.toUpperCase()) {
    case "UZ":
      return "uz";
    case "RU":
      return "ru";
    default:
      return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isBypassedPath(pathname) || hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const selectedLocale = isValidLocale(cookieLocale)
    ? cookieLocale
    : getLocaleFromCountry(getCountryFromHeaders(request));

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${selectedLocale}` : `/${selectedLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
