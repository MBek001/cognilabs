
import type { Metadata } from 'next'
import ClientsOpinion from '~/components/ClientsOpinion'
import Faq from '~/components/Faq'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Insights from '~/components/Insights'
import Locations from '~/components/Locations'
import Projects from '~/components/Projects'
import RequestForm from '~/components/RequestForm'
import Services from '~/components/Services'
import TrustCases from '~/components/TrustCases'
import { setRequestLocale } from 'next-intl/server'

const siteUrl = 'https://cognilabs.uz'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'Cognilabs — IT Services & Software Development Company in Uzbekistan',
    uz: "Cognilabs — IT Xizmatlar va Dasturiy Ta'minot | Toshkent, O'zbekiston",
    ru: 'Cognilabs — IT Услуги и Разработка Программного Обеспечения | Ташкент',
  }
  const descriptions: Record<string, string> = {
    en: 'Leading IT company in Tashkent, Uzbekistan. We build websites, mobile apps, AI solutions, Telegram bots, CRM/ERP systems, and digital products for businesses across Uzbekistan and Central Asia.',
    uz: "Toshkentdagi yetakchi IT kompaniyasi. Veb-saytlar, mobil ilovalar, AI yechimlar, Telegram botlar, CRM/ERP tizimlari va raqamli mahsulotlar yaratamiz. O'zbekistondagi biznesingizni rivojlantiring.",
    ru: 'Ведущая IT компания в Ташкенте. Создаём веб-сайты, мобильные приложения, AI решения, Telegram боты, CRM/ERP системы и цифровые продукты для бизнеса в Узбекистане и Центральной Азии.',
  }
  const title = titles[locale] ?? titles.en
  const description = descriptions[locale] ?? descriptions.en
  return {
    title,
    description,
    keywords: [
      // English (50)
      'IT services Uzbekistan', 'IT company Tashkent', 'web development Uzbekistan',
      'mobile app development Uzbekistan', 'software development Tashkent',
      'AI development Uzbekistan', 'Telegram bot development Uzbekistan',
      'CRM development Uzbekistan', 'ERP systems Uzbekistan', 'web design Tashkent',
      'UI UX design Uzbekistan', 'e-commerce development Uzbekistan',
      'digital transformation Uzbekistan', 'IT outsourcing Uzbekistan',
      'software company Tashkent', 'app development Tashkent',
      'website development Uzbekistan', 'IT agency Tashkent',
      'tech company Uzbekistan', 'digital agency Uzbekistan',
      'custom software development Tashkent', 'API development Uzbekistan',
      'backend development Tashkent', 'frontend development Uzbekistan',
      'React development Uzbekistan', 'Next.js development Uzbekistan',
      'Node.js development Tashkent', 'Python development Uzbekistan',
      'cloud solutions Uzbekistan', 'IT consulting Tashkent',
      'business automation Uzbekistan', 'startup development Tashkent',
      'MVP development Uzbekistan', 'SaaS development Uzbekistan',
      'marketplace development Tashkent', 'online store development Uzbekistan',
      'IT solutions Uzbekistan', 'Cognilabs', 'web application development Uzbekistan',
      'enterprise software Uzbekistan', 'digital marketing Uzbekistan',
      'IT Central Asia', 'software house Tashkent', 'chatbot development Uzbekistan',
      'Flutter development Uzbekistan', 'iOS app development Uzbekistan',
      'Android app development Tashkent', 'landing page development Uzbekistan',
      'corporate website Tashkent', 'technology partner Uzbekistan',
      // Uzbek (50)
      "IT xizmatlar Toshkent", "IT kompaniyasi Toshkent", "veb sayt yaratish Toshkent",
      "mobil ilova yaratish O'zbekiston", "dasturiy ta'minot O'zbekiston",
      "sun'iy intellekt yechimlar O'zbekiston", "Telegram bot yaratish O'zbekiston",
      "CRM tizimi O'zbekiston", "ERP tizimi O'zbekiston", "veb dizayn Toshkent",
      "UI UX dizayn O'zbekiston", "elektron tijorat O'zbekiston",
      "raqamli transformatsiya O'zbekiston", "IT autsorsing O'zbekiston",
      "dasturiy ta'minot kompaniyasi Toshkent", "ilova yaratish Toshkent",
      "veb sayt ishlab chiqish O'zbekiston", "IT agentligi Toshkent",
      "texnologiya kompaniyasi O'zbekiston", "raqamli agentlik O'zbekiston",
      "maxsus dasturiy ta'minot Toshkent", "API ishlab chiqish O'zbekiston",
      "backend ishlab chiqish Toshkent", "frontend ishlab chiqish O'zbekiston",
      "React dasturlash O'zbekiston", "Next.js ishlab chiqish O'zbekiston",
      "Node.js xizmatlar Toshkent", "Python dasturlash O'zbekiston",
      "bulut yechimlar O'zbekiston", "IT maslahat Toshkent",
      "biznes avtomatlashtirish O'zbekiston", "startap yaratish Toshkent",
      "MVP yaratish O'zbekiston", "SaaS ishlab chiqish O'zbekiston",
      "bozor platformasi yaratish O'zbekiston", "onlayn do'kon yaratish O'zbekiston",
      "IT yechimlar O'zbekiston", "Cognilabs O'zbekiston", "veb ilova yaratish O'zbekiston",
      "korporativ dasturiy ta'minot O'zbekiston", "raqamli marketing O'zbekiston",
      "Markaziy Osiyo IT", "dasturchilar Toshkent", "chatbot yaratish O'zbekiston",
      "Flutter ilova O'zbekiston", "iOS ilova yaratish O'zbekiston",
      "Android ilova Toshkent", "landing sahifa yaratish O'zbekiston",
      "korporativ veb sayt Toshkent", "texnologiya hamkor O'zbekiston",
      // Russian (50)
      'IT услуги Узбекистан', 'IT компания Ташкент', 'разработка сайтов Узбекистан',
      'разработка мобильных приложений Узбекистан', 'разработка ПО Ташкент',
      'разработка ИИ Узбекистан', 'разработка Telegram бота Узбекистан',
      'разработка CRM Ташкент', 'ERP системы Узбекистан', 'веб дизайн Ташкент',
      'UI UX дизайн Узбекистан', 'разработка интернет-магазина Узбекистан',
      'цифровая трансформация Узбекистан', 'IT аутсорсинг Узбекистан',
      'компания по разработке ПО Ташкент', 'разработка приложений Ташкент',
      'создание сайта Узбекистан', 'IT агентство Ташкент',
      'технологическая компания Узбекистан', 'цифровое агентство Узбекистан',
      'заказная разработка ПО Ташкент', 'разработка API Узбекистан',
      'бэкенд разработка Ташкент', 'фронтенд разработка Узбекистан',
      'React разработка Узбекистан', 'Next.js разработка Узбекистан',
      'Node.js услуги Ташкент', 'Python разработка Узбекистан',
      'облачные решения Узбекистан', 'IT консалтинг Ташкент',
      'автоматизация бизнеса Узбекистан', 'разработка стартапа Ташкент',
      'разработка MVP Узбекистан', 'разработка SaaS Узбекистан',
      'разработка маркетплейса Ташкент', 'создание интернет-магазина Узбекистан',
      'IT решения Узбекистан', 'Cognilabs Ташкент', 'разработка веб-приложений Узбекистан',
      'корпоративное ПО Узбекистан', 'цифровой маркетинг Узбекистан',
      'IT Центральная Азия', 'программисты Ташкент', 'разработка чат-бота Узбекистан',
      'Flutter разработка Узбекистан', 'разработка iOS приложений Узбекистан',
      'разработка Android Ташкент', 'создание лендинга Узбекистан',
      'корпоративный сайт Ташкент', 'технологический партнёр Узбекистан',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'uz' ? 'uz_UZ' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Cognilabs',
      url: `${siteUrl}/${locale}`,
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { en: `${siteUrl}/en`, uz: `${siteUrl}/uz`, ru: `${siteUrl}/ru` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default async function page({params}: {params: Promise<{locale: string}>}) {
const {locale} = await params

setRequestLocale(locale)
  return (
    <div>
      <Header/>
      <Projects/> 
      <Services/>
      <TrustCases/>
      
      <ClientsOpinion/>
      <Locations/>
      <div id="contact" className="scroll-mt-40 md:scroll-mt-24">
        <RequestForm formId="form_home_main" />
      </div>
      <Faq/>
      <Insights/> 
      <Footer/> 
      
    </div>
  )
}
