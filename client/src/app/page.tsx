'use client'

import Courses from '@/pages/Courses'
import HeroSection from '@/pages/HeroSection'
import React from 'react'
import GalleryForm from './(users)/gallery/page'
import Testimonialpage from './(users)/testimonial/page'
import TeamSection from './(users)/teams/page'
import UpcomingClassesUser from './(users)/UpcomingClassesUser/page'
// import AboutSection from '@/pages/AboutSection'
import ServicesSection from '@/pages/ServicesSection'



function page() {
  return (
    <>
      <HeroSection />
      {/* <AboutSection/> */}
      <ServicesSection/>
      <Courses />
      <GalleryForm />
      <Testimonialpage />
      <TeamSection />
      <UpcomingClassesUser/>
    </>
  )
}

export default page
