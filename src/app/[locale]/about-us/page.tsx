import type { Metadata } from 'next'
import { setRequestLocale } from "next-intl/server";
import { SITE_URL, OG_IMAGE } from "~/lib/seo";

const siteUrl = SITE_URL

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "uz" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    en: 'About Cognilabs — IT Company in Tashkent, Uzbekistan',
    uz: "Cognilabs Haqida — IT Kompaniyasi Toshkent, O'zbekiston",
    ru: 'О компании Cognilabs — IT Компания в Ташкенте, Узбекистан',
  }
  const descriptions: Record<string, string> = {
    en: 'Cognilabs is a passionate team of developers, designers and strategists building world-class digital products in Uzbekistan. Trusted by 20+ businesses across Tashkent and Central Asia.',
    uz: "Cognilabs — O'zbekistonda dunyo darajasidagi raqamli mahsulotlar yaratuvchi dasturchilar, dizaynerlar va strateglar jamoasi. 20+ biznesga xizmat ko'rsatamiz.",
    ru: 'Cognilabs — команда разработчиков, дизайнеров и стратегов, создающих цифровые продукты мирового класса в Узбекистане. Доверяют 20+ компаний по всему Ташкенту.',
  }
  const title = titles[locale] ?? titles.en
  const description = descriptions[locale] ?? descriptions.en
  return {
    title,
    description,
    keywords: [
      // English (50)
      'Cognilabs about', 'IT company Tashkent', 'software development team Uzbekistan',
      'IT agency about us Uzbekistan', 'web development company Uzbekistan',
      'tech team Tashkent', 'digital agency Uzbekistan', 'software developers Tashkent',
      'IT professionals Uzbekistan', 'technology company Uzbekistan',
      'digital transformation company Uzbekistan', 'IT outsourcing Tashkent',
      'trusted IT company Uzbekistan', 'experienced developers Tashkent',
      'tech experts Uzbekistan', 'innovation company Tashkent',
      'digital solutions company Uzbekistan', 'startup studio Uzbekistan',
      'product development company Tashkent', 'agile development Uzbekistan',
      'UI UX designers Uzbekistan', 'full stack developers Tashkent',
      'React developers Uzbekistan', 'Node.js developers Tashkent',
      'Python developers Uzbekistan', 'AI specialists Uzbekistan',
      'mobile developers Tashkent', 'web designers Uzbekistan',
      'project managers IT Tashkent', 'QA engineers Uzbekistan',
      'IT company history Tashkent', 'about Cognilabs', 'Cognilabs team',
      'Cognilabs Tashkent', 'best IT company Uzbekistan', 'reliable IT partner Uzbekistan',
      'IT company Central Asia', 'software agency Tashkent',
      'who we are IT Uzbekistan', 'our story tech Tashkent',
      'IT company values Uzbekistan', 'tech culture Tashkent',
      'remote IT team Uzbekistan', 'certified developers Tashkent',
      'award winning IT Uzbekistan', 'top IT company Uzbekistan',
      'IT company mission Tashkent', 'digital product studio Uzbekistan',
      'technology leadership Uzbekistan', 'Cognilabs company profile',
      // Uzbek (50)
      "Cognilabs haqida", "IT kompaniyasi Toshkent", "dasturiy ta'minot jamoasi O'zbekiston",
      "IT agentligi haqida O'zbekiston", "veb ishlab chiqish kompaniyasi O'zbekiston",
      "texnologiya jamoasi Toshkent", "raqamli agentlik O'zbekiston",
      "dasturchilar Toshkent", "IT mutaxassislar O'zbekiston",
      "texnologiya kompaniyasi O'zbekiston", "raqamli transformatsiya kompaniyasi",
      "IT autsorsing Toshkent", "ishonchli IT kompaniyasi O'zbekiston",
      "tajribali dasturchilar Toshkent", "texnologiya ekspertlari O'zbekiston",
      "innovatsiya kompaniyasi Toshkent", "raqamli yechimlar kompaniyasi O'zbekiston",
      "startap studiyasi O'zbekiston", "mahsulot yaratish kompaniyasi Toshkent",
      "agil ishlab chiqish O'zbekiston", "UI UX dizaynerlar O'zbekiston",
      "full stack dasturchilar Toshkent", "React dasturchilar O'zbekiston",
      "Node.js dasturchilar Toshkent", "Python dasturchilar O'zbekiston",
      "AI mutaxassislari O'zbekiston", "mobil dasturchilar Toshkent",
      "veb dizaynerlar O'zbekiston", "loyiha menejerlari Toshkent",
      "QA muhandislar O'zbekiston", "IT kompaniyasi tarixi Toshkent",
      "Cognilabs jamoasi", "Cognilabs Toshkent", "eng yaxshi IT kompaniyasi O'zbekiston",
      "ishonchli IT hamkor O'zbekiston", "Markaziy Osiyo IT kompaniyasi",
      "dasturiy ta'minot agentligi Toshkent", "biz kimiz IT O'zbekiston",
      "bizning hikoyamiz texnologiya Toshkent", "IT kompaniyasi qadriyatlari O'zbekiston",
      "texnologiya madaniyati Toshkent", "masofaviy IT jamoasi O'zbekiston",
      "sertifikatlangan dasturchilar Toshkent", "raqamli mahsulot studiyasi O'zbekiston",
      "texnologiya rahbarligi O'zbekiston", "Cognilabs kompaniya profili",
      "IT firma O'zbekiston", "dasturlash kompaniyasi Toshkent",
      "IT xizmat ko'rsatuvchi O'zbekiston", "raqamlashtirish O'zbekiston",
      // Russian (50)
      'о компании Cognilabs', 'IT компания Ташкент', 'команда разработчиков Узбекистан',
      'IT агентство о нас Узбекистан', 'компания веб-разработки Узбекистан',
      'технологическая команда Ташкент', 'цифровое агентство Узбекистан',
      'разработчики программного обеспечения Ташкент', 'IT профессионалы Узбекистан',
      'технологическая компания Узбекистан', 'компания цифровой трансформации Узбекистан',
      'IT аутсорсинг Ташкент', 'надёжная IT компания Узбекистан',
      'опытные разработчики Ташкент', 'технологические эксперты Узбекистан',
      'инновационная компания Ташкент', 'компания цифровых решений Узбекистан',
      'стартап студия Узбекистан', 'компания разработки продуктов Ташкент',
      'гибкая разработка Узбекистан', 'UI UX дизайнеры Узбекистан',
      'full stack разработчики Ташкент', 'React разработчики Узбекистан',
      'Node.js разработчики Ташкент', 'Python разработчики Узбекистан',
      'специалисты ИИ Узбекистан', 'мобильные разработчики Ташкент',
      'веб дизайнеры Узбекистан', 'проектные менеджеры IT Ташкент',
      'QA инженеры Узбекистан', 'история IT компании Ташкент',
      'о Cognilabs', 'команда Cognilabs', 'Cognilabs Ташкент',
      'лучшая IT компания Узбекистан', 'надёжный IT партнёр Узбекистан',
      'IT компания Центральная Азия', 'агентство по разработке ПО Ташкент',
      'кто мы IT Узбекистан', 'наша история технологии Ташкент',
      'ценности IT компании Узбекистан', 'технологическая культура Ташкент',
      'удалённая IT команда Узбекистан', 'сертифицированные разработчики Ташкент',
      'студия цифровых продуктов Узбекистан', 'технологическое лидерство Узбекистан',
      'профиль компании Cognilabs', 'IT фирма Узбекистан',
      'компания по программированию Ташкент', 'поставщик IT услуг Узбекистан',
    ],
    openGraph: {
      title, description, type: 'website',
      locale: locale === 'uz' ? 'uz_UZ' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Cognilabs', url: `${siteUrl}/${locale}/about-us`,
      images: [{ url: OG_IMAGE, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE] },
    alternates: {
      canonical: `${siteUrl}/${locale}/about-us`,
      languages: {
        en: `${siteUrl}/en/about-us`,
        uz: `${siteUrl}/uz/about-us`,
        ru: `${siteUrl}/ru/about-us`,
        'x-default': `${siteUrl}/en/about-us`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

import Image from "next/image";
import { Target, Zap, TrendingUp } from "lucide-react";
import RequestForm from "~/components/RequestForm";
import { PageWrapper, AnimatedSection } from "./components/AboutPage";
import { getTranslations } from "next-intl/server";
import Footer from "~/components/Footer";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <AnimatedSection>
          <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0f1724] via-[#0b1220] to-black p-8 md:p-12 lg:p-16 mb-12">
            <div className="absolute -left-24 -top-24 w-72 h-72 bg-linear-to-tr from-blue-700/30 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-linear-to-bl from-purple-700/25 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
                  {t("title")}
                </h1>
                <p className="mt-4 text-gray-300 max-w-xl mx-auto md:mx-0 text-sm sm:text-base md:text-lg">
                  {t("text1")}
                </p>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center md:justify-start">
                  <a
                    className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-md"
                    href="#contact"
                  >
                    {t("contact") || "Get in touch"}
                  </a>
                  <span className="text-sm text-gray-400">
                    {t("years") || "3+ years of experience"}
                  </span>
                </div>
              </div>

              <div className="mx-auto w-full max-w-md">
                <div className="bg-linear-to-br from-white/5 to-white/2 rounded-2xl p-6 shadow-xl border border-white/5">
                  <div className="relative w-40 h-28 mx-auto">
                    <Image
                      src="/logomini.png"
                      alt="logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <p className="mt-4 text-gray-300 text-sm">{t("text2")}</p>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Features + Values */}
        <AnimatedSection>
          <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-[#0b0b0b] rounded-2xl p-8 shadow-lg border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("about")}
              </h3>
              <div className="text-gray-300 space-y-4">
                <p className="text-base md:text-lg leading-relaxed">
                  {t("text1")}
                </p>
                <p className="pt-4 text-base md:text-lg leading-relaxed">
                  {t("text2")}
                </p>
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              <div className="bg-linear-to-tr from-white/3 to-white/2 rounded-2xl p-6 shadow-md border border-white/6">
                <h4 className="text-white font-semibold">{t("ourgoal")}</h4>
                <p className="mt-3 text-gray-300 text-sm">{t("text3")}</p>
              </div>

              <div className="bg-[#0b0b0b] rounded-2xl p-6 shadow-md border border-white/5">
                <h4 className="text-white font-semibold">
                  {t("values") || "Our values"}
                </h4>
                <ul className="mt-3 text-gray-300 text-sm space-y-2">
                  <li>• {t("value1") || "Quality"}</li>
                  <li>• {t("value2") || "Transparency"}</li>
                  <li>• {t("value3") || "Collaboration"}</li>
                </ul>
              </div>
            </aside>
          </section>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection>
          <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
            <div className="bg-[#0b0b0b] rounded-2xl p-6">
              <div className="text-3xl font-extrabold text-white">
                {t("clients") || "120+"}
              </div>
              <div className="text-sm text-gray-400">
                {t("clientsLabel") || "Happy clients"}
              </div>
            </div>
            <div className="bg-[#0b0b0b] rounded-2xl p-6">
              <div className="text-3xl font-extrabold text-white">
                {t("projects") || "240+"}
              </div>
              <div className="text-sm text-gray-400">
                {t("projectsLabel") || "Projects delivered"}
              </div>
            </div>
            <div className="bg-[#0b0b0b] rounded-2xl p-6">
              <div className="text-3xl font-extrabold text-white">
                {t("yearsInNumber") || "10+"}
              </div>
              <div className="text-sm text-gray-400">
                {t("experience") || "Years experience"}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact form */}
      </div>
      <AnimatedSection>
        <div id="contact" className="pt-12 scroll-mt-40 md:scroll-mt-24">
          <RequestForm formId="form_about_us" />
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <section className="pt-24">
          <div className="max-w-6xl mx-auto text-center">
            <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {t("ourgoal")}
            </h4>
            <p className="mt-3 text-gray-400 max-w-3xl mx-auto text-sm sm:text-base md:text-lg">
              {t("text3")}
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#071024] p-6 rounded-2xl border border-white/6 shadow-md hover:scale-105 transition duration-300">
                <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-blue-400" aria-hidden />
                </div>
                <h5 className="mt-4 text-lg font-semibold text-white">
                  {t("goal1Title") || "Our mission"}
                </h5>
                <p className="mt-2 text-gray-300 text-sm">
                  {t("goal1Text") ||
                    "Deliver high-quality products that help businesses scale through intelligent software and AI."}
                </p>
              </div>

              <div className="bg-[#071024] p-6 rounded-2xl border border-white/6 shadow-md hover:scale-105 transition duration-300">
                <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-purple-400" aria-hidden />
                </div>
                <h5 className="mt-4 text-lg font-semibold text-white">
                  {t("goal2Title") || "Our approach"}
                </h5>
                <p className="mt-2 text-gray-300 text-sm">
                  {t("goal2Text") ||
                    "Combine design thinking, agile development, and AI-first strategies to solve real problems."}
                </p>
              </div>

              <div className="bg-[#071024] p-6 rounded-2xl border border-white/6 shadow-md hover:scale-105 transition duration-300">
                <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-green-400" aria-hidden />
                </div>
                <h5 className="mt-4 text-lg font-semibold text-white">
                  {t("goal3Title") || "Our impact"}
                </h5>
                <p className="mt-2 text-gray-300 text-sm">
                  {t("goal3Text") ||
                    "Create measurable results — faster time-to-market, increased efficiency, and happier customers."}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                {t("text4")}
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <div className="pt-16">
          <Footer />
        </div>
      </AnimatedSection>
    </PageWrapper>
  );
}
