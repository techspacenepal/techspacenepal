// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'animate.css';

// const slides = [
//   {
//     id: 1,
//     title: 'IT Freelance Computer Institute',
//     desc: 'Professional IT Training',
//     className: 'one',
//     src: 'https://images.stockcake.com/public/c/6/4/c64f43d3-4da3-4f9c-80d4-fc1a1e6cfb15_large/laptop-coding-session-stockcake.jpg',
//   },
//   {
//     id: 2,
//     title: 'Next Generation IT Courses',
//     desc: 'Learn from Industry Experts',
//     className: 'two',
//     src: 'https://broadwayinfosys.com/uploads/slider/174825108562053.jpg',
//   },
// ];

// const videoSlide = {
//   title: 'Learn With Us',
//   desc: 'Watch our professional training video',
//   src: '/uploads/65a7d6af-3100-4815-970f-7d307905ffc6.mp4',
// };

// export default function HomeSlider() {
//   const videoRef = useRef(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [animationTrigger, setAnimationTrigger] = useState(true);


//   useEffect(() => {
//     if (isVideoPlaying) return; // Do not auto-advance if video is playing

//     const interval = setInterval(() => {
//       goToNextSlide();
//     }, 7000); // 7 seconds

//     return () => clearInterval(interval); // Cleanup
//   }, [currentSlide, isVideoPlaying]);

//   const handleVideoEnded = () => {
//     setIsVideoPlaying(false);
//     setCurrentSlide(0);
//   };

//   const goToNextSlide = () => {
//     if (isVideoPlaying) return;
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//     triggerAnimation();
//   };

//   const goToPrevSlide = () => {
//     if (isVideoPlaying) return;
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     triggerAnimation();
//   };

//   const triggerAnimation = () => {
//     setAnimationTrigger(false);
//     setTimeout(() => setAnimationTrigger(true), 10);
//   };

//   return (

//     <>


//       <section className="main-slider-area position-relative">
//         <div className={`slider-blur-left ${animationTrigger ? 'blur-animate' : ''}`}></div>
//         <div className={`slider-blur-right ${animationTrigger ? 'blur-animate' : ''}`}></div>

//         <div className="fullscreen-slide position-relative w-100 h-100">
//           {!isVideoPlaying ? (
//             <div
//               key={currentSlide + '-' + animationTrigger}
//               className={`w-100 h-100 position-relative animate__animated animate__fadeInDown`}
//               style={{
//                 backgroundImage: `url(${slides[currentSlide].src})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center'
//               }}
//             >
//               <div className="gradient-overlay position-absolute top-0 start-0 w-100 h-100"></div>
//               <div className="d-flex justify-content-center align-items-center h-100 text-center position-relative z-1">
//                 <div className="slider-text text-white">
//                   <h1 className="display-3 fw-bold animate__animated animate__fadeInDown animate__delay-1s">
//                     {slides[currentSlide].title}
//                   </h1>
//                   <p className="lead animate__animated animate__fadeInUp animate__delay-2s">
//                     {slides[currentSlide].desc}
//                   </p>
//                   <div className="mt-4 animate__animated animate__fadeIn animate__delay-3s">

//                     {/* Professional Button */}
//                     <a
//                       href="#"
//                       className="btn fw-semibold rounded border-0 shadow d-inline-flex align-items-center justify-center gap-2 px-3 py-2"
//                       style={{
//                         background: "linear-gradient(135deg, #007bff, #6610f2)",
//                         color: "white",
//                         transition: "all 0.3s ease",
//                         position: "relative",
//                         zIndex: 2,
//                         fontSize: "16px",
//                         whiteSpace: "nowrap",
//                       }}
//                       onMouseOver={(e) =>
//                       (e.currentTarget.style.background =
//                         "linear-gradient(135deg, #0056d2, #4b0ecc)")
//                       }
//                       onMouseOut={(e) =>
//                       (e.currentTarget.style.background =
//                         "linear-gradient(135deg, #007bff, #6610f2)")
//                       }
//                     >
//                       EXPLORE OUR COURSES
//                       <i className="bi bi-arrow-right fs-5"></i>
//                     </a>

