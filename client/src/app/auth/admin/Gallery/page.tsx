// "use client";

// import React, { useEffect, useState, useRef } from "react";

// interface GalleryItem {
//   _id: string;
//   student: string;
//   college: string;
//   address: string;
//   imageUrl: string;
// }

// export default function GalleryPage() {
//   const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
//   const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCollege, setSelectedCollege] = useState("");

//   const studentRef = useRef<HTMLInputElement>(null);
//   const collegeRef = useRef<HTMLInputElement>(null);
//   const addressRef = useRef<HTMLInputElement>(null);
//   const imageRef = useRef<HTMLInputElement>(null);

//   // Fetch data on load
//   useEffect(() => {
//     fetch("http://localhost:5000/api/gallery")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setGalleryData(data);
//           setFilteredData(data);
//         } else {
//           console.error("Unexpected response format:", data);
//         }
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
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (
//       !studentRef.current?.value ||
//       !collegeRef.current?.value ||
//       !addressRef.current?.value ||
//       !imageRef.current?.files?.[0]
//     ) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("student", studentRef.current.value);
//     formData.append("college", collegeRef.current.value);
//     formData.append("address", addressRef.current.value);
//     formData.append("image", imageRef.current.files[0]);

//     try {
//       const res = await fetch("http://localhost:5000/api/gallery", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         const newItem: GalleryItem = await res.json();
//         const updated = [newItem, ...galleryData];
//         setGalleryData(updated);
//         setFilteredData(updated);
//         studentRef.current.value = "";
//         collegeRef.current.value = "";
//         addressRef.current.value = "";
//         imageRef.current.value = "";
//       } else {
//         console.error("Upload failed");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const colleges = [...new Set(galleryData.map((item) => item.college))];

//   return (
//     <div className="container py-5">
//       <div className="mx-auto" style={{ maxWidth: "960px" }}>
//         <h2 className="mb-4 text-center">📸 Student Gallery</h2>

//         <form onSubmit={handleSubmit} className="row g-3 mb-5">
//           <div className="col-md-6">
//             <input
//               type="text"
//               ref={studentRef}
//               placeholder="Student Name"
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="text"
//               ref={collegeRef}
//               placeholder="College"
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="text"
//               ref={addressRef}
//               placeholder="Address"
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="file"
//               ref={imageRef}
//               accept="image/*"
//               className="form-control"
//               required
//             />
//           </div>
//           <div className="col-12">
//             <button type="submit" className="btn btn-success w-100">
//               Upload
//             </button>
//           </div>
//         </form>

//         <div className="row g-3 align-items-stretch mb-4">
//           <div className="col-12 col-sm">
//             <input
//               type="text"
//               placeholder="Search student..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="form-control"
//             />
//           </div>
//           <div className="col-12 col-sm-auto">
//             <button onClick={handleFilterClick} className="btn btn-primary w-100">
//               {showFilters ? "Hide Filter" : "Filter by College"}
//             </button>
//           </div>
//         </div>

//         {showFilters && (
//           <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
//             {colleges.map((college) => (
//               <button
//                 key={college}
//                 onClick={() => handleCollegeSelect(college)}
//                 className={`btn btn-sm rounded-pill border ${
//                   selectedCollege === college
//                     ? "btn-primary text-white"
//                     : "btn-light"
//                 }`}
//               >
//                 {college}
//               </button>
//             ))}
//           </div>
//         )}

//         {filteredData.length === 0 ? (
//           <p className="text-muted text-center mt-5">No results found.</p>
//         ) : (
//           <div className="row g-4">
//             {filteredData.map((item) => (
//               <div key={item._id} className="col-12 col-sm-6 col-md-4">
//                 <div className="card h-100 shadow-sm border-0">
//                   <img
//                     src={`http://localhost:5000${item.imageUrl}`}
//                     alt={item.student}
//                     className="card-img-top"
//                     style={{ height: "200px", objectFit: "cover" }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{item.student}</h5>
//                     <p className="card-text mb-1 text-muted">{item.college}</p>
//                     <p className="card-text small text-secondary">{item.address}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState, useRef } from "react";

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
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);
  const [filteredData, setFilteredData] = useState<GalleryItem[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const studentRef = useRef<HTMLInputElement>(null);
  const collegeRef = useRef<HTMLInputElement>(null);
  const facultyRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const designationRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    fetch("http://localhost:5000/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGalleryData(data);
          setFilteredData(data);
        }
      })
      .catch(console.error);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setSelectedCollege("");
    setFilteredData(galleryData.filter(i => i.student.toLowerCase().includes(term)));
  };

  const handleCollegeSelect = (col: string) => {
    setSelectedCollege(col);
    setSearchTerm("");
    setFilteredData(galleryData.filter(i => i.college.toLowerCase() === col.toLowerCase()));
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
      alert("Please fill all fields.");
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
      alert(editingId ? "Updated successfully!" : "Uploaded successfully!");
      clearForm();
      setEditingId(null);
      refresh();
    } else {
      alert("Operation failed.");
    }
  };

  const handleEdit = (i: GalleryItem) => {
    studentRef.current!.value = i.student;
    collegeRef.current!.value = i.college;
    facultyRef.current!.value = i.faculty;
    companyRef.current!.value = i.company;
    designationRef.current!.value = i.designation;
    setEditingId(i._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:5000/api/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Deleted successfully!");
      refresh();
    } else {
      alert("Delete failed.");
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

  const colleges = Array.from(new Set(galleryData.map(i => i.college)));

  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: 960 }}>
        <h2 className="text-center mb-4">📸 Student Gallery</h2>

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
            <button className="btn btn-success w-100">
              {editingId ? 'Update' : 'Upload'}
            </button>
          </div>
        </form>

        <div className="row g-3 mb-4">
          <div className="col-sm">
            <input
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search student..."
              className="form-control"
            />
          </div>
          <div className="col-sm-auto">
            <button
              className="btn btn-primary w-100"
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              {showFilters ? 'Hide Filter' : 'Filter by College'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
            {colleges.map(c => (
              <button
                key={c}
                onClick={() => handleCollegeSelect(c)}
                className={`btn btn-sm ${selectedCollege === c ? 'btn-primary text-white' : 'btn-light'}`}
                type="button"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {filteredData.length === 0 ? (
          <p className="text-center text-muted">No results found.</p>
        ) : (
          <div className="row g-4">
            {filteredData.map(i => (
              <div key={i._id} className="col-sm-6 col-md-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:5000${i.imageUrl}`}
                    alt={i.student}
                    style={{ height: 200, objectFit: 'cover' }}
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
