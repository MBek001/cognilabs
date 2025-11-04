"use client"
import { useLocale, useTranslations } from 'next-intl'
import ClientsOpinion from '~/components/ClientsOpinion'
import Faq from '~/components/Faq'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Insights from '~/components/Insights'
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
      {/* <Projects/>
      <Services/>
      <TrustCases/>
      <ClientsOpinion/>
      <Locations/>
      <RequestForm/>
      <Faq/>
      <Insights/> 
      <Footer/> */}
    </div>
  )
}