//                   </div>
//                 </div>
//               </div>

//               <button className="slider-btn prev" onClick={goToPrevSlide}>
//                 ‹
//               </button>
//               <button className="slider-btn next" onClick={goToNextSlide}>
//                 ›
//               </button>
//             </div>
//           ) : (
//             <video
//               ref={videoRef}
//               className="w-100 h-100 object-fit-cover"
//               autoPlay
//               muted
//               onEnded={handleVideoEnded}
//             >
//               <source src={videoSlide.src} type="video/mp4" />
//             </video>
//           )}
//         </div>

//         <style jsx>{`
//     .main-slider-area {
//       position: relative;
//       overflow: hidden;
//       height: 77vh; /* ✅ Large screens = 70vh */
//       width: 100%;
//     }

//     .fullscreen-slide {
//       height: 100%;
//       position: relative;
//     }

//     .fullscreen-slide > div,
//     .fullscreen-slide > video,
//     .slider-blur-left,
//     .slider-blur-right,
//     .gradient-overlay {
//       height: 100%;
//       width: 100%;
//       object-fit: cover;
//       position: absolute;
//       top: 0;
//       left: 0;
//     }

//     .slider-text {
//       text-align: center;
//       position: relative;
//       max-width: 800px;
//       margin: 130px auto 0;
//       z-index: 1;
//     }

//     .slider-text::before,
//     .slider-text::after {
//       content: "";
//       position: absolute;
//       top: -150%;
//       width: 150%;
//       height: 350%;
//       background-color: rgba(0, 55, 130, 0.5);
//       z-index: -1;
//     }

//     .slider-text::before {
//       left: -100%;
//       animation: 3s 0.3s fadeInLeft both;
//     }

//     .slider-text::after {
//       right: -100%;
//       animation: 3s 0.3s fadeInRight both;
//     }

//     .slider-text h1 {
//       font-size: 60px;
//       color: #ffffff;
//       margin-bottom: 30px;
//       animation: 2s 0.2s fadeInUpBig both;
//     }

//     .slider-text p {
//       font-size: 16px;
//       color: #ffffff;
//       margin-bottom: 35px;
//       animation: 3s 0.3s fadeInUpBig both;
//     }

//     .slider-text .btn {
//       margin: 0 20px;
//       animation: 4s 0.4s fadeInUpBig both;
//     }

//     .slider-btn {
//       position: absolute;
//       top: 50%;
//       transform: translateY(-50%);
//       z-index: 5;
//       font-size: 26px;
//       background-color: #0664cd;
//       color: #ffffff;
//       width: 40px;
//       height: 40px;
//       line-height: 40px;
//       border: none;
//       border-radius: 4px;
//       transition: all 0.5s ease;
//     }

//     .slider-btn.prev {
//       left: 60px;
//     }

//     .slider-btn.next {
//       right: 60px;
//     }

//     .main-slider-area:hover .slider-btn.prev {
//       left: 30px;
//     }

//     .main-slider-area:hover .slider-btn.next {
//       right: 30px;
//     }

//     .slider-btn:hover {
//       background-color: #0664cd !important;
//     }

//     .gradient-overlay {
//       background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 0, 0, 0.6));
//       z-index: 2;
//       animation: gradientFade 1s ease-in-out 2s forwards;
//       opacity: 0;
//     }

//     @keyframes gradientFade {
//       to {
//         opacity: 1;
//       }
//     }

//     @keyframes fadeInUpBig {
//       0% {
//         opacity: 0;
//         transform: translate3d(0, 2000px, 0);
//       }
//       100% {
//         opacity: 1;
//         transform: translate3d(0, 0, 0);
//       }
//     }

//     @keyframes fadeInLeft {
//       0% {
//         opacity: 0;
//         transform: translate3d(-100%, 0, 0);
//       }
//       100% {
//         opacity: 1;
//         transform: none;
//       }
//     }

//     @keyframes fadeInRight {
//       0% {
//         opacity: 0;
//         transform: translate3d(100%, 0, 0);
//       }
//       100% {
//         opacity: 1;
//         transform: none;
//       }
//     }

