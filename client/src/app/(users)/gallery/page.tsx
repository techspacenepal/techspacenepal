"use client";

import React, { useEffect, useState, useRef } from "react";

interface GalleryItem {
  _id: string;
  student: string;
  college: string;
  address: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  const studentRef = useRef<HTMLInputElement>(null);
  const collegeRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  // Fetch data on load
  useEffect(() => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGalleryData(data);
          setFilteredData(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch(console.error);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setSelectedCollege("");
    const result = galleryData.filter((item) =>
      item.student.toLowerCase().includes(term)
    );
    setFilteredData(result);
  };

  const handleFilterClick = () => {
    setShowFilters(!showFilters);
  };

  const handleCollegeSelect = (college: string) => {
    setSelectedCollege(college);
    setSearchTerm("");
    const result = galleryData.filter(
      (item) => item.college.toLowerCase() === college.toLowerCase()
    );
    setFilteredData(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !studentRef.current?.value ||
      !collegeRef.current?.value ||
      !addressRef.current?.value ||
      !imageRef.current?.files?.[0]
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("student", studentRef.current.value);
    formData.append("college", collegeRef.current.value);
    formData.append("address", addressRef.current.value);
    formData.append("image", imageRef.current.files[0]);

    try {
      const res = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newItem: GalleryItem = await res.json();
        const updated = [newItem, ...galleryData];
        setGalleryData(updated);
        setFilteredData(updated);
        studentRef.current.value = "";
        collegeRef.current.value = "";
        addressRef.current.value = "";
        imageRef.current.value = "";
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const colleges = [...new Set(galleryData.map((item) => item.college))];

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <h2 className="mb-4 text-center">📸 Student Gallery</h2>

       
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
            <button onClick={handleFilterClick} className="btn btn-primary w-100">
              {showFilters ? "Hide Filter" : "Filter by College"}
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
              <div key={item._id} className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={`http://localhost:5000${item.imageUrl}`}
                    alt={item.student}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.student}</h5>
                    <p className="card-text mb-1 text-muted">{item.college}</p>
                    <p className="card-text small text-secondary">{item.address}</p>
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
