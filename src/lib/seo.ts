// Central SEO configuration. Change SITE_URL here if the production domain changes.
export const SITE_URL = 'https://www.cognilabs.org'

export const LOCALES = ['en', 'uz', 'ru'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

// Default social share image — generated on the fly at /og (1200x630 PNG). See src/app/og/route.tsx.
export const OG_IMAGE = '/og'

// External API that serves blog/insights content.
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://admin.api.cognilabs.org'

/** OpenGraph locale code for a given app locale. */
export function ogLocale(locale: string): string {
  return locale === 'uz' ? 'uz_UZ' : locale === 'ru' ? 'ru_RU' : 'en_US'
}

/** Absolute canonical URL for a locale + path (path starts with '/', or ''). */
export function canonicalFor(locale: string, path = ''): string {
  return `${SITE_URL}/${locale}${path}`
}

/** hreflang alternates (all locales + x-default) for a given path. */
export function altLanguages(path = ''): Record<string, string> {
  return {
    en: `${SITE_URL}/en${path}`,
    uz: `${SITE_URL}/uz${path}`,
    ru: `${SITE_URL}/ru${path}`,
    'x-default': `${SITE_URL}/en${path}`,
  }
}

/** Ready-to-spread alternates block for a page's Metadata. */
export function alternatesFor(locale: string, path = '') {
  return {
    canonical: canonicalFor(locale, path),
    languages: altLanguages(path),
  }
}
