"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

function TestimonialDetailspage() {
    const [testimonials, setTestimonials] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [selected, setSelected] = useState(null);

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

    const openModal = (testimonial) => {
        setSelected(testimonial);
    };

    const closeModal = () => {
        setSelected(null);
    };

    const loadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    const visibleTestimonials = testimonials.slice(0, visibleCount);

    return (
        <section className="bg-light py-5">
            <div className="container">
                {/* Centered heading */}
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary mb-2">What Our Students Say</h2>
                    <p className="text-muted mb-0">
                        Real stories from our learners across Nepal — boosting careers in IT.
                    </p>
                </div>

                {testimonials.length === 0 ? (
                    <p className="text-center text-muted">No testimonials available yet.</p>
                ) : (
                    <>
                        <div className="row g-4">
                            {visibleTestimonials.map((testimonial, idx) => (
                                <div
                                    key={testimonial._id || idx}
                                    className="col-12 col-sm-6 col-lg-4 px-3"
                                >
                                    <div
                                        className="card border-0 shadow"
                                        style={{ height: "300px" }}
                                    >
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <p className="text-secondary fst-italic mb-0">
                                                “
                                                {testimonial.message.split(" ").slice(0, 35).join(" ")}
                                                {testimonial.message.split(" ").length > 35 ? "..." : ""}
                                                ”
                                            </p>
                                            {testimonial.message.split(" ").length > 35 && (
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
                                                    border: "3px solid #ffffff",
                                                    boxShadow: "0 0 0 4px #d2e9ff",
                                                }}
                                            />
                                            <div>
                                                <h6 className="mb-0">{testimonial.name}</h6>
                                                <small className="text-muted">{testimonial.course}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Load More Button */}
                        {visibleCount < testimonials.length && (
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={loadMore}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal */}
            {selected && (
                <div className="modal-overlay" onClick={closeModal} style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1040,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div
                        className="modal-content card shadow"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "90%",
                            maxWidth: "600px",
                            padding: "20px",
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            position: "relative",
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
        </section>
    );
}

export default TestimonialDetailspage;
