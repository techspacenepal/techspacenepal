// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

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
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
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
//               {testimonials.map((testimonial, idx) => (
//                 <div className="col-12 px-3" key={testimonial._id || idx}>
//                   <div className="card border-0 shadow" style={{ height: "300px" }}>
//                     <div className="card-body d-flex flex-column justify-content-between pb-0">
//                       <p className="text-secondary fst-italic mb-3">
//                         “
//                         {testimonial.message.split(" ").slice(0, 45).join(" ")}
//                         {testimonial.message.split(" ").length > 45 ? "..." : ""}
//                         ”
//                       </p>
//                       {testimonial.message.split(" ").length > 45 && (
//                         <a
//                           className="fw-semibold p-0 mt-auto text-start"
//                           onClick={() => openModal(testimonial)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           Read More
//                         </a>
//                       )}
//                     </div>

//                     <div className="card-footer bg-white border-0 d-flex align-items-center pt-3 pb-3 mt-auto">
//                       <img
//                         src={
//                           testimonial.image
//                             ? `http://localhost:5000${testimonial.image}`
//                             : "https://via.placeholder.com/55"
//                         }
//                         alt={testimonial.name}
//                         className="rounded-circle me-3"
//                         width="55"
//                         height="55"
//                         style={{
//                           width: "75px",
//                           height: "75px",
//                           objectFit: "cover",
//                           objectPosition: "center top",
//                           border: "3px solid #ffffff",
//                           boxShadow: "0 0 0 4px #d2e9ff",
//                         }}
//                       />
//                       <div>
//                         <h6 className="mb-0">{testimonial.name}</h6>
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
//                     boxShadow: "0 0 0 4px #b6d9ff", // light blue outer border
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
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
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
                <div className="col-12 px-3" key={testimonial._id || idx}>
                  <div className="card border-0 shadow" style={{ height: "300px" }}>
                    <div className="card-body d-flex flex-column justify-content-between pb-0">
                      <p className="text-secondary fst-italic mb-3">
                        “
                        {testimonial.message.split(" ").slice(0, 45).join(" ")}
                        {testimonial.message.split(" ").length > 45 ? "..." : ""}
                        ”
                      </p>
                      {testimonial.message.split(" ").length > 45 && (
                        <a
                          className="fw-semibold p-0 mt-auto text-start"
                          onClick={() => openModal(testimonial)}
                          style={{ cursor: "pointer" }}
                        >
                          Read More
                        </a>
                      )}
                    </div>

                    <div className="card-footer bg-white border-0 d-flex align-items-center pt-3 pb-3 mt-auto">
                      <img
                        src={
                          testimonial.image
                            ? `http://localhost:5000${testimonial.image}`
                            : "https://via.placeholder.com/55"
                        }
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="55"
                        height="55"
                        style={{
                          width: "75px",
                          height: "75px",
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
