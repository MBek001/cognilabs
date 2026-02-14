
import CareerForm from '~/components/careers/form'
import Part1 from '~/components/careers/part1'
import WhyUs from '~/components/careers/why'
import Footer from '~/components/Footer'

export default function page() {
  return (
    <div>
      <Part1/>
      <WhyUs/>
      <CareerForm/>
      <Footer/>
    </div>
  )
}
