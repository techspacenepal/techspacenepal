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




// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// export default function AddEnrolledCourseForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     teacherId: "",
//     studentId: "",
//     name: "",
//     instructor: "",
//     description: "",
//   });

//   const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true); // page-level loading
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const token = Cookies.get("adminToken");
//     setTimeout(() => {
//       if (!token) {
//         setMessage("❌ Please login as admin to access this page.");
//         router.push("/auth/adminLogin");
//       } else {
//         setPageLoading(false);
//       }
//     }, 1000); // simulate slight delay
//   }, []);

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

//   const validateObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const studentIdTrimmed = formData.studentId.trim();
//     if (!validateObjectId(studentIdTrimmed)) {
//       setMessage("❌ Invalid Student ID. Must be 24-character ObjectId.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("teacherId", formData.teacherId.trim());
//       data.append("studentId", studentIdTrimmed);
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
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (res.status === 200 || res.status === 201) {
//         setMessage("✅ Course added successfully!");
//         setFormData({
//           teacherId: "",
//           studentId: "",
//           name: "",
//           instructor: "",
//           description: "",
//         });
//         setThumbnailFile(null);
//       } else {
//         setMessage(`❌ Unexpected response: ${res.status}`);
//       }
//     } catch (error: any) {
//       console.error("Error:", error);
//       setMessage(
//         error.response?.data?.message ||
//         error.message ||
//         "❌ Failed to add course"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Full-page spinner
//   if (pageLoading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div className="multi-spinner"></div>
//         <style jsx>{`
//           .multi-spinner {
//             width: 4rem;
//             height: 4rem;
//             border: 8px solid transparent;
//             border-top: 8px solid red;
//             border-right: 8px solid blue;
//             border-bottom: 8px solid green;
//             border-left: 8px solid orange;
//             border-radius: 50%;
//             animation: spin 1.2s linear infinite;
//           }

//           @keyframes spin {
//             0% {
//               transform: rotate(0deg);
//             }
//             100% {
//               transform: rotate(360deg);
//             }
//           }
//         `}</style>
//       </div>
//     );
//   }

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
//         <div className="mb-3">
//             <label htmlFor="teacherId" className="form-label">Teacher ID</label>
//             <input
//               type="text"
//               className="form-control"
//               id="teacherId"
//               name="teacherId"
//               required
//               value={formData.teacherId}
//               onChange={handleChange}
//               placeholder="Enter MongoDB ObjectId"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="studentId" className="form-label">Student ID</label>
//             <input
//               type="text"
//               className="form-control"
//               id="studentId"
//               name="studentId"
//               required
//               value={formData.studentId}
//               onChange={handleChange}
//               placeholder="Enter MongoDB ObjectId"
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">Course Name</label>
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
//             <label htmlFor="instructor" className="form-label">Instructor</label>
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
//             <label htmlFor="description" className="form-label">Description</label>
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
//             className="btn btn-primary w-100"
//             disabled={loading}
//           >
//             {loading ? "Adding..." : "Add Course"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




//------------------------

// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// export default function AddEnrolledCourseForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     studentId: "",
//     teacherId: "",
//     courseId: "",
//     instructor: "",
//     description: "",
//   });

//   const [thumbnail, setThumbnail] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [courses, setCourses] = useState([]);

//   // ✅ Admin token validation
//   useEffect(() => {
//     const token = Cookies.get("adminToken");
//     if (!token) {
//       setMessage("❌ Please login as admin to access this page.");
//       router.push("/auth/adminLogin");
//     } else {
//       setPageLoading(false);
//     }
//   }, [router]);

//   // ✅ Fetch students
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/students")
//       .then((res) => setStudents(res.data))
//       .catch((err) => console.error("Error fetching students", err));
//   }, []);

//   // ✅ Fetch teachers
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/auth")
//       .then((res) => setTeachers(res.data))
//       .catch((err) => console.error("Error fetching teachers", err));
//   }, []);

//   // ✅ Fetch courses
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/courses")
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error("Error fetching courses", err));
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setThumbnail(file);
//   };

//   const validateObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const { studentId, teacherId, courseId, instructor, description } = formData;

