"use client"
import { useLocale, useTranslations } from 'next-intl'
import ClientsOpinion from '~/components/ClientsOpinion'
import Faq from '~/components/Faq'
import Header from '~/components/Header'
import Locations from '~/components/Locations'
import Projects from '~/components/Projects'
import RequestForm from '~/components/RequestForm'
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
      <ClientsOpinion/>
      <Locations/>
      <RequestForm/>
      <Faq/>
    </div>
  )
}
