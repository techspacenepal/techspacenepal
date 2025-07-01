// import Image from 'next/image';

// export default function HeroSection() {
//   return (
//     <>
//       <section
//         className="container border heroBg position-relative py-5"
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '581px',
//           overflow: 'hidden',
//         }}
//       >
//         {/* ✅ Inner wrapper for equal padding on both sides */}
//         <div className="w-100 px-0 px-lg-0">
//           <div
//             className="row align-items-center justify-content-between flex-column-reverse flex-lg-row gap-4 gap-lg-0"
//             style={{ position: 'relative', zIndex: 1 }}
//           >
//             {/* Left Content */}
//             <div className="col-lg-6 mb-5 mb-lg-0">
//               <h1 className="fw-bold display-5">
//                 <span className="text-primary">Tech Space</span><br />
//                 Nepal since <span className="text-dark">2017</span>
//               </h1>
//               <p className="fw-semibold text-primary">
//                 Top-Rated IT Learning & Software Company in Nepal
//               </p>
//               <p className="text-muted">
//                 Tech Space Nepal is a leading IT training and software development company, delivering practical education and real-world IT solutions since 2017.
//               </p>

//               <a href="#" className="btn btn-primary px-4 py-2 fw-semibold rounded-pill">
//                 EXPLORE OUR COURSES →
//               </a>

//               {/* ✅ Desktop Stat Cards */}
//               <div className="d-none d-lg-flex mt-4 gap-3">
//                 {/* Certified Students */}
//                 <div
//                   className="bg-white rounded-3 d-flex align-items-center border p-3"
//                   style={{ width: '230px', height: '100px' }}
//                 >
//                   <i className="bi bi-people-fill fs-3 text-primary me-3"></i>
//                   <div>
//                     <div className="text-muted small">Certified Students</div>
//                     <div className="fw-bold text-primary fs-5">15K+</div>
//                   </div>
//                 </div>

//                 {/* Courses */}
//                 <div
//                   className="bg-white rounded-3 d-flex align-items-center border p-3"
//                   style={{ width: '230px', height: '100px' }}
//                 >
//                   <i className="bi bi-journal-bookmark-fill fs-3 text-success me-3"></i>
//                   <div>
//                     <div className="text-muted small">Courses</div>
//                     <div className="fw-bold text-success fs-5">152+</div>
//                   </div>
//                 </div>

//                 {/* Qualified Teachers */}
//                 <div
//                   className="bg-white rounded-3 d-flex align-items-center border p-3"
//                   style={{ width: '230px', height: '100px' }}
//                 >
//                   <i className="bi bi-person-badge-fill fs-3 text-danger me-3"></i>
//                   <div>
//                     <div className="text-muted small">Qualified Teachers</div>
//                     <div className="fw-bold text-danger fs-5">70+</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Image */}
//             <div className="col-lg-6 position-relative d-flex justify-content-center align-items-center mb-2 mb-lg-0">
//               <div className="position-absolute d-none d-lg-block bg-blob-shape"></div>

//               <img
//                 src="https://biomedical.edu.np/media/uploads/home/slider/image/3_Com.jpg"
//                 alt="Students"
//                 className="img-fluid rounded-4 z-2"
//                 style={{
//                   maxWidth: "520px",
//                   maxHeight: "380px",
//                   objectFit: "cover",
//                   border: "5px solid white",
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//                   width: "100%",
//                 }}
//               />

//               <style jsx>{`
//           @media (max-width: 991.98px) {
//             img {
//               box-shadow: none !important;
//               max-width: 100% !important;
//               max-height: none !important;
//             }
//           }
//         `}</style>
//             </div>
//           </div>
//         </div>
//       </section>



//     </>
//   );
// }



// import { useEffect, useRef } from 'react';

// export default function HeroSection() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     let animationFrameId;
//     let particles = [];
//     const particleCount = 11; // only 11 shapes

//     function resize() {
//       canvas.width = canvas.parentElement.clientWidth;
//       canvas.height = canvas.parentElement.clientHeight;
//     }

//     // Hexagon shape drawing function
//     function drawHexagon(x, y, radius, fillStyle, alpha) {
//       const sides = 6;
//       ctx.beginPath();
//       for (let i = 0; i < sides; i++) {
//         const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
//         const px = x + radius * Math.cos(angle);
//         const py = y + radius * Math.sin(angle);
//         if (i === 0) ctx.moveTo(px, py);
//         else ctx.lineTo(px, py);
//       }
//       ctx.closePath();
//       ctx.fillStyle = `rgba(${fillStyle}, ${alpha})`;
//       ctx.fill();
//     }

