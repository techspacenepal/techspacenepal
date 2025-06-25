
// function Testimonialpage() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const fetchTestimonials = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/testimonials");
//       setTestimonials(data);
//     } catch (error) {
//       console.error("Failed to load testimonials");
//     }
//   };

//   const openModal = (testimonial) => {
//     setSelected(testimonial);
//   };

//   const closeModal = () => {
//     setSelected(null);
//   };

//   const responsive = {
//     superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 2 },
//     desktop: { breakpoint: { max: 1200, min: 992 }, items: 2 },
//     tablet: { breakpoint: { max: 992, min: 768 }, items: 1 },
//     mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
//   };

//   return (
//     <section className="bg-light py-5">
//       <div className="container">
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
//           <div className="text-center text-md-start">
//             <h2 className="fw-bold text-primary mb-2">What Our Students Say</h2>
//             <p className="text-muted mb-2 mb-md-0">
//               Real stories from our learners across Nepal — boosting careers in IT.
//             </p>
//           </div>
//           <div className="mt-3 mt-md-0">
//             <a href="/testimonial/TestimonialDetails" className="btn btn-outline-primary fw-semibold">
//               View More
//             </a>
//           </div>
//         </div>

//         {testimonials.length === 0 ? (
//           <p className="text-center text-muted">No testimonials available yet.</p>
//         ) : (
//           <div className="row g-4">
//             <Carousel
//               responsive={responsive}
//               infinite
//               autoPlay
//               autoPlaySpeed={3000}
//               keyBoardControl
//               showDots
//               arrows={false}
//               containerClass="carousel-container px-0 pb-5 pt-3"
//               itemClass="carousel-item-padding-40-px"
//             >
//               {testimonials.slice(0, 5).map((testimonial, idx) => (
//                 <div className="col-12 px-3 py-5 border-4" key={testimonial._id || idx}>
//                   <div
//                     className="px-4 py-5 bg-white shadow rounded-4 position-relative"
//                     style={{
//                       height: "305px",
//                       minHeight: "280px",
//                       borderLeft: "5px solid #f48024",
//                         borderRight: "5px solid #f48024",
//                     }}
//                   >
//                     <div
//                       className="position-absolute d-flex justify-content-center align-items-center"
//                       style={{
//                         top: "0",
//                         left: "10%",
//                         transform: "translate(-50%, -50%)",
//                         backgroundColor: "#fff",
//                         width: "48px",
//                         height: "48px",
//                         borderRadius: "50%",
//                         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//                         // border: "5px solid #f48024"
//                       }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 448 512"
//                         width="24"
//                         height="24"
//                       >
//                         <path d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z" />
//                       </svg>
//                     </div>

//                     <p className="text-secondary mb-2 border-top" style={{ fontSize: "16px", lineHeight: "1.6" }}>
//                       {testimonial.message.split(" ").slice(0, 35).join(" ")}
//                       {testimonial.message.split(" ").length > 35 ? "..." : ""}
//                     </p>

//                     {testimonial.message.split(" ").length > 35 && (
//                       <a
//                         className="fw-semibold p-0 text-primary text-decoration-none"
//                         onClick={() => openModal(testimonial)}
//                         style={{ cursor: "pointer", fontSize: "14px" }}
//                       >
//                         Read More
//                       </a>
//                     )}

//                     <div className="d-flex align-items-center mt-2 border-bottom">
//                       <img
//                         src={
//                           testimonial.image
//                             ? `http://localhost:5000${testimonial.image}`
//                             : "https://via.placeholder.com/55"
//                         }
//                         alt={testimonial.name}
//                         className="rounded-circle me-3"
//                         style={{
//                           width: "83px",
//                           height: "83px",
//                           objectFit: "cover",
//                           objectPosition: "center top",
//                           border: "3px solid #ffffff",
//                           boxShadow: "0 0 0 3px #d2e9ff"
//                         }}
//                       />
//                       <div>
//                         <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
//                         <small className="text-muted">{testimonial.course}</small>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </Carousel>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {selected && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div
//             className="modal-content card shadow"
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               position: "fixed",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               zIndex: 1050,
//               width: "90%",
//               maxWidth: "600px",
//               padding: "20px",
//               backgroundColor: "#fff",
//               borderRadius: "10px",
//             }}
//           >
//             <div className="row align-items-center w-100 mb-3">
//               <div className="col-10 d-flex align-items-center">
//                 <img
//                   src={
//                     selected.image
//                       ? `http://localhost:5000${selected.image}`
//                       : "https://via.placeholder.com/55"
//                   }
//                   alt={selected.name}
//                   className="rounded-circle me-3"
//                   style={{
//                     width: "90px",
//                     height: "90px",
//                     objectFit: "cover",
//                     objectPosition: "center",
//                     border: "3px solid #fff",
//                     boxShadow: "0 0 0 4px #b6d9ff",
//                   }}
//                 />
//                 <div>
//                   <h5 className="mb-0">{selected.name}</h5>
//                   <small className="text-muted">{selected.course}</small>
//                 </div>
//               </div>
//               <div className="col-2 text-end">
//                 <a
//                   onClick={closeModal}
//                   className="fw-semibold text-decoration-none"
//                   role="button"
//                   style={{ cursor: "pointer" }}
//                 >
//                   Close
//                 </a>
//               </div>
//             </div>
//             <p className="mb-0">{selected.message}</p>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Testimonialpage;
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Testimonialpage() {
  const [testimonials, setTestimonials] = useState([]);
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

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 2 },
    desktop: { breakpoint: { max: 1200, min: 992 }, items: 2 },
    tablet: { breakpoint: { max: 992, min: 768 }, items: 1 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  return (
    <section className="bg-light py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center text-md-start">
            <h2 className="fw-bold text-primary mb-2">What Our Students Say</h2>
            <p className="text-muted mb-2 mb-md-0">
              Real stories from our learners across Nepal — boosting careers in IT.
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <a href="/testimonial/TestimonialDetails" className="btn btn-outline-primary fw-semibold">
              View More
            </a>
          </div>
        </div>

        {testimonials.length === 0 ? (
          <p className="text-center text-muted">No testimonials available yet.</p>
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

                    <p className="text-secondary mb-2 border-top" style={{ fontSize: "16px", lineHeight: "1.6" }}>
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
                      <img
                        src={
                          testimonial.image
                            ? `http://localhost:5000${testimonial.image}`
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
                        <small className="text-muted">{testimonial.course}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content card shadow"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              width: "90%",
              maxWidth: "600px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
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

export default Testimonialpage;
