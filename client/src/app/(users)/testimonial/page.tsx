// import React from "react";

// const testimonials = [
//   {
//     name: "Anisha Sharma",
//     course: "Full Stack Development",
//     message:
//       "The practical approach at this institute helped me land a job in Kathmandu's tech sector!",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg",
//     link: "#"
//   },
//   {
//     name: "Bikash Gurung",
//     course: "Python & Django",
//     message:
//       "Great mentors and real-world projects. I feel confident starting my freelance career.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg",
//     link: "#"
//   },
//   {
//     name: "Sneha K.C.",
//     course: "UI/UX Design",
//     message:
//       "The best decision I made. Now working with an international company remotely from Pokhara.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg",
//     link: "#"
//   }
// ];

// function Testimonialpage() {
//   return (
//     <section className="bg-light py-5">
//       <div className="container">
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           What Our Students Say
//         </h2>
//         <p className="text-center text-muted mb-5">
//           Real stories from our learners across Nepal — boosting careers in IT.
//         </p>

//         <div className="row g-4">
//           {testimonials.map((testimonial, idx) => (
//             <div className="col-12 col-md-6 col-lg-4" key={idx}>
//               <div className="card h-100 border-0 shadow-lg">
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <p className="text-secondary fst-italic mb-4">
//                     “{testimonial.message}”
//                   </p>
//                   <a href={testimonial.link} className="text-decoration-none text-danger fw-semibold mt-auto">
//                     Read More 
//                   </a>
//                 </div>
//                 <div className="card-footer bg-white border-0 d-flex align-items-center">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="rounded-circle me-3"
//                     width="55"
//                     height="55"
//                   />
//                   <div>
//                     <h6 className="mb-0">{testimonial.name}</h6>
//                     <small className="text-muted">{testimonial.course}</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Testimonialpage;
// import React, { useState } from "react";

// const testimonials = [
//   {
//     name: "Anisha Sharma",
//     course: "Full Stack Development",
//     message:
//       "The practical approach at this institute helped me land a job in Kathmandu's tech sector!",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg",
//     video: "/videos/Screen Recording 2025-06-12 180536.mp4"
//   },
//   {
//     name: "Bikash Gurung",
//     course: "Python & Django",
//     message:
//       "Great mentors and real-world projects. I feel confident starting my freelance career.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg",
//     video: "/videos/Screen Recording 2025-06-12 180536.mp4"
//   },
//   {
//     name: "Sneha K.C.",
//     course: "UI/UX Design",
//     message:
//       "The best decision I made. Now working with an international company remotely from Pokhara.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg",
//     video: "/videos/Screen Recording 2025-06-12 180536.mp4"
//   }
// ];

// function Testimonialpage() {
//   const [selected, setSelected] = useState(null);

//   const openModal = (testimonial) => {
//     setSelected(testimonial);
//   };

//   const closeModal = () => {
//     setSelected(null);
//   };

//   return (
//     <section className="bg-light py-5">
//       <div className="container">
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           What Our Students Say
//         </h2>
//         <p className="text-center text-muted mb-5">
//           Real stories from our learners across Nepal — boosting careers in IT.
//         </p>

//         <div className="row g-4">
//           {testimonials.map((testimonial, idx) => (
//             <div className="col-12 col-md-6 col-lg-4" key={idx}>
//               <div className="card h-100 border-0 shadow-lg">
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <p className="text-secondary fst-italic mb-4">
//                     “{testimonial.message}”
//                   </p>
//                   <button
//                     className="btn btn-link text-danger fw-semibold p-0 mt-auto"
//                     onClick={() => openModal(testimonial)}
//                   >
//                     Read More
//                   </button>
//                 </div>
//                 <div className="card-footer bg-white border-0 d-flex align-items-center">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="rounded-circle me-3"
//                     width="55"
//                     height="55"
//                   />
//                   <div>
//                     <h6 className="mb-0">{testimonial.name}</h6>
//                     <small className="text-muted">{testimonial.course}</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {selected && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div
//             className="modal-content card shadow"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="d-flex align-items-center mb-3">
//               <img
//                 src={selected.image}
//                 alt={selected.name}
//                 className="rounded-circle me-3"
//                 width="55"
//                 height="55"
//               />
//               <div>
//                 <h5 className="mb-0">{selected.name}</h5>
//                 <small className="text-muted">{selected.course}</small>
//               </div>
//             </div>
//             <p className="mb-3">{selected.message}</p>
//             <video
//               controls
//               width="100%"
//               className="rounded"
//               style={{ maxHeight: "300px", objectFit: "cover" }}
//             >
//               <source src={selected.video} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <button
//               onClick={closeModal}
//               className="btn btn-outline-secondary mt-3"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Testimonialpage;










