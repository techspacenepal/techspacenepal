'use client';
import Link from "next/link";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AccordionStayOpen from "../AccordionStayOpen";
import Image from "next/image";

interface Course {
  _id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
  description?: string;
  coursesdescription?: string;
  courseoverview: string;
}
const slugify = (text: string | undefined | null) =>
  (text ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function CourseDetailPage() {
  const rawParams = useParams();
  const slug = typeof rawParams?.slug === 'string' ? rawParams.slug : Array.isArray(rawParams?.slug) ? rawParams?.slug[0] : '';

  const [course, setCourse] = useState<Course | null>(null);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  useEffect(() => {
    if (!slug) return;
    axios.get('http://localhost:5000/api/courses').then((res) => {
      const all = res.data;
      setAllCourses(all);
      const found = all.find((c: Course) => slugify(c.title) === slug);
      if (found) setCourse(found);
    });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    axios.get('http://localhost:5000/api/courses').then((res) => {
      const allCourses: Course[] = res.data;
      const found = allCourses.find((c) => slugify(c.title) === slug);
      if (found) setCourse(found);
    });
  }, [slug]);

  if (!course) {
    return <div className="container py-5 text-center">Loading course details...</div>;
  }

  return (
    <>
      <section className="py-4"
        style={{
          background: "linear-gradient(90deg, #1e2226 0%, #2c3137 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Left Section */}
            <div className="col-12 col-lg-8 d-flex flex-column justify-content-center">
              <div
                style={{
                  fontSize: "14px",
                  color: "#e0e0e0",
                  marginBottom: "10px",
                }}
              >
                <Link className="hover-color"
                  href="/" 
                  style={{
                    color: "#e0e0e0",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Home
                </Link>
                &nbsp;&gt;&nbsp;
                <Link className="hover-color"
                  href={`/${slugify(course.category)}`}
                  style={{
                    color: "#e0e0e0",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  {course.category}
                </Link>
                  

                &nbsp;&gt;&nbsp;
                {course.title}
              </div>


              <h2
                className="text-white"
                style={{
                  fontWeight: 700,
                  fontSize: "clamp(1.5rem, 2vw + 1rem, 2.2rem)", // ✅ Responsive font size
                  marginBottom: "15px",
                }}
              >
                {course.title}
              </h2>

              {course.description && (
                <p
                  style={{
                    fontSize: "clamp(0.95rem, 1vw + 0.5rem, 1.1rem)",
                    color: "#d1d1d1",
                    marginBottom: "25px",
                    lineHeight: 1.6,
                  }}
                >
                  {course.coursesdescription}
                </p>
              )}

              <div className="d-flex flex-wrap gap-4 mb-4">
                <div className="d-flex align-items-center gap-2 text-white">
                  <i className="bi bi-clock fs-5"></i>
                  <span style={{ fontWeight: 600 }}>Duration:</span>
                  <span>{course.duration}</span>
                </div>
                <Link
                  href="/inquiry"
                  className="btn btn-primary px-3 py-2 fw-semibold rounded-2"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Send Inquiry
                </Link>

              </div>
            </div>

            {/* Right Section */}
            <div className="col-12 col-lg-4 d-flex justify-content-center mt-4 mt-lg-0">
              <img
                src={`http://localhost:5000${course.image}`}
                alt={course.title}
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: "7px",
                  backgroundColor: "#fff",
                  padding: "7px",
                }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* courses overview */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <p
                className="text-muted responsive-text"
                dangerouslySetInnerHTML={{
                  __html: course?.courseoverview || ""
                }}
              ></p>
            </div>
          </div>
        </div>
      </section>

      {/* syllabus and faq section import  */}
      <AccordionStayOpen courseId={course._id} />


      {/* === related courses section start === */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <h4 className="fw-bold text-center text-md-start m-0">
              Related Courses
            </h4>
            <div className="text-center mt-0 pb-0">
              <Link
                href="/courses"
                className="btn d-inline-flex align-items-center"
                style={{
                  backgroundColor: '#0057d8',
                  color: '#ffffff',
                  fontWeight: '500',
                  padding: '12px 17px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  textDecoration: 'none',
                  gap: '8px'
                }}
              >
                Explore All Courses <i className="bi bi-arrow-right" style={{ fontSize: '18px' }}></i>
              </Link>
            </div>
          </div>


          <div className="row g-4">
            {allCourses
              .filter((c) => c.category === course.category && c._id !== course._id)
              .map((c) => {
                const courseSlug = slugify(c.title);
                return (
                  <div key={c._id} className="col-12 col-sm-6 col-md-4 col-lg-3">

                     <div
                                    className="card h-100 rounded-2 overflow-hidden"
                                    style={{
                                        border: "0.4px solid #dee2e6",
                                        boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                    
                                >
                                    <div className="position-relative overflow-hidden">
                                        {/* ✅ Using Next.js Image for optimization */}
                                        <Link href={`/courses/${slug}`}>
                                            <Image
                                                src={`http://localhost:5000${c.image}`}
                                                alt={c.title}
                                                width={500}
                                                height={300}
                                                className="card-img-top p-3"
                                                style={{
                                                    height: 200,
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.4s ease',
                                                    borderRadius: '1.3rem',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Link>

                                        {/* ✅ Duration Badge */}
                                        <span
                                            className="badge bg-success text-white fw-semibold position-absolute"
                                            style={{
                                                top: '1.5rem',
                                                right: '1.5rem',
                                                padding: '0.5rem 1rem',
                                                boxShadow: '0 0 10px rgba(0,0,0,0.07)',
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            {c.duration}
                                        </span>
                                    </div>

                                    {/* ✅ Card Body */}
                                    <div
                                        className="card-body d-flex flex-column justify-content-between pt-0"
                                        style={{ minHeight: '117px' }}
                                    >
                                        <Link href={`/courses/${slug}`} className="text-decoration-none">
                                            <h5
                                                className="card-title mb-2"
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: '1.1rem',
                                                    color: '#1a1a1a',
                                                    textTransform: 'capitalize',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {c.title}
                                            </h5>
                                        </Link>

                                        <div className="d-flex align-items-center justify-content-between pb-0">
                                            <Link href="/inquiry" className="cta text-decoration-none">
                                                <span className="hover-underline-animation"> Apply now </span>
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>

                                            <Link href={`/courses/${slug}`} className='courses-btn-viewdetails p-0'>
                                                <span> View Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>                    
                  </div>
                );
              })}
          </div>
        </div>
      </section>










    </>

  );
}
