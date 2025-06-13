"use client";

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

      <div className="  d-flex flex-column flex-md-row align-items-center justify-content-between mb-0 gap-2 px-2">
        <h2 className="mb-0 text-center text-md-start">Student Success Gallery</h2>

        <a
          href="gallery/success-detail"
          onClick={(e) => {
            e.preventDefault();
            router.push("gallery/success-detail");
          }}
          className="text-primary text-decoration-none d-inline-flex align-items-center gap-1"
        >
          <span>Read more success story</span>
          <i className="bi bi-arrow-right fs-5"></i>
        </a>



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
          {galleryData.map((item) => (
            <div key={item._id} className="p-2">
              <div
                className="card h-100 text-center px-3"
                style={{
                  border: "0.3px solid #dee2e6",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                  paddingTop: "2rem", 
                }}
              >
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt={item.student}
                  className="rounded mx-auto"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    border: "3px solid #ccc",
                   
                  }}
                />

                <div
                  className="card-body d-flex flex-column align-items-center justify-content-center text-center"
                  style={{ paddingBottom: "2rem" }}
                >
                  <h5 className="fw-bold mb-1 text-dark">Mr. {item.student}</h5>

                  <p
                    className="text-muted mb-1"
                    style={{ fontSize: "14px", lineHeight: "1.4" }}
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
                    }}
                  >
                    @{item.company}
                  </a>

                  <h6
                    className="fw-semibold text-secondary mb-1 mt-2"
                    style={{ fontSize: "14px" }}
                  >
                    College / Faculty
                  </h6>

                  <p className="text-muted small mb-0" style={{ fontSize: "13px" }}>
                    {item.college}
                  </p>

                  <p className="text-muted small mb-0" style={{ fontSize: "13px" }}>
                    {item.faculty}
                  </p>
                </div>
              </div>


            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
