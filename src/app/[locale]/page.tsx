
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
import { setRequestLocale } from 'next-intl/server'

export default async function page({params}: {params: {locale: string}}) {
const {locale} = await params

setRequestLocale(locale)
  return (
    <div>
      <Header/>
      <Projects/> 
      <Services/>
      <TrustCases/>
      
      <ClientsOpinion/>
      <Locations/>
      <RequestForm submitEventName="main_form_submit" />
      <Faq/>
      <Insights/> 
      <Footer/> 
      
    </div>
  )
}