//     if (
//       !validateObjectId(studentId.trim()) ||
//       !validateObjectId(teacherId.trim()) ||
//       !validateObjectId(courseId.trim())
//     ) {
//       setMessage("❌ Invalid ID(s): Make sure all IDs are valid MongoDB ObjectIds.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("studentId", studentId.trim());
//       data.append("teacherId", teacherId.trim());
//       data.append("courseId", courseId.trim());
//       data.append("instructor", instructor);
//       data.append("description", description);
//       if (thumbnail) {
//         data.append("thumbnail", thumbnail);
//       }

//       const res = await axios.post("http://localhost:5000/api/enrolledCourses", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.status === 201 || res.status === 200) {
//         setMessage("✅ Student enrolled in course successfully!");
//         setFormData({
//           studentId: "",
//           teacherId: "",
//           courseId: "",
//           instructor: "",
//           description: "",
//         });
//         setThumbnail(null);
//       } else {
//         setMessage(`❌ Unexpected response status: ${res.status}`);
//       }
//     } catch (error: any) {
//       console.error("❌ Submit Error:", error);
//       setMessage(
//         error.response?.data?.message || error.message || "❌ Failed to enroll student"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (pageLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//         <div className="spinner-border text-primary" role="status" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
//         <h4 className="mb-4 text-center">Enroll Student in a Course</h4>

//         {message && (
//           <div
//             className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           {/* Student Select */}
//           <div className="mb-3">
//             <label htmlFor="studentId" className="form-label">Select Student</label>
//             <select
//               className="form-select"
//               id="studentId"
//               name="studentId"
//               value={formData.studentId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Student --</option>
//               {students.map((s) => (
//                 <option key={s._id} value={s._id}>
//                   {s.username || s.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Teacher Select */}
//           <div className="mb-3">
//             <label htmlFor="teacherId" className="form-label">Select Teacher</label>
//             <select
//               className="form-select"
//               id="teacherId"
//               name="teacherId"
//               value={formData.teacherId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Teacher --</option>
//               {teachers.map((t) => (
//                 <option key={t._id} value={t._id}>
//                   {t.username || t.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Course Select */}
//           <div className="mb-3">
//             <label htmlFor="courseId" className="form-label">Select Course</label>
//             <select
//               className="form-select"
//               id="courseId"
//               name="courseId"
//               value={formData.courseId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">-- Select Course --</option>
//               {courses.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Instructor */}
//           <div className="mb-3">
//             <label htmlFor="instructor" className="form-label">Instructor</label>
//             <input
//               type="text"
//               className="form-control"
//               id="instructor"
//               name="instructor"
//               value={formData.instructor}
//               onChange={handleChange}
//               required
//               placeholder="Instructor name"
//             />
//           </div>

//           {/* Description */}
//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               rows={4}
//               placeholder="Course description"
//             ></textarea>
//           </div>

//           {/* Thumbnail Upload */}
//           <div className="mb-3">
//             <label htmlFor="thumbnail" className="form-label">Upload Thumbnail (optional)</label>
//             <input
//               type="file"
//               className="form-control"
//               id="thumbnail"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//             {loading ? "Submitting..." : "Enroll"}
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

// TypeScript interfaces for Course and User (Student/Teacher)
interface Course {
  _id: string;
  title: string;
  instructor: string;
  description: string;
}

interface User {
  _id: string;
  username: string;
}

