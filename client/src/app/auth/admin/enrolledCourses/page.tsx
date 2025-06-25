// "use client";

// import React, { useState } from "react";
// import axios from "axios";

// export default function AddEnrolledCourseForm() {
//   const [formData, setFormData] = useState({
//     studentId: "",
//     name: "",
//     instructor: "",
//     description: "",
//   });

//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setThumbnailFile(file);
//   };

//   const validateObjectId = (id: string) => {
//     return /^[a-f\d]{24}$/i.test(id);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     console.log("Clicked!");

//     const studentIdTrimmed = formData.studentId.trim();
//     if (!validateObjectId(studentIdTrimmed)) {
//       setMessage("❌ Invalid Student ID format. Must be 24 hex characters.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("studentId", formData.studentId.trim());
//       data.append("name", formData.name);
//       data.append("instructor", formData.instructor);
//       data.append("description", formData.description);
//       if (thumbnailFile) {
//         data.append("thumbnail", thumbnailFile);
//       }

//       const res = await axios.post(
//         "http://localhost:5000/api/enrolledCourses",
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (res.status === 201 || res.status === 200) {
//         setMessage("✅ Course added successfully!");
//         setFormData({
//           studentId: "",
//           name: "",
//           instructor: "",
//           description: "",
//         });
//         setThumbnailFile(null);
//       } else {
//     console.log("Response status:", res.status, res.data);
//     setMessage(`❌ Unexpected response status: ${res.status}`);
//       }
//     } catch  (error: any) {
//   console.error("Upload error:", error.response || error.message || error);
//   setMessage(
//     error.response?.data?.message ||
//     error.message ||
//     "❌ Error adding course. Try again."
//   );
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
//         <h4 className="mb-3 text-center">Add New Enrolled Course</h4>

//         {message && (
//           <div
//             className={`alert ${
//               message.includes("✅") ? "alert-success" : "alert-danger"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div className="mb-3">
//             <label htmlFor="studentId" className="form-label">
//               Student ID
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="studentId"
//               name="studentId"
//               required
//               value={formData.studentId}
//               onChange={handleChange}
//               placeholder="Enter student MongoDB ObjectId"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Course Name
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="name"
//               name="name"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter course name"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="instructor" className="form-label">
//               Instructor
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="instructor"
//               name="instructor"
//               required
//               value={formData.instructor}
//               onChange={handleChange}
//               placeholder="Enter instructor name"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">
//               Description
//             </label>
//             <textarea
//               className="form-control"
//               id="description"
//               name="description"
//               rows={4}
//               required
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter course description"
//             ></textarea>
//           </div>

//           <div className="mb-3">
//             <input
//               type="file"
//               className="form-control"
//               id="thumbnail"
//               name="thumbnail"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="btn btn-primary w-100"
//           >
//             {loading ? "Adding..." : "Add Course"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AddEnrolledCourseForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    instructor: "",
    description: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true); // page-level loading
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = Cookies.get("adminToken");
    setTimeout(() => {
      if (!token) {
        setMessage("❌ Please login as admin to access this page.");
        router.push("/auth/adminLogin");
      } else {
        setPageLoading(false);
      }
    }, 1000); // simulate slight delay
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnailFile(file);
  };

  const validateObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const studentIdTrimmed = formData.studentId.trim();
    if (!validateObjectId(studentIdTrimmed)) {
      setMessage("❌ Invalid Student ID. Must be 24-character ObjectId.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("studentId", studentIdTrimmed);
      data.append("name", formData.name);
      data.append("instructor", formData.instructor);
      data.append("description", formData.description);
      if (thumbnailFile) {
        data.append("thumbnail", thumbnailFile);
      }

      const res = await axios.post(
        "http://localhost:5000/api/enrolledCourses",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Course added successfully!");
        setFormData({
          studentId: "",
          name: "",
          instructor: "",
          description: "",
        });
        setThumbnailFile(null);
      } else {
        setMessage(`❌ Unexpected response: ${res.status}`);
      }
    } catch (error: any) {
      console.error("Error:", error);
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "❌ Failed to add course"
      );
    } finally {
      setLoading(false);
    }
  };

  // Full-page spinner
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
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h4 className="mb-3 text-center">Add New Enrolled Course</h4>

        {message && (
          <div
            className={`alert ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">Student ID</label>
            <input
              type="text"
              className="form-control"
              id="studentId"
              name="studentId"
              required
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter MongoDB ObjectId"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Course Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter course name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="instructor" className="form-label">Instructor</label>
            <input
              type="text"
              className="form-control"
              id="instructor"
              name="instructor"
              required
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Enter instructor name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

