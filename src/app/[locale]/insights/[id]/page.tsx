import type { Metadata } from 'next'
import { SITE_URL, API_URL, OG_IMAGE, ogLocale } from '~/lib/seo'
import BlogDetailClient from '~/components/insights/BlogDetailClient'

interface Blog {
	id: number
	title: string
	content: string
	language: 'uz' | 'ru' | 'en'
	date_posted: string
	is_active: boolean
	image_url: string
}

async function getBlog(id: string): Promise<Blog | null> {
	try {
		const res = await fetch(`${API_URL}/admin/get-blog/${id}/`, {
			next: { revalidate: 3600 },
		})
		if (!res.ok) return null
		return (await res.json()) as Blog
	} catch {
		return null
	}
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

function blogImage(blog: Blog): string {
	return blog.image_url ? `${API_URL}/uploads/${blog.image_url}` : `${SITE_URL}${OG_IMAGE}`
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; id: string }>
}): Promise<Metadata> {
	const { locale, id } = await params
	const blog = await getBlog(id)
	const canonical = `${SITE_URL}/${locale}/insights/${id}`

	if (!blog) {
		return {
			title: 'Article — Cognilabs Insights',
			alternates: { canonical },
		}
	}

	const description = stripHtml(blog.content).slice(0, 160)
	const image = blogImage(blog)

	return {
		title: `${blog.title} | Cognilabs Insights`,
		description,
		openGraph: {
			type: 'article',
			title: blog.title,
			description,
			url: canonical,
			siteName: 'Cognilabs',
			locale: ogLocale(blog.language),
			publishedTime: blog.date_posted,
			images: [{ url: image, alt: blog.title }],
		},
		twitter: {
			card: 'summary_large_image',
			title: blog.title,
			description,
			images: [image],
		},
		alternates: { canonical },
		robots: { index: true, follow: true },
	}
}

export default async function BlogDetailPage({
	params,
}: {
	params: Promise<{ locale: string; id: string }>
}) {
	const { locale, id } = await params
	const blog = await getBlog(id)

	const jsonLd = blog
		? {
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: blog.title,
				image: blogImage(blog),
				datePublished: blog.date_posted,
				dateModified: blog.date_posted,
				inLanguage: blog.language,
				description: stripHtml(blog.content).slice(0, 200),
				mainEntityOfPage: {
					'@type': 'WebPage',
					'@id': `${SITE_URL}/${locale}/insights/${id}`,
				},
				author: { '@type': 'Organization', name: 'Cognilabs', url: SITE_URL },
				publisher: {
					'@type': 'Organization',
					name: 'Cognilabs',
					logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo1.png` },
				},
			}
		: null

	return (
		<>
			{jsonLd && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			<BlogDetailClient />
		</>
	)
}