//     class Particle {
//       constructor() {
//         this.reset();
//       }
//       reset() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.radius = 8 + Math.random() * 6; // hex radius between 8-14
//         this.speedX = (Math.random() - 0.5) * 0.15; // slow speed
//         this.speedY = (Math.random() - 0.5) * 0.15;
//         this.alpha = 0.2 + Math.random() * 0.4;
//         this.color = '33, 150, 243'; // blueish color
//       }
//       update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.x < -this.radius) this.x = canvas.width + this.radius;
//         else if (this.x > canvas.width + this.radius) this.x = -this.radius;
//         if (this.y < -this.radius) this.y = canvas.height + this.radius;
//         else if (this.y > canvas.height + this.radius) this.y = -this.radius;
//       }
//       draw() {
//         drawHexagon(this.x, this.y, this.radius, this.color, this.alpha);
//       }
//     }

//     function initParticles() {
//       particles = [];
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle());
//       }
//     }

//     function animate() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((p) => {
//         p.update();
//         p.draw();
//       });
//       animationFrameId = requestAnimationFrame(animate);
//     }

//     resize();
//     initParticles();
//     animate();

//     window.addEventListener('resize', resize);

//     return () => {
//       window.removeEventListener('resize', resize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <>
//       <section
//         className="container border heroBg position-relative py-5"
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '581px',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Particle Canvas */}
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             pointerEvents: 'none',
//             zIndex: 0,
//             borderRadius: '12px',
//           }}
//         />

//         {/* Content wrapper */}
//         <div className="w-100 px-0 px-lg-0" style={{ position: 'relative', zIndex: 1 }}>
//           <div
//             className="row align-items-center justify-content-between flex-column-reverse flex-lg-row gap-4 gap-lg-0"
//             style={{ position: 'relative', zIndex: 1 }}
//           >
//             {/* Left Content */}
//             <div className="col-lg-6 mb-5 mb-lg-0">
//               <div className="d-flex align-items-center mb-3">
//                 <h1 className="fw-bold display-6 m-0" style={{ letterSpacing: '0.5px' }}>
//                   <span className="text-primary">Tech Space</span> <br />
//                   <span className="text-dark">Nepal since 2025</span>
//                 </h1>
//               </div>

//               <p className="fw-semibold text-primary fs-5">
//                 Top-Rated IT Learning & Software Company in Nepal
//               </p>
//               <p className="text-muted">
//                 Tech Space Nepal is a leading IT training and software development company,
//                 delivering practical education and real-world IT solutions since 2025.
//               </p>

//               {/* Professional Button */}
//               <a
//                 href="#"
//                 className="btn fw-semibold rounded border-0 shadow d-inline-flex align-items-center justify-center gap-2 px-3 py-2"
//                 style={{
//                   background: 'linear-gradient(135deg, #007bff, #6610f2)',
//                   color: 'white',
//                   transition: 'all 0.3s ease',
//                   position: 'relative',
//                   zIndex: 2,
//                   fontSize: '16px',
//                   whiteSpace: 'nowrap',
//                 }}
//                 onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0056d2, #4b0ecc)'}
//                 onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #007bff, #6610f2)'}
//               >
//                 EXPLORE OUR COURSES
//                 <i className="bi bi-arrow-right fs-5"></i>
//               </a>

//               {/* Stat Cards - Unchanged */}
//               <div className="d-none d-lg-flex mt-4 gap-3" style={{ position: 'relative', zIndex: 2 }}>
//                 <div className="bg-white rounded-3 d-flex align-items-center border p-3" style={{ width: '230px', height: '100px' }}>
//                   <i className="bi bi-people-fill fs-3 text-primary me-3"></i>
//                   <div>
//                     <div className="text-muted small">Certified Students</div>
//                     <div className="fw-bold text-primary fs-5">15K+</div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-3 d-flex align-items-center border p-3" style={{ width: '230px', height: '100px' }}>
//                   <i className="bi bi-journal-bookmark-fill fs-3 text-success me-3"></i>
//                   <div>
//                     <div className="text-muted small">Courses</div>
//                     <div className="fw-bold text-success fs-5">152+</div>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-3 d-flex align-items-center border p-3" style={{ width: '230px', height: '100px' }}>
//                   <i className="bi bi-person-badge-fill fs-3 text-danger me-3"></i>
//                   <div>
//                     <div className="text-muted small">Qualified Teachers</div>
//                     <div className="fw-bold text-danger fs-5">70+</div>
//                   </div>
//                 </div>
//               </div>
//             </div>


//             {/* Right Image */}
//             <div
//               className="col-lg-6 position-relative d-flex justify-content-center align-items-center mb-2 mb-lg-0"
//               style={{ paddingRight: '0px', position: 'relative', zIndex: 2 }}
//             >
//               <div className="position-absolute d-none d-lg-block bg-blob-shape"></div>

//               <img
//                 src="https://biomedical.edu.np/media/uploads/home/slider/image/3_Com.jpg"
//                 alt="Students"
//                 className="img-fluid rounded-4 z-2"
//                 style={{
//                   maxWidth: '520px',
//                   maxHeight: '380px',
//                   objectFit: 'cover',
//                   border: '5px solid white',
//                   boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
//                   width: '100%',
//                   position: 'relative',
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }




