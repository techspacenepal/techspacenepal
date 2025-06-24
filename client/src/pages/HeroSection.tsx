// import Image from 'next/image';

// export default function HeroSection() {
//   return (
//     <>
//       <section
//         className="container heroBg position-relative py-5"
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           minHeight: '581px',
//           overflow: 'hidden',
//         }}
//       >
//         <div className="row align-items-center justify-content-between flex-column-reverse flex-lg-row gap-4 gap-lg-0" style={{ position: 'relative', zIndex: 1 }}>
//           {/* Left Content */}
//           <div className="col-lg-6 mb-5 mb-lg-0">
//             <h1 className="fw-bold display-5">
//               <span className="text-primary">Tech Space</span><br />
//               Nepal since <span className="text-dark">2017</span>
//             </h1>
//             <p className="fw-semibold text-primary">
//               Top-Rated IT Learning & Software Company in Nepal
//             </p>
//             <p className="text-muted">
//               Tech Space Nepal is a leading IT training and software development company, delivering practical education and real-world IT solutions since 2017.
//             </p>

//             <a href="#" className="btn btn-primary px-4 py-2 fw-semibold rounded-pill">
//               EXPLORE OUR COURSES →
//             </a>

//             {/* ✅ Desktop Stat Cards moved here and made inline */}
//             {/* ✅ Desktop Stat Cards with same height and width */}
//             <div className="d-none d-lg-flex mt-4 gap-3">
//               {/* Certified Students */}
//               <div
//                 className="bg-white rounded-3 d-flex align-items-center border p-3"
//                 style={{ width: '230px', height: '100px' }}
//               >
//                 <i className="bi bi-people-fill fs-3 text-primary me-3"></i>
//                 <div>
//                   <div className="text-muted small">Certified Students</div>
//                   <div className="fw-bold text-primary fs-5">15K+</div>
//                 </div>
//               </div>

//               {/* Courses */}
//               <div
//                 className="bg-white rounded-3 d-flex align-items-center border p-3"
//                 style={{ width: '230px', height: '100px' }}
//               >
//                 <i className="bi bi-journal-bookmark-fill fs-3 text-success me-3"></i>
//                 <div>
//                   <div className="text-muted small">Courses</div>
//                   <div className="fw-bold text-success fs-5">152+</div>
//                 </div>
//               </div>

//               {/* Qualified Teachers */}
//               <div
//                 className="bg-white rounded-3 d-flex align-items-center border p-3"
//                 style={{ width: '230px', height: '100px' }}
//               >
//                 <i className="bi bi-person-badge-fill fs-3 text-danger me-3"></i>
//                 <div>
//                   <div className="text-muted small">Qualified Teachers</div>
//                   <div className="fw-bold text-danger fs-5">70+</div>
//                 </div>
//               </div>
//             </div>

//             {/* StatCards for Mobile (unchanged) */}
//             <div
//               className="d-flex d-lg-none mt-4 flex-row gap-3 no-scrollbar"
//               style={{
//                 overflowX: 'auto',
//                 scrollSnapType: 'x mandatory',
//                 WebkitOverflowScrolling: 'touch',
//                 paddingBottom: '6px',
//                 marginBottom: '-6px',
//               }}
//             >
//               <style>
//                 {`
//       .no-scrollbar::-webkit-scrollbar {
//         display: none;
//       }
//     `}
//               </style>

//               {/* Certified Students */}
//               <div
//                 className="bg-white rounded-3 d-flex align-items-center border"
//                 style={{
//                   minWidth: '90%',
//                   height: '100px',
//                   padding: '16px 20px',
//                   justifyContent: 'space-between',
//                   scrollSnapAlign: 'start',
//                   boxShadow: 'none',
//                 }}
//               >
//                 <i className="bi bi-people-fill fs-3 text-primary"></i>
//                 <div className="text-end">
//                   <div className="text-muted small">Certified Students</div>
//                   <div className="fw-bold text-primary fs-5">15K+</div>
//                 </div>
//               </div>

