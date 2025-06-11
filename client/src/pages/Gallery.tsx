"use client";

import React, { useEffect, useState } from "react";

// ✅ Data outside component
const galleryData = [
  {
    id: 1,
    college: "Trinity",
    student: "Ram Bahadur",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDOQqJX71A4Ns9GgXAxe7ifzj6rTI0APDug&s",
  },
  {
    id: 2,
    college: "NIST",
    student: "Sita KC",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDOQqJX71A4Ns9GgXAxe7ifzj6rTI0APDug&s",
  },
  {
    id: 3,
    college: "Trinity",
    student: "Hari Adhikari",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDOQqJX71A4Ns9GgXAxe7ifzj6rTI0APDug&s",
  },
  {
    id: 4,
    college: "NCC",
    student: "Gita Sharma",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCDOQqJX71A4Ns9GgXAxe7ifzj6rTI0APDug&s",
  },
];

export default function Gallery() {
  const [filteredData, setFilteredData] = useState(galleryData);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  const colleges = [...new Set(galleryData.map((item) => item.college))];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    setSelectedCollege(""); // clear college filter on new search
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleCollegeSelect = (college: string) => {
    setSelectedCollege(college);
    setSearchTerm(""); // clear search filter on new college selection
  };

  useEffect(() => {
    let result = galleryData;

    if (selectedCollege) {
      result = result.filter((item) =>
        item.college.toLowerCase().includes(selectedCollege.toLowerCase())
      );
    } else if (searchTerm) {
      result = result.filter((item) =>
        item.student.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredData(result);
  }, [searchTerm, selectedCollege]);

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <h1 className="fs-3 fw-bold mb-4 text-center text-primary">Gallery</h1>

        <div className="row g-3 align-items-stretch mb-4">
          <div className="col-12 col-sm">
            <input
              type="text"
              placeholder="Search student..."
              value={searchTerm}
              onChange={handleSearch}
              className="form-control"
            />
          </div>
          <div className="col-12 col-sm-auto">
            <button
              onClick={handleFilterClick}
              className="btn btn-primary w-100"
            >
              {showFilters ? "Hide Filter" : "Filter"}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
            {colleges.map((college) => (
              <button
                key={college}
                onClick={() => handleCollegeSelect(college)}
                className={`btn btn-sm rounded-pill border ${
                  selectedCollege === college
                    ? "btn-primary text-white"
                    : "btn-light"
                }`}
              >
                {college}
              </button>
            ))}
          </div>
        )}

        {filteredData.length === 0 ? (
          <p className="text-muted text-center mt-5">No results found.</p>
        ) : (
          <div className="row g-4">
            {filteredData.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={item.image}
                    alt={item.student}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.student}</h5>
                    <p className="card-text text-muted">{item.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
