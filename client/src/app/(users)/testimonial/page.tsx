"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Testimonial {
  _id: string;
  name: string;
  course: string;
  message: string;
  image: string;
}

function TestimonialDetailspage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ NEW

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/testimonials");
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to load testimonials");
    }
  };

  const openModal = (testimonial: Testimonial) => setSelected(testimonial);
  const closeModal = () => setSelected(null);
  const loadMore = () => setVisibleCount((prev) => prev + 6);

  // ✅ Filter testimonials by search term
  const filteredTestimonials = testimonials.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleTestimonials = filteredTestimonials.slice(0, visibleCount);

  return (
    <section className="bg-light py-5">
      <div className="container">

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
                      <img
                        src={
                          testimonial.image
                            ? `http://localhost:5000${testimonial.image}`
                            : "https://via.placeholder.com/55"
                        }
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="75"
                        height="75"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center top",
                          border: "3.3px solid #ffffff",
                          boxShadow: "0 0 0 4px #28C76F",
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

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredTestimonials.length && (
              <div className="text-center mt-4">
                <button className="btn d-inline-flex align-items-center" onClick={loadMore}
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
                  }}>
                  Load More
                  <i className="bi bi-arrow-down" style={{ fontSize: '18px' }}></i>

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
                  border: "3.5px solid #fff",
                  boxShadow: "0 0 0 4px #28C76F",
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
}

export default TestimonialDetailspage;
