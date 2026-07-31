import type { MetadataRoute } from 'next'
import { SITE_URL, LOCALES, API_URL, altLanguages } from '~/lib/seo'

interface Blog {
  id: number
  language: 'uz' | 'ru' | 'en'
  is_active: boolean
  date_posted: string
}

// Static routes (path relative to /{locale}), with crawl priority.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/insights', priority: 0.8, changeFrequency: 'daily' },
  { path: '/about-us', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
]

async function fetchBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/admin/all-blogs/`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = (await res.json()) as Blog[]
    return Array.isArray(data) ? data.filter((b) => b.is_active) : []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages, one entry per locale, cross-linked via hreflang alternates.
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: altLanguages(route.path) },
    })),
  )

  // Blog posts (each exists in a single language).
  const blogs = await fetchBlogs()
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/${blog.language}/insights/${blog.id}`,
    lastModified: blog.date_posted ? new Date(blog.date_posted) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries]
}
