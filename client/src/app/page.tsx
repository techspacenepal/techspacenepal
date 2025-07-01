'use client'
import React, { useState, useEffect } from 'react'
import Courses from '@/pages/Courses'
import HeroSection from '@/pages/HeroSection'
import GalleryForm from './(users)/gallery/page'
import Testimonialpage from './(users)/testimonial/page'
import TeamSection from './(users)/teams/page'
import UpcomingClassesUser from './(users)/UpcomingClassesUser/page'
import ServicesSection from '@/pages/ServicesSection'


function Page() {
 

  return (
    <>
    
      <HeroSection />
      <ServicesSection />
      <Courses />
      <GalleryForm />
      <Testimonialpage />
      <TeamSection />
      <UpcomingClassesUser />
      
    </>
  )
}

export default Page
