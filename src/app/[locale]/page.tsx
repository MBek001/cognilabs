"use client"
import { useLocale, useTranslations } from 'next-intl'
import Header from '~/components/Header'

export default function page() {

  const locale = useLocale()
  console.log(locale)
  return (
    <div>
      <Header/>
    </div>
  )
}
