import type { Metadata } from 'next'
import { SITE_URL, OG_IMAGE } from '~/lib/seo'

const siteUrl = SITE_URL

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
  title: 'IT Services — Web Development, Mobile Apps, AI & Telegram Bots | Cognilabs Uzbekistan',
  description:
    'Full-stack IT services in Uzbekistan: custom web development, iOS/Android mobile apps, AI integration, Telegram bots, CRM/ERP systems, UI/UX design. Get your free consultation in Tashkent.',
  keywords: [
    // English (50)
    'IT services Uzbekistan', 'web development services Tashkent',
    'mobile app development Uzbekistan', 'AI integration services Uzbekistan',
    'Telegram bot development Uzbekistan', 'CRM development Tashkent',
    'ERP systems Uzbekistan', 'UI UX design services Uzbekistan',
    'full stack development Uzbekistan', 'custom software development Tashkent',
    'e-commerce development Uzbekistan', 'API development Uzbekistan',
    'backend development Tashkent', 'frontend development Uzbekistan',
    'React development Uzbekistan', 'Next.js development Uzbekistan',
    'Node.js services Tashkent', 'Python development Uzbekistan',
    'iOS app development Uzbekistan', 'Android app development Tashkent',
    'cross platform development Uzbekistan', 'Flutter development Uzbekistan',
    'cloud services Tashkent', 'DevOps services Uzbekistan',
    'SEO services Tashkent', 'digital marketing Uzbekistan',
    'landing page development Uzbekistan', 'corporate website development Tashkent',
    'startup development services Uzbekistan', 'MVP development Uzbekistan',
    'SaaS development Tashkent', 'marketplace development Uzbekistan',
    'online store development Tashkent', 'chatbot development Uzbekistan',
    'automation services Uzbekistan', 'data analytics services Tashkent',
    'machine learning services Uzbekistan', 'IT consulting Uzbekistan',
    'technology audit Tashkent', 'business digitalization Uzbekistan',
    'digital transformation services Uzbekistan', 'website redesign Tashkent',
    'progressive web app Uzbekistan', 'TypeScript development Tashkent',
    'GraphQL development Uzbekistan', 'microservices Tashkent',
    'React Native development Uzbekistan', 'cloud migration Tashkent',
    'IT support services Uzbekistan', 'tech consulting Tashkent',
    // Uzbek (50)
    "IT xizmatlar Toshkent", "veb sayt yaratish xizmatlari Toshkent",
    "mobil ilova yaratish O'zbekiston", "AI integratsiyasi xizmatlari O'zbekiston",
    "Telegram bot yaratish O'zbekiston", "CRM ishlab chiqish Toshkent",
    "ERP tizimlari O'zbekiston", "UI UX dizayn xizmatlari O'zbekiston",
    "full stack ishlab chiqish O'zbekiston", "maxsus dasturiy ta'minot Toshkent",
    "elektron tijorat ishlab chiqish O'zbekiston", "API ishlab chiqish O'zbekiston",
    "backend ishlab chiqish Toshkent", "frontend ishlab chiqish O'zbekiston",
    "React ishlab chiqish O'zbekiston", "Next.js ishlab chiqish O'zbekiston",
    "Node.js xizmatlari Toshkent", "Python ishlab chiqish O'zbekiston",
    "iOS ilova yaratish O'zbekiston", "Android ilova yaratish Toshkent",
    "kross-platforma ishlab chiqish O'zbekiston", "Flutter ishlab chiqish O'zbekiston",
    "bulut xizmatlari Toshkent", "DevOps xizmatlari O'zbekiston",
    "SEO xizmatlari Toshkent", "raqamli marketing O'zbekiston",
    "landing sahifa yaratish O'zbekiston", "korporativ veb sayt yaratish Toshkent",
    "startap ishlab chiqish xizmatlari O'zbekiston", "MVP yaratish O'zbekiston",
    "SaaS ishlab chiqish Toshkent", "bozor platformasi yaratish O'zbekiston",
    "onlayn do'kon yaratish Toshkent", "chatbot yaratish O'zbekiston",
    "avtomatlashtirish xizmatlari O'zbekiston", "ma'lumotlar tahlili Toshkent",
    "mashina o'qishi xizmatlari O'zbekiston", "IT maslahat O'zbekiston",
    "texnologiya auditi Toshkent", "biznesni raqamlashtirish O'zbekiston",
    "raqamli transformatsiya xizmatlari O'zbekiston", "veb saytni yangilash Toshkent",
    "progressiv veb ilova O'zbekiston", "TypeScript ishlab chiqish Toshkent",
    "GraphQL ishlab chiqish O'zbekiston", "mikroservislar Toshkent",
    "React Native ishlab chiqish O'zbekiston", "bulutga ko'chirish Toshkent",
    "IT qo'llab-quvvatlash xizmatlari O'zbekiston", "texnologiya maslahati Toshkent",
    // Russian (50)
    'IT услуги Ташкент', 'услуги веб-разработки Ташкент',
    'разработка мобильных приложений Узбекистан', 'услуги интеграции ИИ Узбекистан',
    'разработка Telegram бота Узбекистан', 'разработка CRM Ташкент',
    'ERP системы Узбекистан', 'услуги UI UX дизайна Узбекистан',
    'full stack разработка Узбекистан', 'разработка ПО на заказ Ташкент',
    'разработка интернет-магазина Узбекистан', 'разработка API Узбекистан',
    'бэкенд разработка Ташкент', 'фронтенд разработка Узбекистан',
    'React разработка Узбекистан', 'Next.js разработка Узбекистан',
    'Node.js услуги Ташкент', 'Python разработка Узбекистан',
    'разработка iOS приложений Узбекистан', 'разработка Android приложений Ташкент',
    'кросс-платформенная разработка Узбекистан', 'Flutter разработка Узбекистан',
    'облачные сервисы Ташкент', 'DevOps услуги Узбекистан',
    'SEO услуги Ташкент', 'цифровой маркетинг Узбекистан',
    'создание лендинга Узбекистан', 'создание корпоративного сайта Ташкент',
    'услуги разработки стартапа Узбекистан', 'разработка MVP Узбекистан',
    'разработка SaaS Ташкент', 'разработка маркетплейса Узбекистан',
    'создание интернет-магазина Ташкент', 'разработка чат-бота Узбекистан',
    'услуги автоматизации Узбекистан', 'аналитика данных Ташкент',
    'услуги машинного обучения Узбекистан', 'IT консалтинг Узбекистан',
    'технологический аудит Ташкент', 'цифровизация бизнеса Узбекистан',
    'услуги цифровой трансформации Узбекистан', 'редизайн сайта Ташкент',
    'прогрессивное веб-приложение Узбекистан', 'TypeScript разработка Ташкент',
    'GraphQL разработка Узбекистан', 'микросервисы Ташкент',
    'React Native разработка Узбекистан', 'миграция в облако Ташкент',
    'IT поддержка Узбекистан', 'технологическое консультирование Ташкент',
  ],
  openGraph: {
    title: 'IT Services — Web, Mobile, AI, Telegram Bots | Cognilabs Uzbekistan',
    description:
      'Full-stack IT services in Uzbekistan: web development, mobile apps, AI integration, Telegram bots, CRM/ERP and more.',
    type: 'website',
    siteName: 'Cognilabs',
    url: `${siteUrl}/${locale}/services`,
    images: [{ url: OG_IMAGE, alt: 'Cognilabs IT Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services | Cognilabs Uzbekistan',
    description: 'Web development, mobile apps, AI, Telegram bots, CRM/ERP in Tashkent, Uzbekistan.',
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${siteUrl}/${locale}/services`,
    languages: {
      en: `${siteUrl}/en/services`,
      uz: `${siteUrl}/uz/services`,
      ru: `${siteUrl}/ru/services`,
      'x-default': `${siteUrl}/en/services`,
    },
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
