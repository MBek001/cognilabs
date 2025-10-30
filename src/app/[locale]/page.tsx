"use client"
import { useLocale, useTranslations } from 'next-intl'
import Header from '~/components/Header'
import Projects from '~/components/Projects'
import Services from '~/components/Services'
import TrustCases from '~/components/TrustCases'

export default function page() {

  const locale = useLocale()
  console.log(locale)
  return (
    <div>
      <Header/>
      <Projects/>
      <Services/>
      <TrustCases/>
    </div>
  )
}
