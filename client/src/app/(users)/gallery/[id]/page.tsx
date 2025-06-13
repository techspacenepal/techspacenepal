// // 'use client';

// // import React, { useEffect, useState } from "react";

// // interface GalleryItem {
// //   _id: string;
// //   student: string;
// //   college: string;
// //   address: string;
// //   imageUrl: string;
// //   position?: string;
// //   company?: string;
// //   faculty?: string;
// // }

// // export default function SuccessDetailPage() {
// //   const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
// //   const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedCollege, setSelectedCollege] = useState("");
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [visibleCount, setVisibleCount] = useState(6); // Start by showing 6 cards

// //   useEffect(() => {
// //     fetch("http://localhost:5000/api/gallery")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setGalleryData(data);
// //         setFilteredData(data);
// //       })
// //       .catch(console.error);
// //   }, []);

// //   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const term = e.target.value.toLowerCase();
// //     setSearchTerm(term);
// //     setSelectedCollege("");
// //     const result = galleryData.filter((item) =>
// //       item.student.toLowerCase().includes(term)
// //     );
// //     setFilteredData(result);
// //     setVisibleCount(6);
// //   };

// //   const handleFilterClick = () => {
// //     setShowFilters(!showFilters);
// //   };

// //   const handleCollegeSelect = (college: string) => {
// //     setSelectedCollege(college);
// //     setSearchTerm("");
// //     const result = galleryData.filter(
// //       (item) => item.college.toLowerCase() === college.toLowerCase()
// //     );
// //     setFilteredData(result);
// //     setVisibleCount(6);
// //   };

// //   const handleLoadMore = () => {
// //     setVisibleCount((prev) => prev + 6);
// //   };

// //   const colleges = [...new Set(galleryData.map((item) => item.college))];

// //   const visibleData = filteredData.slice(0, visibleCount);

// //   return (
// //     <div className="container py-5">
// //       <h2 className="mb-4 text-center">Student Success Details</h2>



// //       {showFilters && (
// //         <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
// //           {colleges.map((college) => (
// //             <button
// //               key={college}
// //               onClick={() => handleCollegeSelect(college)}
// //               className={`btn btn-sm rounded-pill border ${selectedCollege === college ? "btn-primary text-white" : "btn-light"
// //                 }`}
// //             >
// //               {college}
// //             </button>
// //           ))}
// //         </div>
// //       )}

// //       {visibleData.length === 0 ? (
// //         <p className="text-muted text-center mt-5">No results found.</p>
// //       ) : (
// //         <div className="row">
// //           {visibleData.map((item, index) => (
// //             <div key={item._id} className="col-md-3 p-2">
// //               {/* Show search and filter only in the first card */}
// //               {index === 0 && (
// //                 <div className="mb-3">
// //                   <input
// //                     type="text"
// //                     placeholder="Search student..."
// //                     value={searchTerm}
// //                     onChange={handleSearch}
// //                     className="form-control mb-2"
// //                   />
// //                   <button
// //                     onClick={handleFilterClick}
// //                     className="btn btn-primary w-100"
// //                   >
// //                     {showFilters ? "Hide Filter" : "Filter by College"}
// //                   </button>
// //                 </div>
// //               )}

// //               <div
// //                 className="card h-100 text-center p-3"
// //                 style={{
// //                   border: "0.3px solid #dee2e6",
// //                   boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
// //                 }}
// //               >
// //                 <img
// //                   src={`http://localhost:5000${item.imageUrl}`}
// //                   alt={item.student}
// //                   className="rounded mx-auto mb-3"
// //                   style={{
// //                     width: "100px",
// //                     height: "100px",
// //                     objectFit: "cover",
// //                     border: "3px solid #ccc",
// //                   }}
// //                 />
// //                 <div className="card-body mt-2">
// //                   <h5 className="fw-bold mb-0">Mr. {item.student}</h5>
// //                   <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
// //                     {item.position}
// //                   </p>
// //                   <a
// //                     href="#"
// //                     className="d-block mb-2"
// //                     style={{
// //                       fontSize: "14px",
// //                       textDecoration: "none",
// //                       color: "#0d6efd",
// //                     }}
// //                   >
// //                     @{item.company}
// //                   </a>
// //                   <h6 className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
// //                     College/Faculty
// //                   </h6>
// //                   <p className="text-muted small mb-0">{item.college}</p>
// //                   <p className="text-muted small">{item.faculty}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //       )}