export default function AddEnrolledCourseForm() {
  const router = useRouter();

  // Form state to hold input values
  const [formData, setFormData] = useState({
    studentId: "",
    teacherId: "",
    courseId: "",
    instructor: "",
    description: "",
  });

  // Loading state for form submission and initial page loading
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Message state for showing success or error messages
  const [message, setMessage] = useState("");

  // State arrays for data fetched from backend
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);

  // Check if admin is logged in by verifying adminToken cookie
  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      setMessage("❌ Please login as admin to access this page.");
      router.push("/auth/adminLogin"); // Redirect to admin login page
    } else {
      setPageLoading(false); // If token exists, stop loading spinner
    }
  }, [router]);

  // Fetch all teachers from backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth") // Adjust endpoint as needed
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("❌ Failed to fetch teachers", err));
  }, []);

  // Fetch all students from backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("❌ Failed to fetch students", err));
  }, []);

  // Fetch all courses from backend API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("❌ Failed to fetch courses", err));
  }, []);

  // Handle input changes in form fields (including selects and text inputs)
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Auto-fill from course selection
  if (name === "courseId") {
    const selectedCourse = courses.find((course) => course._id === value);
    if (selectedCourse) {
      setFormData((prev) => ({
        ...prev,
        instructor: selectedCourse.instructor,
        description: selectedCourse.description,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        instructor: "",
        description: "",
      }));
    }
  }

  // ✅ Auto-fill instructor from teacher selection
  if (name === "teacherId") {
    const selectedTeacher = teachers.find((t) => t._id === value);
    if (selectedTeacher) {
      setFormData((prev) => ({
        ...prev,
        instructor: selectedTeacher.username,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        instructor: "",
      }));
    }
  }
};


  // Simple regex validation for MongoDB ObjectId format (24 hex chars)
  const validateObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on submit
    setLoading(true); // Show loading state
    setMessage(""); // Clear previous messages

    const { studentId, teacherId, courseId, instructor, description } = formData;

    // Validate ObjectId fields are correctly formatted
    if (
      !validateObjectId(studentId.trim()) ||
      !validateObjectId(teacherId.trim()) ||
      !validateObjectId(courseId.trim())
    ) {
      setMessage("❌ Invalid IDs. All must be 24-character ObjectIds.");
      setLoading(false);
      return;
    }

    // Validate instructor and description are not empty
    if (!instructor.trim() || !description.trim()) {
      setMessage("❌ Instructor and Description cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      // Send POST request to backend to create new enrollment
      const res = await axios.post("http://localhost:5000/api/enrolledCourses", {
        studentId,
        teacherId,
        courseId,
        instructor,
        description,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Course enrolled successfully!"); // Show success message
        // Reset form fields after successful submission
        setFormData({
          studentId: "",
          teacherId: "",
          courseId: "",
          instructor: "",
          description: "",
        });
      } else {
        setMessage(`❌ Unexpected response status: ${res.status}`);
      }
    } catch (error: any) {
      // Show error message returned from backend or general error
      setMessage(
        error.response?.data?.message || error.message || "❌ Failed to enroll course"
      );
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Show loading spinner while checking admin auth token
  if (pageLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: 500 }}>
        <h4 className="mb-3 text-center">Enroll Student to Course</h4>

        {/* Show success or error messages */}
        {message && (
          <div
            className={`alert ${
              message.includes("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        {/* Enrollment form */}
        <form onSubmit={handleSubmit}>
          {/* Student dropdown */}
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">
              Select Student
            </label>
            <select
              className="form-select"
              id="studentId"
              name="studentId"
              required
              value={formData.studentId}
              onChange={handleChange}
            >
              <option value="">-- Select Student --</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.username}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher dropdown */}
          <div className="mb-3">
            <label htmlFor="teacherId" className="form-label">
              Select Teacher
            </label>
            <select
              className="form-select"
              id="teacherId"
              name="teacherId"
              required
              value={formData.teacherId}
              onChange={handleChange}
            >
              <option value="">-- Select Teacher --</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.username}
                </option>
              ))}
            </select>
          </div>

          {/* Course dropdown */}
          <div className="mb-3">
            <label htmlFor="courseId" className="form-label">
              Select Course
            </label>
            <select
              className="form-select"
              id="courseId"
              name="courseId"
              required
              value={formData.courseId}
              onChange={handleChange}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Instructor input (auto-filled) */}
          <div className="mb-3">
            <label htmlFor="instructor" className="form-label">
              Instructor
            </label>
           <input
  type="text"
  className="form-control"
  id="instructor"
  name="instructor"
  required
  value={formData.instructor}
  onChange={handleChange}
  placeholder="Enter instructor"
  disabled // ✅ disable input
/>

          </div>

          {/* Description textarea (auto-filled) */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Course Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Enrolling..." : "Enroll Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
