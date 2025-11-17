import React from 'react'
import CareerForm from '~/components/careers/form'
import Part1 from '~/components/careers/part1'
import Vacancies from '~/components/careers/vacancies'
import WhyUs from '~/components/careers/why'
import Footer from '~/components/Footer'

export default function page() {
  return (
    <div className=''>
      <Part1/>
      <Vacancies/>
      <WhyUs/>
      <CareerForm/>
      <Footer/>
    </div>
  )
}
