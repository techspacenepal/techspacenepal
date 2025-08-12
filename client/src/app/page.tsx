'use client'
import Home from '@/pages/Home'
import StatsSection from '@/pages/StatsSection'
import Testimonialpage from './(users)/testimonial/alltestimonial/page'
import UpcommingPage from './(users)/upcomming-classes/all-upcomming-classes/page'
import GalleryPage from './(users)/success-gallery/all-success-gallery/page'
import AboutSection from '@/pages/AboutSection'
import AllCoursesPage from './(users)/courses/allcourses/page'
import ServicesSection from './(users)/services/all-services/page'
import BlogListPage from './(users)/blog/all-blog/page'


function Page() {


  return (
    <>
    {/* home */}
      <Home />
      {/* counter */}
      <StatsSection />
      {/* About section */}
      <AboutSection/>
      {/* courses */}
      <AllCoursesPage/>
      {/* services */}
      <ServicesSection />
      {/* success gallery */}
      < GalleryPage/>
      {/* testimonial */}
      <Testimonialpage/>
      {/* upcomming classes */}
      <UpcommingPage />
      {/* blog */}
      <BlogListPage/>

    </>
  )
}

export default Page