// //       {visibleCount < filteredData.length && (
// //         <div className="text-center mt-4">
// //           <button className="btn btn-outline-primary" onClick={handleLoadMore}>
// //             Load More
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// 'use client';

// import React, { useEffect, useState } from "react";

// interface GalleryItem {
//   _id: string;
//   student: string;
//   college: string;
//   address: string;
//   imageUrl: string;
//   position?: string;
//   company?: string;
//   faculty?: string;
// }

// export default function SuccessDetailPage() {
//   const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
//   const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(6); // Start by showing 6 cards

//   useEffect(() => {
//     fetch("http://localhost:5000/api/gallery")
//       .then((res) => res.json())
//       .then((data) => {
//         setGalleryData(data);
//         setFilteredData(data);
//       })
//       .catch(console.error);
//   }, []);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     setSelectedCollege("");
//     const result = galleryData.filter((item) =>
//       item.student.toLowerCase().includes(term)
//     );
//     setFilteredData(result);
//     setVisibleCount(6);
//   };

//   const handleFilterClick = () => {
//     setShowFilters(!showFilters);
//   };

//   const handleCollegeSelect = (college: string) => {
//     setSelectedCollege(college);
//     setSearchTerm("");
//     const result = galleryData.filter(
//       (item) => item.college.toLowerCase() === college.toLowerCase()
//     );
//     setFilteredData(result);
//     setVisibleCount(6);
//   };

//   const handleLoadMore = () => {
//     setVisibleCount((prev) => prev + 6);
//   };

//   const colleges = [...new Set(galleryData.map((item) => item.college))];

//   const visibleData = filteredData.slice(0, visibleCount);

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">Student Success Details</h2>

//       {visibleData.length === 0 ? (
//         <p className="text-muted text-center mt-5">No results found.</p>
//       ) : (
//         <div className="row">
//           {/* Left sidebar: search input + filter */}
//           <div className="col-12 col-md-3 mb-3 p-2">
//             <input
//               type="text"
//               placeholder="Search student..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="form-control mb-2"
//             />
//             <button
//               onClick={handleFilterClick}
//               className="btn btn-primary w-100 mb-3"
//             >
//               {showFilters ? "Hide Filter" : "Filter by College"}
//             </button>

//             {/* Show filter checkboxes when toggled */}
//             {showFilters && (
//               <div className="d-flex flex-column gap-2">
//                 {colleges.map((college) => (
//                   <div key={college} className="d-flex align-items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedCollege === college}
//                       onChange={() => {
//                         if (selectedCollege === college) {
//                           handleCollegeSelect("");
//                         } else {
//                           handleCollegeSelect(college);
//                         }
//                       }}
//                       style={{ cursor: "pointer" }}
//                     />
//                     <span>{college}</span>
//                   </div>
//                 ))}
//               </div>


//             )}
//           </div>


//           {/* Right content: student cards */}
//           <div className="col-12 col-md-9">
//             <div className="row">
//               {visibleData.map((item) => (
//                 <div key={item._id} className="col-md-6 col-lg-4 p-2">
//                   <div
//                     className="card h-100 text-center p-3"
//                     style={{
//                       border: "0.3px solid #dee2e6",
//                       boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
//                     }}
//                   >
//                     <img
//                       src={`http://localhost:5000${item.imageUrl}`}
//                       alt={item.student}
//                       className="rounded mx-auto mb-3"
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         objectFit: "cover",
//                         border: "3px solid #ccc",
//                       }}
//                     />
//                     <div className="card-body mt-2">
//                       <h5 className="fw-bold mb-0">Mr. {item.student}</h5>
//                       <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
//                         {item.position}
//                       </p>
//                       <a
//                         href="#"
//                         className="d-block mb-2"
//                         style={{
//                           fontSize: "14px",
//                           textDecoration: "none",
//                           color: "#0d6efd",
//                         }}
//                       >
//                         @{item.company}
//                       </a>
//                       <h6 className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
//                         College/Faculty
//                       </h6>
//                       <p className="text-muted small mb-0">{item.college}</p>
//                       <p className="text-muted small">{item.faculty}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       )}

