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
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

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
    setSelectedColleges([]);
    setSelectedRoles([]);
    const result = galleryData.filter((item) =>
      item.student.toLowerCase().includes(term)
    );
    setFilteredData(result);
    setVisibleCount(6);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleCollegeToggle = (college: string) => {
    const updatedColleges = selectedColleges.includes(college)
      ? selectedColleges.filter((c) => c !== college)
      : [...selectedColleges, college];
    setSelectedColleges(updatedColleges);
    setSearchTerm("");
    applyFilters(updatedColleges, selectedRoles);
  };

  const handleRoleToggle = (role: string) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setSelectedRoles(updatedRoles);
    setSearchTerm("");
    applyFilters(selectedColleges, updatedRoles);
  };

  const applyFilters = (colleges: string[], roles: string[]) => {
    let result = galleryData;

    if (colleges.length > 0) {
      result = result.filter((item) => colleges.includes(item.college));
    }

    if (roles.length > 0) {
      result = result.filter((item) => roles.includes(item.designation?.trim()));
    }

    setFilteredData(result);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const colleges = [...new Set(galleryData.map((item) => item.college))];
  const roles = [...new Set(galleryData.map((item) => item.designation?.trim()))];
  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <>
      <div className="container py-5">

        <div className="row align-items-center gy-3 pb-3">
          <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-start">
            <button
              onClick={handleFilterClick}
              className="btn custom-filter-btn d-inline-flex align-items-center gap-2"
              style={{
                backgroundColor: '#0057d8',
                color: '#ffffff',
                fontWeight: '500',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                whiteSpace: 'nowrap',
              }}
            >
              <i className="bi bi-filter"></i>
              <strong>Filter</strong>
            </button>
          </div>

          {/* Heading */}
          <div className="col-12 col-lg-4 d-flex justify-content-center">
            <h2 className="m-0 text-center">Student Success Details</h2>
          </div>

          {/* Search input */}
          <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end">
            <div className="position-relative w-100" style={{ maxWidth: '100%', minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Search student..."
                value={searchTerm}
                onChange={handleSearch}
                className="form-control pe-5 w-100"
              />

              {!searchTerm && (
                <i
                  className="bi bi-search position-absolute"
                  style={{
                    top: "50%",
                    right: "1rem",
                    transform: "translateY(-50%)",
                    color: "#aaa",
                    pointerEvents: "none",
                  }}
                ></i>
              )}

              {searchTerm && (
                <button
                  onClick={() => handleSearch({ target: { value: "" } } as any)}
                  className="btn btn-sm position-absolute"
                  style={{
                    top: "50%",
                    right: "0.5rem",
                    transform: "translateY(-50%)",
                    padding: "0",
                    background: "transparent",
                    border: "none",
                    color: "#888",
                    fontSize: "1.2rem",
                  }}
                  aria-label="Clear search"
                >
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>


        <div className="row gap-2 mb-4">
          <div className={`transition-panel ${showFilters ? "show" : "hide"}`}>
            <div className="d-flex align-items-start gap-3 flex-wrap">
              {/* Shared wrapper ensures both filter boxes match height */}
              {[{ label: "College", list: colleges, selected: selectedColleges, toggle: handleCollegeToggle },
              { label: "Role", list: roles, selected: selectedRoles, toggle: handleRoleToggle }].map(
                (filter, index) => (
                  <div
                    key={index}
                    className="p-4 flex-grow-1"
                    style={{
                      height: "250px",                  // ✅ Fixed identical height
                      overflowY: "auto",                // ✅ Scroll if overflow
                      border: "1px solid #dee2e6",
                      borderRadius: "8px",
                      minWidth: "220px",                // ✅ Responsive on all screens
                      flexBasis: "48%",                 // ✅ Sits side-by-side on large screens
                    }}
                  >
                    <h6 className="fw-bold">Filter by {filter.label}</h6>
                    <div className="d-flex flex-column gap-2">
                      {filter.list.map((item: string) => (
                        <div key={item} className="d-flex align-items-center gap-2 p-2">
                          <input
                            type="checkbox"
                            checked={filter.selected.includes(item)}
                            onChange={() => filter.toggle(item)}
                            style={{ cursor: "pointer" }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>


        {visibleData.length === 0 ? (
          <p className="text-muted text-center mt-5">No results found.</p>
        ) : (
          <div className="row">
            {visibleData.map((item) => (
              <div key={item._id} className="col-12 col-md-6 col-lg-3 p-2">
                <div
                  className="card h-100 text-center px-3"
                  style={{
                    border: "0.3px solid #dee2e6",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                    paddingTop: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        border: "5px solid #00BCD4", // outer cyan/blue border
                        borderRadius: "50%",
                        padding: "3px",
                      }}
                    >
                      <img
                        src={`http://localhost:5000${item.imageUrl}`}
                        alt={item.student}
                        className="rounded-circle mx-auto shadow"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          border: "1px solid #fff", // inner white border
                          backgroundColor: "#fff",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className="card-body d-flex flex-column align-items-center justify-content-center text-center"
                    style={{ paddingBottom: "2rem" }}
                  >
                    <h6
                      className="fw-bold mb-1 text-dark"
                      style={{ textTransform: "uppercase" }} // NAME in uppercase
                    >
                      Mr. {item.student}
                    </h6>

                    <p
                      className="text-muted mb-1"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.4",
                        textTransform: "capitalize", // Designation capitalized
                      }}
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
                        textTransform: "uppercase", // @company in uppercase
                      }}
                    >
                      @{item.company}
                    </a>

                    <h6
                      className="fw-semibold text-secondary mb-1 mt-2"
                      style={{
                        fontSize: "14px",
                        textTransform: "uppercase", // Heading in uppercase
                      }}
                    >
                      College / Faculty
                    </h6>

                    <p
                      className="text-muted small mb-0"
                      style={{
                        fontSize: "13px",
                        textTransform: "capitalize", // College name capitalized
                      }}
                    >
                      {item.college}
                    </p>

                    <p
                      className="text-muted small mb-0"
                      style={{
                        fontSize: "13px",
                        textTransform: "capitalize", // Faculty name capitalized
                      }}
                    >
                      {item.faculty}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

        {filteredData.length > 16 && visibleCount < filteredData.length && (
          <div className="text-center mt-4">
            <button className="btn btn-outline-primary d-inline-flex align-items-center" onClick={handleLoadMore}
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
              }}

            >
              Load More<i className="bi bi-arrow-down" style={{ fontSize: '18px' }}></i>
            </button>
          </div>
        )}


      </div >
    </>
  );
}