//     /* ✅ Responsive: 50vh for small screens */
//     @media (max-width: 992px) {
//       .main-slider-area {
//         height: 50vh;
//       }
//     }

//     @media (max-width: 768px) {
//       .slider-text h1 {
//         font-size: 36px !important;
//       }
//       .slider-text p {
//         font-size: 15px !important;
//       }
//       .slider-btn {
//         width: 35px !important;
//         height: 35px !important;
//         font-size: 22px !important;
//         line-height: 35px !important;
//       }
//     }

//     @media (max-width: 480px) {
//       .slider-text h1 {
//         font-size: 28px !important;
//       }
//       .slider-text p {
//         font-size: 14px !important;
//       }
//       .slider-btn {
//         width: 30px !important;
//         height: 30px !important;
//         font-size: 18px !important;
//         line-height: 30px !important;
//       }
//          /* ✅ Responsive text and button adjustments */
//     @media (max-width: 992px) {
//       .main-slider-area {
//         height: 50vh;
//       }
//       .slider-text {
//         margin-top: 80px;
//         padding: 0 20px;
//       }
//       .slider-text h1 {
//         font-size: 36px !important;
//       }
//       .slider-text p {
//         font-size: 15px !important;
//       }
//       .slider-btn {
//         width: 35px !important;
//         height: 35px !important;
//         font-size: 22px !important;
//         line-height: 35px !important;
//       }
//       .slider-btn.prev {
//         left: 15px;
//       }
//       .slider-btn.next {
//         right: 15px;
//       }
//     }

//     @media (max-width: 480px) {
//       .slider-text {
//         margin-top: 60px;
//       }
//       .slider-text h1 {
//         font-size: 28px !important;
//       }
//       .slider-text p {
//         font-size: 14px !important;
//       }
//       .slider-btn {
//         width: 30px !important;
//         height: 30px !important;
//         font-size: 18px !important;
//         line-height: 30px !important;
//       }
//     }
//         `}</style>
//       </section>

//     </>


//   );
// }




'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const BASE_URL = 'http://localhost:5000';

interface Slide {
  _id: string;
  title: string;
  description: string;
  src: string;
  type?: string;
}

