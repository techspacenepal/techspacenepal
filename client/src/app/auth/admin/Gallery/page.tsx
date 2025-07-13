
"use client";

import React, { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface GalleryItem {
  _id: string;
  student: string;
  college: string;
  faculty: string;
  company: string;
  designation: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const router = useRouter();
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const studentRef = useRef<HTMLInputElement>(null);
  const collegeRef = useRef<HTMLInputElement>(null);
  const facultyRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const designationRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  // const formRef = useRef(null);
  const formRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        refresh();
        setPageLoading(false);
      }
    }, 1000);
  }, []);

  const refresh = () => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGalleryData(data);
          setFilteredData(data);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch gallery data.");
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setSelectedCollege("");
    setFilteredData(
      galleryData.filter((i) => i.student.toLowerCase().includes(term))
    );
  };

  const handleCollegeSelect = (col: string) => {
    setSelectedCollege(col);
    setSearchTerm("");
    setFilteredData(
      galleryData.filter((i) => i.college.toLowerCase() === col.toLowerCase())
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !studentRef.current?.value ||
      !collegeRef.current?.value ||
      !facultyRef.current?.value ||
      !companyRef.current?.value ||
      !designationRef.current?.value ||
      (!editingId && !imageRef.current?.files?.[0])
    ) {
      toast.warning("Please fill all fields.");
      return;
    }

    const fd = new FormData();
    fd.append("student", studentRef.current.value);
    fd.append("college", collegeRef.current.value);
    fd.append("faculty", facultyRef.current.value);
    fd.append("company", companyRef.current.value);
    fd.append("designation", designationRef.current.value);
    if (imageRef.current?.files?.[0]) {
      fd.append("image", imageRef.current.files[0]);
    }

    const url = editingId
      ? `http://localhost:5000/api/gallery/${editingId}`
      : "http://localhost:5000/api/gallery";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, { method, body: fd });
    if (res.ok) {
      toast.success(editingId ? "Updated successfully!" : "Uploaded successfully!");
      clearForm();
      setEditingId(null);
      refresh();
    } else {
      toast.error("Operation failed.");
    }
  };

  const handleEdit = (i: GalleryItem) => {
    studentRef.current!.value = i.student;
    collegeRef.current!.value = i.college;
    facultyRef.current!.value = i.faculty;
    companyRef.current!.value = i.company;
    designationRef.current!.value = i.designation;
    setEditingId(i._id);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted successfully!");
      refresh();
    } else {
      toast.error("Delete failed.");
    }
  };

  const clearForm = () => {
    studentRef.current!.value = "";
    collegeRef.current!.value = "";
    facultyRef.current!.value = "";
    companyRef.current!.value = "";
    designationRef.current!.value = "";
    if (imageRef.current) imageRef.current.value = "";
  };

  const colleges = Array.from(new Set(galleryData.map((i) => i.college)));

  if (pageLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="multi-spinner"></div>
        <style jsx>{`
          .multi-spinner {
            width: 4rem;
            height: 4rem;
            border: 8px solid transparent;
            border-top: 8px solid red;
            border-right: 8px solid blue;
            border-bottom: 8px solid green;
            border-left: 8px solid orange;
            border-radius: 50%;
            animation: spin 1.2s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="mx-auto" style={{ maxWidth: 960 }}>
        <h2 className="text-center mb-4">📸 Student Gallery</h2>
        {/* Form */}
        <div ref={formRef}>
          <form onSubmit={handleSubmit} className="row g-3 mb-5">
            <div className="col-md-6">
              <input ref={studentRef} placeholder="Student Name" className="form-control" required />
            </div>
            <div className="col-md-6">
              <input ref={collegeRef} placeholder="College" className="form-control" required />
            </div>
            <div className="col-md-6">
              <input ref={facultyRef} placeholder="Faculty" className="form-control" required />
            </div>
            <div className="col-md-6">
              <input ref={companyRef} placeholder="Company" className="form-control" required />
            </div>
            <div className="col-md-6">
              <input ref={designationRef} placeholder="Designation" className="form-control" required />
            </div>
            <div className="col-md-6">
              <input type="file" ref={imageRef} accept="image/*" className="form-control" />
            </div>
            <div className="col-12">
              <button className="btn btn-success w-100">{editingId ? "Update" : "Upload"}</button>
            </div>
          </form>
        </div>

        {/* Search and Filter */}
        <div className="row g-3 mb-4">
          <div className="col-sm">
            <input value={searchTerm} onChange={handleSearch} placeholder="Search student..." className="form-control" />
          </div>
          <div className="col-sm-auto">
            <button
              className="btn btn-primary w-100"
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              {showFilters ? "Hide Filter" : "Filter by College"}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
            {colleges.map((c) => (
              <button
                key={c}
                onClick={() => handleCollegeSelect(c)}
                className={`btn btn-sm ${selectedCollege === c ? "btn-primary text-white" : "btn-light"}`}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Cards */}
        {filteredData.length === 0 ? (
          <p className="text-center text-muted">No results found.</p>
        ) : (
          <div className="row g-4">
            {filteredData.map((i) => (
              <div key={i._id} className="col-sm-6 col-md-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:5000${i.imageUrl}`}
                    alt={i.student}
                    style={{ height: 200, objectFit: "cover" }}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{i.student}</h5>
                    <p className="text-muted mb-1">{i.college}</p>
                    <p className="small">Faculty: {i.faculty}</p>
                    <p className="small">Company: {i.company}</p>
                    <p className="small text-secondary">Designation: {i.designation}</p>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(i)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(i._id)}>Delete</button>
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
