// components/BlogList.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'

interface Blog {
	id: number
	title: string
	content: string
	language: 'uz' | 'ru' | 'en'
	date_posted: string
	is_active: boolean
	image_url: string
}

export default function BlogList() {
	const locale = useLocale()
	const b = useTranslations('Blogs')

	const [blogs, setBlogs] = useState<Blog[]>([])
	const [loading, setLoading] = useState(true)

	// Your original Date Formatter logic
	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		if (locale === 'uz') {
			const uzMonths = [
				'yanvar',
				'fevral',
				'mart',
				'aprel',
				'may',
				'iyun',
				'iyul',
				'avgust',
				'sentyabr',
				'oktyabr',
				'noyabr',
				'dekabr',
			]
			return `${date.getDate()} ${uzMonths[date.getMonth()]} ${date.getFullYear()}`
		}
		return date.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	useEffect(() => {
		let stillMounted = true
		const controller = new AbortController()

		Promise.resolve().then(() => {
			if (stillMounted) setLoading(true)
		})

		fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/all-blogs/`, {
			signal: controller.signal,
		})
			.then(res => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`)
				return res.json()
			})
			.then((data: Blog[]) => {
				if (!stillMounted) return
				const filtered = data.filter(
					(blog: Blog) => blog.is_active && blog.language === locale,
				)
				setBlogs(filtered)
			})
			.catch(err => {
				if (!stillMounted || controller.signal.aborted) return
				console.error('Insights fetch error:', err)
				setBlogs([])
			})
			.finally(() => {
				if (!stillMounted) return
				setLoading(false)
			})

		return () => {
			stillMounted = false
			controller.abort()
		}
	}, [locale])

	if (loading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
				{[1, 2, 3].map(i => (
					<div
						key={i}
						className='h-[400px] bg-gray-900/50 rounded-3xl animate-pulse'
					/>
				))}
			</div>
		)
	}

	if (blogs.length === 0) {
		return (
			<div className='min-h-[40vh] flex items-center justify-center'>
				<p className='text-2xl text-gray-400'>{b('notfound')}</p>
			</div>
		)
	}

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
			{blogs.map((blog: Blog) => (
				<article
					key={blog.id}
					className='bg-[#0b0f19] rounded-3xl overflow-hidden border border-blue-900/30 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-800/30 transition-all duration-500 flex flex-col'
				>
					<Link href={`/${locale}/insights/${blog.id}`}>
						<div className='relative w-full h-64'>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${blog.image_url}`}
								alt={blog.title}
								fill
								unoptimized
								className='object-cover transition-transform duration-700 group-hover:scale-105'
							/>
							<div className='absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent'></div>
						</div>
					</Link>

					<div className='p-6 flex flex-col grow space-y-4'>
						<time className='text-sm text-blue-300 bg-blue-900/20 px-4 py-1.5 rounded-full border border-blue-800/40 w-fit'>
							{formatDate(blog.date_posted)}
						</time>
						<h2 className='text-xl font-bold text-white line-clamp-2'>
							{blog.title}
						</h2>

						{/* Kept your exact text styling */}
						<div className='text-gray-300 text-base leading-relaxed line-clamp-4 grow'>
							<div dangerouslySetInnerHTML={{ __html: blog.content }} />
						</div>

						<Link
							href={`/${locale}/insights/${blog.id}`}
							className='mt-4 flex gap-2 scale-95 border border-blue-600 rounded-2xl hover:scale-100 text-white py-1 mr-2 px-3 text-[14px] transition-all w-fit'
						>
							{b('view')} <ArrowUpRight className='w-4' />
						</Link>
					</div>
				</article>
			))}
		</div>
	)
}
