"use client"
import { useLocale, useTranslations } from 'next-intl'
import Header from '~/components/Header'
import Projects from '~/components/Projects'

export default function page() {

  const locale = useLocale()
  console.log(locale)
  return (
    <div>
      <Header/>
      <Projects/>
    </div>
  )
}