//       {visibleCount < filteredData.length && (
//         <div className="text-center mt-4">
//           <button className="btn btn-outline-primary" onClick={handleLoadMore}>
//             Load More
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import React, { useEffect, useState } from "react";

interface GalleryItem {
  _id: string;
  student: string;
  college: string;
  imageUrl: string;
  position?: string;
  company?: string;
  faculty?: string;
  designation: string;
}

export default function SuccessDetailPage() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setGalleryData(data);
        setFilteredData(data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setSelectedColleges([]); // Reset filter when searching
    const result = galleryData.filter((item) =>
      item.student.toLowerCase().includes(term)
    );
    setFilteredData(result);
    setVisibleCount(6);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleCheckboxToggle = (college: string) => {
    let updatedSelection: string[];
    if (selectedColleges.includes(college)) {
      updatedSelection = selectedColleges.filter((c) => c !== college);
    } else {
      updatedSelection = [...selectedColleges, college];
    }
    setSelectedColleges(updatedSelection);
    setSearchTerm(""); // Clear search when using filters

    const result =
      updatedSelection.length === 0
        ? galleryData
        : galleryData.filter((item) =>
          updatedSelection.includes(item.college)
        );
    setFilteredData(result);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const colleges = [...new Set(galleryData.map((item) => item.college))];
  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Student Success Details</h2>

      {visibleData.length === 0 ? (
        <p className="text-muted text-center mt-5">No results found.</p>
      ) : (
        <div className="row">
          {/* Left sidebar */}
          <div className="col-12 col-md-3 mb-3 p-2">
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={handleSearch}
              className="form-control mb-2"
            />
            <button
              onClick={handleFilterClick}
              className="btn btn-primary w-100 mb-3"
            >
              {showFilters ? "Hide Filter" : "Filter by College"}
            </button>

            {/* Filter checkboxes */}
            {showFilters && (
              <div className="d-flex flex-column gap-2">
                {colleges.map((college) => (
                  <div
                    key={college}
                    className="d-flex align-items-center gap-2 p-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColleges.includes(college)}
                      onChange={() => handleCheckboxToggle(college)}
                      style={{ cursor: "pointer" }}
                    />
                    <span>{college}</span>
                  </div>

                ))}
              </div>
            )}
          </div>

          {/* Student cards */}
          <div className="col-12 col-md-9">
            <div className="row">
              {visibleData.map((item) => (
                <div key={item._id} className="col-md-6 col-lg-4 p-2">
                  <div
                    className="card h-100 text-center px-3"
                    style={{
                      border: "0.3px solid #dee2e6",
                      boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                      paddingTop: "2rem",
                    }}
                  >
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.student}
                      className="rounded mx-auto"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        border: "3px solid #ccc",

                      }}
                    />

                    <div
                      className="card-body d-flex flex-column align-items-center justify-content-center text-center"
                      style={{ paddingBottom: "2rem" }}
                    >
                      <h5 className="fw-bold mb-1 text-dark">Mr. {item.student}</h5>

                      <p
                        className="text-muted mb-1"
                        style={{ fontSize: "14px", lineHeight: "1.4" }}
                      >
                        {item.designation}
                      </p>

                      <a
                        href="#"
                        className="d-inline-block mb-2"
                        style={{
                          fontSize: "14px",
                          color: "#0d6efd",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        @{item.company}
                      </a>

                      <h6
                        className="fw-semibold text-secondary mb-1 mt-2"
                        style={{ fontSize: "14px" }}
                      >
                        College / Faculty
                      </h6>

                      <p className="text-muted small mb-0" style={{ fontSize: "13px" }}>
                        {item.college}
                      </p>

                      <p className="text-muted small mb-0" style={{ fontSize: "13px" }}>
                        {item.faculty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {visibleCount < filteredData.length && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
