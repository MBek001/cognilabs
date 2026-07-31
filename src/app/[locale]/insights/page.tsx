// app/[locale]/insights/page.tsx
import type { Metadata } from 'next'
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import BlogList from "~/components/insights/FetchBlog";
import Footer from "~/components/Footer";

const siteUrl = 'https://cognilabs.uz'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'IT News & Technology Blog — Cognilabs Insights | Uzbekistan',
    uz: "IT Yangiliklari va Texnologiya Blogi — Cognilabs | O'zbekiston",
    ru: 'IT Новости и Технологический Блог — Cognilabs | Узбекистан',
  }
  const descriptions: Record<string, string> = {
    en: 'Latest IT news, technology trends, software development tutorials, AI insights and digital transformation articles from Uzbekistan's leading tech company Cognilabs.',
    uz: "O'zbekistonning yetakchi texnologiya kompaniyasi Cognilabsdan so'nggi IT yangiliklari, texnologiya tendentsiyalari, dasturlash darslari va AI haqida maqolalar.",
    ru: 'Последние IT новости, технологические тренды, туториалы по разработке, AI инсайты и статьи о цифровой трансформации от ведущей IT компании Узбекистана — Cognilabs.',
  }
  const title = titles[locale] ?? titles.en
  const description = descriptions[locale] ?? descriptions.en
  return {
    title,
    description,
    keywords: [
      // English (50)
      'IT news Uzbekistan', 'technology news Tashkent', 'tech blog Uzbekistan',
      'AI news Uzbekistan', 'software development news Uzbekistan',
      'web development trends Uzbekistan', 'mobile app trends Uzbekistan',
      'digital transformation news Uzbekistan', 'startup news Uzbekistan',
      'technology updates Uzbekistan', 'IT industry news Tashkent',
      'programming tutorials Uzbekistan', 'JavaScript tutorials Uzbekistan',
      'React tutorials Uzbekistan', 'Next.js tutorials Uzbekistan',
      'Node.js tutorials Uzbekistan', 'Python tutorials Uzbekistan',
      'machine learning news Uzbekistan', 'artificial intelligence Uzbekistan',
      'IT insights Uzbekistan', 'tech articles Uzbekistan',
      'technology blog Uzbekistan', 'software trends 2025 Uzbekistan',
      'web design trends Uzbekistan', 'UX design trends Uzbekistan',
      'e-commerce news Uzbekistan', 'SaaS news Uzbekistan',
      'cloud computing news Uzbekistan', 'cybersecurity news Uzbekistan',
      'API development tutorials Uzbekistan', 'mobile development trends Uzbekistan',
      'UI design news Uzbekistan', 'product design trends Uzbekistan',
      'tech startup news Uzbekistan', 'fintech news Uzbekistan',
      'edtech news Uzbekistan', 'healthtech Uzbekistan', 'agritech Uzbekistan',
      'IT conference Uzbekistan', 'developer community Uzbekistan',
      'IT education Uzbekistan', 'tech skills development', 'open source news',
      'tech company news Uzbekistan', 'Cognilabs blog', 'digital innovation Uzbekistan',
      'IT articles Tashkent', 'blockchain news Uzbekistan',
      'software engineering articles', 'IT market Uzbekistan',
      // Uzbek (50)
      "IT yangiliklari O'zbekiston", "texnologiya yangiliklari Toshkent",
      "texnologiya blogi O'zbekiston", "sun'iy intellekt yangiliklari O'zbekiston",
      "dasturiy ta'minot yangiliklari", "veb ishlab chiqish tendentsiyalari O'zbekiston",
      "mobil ilova tendentsiyalari O'zbekiston", "raqamli transformatsiya yangiliklari",
      "startap yangiliklari O'zbekiston", "texnologiya yangilanishlari O'zbekiston",
      "IT sanoat yangiliklari Toshkent", "dasturlash darslari O'zbekiston",
      "JavaScript darslari O'zbekiston", "React darslari O'zbekiston",
      "Next.js darslari O'zbekiston", "Node.js darslari O'zbekiston",
      "Python darslari O'zbekiston", "mashina o'qishi yangiliklari O'zbekiston",
      "sun'iy intellekt O'zbekiston", "IT insights O'zbekiston",
      "texnologiya maqolalari O'zbekiston", "dasturiy ta'minot tendentsiyalari 2025",
      "veb dizayn tendentsiyalari O'zbekiston", "UX dizayn tendentsiyalari",
      "elektron tijorat yangiliklari O'zbekiston", "bulut hisoblash yangiliklari",
      "kibxavfsizlik yangiliklari O'zbekiston", "API darslari O'zbekiston",
      "mobil ishlab chiqish tendentsiyalari", "UI dizayn yangiliklari",
      "mahsulot dizayni tendentsiyalari", "texnologiya startaplari yangiliklari O'zbekiston",
      "fintech yangiliklari O'zbekiston", "edtech yangiliklari O'zbekiston",
      "sog'liqni saqlash texnologiyalari O'zbekiston", "agritexnologiya O'zbekiston",
      "IT konferensiyasi O'zbekiston", "dasturchilar hamjamiyati O'zbekiston",
      "IT ta'lim O'zbekiston", "texnologiya ko'nikmalari", "ochiq kod yangiliklari",
      "texnologiya kompaniyalari yangiliklari O'zbekiston", "Cognilabs blogi",
      "raqamli innovatsiyalar O'zbekiston", "IT maqolalar Toshkent",
      "blokcheyn yangiliklari O'zbekiston", "dasturiy muhandislik maqolalari",
      "IT bozori O'zbekiston", "IT tendentsiyalari Markaziy Osiyo",
      "raqamlashtirish yangiliklari O'zbekiston",
      // Russian (50)
      'IT новости Узбекистан', 'технологические новости Ташкент',
      'технологический блог Узбекистан', 'новости ИИ Узбекистан',
      'новости разработки ПО Узбекистан', 'тренды веб-разработки Узбекистан',
      'тренды мобильных приложений Узбекистан', 'новости цифровой трансформации Узбекистан',
      'новости стартапов Узбекистан', 'обновления технологий Узбекистан',
      'новости IT индустрии Ташкент', 'уроки программирования Узбекистан',
      'уроки JavaScript Узбекистан', 'уроки React Узбекистан',
      'уроки Next.js Узбекистан', 'уроки Node.js Узбекистан',
      'уроки Python Узбекистан', 'новости машинного обучения Узбекистан',
      'искусственный интеллект Узбекистан', 'IT инсайты Узбекистан',
      'технологические статьи Узбекистан', 'блог о технологиях Узбекистан',
      'тренды разработки 2025 Узбекистан', 'тренды веб-дизайна Узбекистан',
      'тренды UX дизайна Узбекистан', 'новости e-commerce Узбекистан',
      'новости SaaS Узбекистан', 'новости облачных вычислений Узбекистан',
      'новости кибербезопасности Узбекистан', 'туториалы API Узбекистан',
      'тренды мобильной разработки Узбекистан', 'новости UI дизайна Узбекистан',
      'тренды продуктового дизайна', 'новости технологических стартапов Узбекистан',
      'новости финтех Узбекистан', 'новости EdTech Узбекистан',
      'технологии здравоохранения Узбекистан', 'агритех Узбекистан',
      'IT конференция Узбекистан', 'сообщество разработчиков Узбекистан',
      'IT образование Узбекистан', 'развитие технологических навыков',
      'новости open source Узбекистан', 'новости технологических компаний Узбекистан',
      'блог Cognilabs', 'цифровые инновации Узбекистан',
      'IT статьи Ташкент', 'блокчейн новости Узбекистан',
      'статьи по разработке ПО', 'IT рынок Узбекистан',
    ],
    openGraph: {
      title, description, type: 'website',
      locale: locale === 'uz' ? 'uz_UZ' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Cognilabs', url: `${siteUrl}/${locale}/insights`,
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: `${siteUrl}/${locale}/insights`,
      languages: { en: `${siteUrl}/en/insights`, uz: `${siteUrl}/uz/insights`, ru: `${siteUrl}/ru/insights` },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default async function BlogPage() {
  const t = await getTranslations("Navbar");

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16 pt-24 md:pt-40 max-w-7xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center text-white">
          {t("blogs")}
        </h1>

        {/* This is where the magic happens */}
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[400px] bg-gray-900/50 rounded-3xl animate-pulse" />
      ))}
    </div>
  );
}
