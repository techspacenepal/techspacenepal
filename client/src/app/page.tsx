'use client'

import Courses from '@/pages/Courses'
// import HeroSection from '@/pages/HeroSection'
import React from 'react'
import GalleryForm from './(users)/gallery/page'
import Testimonialpage from './(users)/testimonial/page'
import TeamSection from './(users)/teams/page'
import UpcomingClassesUser from './(users)/UpcomingClassesUser/page'



function page() {
  return (
    <>
      {/* <HeroSection /> */}
      <Courses />
      <GalleryForm />
      <Testimonialpage />
      <TeamSection />
      <UpcomingClassesUser/>
    </>
  )
}

export default page
