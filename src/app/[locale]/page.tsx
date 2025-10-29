"use client"
import { useLocale, useTranslations } from 'next-intl'
import Header from '~/components/Header'
import Projects from '~/components/Projects'
import Services from '~/components/services'

export default function page() {

  const locale = useLocale()
  console.log(locale)
  return (
    <div>
      <Header/>
      <Projects/>
      <Services/>
    </div>
  )
}
