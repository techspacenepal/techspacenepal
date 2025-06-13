'use client'

import Courses from '@/pages/Courses'
import HeroSection from '@/pages/HeroSection'
import React from 'react'
import Footer from './Component/Footer'
import GalleryForm from './(users)/gallery/page'
import Testimonialpage from './(users)/testimonial/page'
import TeamSection from './(users)/teams/page'



function page() {
  return (
    <>
        <HeroSection/>   
         <Courses/>
         <GalleryForm/>
          <Testimonialpage/>
          <TeamSection/>
         <Footer/>
    </>
  )
}

export default page
