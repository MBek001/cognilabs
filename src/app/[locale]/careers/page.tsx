
import type { Metadata } from 'next'
import { SITE_URL, OG_IMAGE } from '~/lib/seo'
import CareerForm from '~/components/careers/form'
import Part1 from '~/components/careers/part1'
import WhyUs from '~/components/careers/why'
import Footer from '~/components/Footer'

const siteUrl = SITE_URL

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
  title: "IT Jobs & Careers in Tashkent — Join Cognilabs Uzbekistan",
  description: "Join Cognilabs, Uzbekistan's fast-growing IT company. We're hiring developers, designers, project managers and IT specialists in Tashkent. Build your tech career with us.",
  keywords: [
    // English (50)
    'IT jobs Tashkent', 'IT careers Uzbekistan', 'developer jobs Tashkent',
    'web developer job Uzbekistan', 'mobile developer career Uzbekistan',
    'software engineer job Tashkent', 'UI UX designer job Uzbekistan',
    'frontend developer job Tashkent', 'backend developer job Uzbekistan',
    'full stack developer career Uzbekistan', 'React developer job Tashkent',
    'Node.js developer Uzbekistan', 'Python developer job Tashkent',
    'AI engineer job Uzbekistan', 'IT specialist Tashkent',
    'project manager IT Uzbekistan', 'QA engineer job Tashkent',
    'DevOps engineer Uzbekistan', 'tech jobs Tashkent',
    'startup jobs Uzbekistan', 'internship IT Tashkent',
    'junior developer job Uzbekistan', 'senior developer Tashkent',
    'remote IT work Uzbekistan', 'IT company jobs Tashkent',
    'Cognilabs hiring', 'Cognilabs careers', 'work at Cognilabs',
    'IT vacancy Tashkent', 'tech career Uzbekistan',
    'digital career Tashkent', 'IT job opportunities Uzbekistan',
    'software company jobs Uzbekistan', 'web design jobs Tashkent',
    'grow IT career Uzbekistan', 'Flutter developer job Uzbekistan',
    'Next.js developer job Tashkent', 'TypeScript developer Uzbekistan',
    'data scientist job Tashkent', 'machine learning engineer Uzbekistan',
    'tech talent Uzbekistan', 'IT recruitment Tashkent',
    'software developer salary Uzbekistan', 'best tech employer Tashkent',
    'IT company culture Uzbekistan', 'developer benefits Tashkent',
    'Kotlin developer Uzbekistan', 'Swift developer Tashkent',
    'cloud engineer Uzbekistan', 'IT team lead Tashkent',
    // Uzbek (50)
    "IT ish joylari Toshkent", "IT karyera O'zbekiston", "dasturchi ish Toshkent",
    "veb dasturchi ish O'zbekiston", "mobil dasturchi karyera O'zbekiston",
    "dasturiy muhandis ish Toshkent", "UI UX dizayner ish O'zbekiston",
    "frontend dasturchi ish Toshkent", "backend dasturchi ish O'zbekiston",
    "full stack dasturchi karyera O'zbekiston", "React dasturchi ish Toshkent",
    "Node.js dasturchi O'zbekiston", "Python dasturchi ish Toshkent",
    "AI muhandis ish O'zbekiston", "IT mutaxassis Toshkent",
    "loyiha menejeri IT O'zbekiston", "QA muhandis ish Toshkent",
    "DevOps muhandis O'zbekiston", "texnologiya ishlari Toshkent",
    "startap ishlari O'zbekiston", "IT stajirovka Toshkent",
    "junior dasturchi ish O'zbekiston", "senior dasturchi Toshkent",
    "masofaviy IT ish O'zbekiston", "IT kompaniya ishlari Toshkent",
    "Cognilabs ishga qabul", "Cognilabs karyera", "Cognilabs da ishlash",
    "IT vakansiya Toshkent", "texnologiya karyerasi O'zbekiston",
    "raqamli karyera Toshkent", "IT ish imkoniyatlari O'zbekiston",
    "dasturiy ta'minot kompaniyasi ishlari O'zbekiston", "veb dizayn ishlari Toshkent",
    "IT karyerani rivojlantirish O'zbekiston", "Flutter dasturchi ish O'zbekiston",
    "Next.js dasturchi ish Toshkent", "TypeScript dasturchi O'zbekiston",
    "ma'lumotlar olimi ish Toshkent", "mashina o'qishi muhandisi O'zbekiston",
    "IT iste'dodi O'zbekiston", "IT ishga yollash Toshkent",
    "dasturchi maoshi O'zbekiston", "eng yaxshi texnologiya ishi beruvchi Toshkent",
    "IT kompaniyasi madaniyati O'zbekiston", "dasturchi imtiyozlari Toshkent",
    "Kotlin dasturchi O'zbekiston", "Swift dasturchi Toshkent",
    "bulut muhandis O'zbekiston", "IT jamoa rahbari Toshkent",
    // Russian (50)
    'IT вакансии Ташкент', 'IT карьера Узбекистан', 'работа разработчика Ташкент',
    'работа веб-разработчика Узбекистан', 'карьера мобильного разработчика Узбекистан',
    'работа инженера по ПО Ташкент', 'работа UI UX дизайнера Узбекистан',
    'работа фронтенд разработчика Ташкент', 'работа бэкенд разработчика Узбекистан',
    'карьера full stack разработчика Узбекистан', 'работа React разработчика Ташкент',
    'Node.js разработчик Узбекистан', 'работа Python разработчика Ташкент',
    'работа AI инженера Узбекистан', 'IT специалист Ташкент',
    'проектный менеджер IT Узбекистан', 'работа QA инженера Ташкент',
    'DevOps инженер Узбекистан', 'технологические вакансии Ташкент',
    'работа в стартапе Узбекистан', 'стажировка IT Ташкент',
    'работа junior разработчика Узбекистан', 'senior разработчик Ташкент',
    'удалённая работа IT Узбекистан', 'вакансии IT компании Ташкент',
    'Cognilabs нанимает', 'карьера в Cognilabs', 'работа в Cognilabs',
    'IT вакансия Ташкент', 'карьера в технологиях Узбекистан',
    'цифровая карьера Ташкент', 'возможности IT работы Узбекистан',
    'вакансии в компании по разработке ПО Узбекистан', 'вакансии веб-дизайна Ташкент',
    'развитие IT карьеры Узбекистан', 'работа Flutter разработчика Узбекистан',
    'работа Next.js разработчика Ташкент', 'TypeScript разработчик Узбекистан',
    'работа data scientist Ташкент', 'инженер машинного обучения Узбекистан',
    'IT таланты Узбекистан', 'подбор IT персонала Ташкент',
    'зарплата разработчика Узбекистан', 'лучший работодатель технологий Ташкент',
    'культура IT компании Узбекистан', 'преимущества разработчика Ташкент',
    'Kotlin разработчик Узбекистан', 'Swift разработчик Ташкент',
    'облачный инженер Узбекистан', 'IT тимлид Ташкент',
  ],
  openGraph: {
    title: "IT Jobs & Careers in Tashkent — Join Cognilabs Uzbekistan",
    description: "Join Cognilabs, Uzbekistan's fast-growing IT company. We're hiring developers, designers and IT specialists in Tashkent.",
    type: 'website', siteName: 'Cognilabs',
    url: `${siteUrl}/${locale}/careers`,
    images: [{ url: OG_IMAGE, alt: 'Careers at Cognilabs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "IT Jobs & Careers — Cognilabs Uzbekistan",
    description: "Join Cognilabs IT team in Tashkent. Hiring developers, designers and IT specialists.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: `${siteUrl}/${locale}/careers`,
    languages: {
      en: `${siteUrl}/en/careers`,
      uz: `${siteUrl}/uz/careers`,
      ru: `${siteUrl}/ru/careers`,
      'x-default': `${siteUrl}/en/careers`,
    },
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default function page() {
  return (
    <div>
      <Part1/>
      <WhyUs/>
      <CareerForm/>
      <Footer/>
    </div>
  )
}