// import React, { useState } from "react";

// const testimonials = [
//   {
//     name: "Anisha Sharma",
//     course: "Full Stack Development",
//     message:
//       "The practical approach at this institute helped me land a job in Kathmandu's tech sector!",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg"
//   },
//   {
//     name: "Bikash Gurung",
//     course: "Python & Django",
//     message:
//       "Great mentors and real-world projects. I feel confident starting my freelance career.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg"
//   },
//   {
//     name: "Sneha K.C.",
//     course: "UI/UX Design",
//     message:
//       "The best decision I made. Now working with an international company remotely from Pokhara.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg"
//   },
//   {
//     name: "Sneha K.C.",
//     course: "UI/UX Design",
//     message:
//       "The best decision I made. Now working with an international company remotely from Pokhara.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg"
//   }, {
//     name: "Sneha K.C.",
//     course: "UI/UX Design",
//     message:
//       "The best decision I made. Now working with an international company remotely from Pokhara.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg"
//   },
//   {
//     name: "Sneha K.C.",
//     course: "UI/UX Design",
//     message:
//       "The best decision I made. Now working with an international company remotely from Pokhara.",
//     image: "https://broadwayinfosys.com/uploads/testimonials/1749707975.jpg"
//   }
// ];

// function Testimonialpage() {
//   const [selected, setSelected] = useState(null);

//   const openModal = (testimonial) => {
//     setSelected(testimonial);
//   };

//   const closeModal = () => {
//     setSelected(null);
//   };

//   return (
//     <section className="bg-light py-5">
//       <div className="container">
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           What Our Students Say
//         </h2>
//         <p className="text-center text-muted mb-5">
//           Real stories from our learners across Nepal — boosting careers in IT.
//         </p>

//         <div className="row g-4">
//           {testimonials.map((testimonial, idx) => (
//             <div className="col-12 col-md-6 col-lg-4" key={idx}>
//               <div className="card h-100 border-0 shadow-lg">
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <p className="text-secondary fst-italic mb-4">
//                     “{testimonial.message}”
//                   </p>
//                   <a
//                     className="fw-semibold p-0 mt-auto text-start"
//                     onClick={() => openModal(testimonial)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     Read More
//                   </a>
//                 </div>
//                 <div className="card-footer bg-white border-0 d-flex align-items-center">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="rounded-circle me-3"
//                     width="55"
//                     height="55"
//                   />
//                   <div>
//                     <h6 className="mb-0">{testimonial.name}</h6>
//                     <small className="text-muted">{testimonial.course}</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {selected && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div
//             className="modal-content card shadow"
//             onClick={(e) => e.stopPropagation()}
//           >


//             <div className="row align-items-center w-100">
//               <div className="col-10 d-flex align-items-center">
//                 <img
//                   src={`http://localhost:5000${testimonial.image}`}
//                   alt={testimonial.name}
//                   className="rounded-circle me-3"
//                   width="55"
//                   height="55"
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
//                   style={{ cursor: 'pointer' }}
//                 >
//                   Close
//                 </a>

//               </div>
//             </div>



//             <p className="mb-3">{selected.message}</p>

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

  return (
    <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-primary">
          What Our Students Say
        </h2>
        <p className="text-center text-muted mb-5">
          Real stories from our learners across Nepal — boosting careers in IT.
        </p>

        <div className="row g-4">
          {testimonials.length === 0 && (
            <p className="text-center text-muted">No testimonials available yet.</p>
          )}
          {testimonials.map((testimonial, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={testimonial._id || idx}>
              <div className="card h-100 border-0 shadow-lg" style={{ height: "350px" }}>
                <div className="card-body d-flex flex-column justify-content-between">
                  <p className="text-secondary fst-italic mb-4">
                    “{testimonial.message.split(" ").slice(0, 45).join(" ")}{testimonial.message.split(" ").length > 65 ? "..." : ""}”
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
                <div className="card-footer bg-white border-0 d-flex align-items-center">
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
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content card shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="row align-items-center w-100">
              <div className="col-10 d-flex align-items-center">
                <img
                  src={
                    selected.image
                      ? `http://localhost:5000${selected.image}`
                      : "https://via.placeholder.com/55"
                  }
                  alt={selected.name}
                  className="rounded-circle me-3"
                  width="55"
                  height="55"
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
            <p className="mb-3">{selected.message}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonialpage;
