"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Link from 'next/link';

interface Testimonial {
  _id: string;
  name: string;
  course: string;
  message: string;
  image?: string;
}

const Testimonialpage: React.FC = () => {

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get<Testimonial[]>("http://localhost:5000/api/testimonials");
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to load testimonials", error);
    }
  };

  const openModal = (testimonial: Testimonial) => setSelected(testimonial);
  const closeModal = () => setSelected(null);

  const sliderRef = useRef<Slider>(null);
  ``
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 992, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };



  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, fontFamily: "Poppins, sans-serif", color: "#002147", textTransform: "capitalize", letterSpacing: "1px" }}>
            Testimonial
          </h2>
          <p className="mb-2 mb-md-0" style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", fontWeight: 400, fontFamily: "Poppins, sans-serif", color: "#555", lineHeight: "1.6" }}>
            Real stories from our learners across Nepal — boosting careers in IT.
          </p>
        </div>

        <div className="row g-4">
          {testimonials.length === 0 ? (
            <p className="text-center text-muted">No testimonials available yet.</p>
          ) : (
            <Slider ref={sliderRef} {...settings} className="slick-slider slick-dotted px-0">
              {testimonials.slice(0, 5).map((testimonial) => (
                <div className="col-12 px-3 py-4" key={testimonial._id}>
                  <div
                    className="px-4 py-5 bg-white shadow rounded-4 position-relative"
                    style={{
                      height: "340px",
                      borderBottom: "5px solid #4A75F3",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="position-absolute d-flex justify-content-center align-items-center"
                      style={{
                        top: "0",
                        left: "10%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                        <path d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z" />
                      </svg>
                    </div>

                    <p className="text-secondary mb-2" style={{ fontSize: "16px", lineHeight: "1.6", fontFamily: "Poppins, sans-serif", fontWeight: 400, color: "#333" }}>
                      {testimonial.message.split(" ").slice(0, 35).join(" ")}
                      {testimonial.message.split(" ").length > 35 ? "..." : ""}
                    </p>

                    {testimonial.message.split(" ").length > 35 && (
                      <a
                        className="fw-semibold p-0 text-primary text-decoration-none"
                        onClick={() => openModal(testimonial)}
                        style={{ cursor: "pointer", fontSize: "14px", fontWeight: 600, fontFamily: "Poppins, sans-serif", textTransform: "uppercase" }}
                      >
                        Read More
                      </a>
                    )}

                    <div className="d-flex align-items-center flex-nowrap mt-2">
                      <img
                        src={testimonial.image ? `http://localhost:5000${testimonial.image}` : "https://via.placeholder.com/170"}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width={85}
                        height={85}
                        style={{ objectFit: "cover", objectPosition: "center center", border: "3px solid #ffffff", boxShadow: "0 0 0 4px #FF4C4C" }}
                      />
                      <div>
                        <h6 className="mb-0" style={{ fontWeight: 700, fontSize: "18px", fontFamily: "Poppins, sans-serif", color: "#000", textTransform: "capitalize" }}>
                          {testimonial.name}
                        </h6>
                        <small className="text-muted" style={{ fontWeight: 500, fontSize: "14px", fontFamily: "Poppins, sans-serif", textTransform: "uppercase", color: "#555" }}>
                          {testimonial.course}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}

        </div>

        {/* ✅ Navigation Row (Dots stay auto below, Prev/Next + View More) */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-light shadow-sm border-0 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                color: "#0057d8",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
              onClick={() => sliderRef.current?.slickPrev()}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            <button
              className="btn btn-light shadow-sm border-0 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                color: "#0057d8",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
              onClick={() => sliderRef.current?.slickNext()}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          <Link
            href="/testimonial"
            className="btn btn-outline-primary fw-semibold d-inline-flex align-items-center"
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
            View More <i className="bi bi-arrow-right" style={{ fontSize: '18px' }}></i>
          </Link>
        </div>


      </div>
      {selected && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px", // padding for mobile safe space
          }}
        >
          <div
            className="modal-content card shadow"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              backgroundColor: "#fff",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              padding: "clamp(12px, 2vw, 20px)",
            }}
          >
            {/* Header */}
            <div className="d-flex align-items-center mb-3 flex-shrink-0">
              <img
                src={
                  selected.image
                    ? `http://localhost:5000${selected.image}`
                    : "https://via.placeholder.com/55"
                }
                alt={selected.name}
                className="rounded-circle me-3"
                style={{
                  width: "clamp(60px, 15vw, 90px)",
                  height: "clamp(60px, 15vw, 90px)",
                  objectFit: "cover",
                  border: "3px solid #fff",
                  boxShadow: "0 0 0 4px #FF4C4C",
                }}
              />
              <div className="flex-grow-1">
                <h5
                  className="mb-0 fw-bold text-capitalize"
                  style={{
                    fontSize: "clamp(16px, 4vw, 20px)",
                    fontFamily: "Poppins, sans-serif",
                    color: "#000",
                  }}
                >
                  {selected.name}
                </h5>
                <small
                  className="text-muted text-uppercase fw-medium"
                  style={{
                    fontSize: "clamp(12px, 3vw, 14px)",
                    fontFamily: "Poppins, sans-serif",
                    color: "#555",
                  }}
                >
                  {selected.course}
                </small>
              </div>
              <button
                onClick={closeModal}
                className="btn p-0 ms-2"
                style={{
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 600,
                  color: "#FF4C4C",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Message */}
            <div
              style={{
                overflowY: "auto",
                maxHeight: "calc(90vh - 120px)", // Adjust space for header
                paddingRight: "4px",
              }}
            >
              <p
                className="mb-0"
                style={{
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                  lineHeight: "1.6",
                  fontWeight: 400,
                  fontFamily: "Poppins, sans-serif",
                  color: "#333",
                  wordBreak: "break-word",
                }}
              >
                {selected.message}
              </p>
            </div>
          </div>
        </div>
      )}



    </section>
  );
};

export default Testimonialpage;