export default function HomeSlider() {
  const videoRef = useRef(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(true);

  const fetchSlides = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/slide`);
      setSlides(res.data);
    } catch (err) {
      console.error('Failed to fetch slides');
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  useEffect(() => {
    if (isVideoPlaying || slides.length === 0) return;

    const interval = setInterval(() => {
      goToNextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentSlide, isVideoPlaying, slides]);

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setCurrentSlide(0);
  };

  const goToNextSlide = () => {
    if (isVideoPlaying || slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    triggerAnimation();
  };

  const goToPrevSlide = () => {
    if (isVideoPlaying || slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setAnimationTrigger(false);
    setTimeout(() => setAnimationTrigger(true), 10);
  };

  if (slides.length === 0) return null;
  return (
  <section className="main-slider-area position-relative">
    {/* ✅ Clean full-section blur overlays */}
    <div className="blur-overlay blur-left"></div>
    <div className="blur-overlay blur-right"></div>

    <div className="fullscreen-slide position-relative w-100 h-100">
      <div
        key={currentSlide + '-' + animationTrigger}
        className="slider-inner w-100 h-100 position-relative animate__animated animate__fadeInDown"
        style={{
          backgroundImage: `url(${BASE_URL}${slides[currentSlide].src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="gradient-overlay position-absolute top-0 start-0 w-100 h-100"></div>

        <div className="d-flex justify-content-center align-items-center h-100 text-center position-relative z-2">
          <div className="slider-text text-white">
            <h1 className="display-3 fw-bold animate__animated animate__fadeInDown animate__delay-1s">
              {slides[currentSlide].title}
            </h1>
            <p className="lead animate__animated animate__fadeInUp animate__delay-2s">
              {slides[currentSlide].description}
            </p>
            <div className="mt-4 animate__animated animate__fadeIn animate__delay-3s">
              <a
                href="/courses"
                className="btn fw-semibold rounded border-0 shadow d-inline-flex align-items-center justify-center gap-2 px-3 py-2"
                style={{
                  background: "linear-gradient(135deg, #007bff, #6610f2)",
                  color: "white",
                  transition: "all 0.3s ease",
                  position: "relative",
                  zIndex: 3,
                  fontSize: "16px",
                  whiteSpace: "nowrap",
                }}
              >
                EXPLORE OUR COURSES
                <i className="bi bi-arrow-right fs-5"></i>
              </a>
            </div>
          </div>
        </div>

        <button className="slider-btn prev" onClick={goToPrevSlide}>‹</button>
        <button className="slider-btn next" onClick={goToNextSlide}>›</button>
      </div>
    </div>

    <style jsx>{`
      .main-slider-area {
        position: relative;
        overflow: hidden;
        height: 89vh;
        width: 100%;
      }

      .fullscreen-slide {
        height: 100%;
        position: relative;
      }

      .slider-inner {
        height: 100%;
        width: 100%;
        position: relative;
        object-fit: cover;
      }

      .gradient-overlay {
        background: linear-gradient(135deg, rgba(0, 123, 255, 0.1), rgba(0, 0, 0, 0.6));
        z-index: 2;
        animation: gradientFade 1s ease-in-out 2s forwards;
        opacity: 0;
      }

      .blur-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 25%;
        z-index: 1;
        pointer-events: none;
        filter: blur(80px);
        opacity: 0.9;
      }

      .blur-left {
        left: 0;
        background: radial-gradient(ellipse at left, rgba(0, 123, 255, 0.25), transparent 70%);
      }

      .blur-right {
        right: 0;
        background: radial-gradient(ellipse at right, rgba(102, 16, 242, 0.25), transparent 70%);
      }

      .slider-text {
        text-align: center;
        position: relative;
        max-width: 800px;
        margin: 130px auto 0;
        z-index: 3;
      }

      .slider-text h1 {
        font-size: 60px;
        color: #ffffff;
        margin-bottom: 30px;
        animation: 2s 0.2s fadeInUpBig both;
      }

      .slider-text p {
        font-size: 16px;
        color: #ffffff;
        margin-bottom: 35px;
        animation: 3s 0.3s fadeInUpBig both;
      }

      .slider-text .btn {
        margin: 0 20px;
        animation: 4s 0.4s fadeInUpBig both;
      }

      .slider-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        font-size: 26px;
        background-color: #0664cd;
        color: #ffffff;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border: none;
        border-radius: 4px;
        transition: all 0.5s ease;
      }

      .slider-btn.prev {
        left: 60px;
      }

      .slider-btn.next {
        right: 60px;
      }

      .main-slider-area:hover .slider-btn.prev {
        left: 30px;
      }

      .main-slider-area:hover .slider-btn.next {
        right: 30px;
      }

      .slider-btn:hover {
        background-color: #0664cd !important;
      }

      @keyframes gradientFade {
        to {
          opacity: 1;
        }
      }

      @keyframes fadeInUpBig {
        0% {
          opacity: 0;
          transform: translate3d(0, 2000px, 0);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @media (max-width: 992px) {
        .main-slider-area {
          height: 47vh;
        }

        .slider-text {
          margin-top: 80px;
          padding: 0 20px;
        }

        .slider-text h1 {
          font-size: 36px !important;
        }

        .slider-text p {
          font-size: 15px !important;
        }

        .slider-btn {
          width: 35px !important;
          height: 35px !important;
          font-size: 22px !important;
          line-height: 35px !important;
        }

        .slider-btn.prev {
          left: 15px;
        }

        .slider-btn.next {
          right: 15px;
        }
      }

      @media (max-width: 480px) {
        .slider-text {
          margin-top: 60px;
        }

        .slider-text h1 {
          font-size: 28px !important;
        }

        .slider-text p {
          font-size: 14px !important;
        }

        .slider-btn {
          width: 30px !important;
          height: 30px !important;
          font-size: 18px !important;
          line-height: 30px !important;
        }
      }
    `}</style>
  </section>
);


}




