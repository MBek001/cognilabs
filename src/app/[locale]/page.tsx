"use client"
import { useLocale, useTranslations } from 'next-intl'

export default function page() {

  const t = useTranslations("Home")
  const locale = useLocale()
  console.log(locale)
  return (
    <div>
     {t("title")}
    </div>
  )
}
