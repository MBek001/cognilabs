'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'

interface Project {
	id: number
	title: string
	phone: string
	desktop: string
	link: string
	text: string
	position: 'left' | 'right'
}

export default function Projects() {
	const [activeProject, setActiveProject] = useState(0)
	const [lineProgress, setLineProgress] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const projectRefs = useRef<(HTMLDivElement | null)[]>([])

	const t = useTranslations('Projects')

	const projects: Project[] = [
		{
			id: 1,
			title: 'Djafariy',
			phone: '/mainprojects/phonedjaffariy.png',
			desktop: '/mainprojects/djafariylaptop.png',
			link: 'https://djafariy.org/',
			text: t('djafariytext'),
			position: 'right',
		},
		{
			id: 2,
			title: 'Billur',
			phone: '/mainprojects/billurphone.png',
			desktop: '/mainprojects/billurlaptop.png',
			link: 'https://billur-market.com',
			text: t('billurtext'),
			position: 'left',
		},
		{
			id: 3,
			title: 'Bazabarbershop',
			phone: '/mainprojects/phonebaza.png',
			desktop: '/mainprojects/desktopbaza.png',
			link: 'https://www.bazabarbershop.com/',
			text: t('bazatext'),
			position: 'right',
		},
	]

	useEffect(() => {
		setIsVisible(true)

		const handleScroll = () => {
			if (!containerRef.current) return

			const container = containerRef.current
			const scrollTop = window.scrollY
			const containerTop = container.offsetTop
			const containerHeight = container.scrollHeight

			projectRefs.current.forEach((ref, index) => {
				if (ref) {
					const rect = ref.getBoundingClientRect()
					const elementCenter = rect.top + rect.height / 2
					const windowCenter = window.innerHeight / 2

					if (Math.abs(elementCenter - windowCenter) < 200) {
						setActiveProject(index)
					}
				}
			})

			const relativeScroll = scrollTop - containerTop + window.innerHeight / 2
			const progress = Math.min(
				Math.max(relativeScroll / containerHeight, 0),
				1,
			)
			setLineProgress(progress)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div className='bg-black min-h-screen'>
			{/* Header Section */}
			<div
				className={`flex flex-col items-center py-12 md:py-16 gap-4 md:gap-6 text-center px-4 transition-all duration-1000 ease-out ${
					isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}
			>
				<h2 className='text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight'>
					<span className='text-white'>{t('ourprojects').split(' ')[0]}</span>
					<span className='text-blue-500'>
						{' '}
						{t('ourprojects').split(' ')[1]}
					</span>
				</h2>
				<p className='text-lg md:text-xl lg:text-2xl max-w-[600px] text-[#FFFFFFB2]'>
					{t('text')}
				</p>
			</div>

			<div ref={containerRef} className='relative py-12 md:py-20 px-4 md:px-8'>
				{/* Desktop Timeline */}
				<div className='absolute left-1/2 top-0 bottom-0 w-[3px] bg-gray-500 transform -translate-x-1/2 hidden md:block'>
					<div
						className='absolute top-0 left-0 w-full bg-blue-500 transition-all duration-300 ease-out'
						style={{ height: `${lineProgress * 100}%` }}
					/>
					<div
						className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out'
						style={{ top: `${lineProgress * 100}%` }}
					>
						<div className='w-5 h-5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 relative'>
							<div className='absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75' />
						</div>
					</div>
				</div>

				<div className='max-w-7xl mx-auto space-y-16 md:space-y-32 overflow-x-clip'>
					{projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={index}
							projectRefs={projectRefs}
							t={t}
						/>
					))}
				</div>
			</div>

			{/* View More Button */}
			<div
				className={`flex justify-center py-12 md:py-20 transition-all duration-1000 delay-500 ease-out ${
					isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}
			>
				<Link
					href='/portfolio'
					className='text-base md:text-[16px] text-white font-semibold px-6 py-3 md:px-4 md:py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-out inline-flex items-center gap-2 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95'
				>
					{t('viewMore')}
					<ArrowRight className='w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1' />
				</Link>
			</div>
		</div>
	)
}

function ProjectCard({
	project,
	index,
	projectRefs,
	t,
}: {
	project: Project
	index: number
	projectRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
	t: (key: string) => string
}) {
	const [isInView, setIsInView] = useState(false)
	const cardRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true)
				}
			},
			{ threshold: 0.1, rootMargin: '-50px' },
		)

		if (cardRef.current) {
			observer.observe(cardRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={el => {
				projectRefs.current[index] = el
				if (el) cardRef.current = el
			}}
			className={`
        flex flex-col-reverse md:flex-row items-center lg:gap-16
        transition-all duration-1000 ease-out
        ${project.position === 'left' ? 'md:flex-row-reverse' : ''}
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
			style={{ transitionDelay: `${index * 150}ms` }}
		>
			{/* TEXT CONTENT */}
			<div
				className={`
          flex-1 w-full 
          transition-all duration-1000 ease-out delay-200
          ${project.position === 'left' ? 'md:text-right md:pr-16' : 'md:pl-10'}
          ${isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${project.position === 'left' ? 'translate-x-12' : '-translate-x-12'}`}
        `}
			>
				<h3
					className={`
            text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4
            transition-all duration-700 ease-out delay-300
            ${project.position === 'left' ? 'text-left md:text-left pl-10' : 'text-left pr-10 md:text-right'}
            ${isInView ? 'opacity-100' : 'opacity-0'}
          `}
				>
					{project.title}
				</h3>

				<div
					className={`
            h-[1px] mb-3 md:mb-4 w-full md:max-w-[540px] bg-white
            transition-all duration-700 ease-out delay-400
            ${project.position === 'left' ? 'md:ml-auto origin-left' : 'origin-right'}
            ${isInView ? 'scale-x-100' : 'scale-x-0'}
          `}
				/>

				<p
					className={`
            text-base md:text-lg lg:text-xl text-white/90 mb-4 md:mb-6
            transition-all duration-700 ease-out delay-500
            ${
							project.position === 'left'
								? 'text-left md:text-left md:pl-10 md:max-w-[540px]'
								: 'text-left md:text-right md:max-w-[540px]'
						}
            ${isInView ? 'opacity-100' : 'opacity-0'}
          `}
				>
					{project.text}
				</p>

				<a
					href={project.link}
					target='_blank'
					rel='noopener noreferrer'
					className={`
            flex items-center gap-2 text-blue-500 hover:text-blue-400 text-base md:text-lg font-semibold
            transition-all duration-500 ease-out delay-600
            ${
							project.position === 'left'
								? 'justify-start md:justify-start md:pl-2 md:ml-auto md:max-w-[540px]'
								: 'justify-start md:justify-end md:max-w-[540px]'
						}
            ${isInView ? 'opacity-100' : 'opacity-0'}
            hover:translate-x-1 group
          `}
				>
					{t('visitProject')}
					<ArrowRight className='w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1' />
				</a>
			</div>

			{/* IMAGES CONTAINER */}
			<div
				className={`
          flex-1 w-full relative
          transition-all duration-1000 ease-out delay-100
          ${isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${project.position === 'left' ? '-translate-x-8' : 'translate-x-8'}`}
        `}
			>
				<div className='relative flex items-center justify-center group'>
					{/* Desktop Image */}
					<div
						className={`
              relative w-full max-w-[600px] z-10 
              transition-all duration-700 ease-out delay-300
              group-hover:scale-[1.02] md:group-hover:scale-[1.05]
              ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
					>
						<Image
							width={600}
							height={400}
							priority={index === 0}
							loading={index === 0 ? undefined : 'lazy'}
							src={project.desktop}
							alt={`${project.title} Desktop`}
							quality={75}
							sizes='(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 600px'
							className='w-full h-auto rounded-lg shadow-2xl'
						/>
					</div>

					{/* Mobile Phone Image */}
					<div
						className={`
              absolute bottom-0 z-20 
              transition-all duration-700 ease-out delay-500
              group-hover:-translate-y-2 md:group-hover:-translate-y-4 
              group-hover:scale-[1.02] md:group-hover:scale-[1.03]
              ${
								project.position === 'left'
									? 'right-60 md:-right-8 lg:-left-18'
									: 'left-60 md:-left-8 lg:-left-18'
							}
              ${isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
            `}
					>
						<Image
							priority={index === 0}
							loading={index === 0 ? undefined : 'lazy'}
							width={320}
							height={256}
							src={project.phone}
							alt={`${project.title} Mobile`}
							quality={75}
							sizes='(max-width: 768px) 240px, (max-width: 1024px) 320px, 400px'
							className='w-60 h-40 md:w-100 md:h-80 shadow-2xl'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
