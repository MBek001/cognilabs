"use client"
import { useLocale, useTranslations } from 'next-intl'

export default function page() {

  const locale = useLocale()
  console.log(locale)
  return (
    <div>
    </div>
  )
}