//               {/* Courses */}
//               <div
//                 className="bg-white rounded-3 d-flex align-items-center border"
//                 style={{
//                   minWidth: '90%',
//                   height: '100px',
//                   padding: '16px 20px',
//                   justifyContent: 'space-between',
//                   scrollSnapAlign: 'start',
//                   boxShadow: 'none',
//                 }}
//               >
//                 <i className="bi bi-journal-bookmark-fill fs-3 text-primary"></i>
//                 <div className="text-end">
//                   <div className="text-muted small">Courses</div>
//                   <div className="fw-bold text-primary fs-5">152+</div>
//                 </div>
//               </div>

//               {/* Qualified Teachers */}
//               <div
//                 className="bg-white rounded-3 d-flex align-items-center border"
//                 style={{
//                   minWidth: '90%',
//                   height: '100px',
//                   padding: '16px 20px',
//                   justifyContent: 'space-between',
//                   scrollSnapAlign: 'start',
//                   boxShadow: 'none',
//                 }}
//               >
//                 <i className="bi bi-person-badge-fill fs-3 text-primary"></i>
//                 <div className="text-end">
//                   <div className="text-muted small">Qualified Teachers</div>
//                   <div className="fw-bold text-primary fs-5">70+</div>
//                 </div>
//               </div>
//             </div>
//           </div>


//           {/* Right Image with new background shape */}
//           <div className="col-lg-6 position-relative d-flex justify-content-center align-items-center px-3 px-sm-4 px-md-5 mb-2 mb-lg-0">
//             {/* ✅ Clean, soft blob background */}
//             <div className="position-absolute bg-blob-shape"></div>

//             <img
//               src="https://biomedical.edu.np/media/uploads/home/slider/image/3_Com.jpg"
//               alt="Students"
//               className="img-fluid rounded-4 z-2"
//               style={{
//                 maxWidth: "520px",
//                 maxHeight: "380px",
//                 objectFit: "cover",
//                 border: "5px solid white",
//                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//               }}
//             />


//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
import Image from 'next/image';

export default function HeroSection() {
  return (
    <>
      <section
        className="container  heroBg position-relative py-5"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '581px',
          overflow: 'hidden',
        }}
      >
        <div
          className="row border align-items-center justify-content-between flex-column-reverse flex-lg-row gap-4 gap-lg-0"
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Left Content */}
          <div className="col-lg-6 mb-5 mb-lg-0 px-3 px-sm-4 px-md-5">
            <h1 className="fw-bold display-5">
              <span className="text-primary">Tech Space</span><br />
              Nepal since <span className="text-dark">2017</span>
            </h1>
            <p className="fw-semibold text-primary">
              Top-Rated IT Learning & Software Company in Nepal
            </p>
            <p className="text-muted">
              Tech Space Nepal is a leading IT training and software development company, delivering practical education and real-world IT solutions since 2017.
            </p>

            <a href="#" className="btn btn-primary px-4 py-2 fw-semibold rounded-pill">
              EXPLORE OUR COURSES →
            </a>

            {/* Desktop Stat Cards */}
            <div className="d-none d-lg-flex mt-4 gap-3">
              {/* ... same as before */}
            </div>

            {/* Mobile Stat Cards */}
            <div
              className="d-flex d-lg-none mt-4 flex-row gap-3 no-scrollbar"
              style={{
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: '6px',
                marginBottom: '-6px',
              }}
            >
              <style>
                {`
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .no-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                `}
              </style>
              {/* ... same as before */}
            </div>
          </div>

          {/* Right Image with background shape only on desktop */}
          <div className="col-lg-6 position-relative d-flex justify-content-center align-items-center px-3 px-sm-4 px-md-5 mb-2 mb-lg-0">
            <div className="position-absolute d-none d-lg-block bg-blob-shape"></div>

            {/* Image with responsive style */}
            <img
              src="https://biomedical.edu.np/media/uploads/home/slider/image/3_Com.jpg"
              alt="Students"
              className="img-fluid rounded-4 z-2"
              style={{
                maxWidth: "520px",
                maxHeight: "380px",
                objectFit: "cover",
                border: "5px solid white",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                width: "100%",
                // Remove box-shadow on mobile/tablet using media query
              }}
            />

            <style jsx>{`
              @media (max-width: 991.98px) {
                img {
                  box-shadow: none !important;
                  max-width: 100% !important;
                  max-height: none !important;
                }
              }
            `}</style>
          </div>
        </div>
      </section>
    </>
  );
}
