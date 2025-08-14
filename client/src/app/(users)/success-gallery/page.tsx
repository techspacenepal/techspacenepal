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
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]); // NEW
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
    setSelectedColleges([]);
    setSelectedRoles([]);

    const result = galleryData.filter(
      (item) =>
        item.student.toLowerCase().includes(term) ||
        item.designation.toLowerCase().includes(term)
    );

    setFilteredData(result);
    setVisibleCount(6);
  };


  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleCollegeToggle = (college: string) => {
    let updatedColleges: string[];
    if (selectedColleges.includes(college)) {
      updatedColleges = selectedColleges.filter((c) => c !== college);
    } else {
      updatedColleges = [...selectedColleges, college];
    }
    setSelectedColleges(updatedColleges);
    filterData(updatedColleges, selectedRoles);
  };

  const handleRoleToggle = (role: string) => {
    let updatedRoles: string[];
    if (selectedRoles.includes(role)) {
      updatedRoles = selectedRoles.filter((r) => r !== role);
    } else {
      updatedRoles = [...selectedRoles, role];
    }
    setSelectedRoles(updatedRoles);
    filterData(selectedColleges, updatedRoles);
  };

  const filterData = (colleges: string[], roles: string[]) => {
    let result = galleryData;
    if (colleges.length > 0) {
      result = result.filter((item) => colleges.includes(item.college));
    }
    if (roles.length > 0) {
      result = result.filter((item) => roles.includes(item.designation));
    }
    setFilteredData(result);
    setVisibleCount(6);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const colleges = [...new Set(galleryData.map((item) => item.college))];
  const roles = [...new Set(galleryData.map((item) => item.designation))];
  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <>






      <div className="container py-5">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <button
            onClick={handleFilterClick}
            className="" style={{
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
            {showFilters ? "Hide" : "Filter"}
          </button>



          <h2 className="text-center">Success Gallery</h2>
        </div>


        <div className="row">
          {/* Left Sidebar */}
          <div className="col-12 col-md-3 mb-3 p-2">
            <div className="border-top py-3 pb-1">
              <div className="position-relative">
                <input
                  type="text"
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control mb-2 pe-5"
                  style={{ paddingLeft: "15px" }}
                />
                {searchTerm ? (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilteredData(galleryData);
                    }}
                    className="btn position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
                    style={{ padding: "0 10px", cursor: "pointer" }}
                  >
                    <i
                      className="bi bi-x-circle-fill"
                      style={{ fontSize: "18px", color: "#888" }}
                    ></i>
                  </button>
                ) : (
                  <span
                    className="position-absolute end-0 top-50 translate-middle-y"
                    style={{ padding: "0 10px" }}
                  >
                    <i
                      className="bi bi-search"
                      style={{ fontSize: "18px", color: "#888" }}
                    ></i>
                  </span>
                )}
              </div>
            </div>

            {showFilters && (
              <>
                <div className="border-top border-bottom py-3">
                  <h6 className="fw-bold mb-0">Filter by College</h6>
                  <div
                    className="d-flex flex-column mt-3"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      gap: "4px",
                    }}
                  >
                    {colleges.map((college) => (
                      <div
                        key={college}
                        className="d-flex align-items-center gap-2"
                        style={{ padding: "4px 2px" }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedColleges.includes(college)}
                          onChange={() => handleCollegeToggle(college)}
                          style={{ cursor: "pointer" }}
                        />
                        <span>{college}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-top border-bottom py-3">
                  <h6 className="fw-bold mb-0">Role Hired In</h6>
                  <div
                    className="d-flex flex-column mt-3"
                    style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      gap: "4px",
                    }}
                  >
                    {roles.map((role) => (
                      <div
                        key={role}
                        className="d-flex align-items-center gap-2"
                        style={{ padding: "4px 2px" }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role)}
                          onChange={() => handleRoleToggle(role)}
                          style={{ cursor: "pointer" }}
                        />
                        <span>{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Content */}
          <div className="col-12 col-md-9">
            {visibleData.length === 0 ? (
              <p className="text-muted text-center mt-5 fw-bold">No Data Found!</p>
            ) : (
              <div className="row">
                {visibleData.map((item) => (
                  <div key={item._id} className="col-md-6 col-lg-4 p-2">
                    {/* 🔹 Your existing card code untouched */}
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
                            border: "5px solid #00BCD4",
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
                              border: "1px solid #fff",
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
                          style={{ textTransform: "uppercase" }}
                        >
                          Mr. {item.student}
                        </h6>
                        <p
                          className="text-muted mb-1"
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.4",
                            textTransform: "capitalize",
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
                            textTransform: "uppercase",
                          }}
                        >
                          @{item.company}
                        </a>
                        <h6
                          className="fw-semibold text-secondary mb-1 mt-2"
                          style={{
                            fontSize: "14px",
                            textTransform: "uppercase",
                          }}
                        >
                          College / Faculty
                        </h6>
                        <p
                          className="text-muted small mb-0"
                          style={{
                            fontSize: "13px",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.college}
                        </p>
                        <p
                          className="text-muted small mb-0"
                          style={{
                            fontSize: "13px",
                            textTransform: "capitalize",
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
          </div>
        </div>

        {visibleCount < filteredData.length && (
          <div className="text-center mt-4">
            <button className="btn d-inline-flex align-items-center" onClick={handleLoadMore}
              style={{
                backgroundColor: '#0057d8',
                color: '#ffffff',
                fontWeight: '500',
                padding: '12px 17px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                textDecoration: 'none',
                gap: '8px'
              }}
            >
              Load More
              <i className="bi bi-arrow-down" style={{ fontSize: '18px' }}></i>

            </button>
          </div>
        )}
      </div>

    </>
  );
}