"use client";
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      const scale = window.devicePixelRatio || 1;
      canvas.width = canvas.parentElement.clientWidth * scale;
      canvas.height = canvas.parentElement.clientHeight * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    const colors = [
      '0,123,255',     // Blue
      '255,193,7',     // Amber
      '220,53,69',     // Red
      '40,167,69',     // Green
      '255,0,128',     // Magenta
      '102,16,242',    // Purple
      '23,162,184'     // Teal
    ];

    const stars = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 8 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alphaBase: 0.3 + Math.random() * 0.4,
      alphaRange: 0.2,
      offset: Math.random() * Math.PI * 2,
    }));

    function drawStar(x, y, outerRadius, fillStyle, alpha) {
      const spikes = 5;
      const innerRadius = outerRadius / 2;
      const step = Math.PI / spikes;

      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.moveTo(0, -outerRadius);

      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const a = i * step - Math.PI / 2;
        ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
      }

      ctx.closePath();
      ctx.fillStyle = `rgba(${fillStyle}, ${alpha})`;
      ctx.shadowColor = `rgba(${fillStyle}, ${alpha * 0.6})`;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    }

    let t = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;

        if (s.x < -s.radius) s.x = canvas.width + s.radius;
        if (s.x > canvas.width + s.radius) s.x = -s.radius;
        if (s.y < -s.radius) s.y = canvas.height + s.radius;
        if (s.y > canvas.height + s.radius) s.y = -s.radius;

        const alpha = s.alphaBase + Math.sin(t + s.offset) * s.alphaRange;
        drawStar(s.x, s.y, s.radius, s.color, alpha);
      });
      t += 0.01;
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);



  return (
    <>
      <section
        className="container border heroBg position-relative py-5"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '581px',
          overflow: 'hidden',
        }}
      >
        {/* Particle Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Content wrapper */}
        <div className="w-100 px-0 px-lg-0" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="row align-items-center justify-content-between flex-column-reverse flex-lg-row gap-4 gap-lg-0"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Left Content */}
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <h1 className="fw-bold display-6 m-0" style={{ letterSpacing: '0.5px' }}>
                  <span className="text-primary">Tech Space</span> <br />
                  <span className="text-dark">Nepal since 2025</span>
                </h1>
              </div>

              <p className="fw-semibold text-primary fs-5">
                Top-Rated IT Learning & Software Company in Nepal
              </p>
              <p className="text-muted">
                Tech Space Nepal is a leading IT training and software development company,
                delivering practical education and real-world IT solutions since 2025.
              </p>

              {/* Professional Button */}
              <a
                href="#"
                className="btn fw-semibold rounded border-0 shadow d-inline-flex align-items-center justify-center gap-2 px-3 py-2"
                style={{
                  background: 'linear-gradient(135deg, #007bff, #6610f2)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2,
                  fontSize: '16px',
                  whiteSpace: 'nowrap',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0056d2, #4b0ecc)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #007bff, #6610f2)'}
              >
                EXPLORE OUR COURSES
                <i className="bi bi-arrow-right fs-5"></i>
              </a>

              {/* Stat Cards - Unchanged */}
              <div className="d-none d-lg-flex mt-4 gap-3" style={{ position: 'relative', zIndex: 2 }}>
                <div className="bg-white rounded-3 d-flex align-items-center border p-3" style={{ width: '230px', height: '100px' }}>
                  <i className="bi bi-people-fill fs-3 text-primary me-3"></i>
                  <div>
                    <div className="text-muted small">Certified Students</div>
                    <div className="fw-bold text-primary fs-5">15K+</div>
                  </div>
                </div>
                <div className="bg-white rounded-3 d-flex align-items-center border p-3" style={{ width: '230px', height: '100px' }}>
                  <i className="bi bi-journal-bookmark-fill fs-3 text-success me-3"></i>
                  <div>
                    <div className="text-muted small">Courses</div>
                    <div className="fw-bold text-success fs-5">152+</div>
                  </div>
                </div>
                <div className="bg-white rounded-3 d-flex align-items-center border p-3" style={{ width: '230px', height: '100px' }}>
                  <i className="bi bi-person-badge-fill fs-3 text-danger me-3"></i>
                  <div>
                    <div className="text-muted small">Qualified Teachers</div>
                    <div className="fw-bold text-danger fs-5">70+</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div
              className="col-lg-6 position-relative d-flex justify-content-center align-items-center mb-2 mb-lg-0"
              style={{
                padding: '0 15px', // ✅ Responsive equal padding on both sides
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div className="position-absolute d-none d-lg-block bg-blob-shape"></div>

              <img
                src="https://biomedical.edu.np/media/uploads/home/slider/image/3_Com.jpg"
                alt="Students"
                className="img-fluid rounded-4 z-2"
                style={{
                  maxWidth: '520px',
                  maxHeight: '380px',
                  objectFit: 'cover',
                  border: '5px solid white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  width: '100%',
                  position: 'relative',
                }}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
