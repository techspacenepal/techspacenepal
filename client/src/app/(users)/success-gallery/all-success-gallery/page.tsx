"use client";
import Link from 'next/link';

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/navigation";

interface GalleryItem {
  _id: string;
  student: string;
  college: string;
  imageUrl: string;
  designation?: string;
  company?: string;
  faculty?: string;
}

export default function GalleryPage() {
  const router = useRouter();
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGalleryData(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch(console.error);
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1200, min: 992 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 992, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (

    <div className="container py-5">

      <div
        className="d-flex flex-column flex-md-row align-items-center justify-content-between text-center text-md-start gap-3 px-2"
      >
        <h2
          className="mb-0 text-center"
          style={{
            fontSize: "clamp(1rem, 3vw, 2rem)",
            fontWeight: "700",
            fontFamily: "Poppins, sans-serif",
            color: "#002147",
            textTransform: "capitalize",
          }}
        >
          Student Success Gallery
        </h2>


        <Link
          href="/success-gallery" onClick={(e) => {
            e.preventDefault();
            router.push("/success-gallery");
          }}
          // target="_blank"
          // rel="noopener noreferrer"
          className="btn d-inline-flex align-items-center"
          style={{
            backgroundColor: '#0057d8',
            color: '#ffffff',
            fontWeight: '500',
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            textDecoration: 'none',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}

        >
          Read More<i className="bi bi-arrow-right" style={{ fontSize: '18px' }}></i>
        </Link>

      </div>


      {galleryData.length === 0 ? (
        <p className="text-muted text-center mt-5">No results found.</p>
      ) : (

        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          keyBoardControl
          showDots
          arrows={false}
          containerClass="carousel-container pb-5 pt-3"
        >
          {galleryData.slice(0, 5).map((item) => (
            <div key={item._id} className="p-2">
              <div
                className="card h-100 text-center px-3"
                style={{
                  border: "0.3px solid #dee2e6",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                  paddingTop: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      border: "5px solid #00BCD4", // outer cyan/blue border
                      borderRadius: "50%",
                      padding: "3px",
                    }}
                  >
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.student}
                      className="rounded-circle mx-auto shadow"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "1px solid #fff", // inner white border
                        backgroundColor: "#fff",
                      }}
                    />
                  </div>
                </div>

                <div
                  className="card-body d-flex flex-column align-items-center justify-content-center text-center"
                  style={{ paddingBottom: "2rem" }}
                >
                  <h6
                    className="fw-bold mb-1 text-dark"
                    style={{ textTransform: "uppercase" }} // NAME in uppercase
                  >
                    Mr. {item.student}
                  </h6>

                  <p
                    className="text-muted mb-1"
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.4",
                      textTransform: "capitalize", // Designation capitalized
                    }}
                  >
                    {item.designation}
                  </p>

                  <a
                    href="#"
                    className="d-inline-block mb-2"
                    style={{
                      fontSize: "14px",
                      color: "#0d6efd",
                      textDecoration: "none",
                      fontWeight: 500,
                      textTransform: "uppercase", // @company in uppercase
                    }}
                  >
                    @{item.company}
                  </a>

                  <h6
                    className="fw-semibold text-secondary mb-1 mt-2"
                    style={{
                      fontSize: "14px",
                      textTransform: "uppercase", // Heading in uppercase
                    }}
                  >
                    College / Faculty
                  </h6>

                  <p
                    className="text-muted small mb-0"
                    style={{
                      fontSize: "13px",
                      textTransform: "capitalize", // College name capitalized
                    }}
                  >
                    {item.college}
                  </p>

                  <p
                    className="text-muted small mb-0"
                    style={{
                      fontSize: "13px",
                      textTransform: "capitalize", // Faculty name capitalized
                    }}
                  >
                    {item.faculty}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </Carousel>

      )}
      <style jsx global>{`
  .react-multi-carousel-dot button {
    width: 15px !important;
    height: 15px !important;
    border-radius: 50% !important;
    background: #ccc !important;
  }

  .react-multi-carousel-dot--active button {
    background: #0057d8 !important;
    // transform: scale(1.3);
  }
`}</style>


    </div>

  );
}