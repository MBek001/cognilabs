'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Footer from '~/components/Footer'
import { useTranslations } from 'next-intl'
import RequestForm from '~/components/RequestForm'

export default function Page() {
	const [hovered, setHovered] = useState<number | null>(null)
	const [isMobile, setIsMobile] = useState(false)

	// Detect mobile/tablet on mount and resize
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 1024) // lg breakpoint = 1024px
		}

		checkIfMobile()
		window.addEventListener('resize', checkIfMobile)

		return () => window.removeEventListener('resize', checkIfMobile)
	}, [])

	const onEnter = (id: number) => !isMobile && setHovered(id)
	const onLeave = () => !isMobile && setHovered(null)

	// Force show bottom card on mobile OR when hovered on desktop
	const shouldShowBottomCard = (id: number) => isMobile || hovered === id
	const t = useTranslations('Porfolio')
	const projectContentClassNameById: Record<number, string> = {
		3: 'pr-24 sm:pr-32 lg:pr-44',
		5: 'pr-24 sm:pr-32 lg:pr-48',
		6: 'pr-24 sm:pr-32 lg:pr-44',
		11: 'pr-28 sm:pr-36 lg:pr-52',
		25: 'pr-24 sm:pr-32 lg:pr-40',
		26: 'pr-24 sm:pr-32 lg:pr-40',
		27: 'pr-24 sm:pr-32 lg:pr-40',
		28: 'pr-28 sm:pr-36 lg:pr-48',
		29: 'pr-24 sm:pr-32 lg:pr-40',
	}
	const projectImageClassNameById: Record<number, string> = {
		3:  'w-20 sm:w-28 lg:w-36',
		5:  'w-24 sm:w-32 lg:w-48',
		6:  'w-24 sm:w-36 lg:w-56',
		7:  'w-24 sm:w-32 lg:w-48',
		11: 'w-28 sm:w-40 lg:w-52',
		15: 'w-28 sm:w-36 lg:w-48',
		16: 'w-28 sm:w-36 lg:w-48',
		18: 'w-24 sm:w-32 lg:w-44',
		20: 'w-24 sm:w-32 lg:w-44',
		22: 'w-20 sm:w-28 lg:w-36',
		23: 'w-20 sm:w-28 lg:w-36',
		24: 'w-20 sm:w-28 lg:w-36',
		25: 'w-24 sm:w-32 lg:w-44',
		26: 'w-24 sm:w-32 lg:w-44',
		27: 'w-24 sm:w-32 lg:w-44',
		28: 'w-24 sm:w-32 lg:w-44',
		29: 'w-24 sm:w-32 lg:w-44',
	}
	const projectImageStyleById: Record<number, { top: string; left: string }> = {
		3:  { top: '5.5rem', left: '82%' },
		5:  { top: '5.5rem', left: '79%' },
		6:  { top: '5.5rem', left: '82%' },
		7:  { top: '5.5rem', left: '83%' },
		11: { top: '5.5rem', left: '84%' },
		15: { top: '5.5rem', left: '82%' },
		16: { top: '5.5rem', left: '82%' },
		18: { top: '5.5rem', left: '82%' },
		20: { top: '5.5rem', left: '82%' },
		22: { top: '5.5rem', left: '82%' },
		23: { top: '5.5rem', left: '82%' },
		24: { top: '5.5rem', left: '82%' },
		25: { top: '5.5rem', left: '82%' },
		26: { top: '5.5rem', left: '82%' },
		27: { top: '5.5rem', left: '82%' },
		28: { top: '5.5rem', left: '82%' },
		29: { top: '5.5rem', left: '82%' },
	}
	const logoSizeById: Record<number, number> = {
		9: 64,
		14: 72,
		19: 64,
		25: 64,
		26: 64,
		27: 64,
		28: 64,
		29: 72,
	}
	const projects = [
		// ... your projects array stays exactly the same
		{
			id: 1,
			title: 'Bunyodkor Academy',
			logo: '/clients/bunyodkornew.png',
			desc: t('bunyodkortext'),
			prtype: 'Football',
			typeicon: '/projectslogo/icons/football.png',
			showenimg: '/projectslogo/shows/football.png',
			bout: 'Football',
			mssg: t('bunyodkormssg'),
			link: '',
		},
		{
			id: 2,
			title: 'KAS',
			logo: '/clients/kas.png',
			desc: t('kastext'),
			prtype: 'Pipe store',
			typeicon: '/projectslogo/icons/pipe.png',
			showenimg: '/projectslogo/shows/pipe.png',
			bout: 'Pipe store',
			mssg: t('kasmssg'),
			link: '',
		},
		{
			id: 3,
			title: 'Renessans Clinic',
			logo: '/clients/renessans.jpg',
			desc: t('renessanstext'),
			prtype: 'Clinic',
			typeicon: '/projectslogo/icons/doctor.png',
			showenimg: '/projectslogo/shows/doctor.png',
			bout: 'Clinic',
			mssg: t('renessansmssg'),
			link: '',
		},
		{
			id: 4,
			title: 'Articles 365',
			logo: '/clients/article.png',
			desc: t('articletext'),
			prtype: 'Articles',
			typeicon: '/projectslogo/icons/article.png',
			showenimg: '/projectslogo/shows/article.png',
			bout: 'Articles',
			mssg: t('articlemssg'),
			link: '',
		},
		{
			id: 5,
			title: 'Green NRG',
			logo: '/clients/solar.jpg',
			desc: t('solartext'),
			prtype: 'Solar Panels',
			typeicon: '/projectslogo/icons/solar.png',
			showenimg: '/projectslogo/shows/solar.png',
			bout: 'Solar Panels',
			mssg: t('solarmssg'),
			link: '',
		},
		{
			id: 6,
			title: 'Texnogrand',
			logo: '/clients/texnogrand.png',
			desc: t('texnograndtext'),
			prtype: 'Air condition',
			typeicon: '/projectslogo/icons/texnogrand.png',
			showenimg: '/projectslogo/shows/texnogrand.png',
			bout: 'Air condition',
			mssg: t('texnograndmssg'),
			link: '',
		},
		{
			id: 7,
			title: 'Bogot Armada',
			logo: '/clients/bogot.jpg',
			desc: t('bogottext'),
			prtype: 'Solar Panels',
			typeicon: '/projectslogo/icons/solar.png',
			showenimg: '/projectslogo/shows/solar.png',
			bout: 'Solar Panels',
			mssg: t('bogotmssg'),
			link: '',
		},
		{
			id: 8,
			title: 'Hoshang Restaurant',
			logo: '/clients/hoshang.png',
			desc: t('hoshangtext'),
			prtype: 'Restaurant',
			typeicon: '/projectslogo/icons/restaurant.png',
			showenimg: '/projectslogo/shows/restaurant.png',
			bout: 'Restaurant',
			mssg: t('hoshangmssg'),
			link: '',
		},
		{
			id: 25,
			title: 'Lokomotiv',
			logo: '/clients/lokomotiv.png',
			desc: t('lokomotivtext'),
			prtype: t('lokomotivtype'),
			typeicon: '/projectslogo/icons/lokomotiv.png',
			showenimg: '/projectslogo/shows/lokomotiv.png',
			bout: t('lokomotivpr'),
			mssg: t('lokomotivmssg'),
			link: '',
		},
		{
			id: 26,
			title: 'Euroflowers',
			logo: '/clients/euroflowers.png',
			desc: t('euroflowerstext'),
			prtype: t('euroflowerstype'),
			typeicon: '/projectslogo/icons/euroflowers.png',
			showenimg: '/projectslogo/shows/euroflowers.png',
			bout: t('euroflowerspr'),
			mssg: t('euroflowersmssg'),
			link: '',
		},
		{
			id: 27,
			title: "Ko'z nuri",
			logo: '/clients/eyeclinic.png',
			desc: t('koznuritext'),
			prtype: t('koznuritype'),
			typeicon: '/projectslogo/icons/eyeclinic.png',
			showenimg: '/projectslogo/shows/eyeclinic.png',
			bout: t('koznuripr'),
			mssg: t('koznurimssg'),
			link: '',
		},
		{
			id: 28,
			title: 'Moydin Polvon Choyxonasi',
			logo: '/clients/moydin.png',
			desc: t('moydintext'),
			prtype: t('moydintype'),
			typeicon: '/projectslogo/icons/choyxona.png',
			showenimg: '/projectslogo/shows/choyxona.png',
			bout: t('moydinpr'),
			mssg: t('moydinmssg'),
			link: '',
		},
		{
			id: 29,
			title: 'Avikontex',
			logo: '/clients/avikontex.png',
			desc: t('avikontextext'),
			prtype: t('avikontextype'),
			typeicon: '/projectslogo/icons/avikontex.png',
			showenimg: '/projectslogo/shows/avikontex.png',
			bout: t('avikontexpr'),
			mssg: t('avikontexmssg'),
			link: '',
		},
		{
			id: 9,
			title: 'Zomin',
			logo: '/clients/zomin.png',
			desc: t('zomintext'),
			prtype: 'Water',
			typeicon: '/projectslogo/icons/restaurant.png',
			showenimg: '/projectslogo/shows/water.png',
			bout: t('zominpr'),
			mssg: t('zominmssg'),
			link: '',
		},
		{
			id: 10,
			title: 'Erix Consulting',
			logo: '/clients/erix.jpg',
			desc: t('erixtext'),
			prtype: 'Consulting',
			typeicon: '/projectslogo/icons/consulting.png',
			showenimg: '/projectslogo/shows/erix.png',
			bout: 'Consulting',
			mssg: t('erixmssg'),
			link: '',
		},
		{
			id: 11,
			title: 'OLOU',
			logo: '/projectslogo/olou3.png',
			desc: t('oloutext'),
			prtype: t('oloutype'),
			typeicon: '/projectslogo/icons/hoodies.png',
			showenimg: '/projectslogo/shows/hoodies.png',
			bout: t('oloupr'),
			mssg: t('oloumssg'),
			link: 'https://olou.uz',
		},
		{
			id: 12,
			title: 'Saaf Green Agro',
			logo: '/projectslogo/saaf.png',
			desc: t('saaftext'),
			prtype: t('saaftype'),
			typeicon: '/projectslogo/icons/agro.png',
			showenimg: '/projectslogo/shows/agro.png',
			bout: t('saafpr'),
			mssg: t('saafmssg'),
			link: 'https://saafagro.com',
		},
		{
			id: 13,
			title: 'ExtraGpt',
			logo: '/projectslogo/extragpt1.png',
			desc: t('extratext'),
			prtype: t('extratype'),
			typeicon: '/projectslogo/icons/robot.png',
			showenimg: '/projectslogo/shows/robot.png',
			bout: t('extrapr'),
			mssg: t('extramssg'),
			link: 'https://www.extra-gpt.com',
		},
		{
			id: 14,
			title: 'Best solar',
			logo: '/clients/client13.png',
			desc: t('bestsolartext'),
			prtype: 'Solar Panels',
			typeicon: '/projectslogo/icons/panel.png',
			showenimg: '/projectslogo/shows/panel.png',
			bout: 'Solar Panels',
			mssg: t('bestsolarmssg'),
			link: '',
		},
		{
			id: 15,
			title: 'Surxon bozor',
			logo: '/clients/surxon.png',
			desc: t('surxontext'),
			prtype: 'MarketPlace',
			typeicon: '/projectslogo/icons/market.png',
			showenimg: '/projectslogo/shows/market.png',
			bout: 'MarketPlace',
			mssg: t('surxonmssg'),
			link: '',
		},
		{
			id: 16,
			title: 'Denov bozor',
			logo: '/clients/denov.png',
			desc: t('denovtext'),
			prtype: 'MarketPlace',
			typeicon: '/projectslogo/icons/market.png',
			showenimg: '/projectslogo/shows/market.png',
			bout: 'MarketPlace',
			mssg: t('denovmssg'),
			link: '',
		},
		{
			id: 17,
			title: 'Djafariy',
			logo: '/projectslogo/djafariy1.png',
			desc: t('djafariytext'),
			prtype: t('djafariytype'),
			typeicon: '/projectslogo/icons/clothing.png',
			showenimg: '/projectslogo/shows/clothing.png',
			bout: t('djafariypr'),
			mssg: t('djafariymssg'),
			link: 'https://djafariy.org',
		},
		{
			id: 18,
			title: 'Aroma lab',
			logo: '/clients/aroma.png',
			desc: t('erixtext'),
			prtype: 'Perfumes',
			typeicon: '/projectslogo/icons/perfume.png',
			showenimg: '/projectslogo/shows/aroma.png',
			bout: 'Perfumes',
			mssg: t('erixmssg'),
			link: '',
		},
		{
			id: 19,
			title: 'Taad',
			logo: '/clients/taad.png',
			desc: t('taadtext'),
			prtype: 'Ceiling',
			typeicon: '/projectslogo/icons/ceiling.png',
			showenimg: '/projectslogo/shows/taad.png',
			bout: 'Ceiling',
			mssg: t('taadmssg'),
			link: '',
		},
		{
			id: 20,
			title: 'Billur',
			logo: '/projectslogo/billur.png',
			desc: t('billurtext'),
			prtype: t('billurtype'),
			typeicon: '/projectslogo/icons/cleaning.png',
			showenimg: '/projectslogo/shows/cleaning.png',
			bout: t('billurpr'),
			mssg: t('billurmssg'),
			link: 'https://billur-market.com',
		},
		{
			id: 21,
			title: 'Bazabarbershop',
			logo: '/projectslogo/baza.png',
			desc: t('bazatext'),
			prtype: t('bazatype'),
			typeicon: '/projectslogo/icons/hairstyle.png',
			showenimg: '/projectslogo/shows/hairstyle.png',
			bout: t('bazapr'),
			mssg: t('bazamssg'),
			link: 'https://www.bazabarbershop.com',
		},
		{
			id: 22,
			title: 'Zippy Taxi',
			logo: '/clients/zippy.png',
			desc: t('zippytext'),
			prtype: 'Taxi',
			typeicon: '/projectslogo/icons/taxi.png',
			showenimg: '/projectslogo/shows/taxi.png',
			bout: 'Taxi',
			mssg: t('zippymssg'),
			link: '',
		},
		{
			id: 23,
			title: 'Davr Taxi',
			logo: '/clients/davr.png',
			desc: t('davrtext'),
			prtype: 'Taxi',
			typeicon: '/projectslogo/icons/taxi.png',
			showenimg: '/projectslogo/shows/taxi.png',
			bout: 'Taxi',
			mssg: t('davrmssg'),
			link: '',
		},
		{
			id: 24,
			title: 'Bro Taxi',
			logo: '/clients/bro.png',
			desc: t('brotext'),
			prtype: 'Taxi',
			typeicon: '/projectslogo/icons/taxi.png',
			showenimg: '/projectslogo/shows/taxi.png',
			bout: 'Taxi',
			mssg: t('bromssg'),
			link: '',
		},
	]

	return (
		<div className='bg-black pt-50 '>
			<div className='container mx-auto px-4'>
				<div className='flex justify-center items-center mb-12'>
					<h2 className='text-center font-bold max-w-[900px] text-3xl md:text-4xl leading-snug text-white'>
						{t('text')
							.split(' ')
							.map((word, index) => (
								<span
									key={index}
									className={index >= 10 && index <= 13 ? 'text-[#0066FF]' : ''}
								>
									{word}{' '}
								</span>
							))}
					</h2>
				</div>

				{/* PROJECTS GRID */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto capitalize'>
					{projects.map(item => (
						<div
							key={item.id}
							onMouseEnter={() => onEnter(item.id)}
							onMouseLeave={onLeave}
							className='group flex flex-col'
						>
							{/* MAIN CARD */}
							<motion.div className='bg-[#111] group relative h-[300px] overflow-hidden rounded-3xl border border-gray-800 hover:border-blue-500 transition-all duration-300 cursor-pointer'>
								<div
									className={`p-6 ${projectContentClassNameById[item.id] ?? 'lg:pr-32'}`}
								>
									<div className='flex items-center mb-6 gap-2 bg-[#003D99] w-fit px-4 py-1 rounded-lg'>
										<Image
											src={item.typeicon}
											width={16}
											height={16}
											alt={item.prtype}
											className='rounded-sm object-cover'
											quality={80}
											loading='lazy'
										/>
										<p className='text-[13px] text-blue-200 font-semibold'>
											{item.prtype}
										</p>
									</div>

									<div className='flex gap-4 items-center mb-3'>
										<Image
											className='rounded-full object-contain'
											src={item.logo}
											width={logoSizeById[item.id] ?? 56}
											height={logoSizeById[item.id] ?? 56}
											alt={item.title}
											quality={80}
											loading='lazy'
										/>
										<h3 className='text-2xl font-bold text-white'>
											{item.title}
										</h3>
									</div>

									<p className='text-gray-300 text-sm leading-relaxed max-w-[320px] line-clamp-3'>
										{item.desc}
									</p>

									<div className='mt-5'>
										<p className='text-yellow-400 font-medium'>
											<span className='text-white'>5.0</span> ★★★★★
										</p>
									</div>
								</div>

								{/* HOVER IMAGE */}
								<div
									className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
										projectImageClassNameById[item.id] ?? 'w-32 sm:w-44 lg:w-56'
									}`}
									style={projectImageStyleById[item.id] ?? { top: '5rem', left: '80%' }}
								>
									<motion.div
										className='group-hover:scale-115 transform transition-all duration-300 ease-in-out w-full h-auto'
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.4 }}
									>
										<Image
											src={item.showenimg}
											alt={item.title}
											width={320}
											height={320}
											quality={75}
											loading='lazy'
											className='object-contain w-full h-auto'
											sizes='(max-width: 640px) 128px, (max-width: 1024px) 176px, 320px'
										/>
									</motion.div>
								</div>
							</motion.div>

							{/* BOTTOM CARD - Always visible on mobile/tablet */}
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={
									shouldShowBottomCard(item.id)
										? { opacity: 1, height: 'auto' }
										: { opacity: 0, height: 0 }
								}
								transition={{ duration: 0.4, ease: 'easeOut' }}
								className='overflow-hidden mt-4'
							>
								<div className='bg-[#0f0f0f] rounded-3xl border border-gray-800 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
									<div className='flex gap-4 items-center'>
										<Image
											className='rounded-full object-contain'
											src={item.logo}
											width={logoSizeById[item.id] ? logoSizeById[item.id] - 6 : 50}
											height={logoSizeById[item.id] ? logoSizeById[item.id] - 6 : 50}
											alt={item.bout}
											quality={80}
											loading='lazy'
										/>
										<div>
											<h4 className='text-white font-bold text-lg'>
												{item.bout}
											</h4>
											<p className='text-gray-400 text-xs sm:text-xs mt-1 max-w-md leading-relaxed'>
												{item.mssg}
											</p>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					))}
				</div>

				{/* Final Text */}
			<div className='mx-auto text-center pt-20 max-w-[900px] px-4 pb-20'>
					<p className='text-lg md:text-2xl text-gray-300 leading-relaxed'>
						{t('bottomtext')}
					</p>
				</div>
			</div>
			<div id='contact' className='pt-12 sm:pt-20 scroll-mt-40 md:scroll-mt-24'>
				<RequestForm formId='form_portfolio' />
			</div>

			<Footer />
		</div>
	)
}
