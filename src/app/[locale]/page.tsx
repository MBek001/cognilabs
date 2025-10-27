"use client"
import { useLocale, useTranslations } from 'next-intl'
import Navbar from '~/components/Navbar'

export default function page() {

  const locale = useLocale()
  console.log(locale)
  return (
    <div>
      <Navbar/>
    </div>
  )
}
