"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
=======
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7

interface Testimonial {
  _id: string;
  name: string;
  course: string;
  message: string;
  image: string;
}

<<<<<<< HEAD
function Testimonialpage() {
  // const [testimonials, setTestimonials] = useState([]);
  // const [selected, setSelected] = useState(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selected, setSelected] = useState<Testimonial | null>(null);
=======
function TestimonialDetailspage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ NEW
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
<<<<<<< HEAD
      const { data } = await axios.get(
        "http://localhost:5000/api/testimonials"
      );
=======
      const { data } = await axios.get("http://localhost:5000/api/testimonials");
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to load testimonials");
    }
  };

<<<<<<< HEAD
  // const openModal = (testimonial) => {
  //   setSelected(testimonial);
  // };

  const openModal = (testimonial: Testimonial) => {
    setSelected(testimonial);
  };

  const closeModal = () => {
    setSelected(null);
  };

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 2 },
    desktop: { breakpoint: { max: 1200, min: 992 }, items: 2 },
    tablet: { breakpoint: { max: 992, min: 768 }, items: 1 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };
=======
  const openModal = (testimonial: Testimonial) => setSelected(testimonial);
  const closeModal = () => setSelected(null);
  const loadMore = () => setVisibleCount((prev) => prev + 6);

  // ✅ Filter testimonials by search term
  const filteredTestimonials = testimonials.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7

  return (
    <section className="bg-light py-5">
      <div className="container">
<<<<<<< HEAD
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center text-md-start">
            <h2 className="fw-bold text-primary mb-2">What Our Students Say</h2>
            <p className="text-muted mb-2 mb-md-0">
              Real stories from our learners across Nepal — boosting careers in
              IT.
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <a
              href="/testimonial/TestimonialDetails"
              className="btn btn-outline-primary fw-semibold"
            >
              View More
            </a>
          </div>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-muted">
            No testimonials available yet.
          </p>
        ) : (
          <div className="row g-4">
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={3000}
              keyBoardControl
              showDots
              arrows={false}
              containerClass="carousel-container px-0 pb-5 pt-3"
              itemClass="carousel-item-padding-40-px"
            >
              {testimonials.slice(0, 5).map((testimonial, idx) => (
                <div className="col-12 px-3 py-5" key={testimonial._id || idx}>
                  <div
                    className="px-4 py-5 bg-white shadow rounded-4 position-relative"
                    style={{
                      minHeight: "280px",
                      borderLeft: "5px solid #f48024",
                      borderRight: "5px solid #f48024",
                    }}
                  >
                    <div
                      className="position-absolute d-flex justify-content-center align-items-center"
                      style={{
                        top: "0",
                        left: "10%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#fff",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width="24"
                        height="24"
                      >
                        <path d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z" />
                      </svg>
                    </div>

                    <p
                      className="text-secondary mb-2 border-top"
                      style={{ fontSize: "16px", lineHeight: "1.6" }}
                    >
                      {testimonial.message.split(" ").slice(0, 35).join(" ")}
                      {testimonial.message.split(" ").length > 35 ? "..." : ""}
                    </p>

                    {testimonial.message.split(" ").length > 35 && (
                      <a
                        className="fw-semibold p-0 text-primary text-decoration-none"
                        onClick={() => openModal(testimonial)}
                        style={{ cursor: "pointer", fontSize: "14px" }}
                      >
                        Read More
                      </a>
                    )}

                    <div className="d-flex align-items-center flex-nowrap mt-2 border-bottom">
=======

        {/* ✅ Search Input */}
        <div className="text-center mb-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <label className="fw-semibold d-block mb-2" style={{ fontSize: "18px" }}>
            Search Student/Course to see what our students say about it
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Student/Course"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {filteredTestimonials.length === 0 ? (
          <p className="text-center text-muted">No testimonials found.</p>
        ) : (
          <>
            <div className="row g-4">
              {visibleTestimonials.map((testimonial, idx) => (
                <div key={testimonial._id || idx} className="col-12 col-sm-6 col-lg-4 px-3">
                  <div
                    className="card shadow-sm h-100"
                    style={{
                      border: "0.3px solid #dee2e6",
                      boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                      minHeight: "300px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between"
                    }}
                  >

                    <div className="card-body d-flex flex-column justify-content-between">
                      <p className="text-secondary fst-italic mb-0">
                        “{testimonial.message.split(" ").slice(0, 30).join(" ")}
                        {testimonial.message.split(" ").length > 30 ? "..." : ""}”
                      </p>
                      {testimonial.message.split(" ").length > 30 && (
                        <a
                          className="fw-semibold p-0 mt-auto text-start"
                          onClick={() => openModal(testimonial)}
                          style={{ cursor: "pointer" }}
                        >
                          Read More
                        </a>
                      )}
                    </div>
                    <div className="card-footer bg-white border-0 d-flex align-items-center pt-3 pb-3">
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
                      <img
                        src={
                          testimonial.image
                            ? `http://localhost:5000${testimonial.image}`
<<<<<<< HEAD
                            : "https://via.placeholder.com/170"
                        }
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="85"
                        height="85"
                        style={{
                          width: "85px",
                          height: "85px",
                          objectFit: "cover",
                          objectPosition: "center center", // 👈 change this
                          border: "3px solid #ffffff",
                          boxShadow: "0 0 0 4px #d2e9ff",
                        }}
                      />

                      <div>
                        <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                        <small className="text-muted">
                          {testimonial.course}
                        </small>
                      </div>
=======
                            : "https://via.placeholder.com/55"
                        }
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="75"
                        height="75"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center top",
                          border: "3px solid #ffffff",
                          boxShadow: "0 0 0 4px #0d6efd",
                        }}
                      />
                      <div>
                        <h6
                          className="mb-0"
                          style={{
                            fontSize: "clamp(14px, 2vw, 18px)",   
                            fontWeight: 600,                      
                            textTransform: "capitalize",       
                            color: "#0d6efd",                     
                            fontFamily: "Poppins, sans-serif"     
                          }}
                        >
                          {testimonial.name}
                        </h6>
                        <small
                          className="text-muted"
                          style={{
                            fontSize: "clamp(12px, 1.5vw, 14px)",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            color: "#6c757d",                     
                            fontFamily: "Poppins, sans-serif"
                          }}
                        >
                          {testimonial.course}
                        </small>
                      </div>

>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
                    </div>
                  </div>
                </div>
              ))}
<<<<<<< HEAD
            </Carousel>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
=======
            </div>

            {visibleCount < filteredTestimonials.length && (
              <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={loadMore}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1040,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeInBg 0.2s ease-in-out",
          }}
        >
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
          <div
            className="modal-content card shadow"
            onClick={(e) => e.stopPropagation()}
            style={{
<<<<<<< HEAD
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
=======
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
              width: "90%",
              maxWidth: "600px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
<<<<<<< HEAD
=======
              position: "relative",
              transform: "translateY(0)",  // ✅ Ensures no top jump
              animation: "fadeInModal 0.25s ease-in-out",
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
            }}
          >
            <div className="row align-items-center w-100 mb-3">
              <div className="col-10 d-flex align-items-center">
                <img
                  src={
                    selected.image
                      ? `http://localhost:5000${selected.image}`
                      : "https://via.placeholder.com/55"
                  }
                  alt={selected.name}
                  className="rounded-circle me-3"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    objectPosition: "center",
                    border: "3px solid #fff",
                    boxShadow: "0 0 0 4px #b6d9ff",
                  }}
                />
                <div>
                  <h5 className="mb-0">{selected.name}</h5>
                  <small className="text-muted">{selected.course}</small>
                </div>
              </div>
              <div className="col-2 text-end">
                <a
                  onClick={closeModal}
                  className="fw-semibold text-decoration-none"
                  role="button"
                  style={{ cursor: "pointer" }}
                >
                  Close
                </a>
              </div>
            </div>
            <p className="mb-0">{selected.message}</p>
          </div>
        </div>
      )}
<<<<<<< HEAD
=======

>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
    </section>
  );
}

<<<<<<< HEAD
export default Testimonialpage;
=======
export default TestimonialDetailspage;
>>>>>>> 7453090f9c5f566d6f69ef17f9461d2243a08ac7
