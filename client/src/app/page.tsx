'use client'

import Courses from '@/pages/Courses'
import HeroSection from '@/pages/HeroSection'
import React from 'react'
import Footer from './Component/Footer'
import GalleryForm from './(users)/gallery/page'



function page() {
  return (
    <>
        <HeroSection/>   
         <Courses/>
         <GalleryForm/>
         <Footer/>
    </>
  )
}

export default page
