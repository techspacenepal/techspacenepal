// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// // TypeScript interfaces for Course and User (Student/Teacher)
// interface Course {
//   _id: string;
//   title: string;
//   instructor: string;
//   description: string;
// }
// interface User {
//   _id: string;
//   username: string;
// }
// export default function AddEnrolledCourseForm() {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     studentId: "",
//     teacherId: "",
//     courseId: "",
//     instructor: "",
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const [courses, setCourses] = useState<Course[]>([]);
//   const [teachers, setTeachers] = useState<User[]>([]);
//   const [students, setStudents] = useState<User[]>([]);

//   // Check admin login
//   useEffect(() => {
//     const token = Cookies.get("adminToken");
//     if (!token) {
//       setMessage("❌ Please login as admin to access this page.");
//       router.push("/auth/adminLogin");
//     } else {
//       setPageLoading(false);
//     }
//   }, [router]);

//   // Fetch teachers
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/auth") // Adjust endpoint as needed
//       .then((res) => setTeachers(res.data))
//       .catch((err) => console.error("❌ Failed to fetch teachers", err));
//   }, []);

//   // Fetch students
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/students")
//       .then((res) => setStudents(res.data))
//       .catch((err) => console.error("❌ Failed to fetch students", err));
//   }, []);

//   // Fetch courses
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/courses")
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error("❌ Failed to fetch courses", err));
//   }, []);

//   // Validate ObjectId
//   const validateObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

//   // Handle input changes
//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     let updatedForm = { ...formData, [name]: value };

//     if (name === "teacherId") {
//       const t = teachers.find((x) => x._id === value);
//       if (t) updatedForm.instructor = t.username;
//     }

//     if (name === "courseId") {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/courses/${value}`
//         );
//         if (res.status === 200) {
//           updatedForm.description = res.data.description;
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch course description");
//       }
//     }

//     setFormData(updatedForm);
//   };

//   // Handle form submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     const { studentId, teacherId, courseId, instructor, description } =
//       formData;

//     if (!studentId || !teacherId || !courseId) {
//       setMessage("❌ Please select Student, Teacher, and Course.");
//       setLoading(false);
//       return;
//     }

//     if (
//       !validateObjectId(studentId.trim()) ||
//       !validateObjectId(teacherId.trim()) ||
//       !validateObjectId(courseId.trim())
//     ) {
//       setMessage("❌ Invalid IDs. All ObjectIds must be 24 characters long.");
//       setLoading(false);
//       return;
//     }

//     if (!instructor?.trim() || !description?.trim()) {
//       setMessage("❌ Instructor and Description cannot be empty.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/enrolledCourses",
//         {
//           studentId,
//           teacherId,
//           courseId,
//           instructor,
//           description,
//         }
//       );

//       if (res.status === 200 || res.status === 201) {
//         setMessage("✅ Course enrolled successfully!");
//         setFormData({
//           studentId: "",
//           teacherId: "",
//           courseId: "",
//           instructor: "",
//           description: "",
//         });
//       } else {
//         setMessage(`❌ Unexpected response status: ${res.status}`);
//       }
//     } catch (error: any) {
//       setMessage(
//         error.response?.data?.message ||
//           error.message ||
//           "❌ Something went wrong during course enrollment."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (pageLoading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "100vh" }}
//       >
//         <div className="spinner-border text-primary" role="status" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5">
//       <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: 500 }}>
//         <h4 className="mb-3 text-center">Enroll Student to Course</h4>

//         {message && (
//           <div
//             className={`alert ${
//               message.includes("✅") ? "alert-success" : "alert-danger"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="studentId" className="form-label">
//               Select Student
//             </label>
//             <select
//               className="form-select"
//               id="studentId"
//               name="studentId"
//               required
//               value={formData.studentId}
//               onChange={handleChange}
//             >
//               <option value="">-- Select Student --</option>
//               {students.map((student) => (
//                 <option key={student._id} value={student._id}>
//                   {student.username}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="teacherId" className="form-label">
//               Select Teacher
//             </label>
//             <select
//               className="form-select"
//               id="teacherId"
//               name="teacherId"
//               required
//               value={formData.teacherId}
//               onChange={handleChange}
//             >
//               <option value="">-- Select Teacher --</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher._id}>
//                   {teacher.username}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-3">
//             <label htmlFor="courseId" className="form-label">
//               Select Course
//             </label>
//             <select
//               className="form-select"
//               id="courseId"
//               name="courseId"
//               required
//               value={formData.courseId}
//               onChange={handleChange}
//             >
//               <option value="">-- Select Course --</option>
//               {courses.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.title}
//                 </option>
//               ))}
//             </select>
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
//               placeholder="Enter instructor"
//               disabled
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">
//               Course Description
//             </label>
//             <textarea
//               className="form-control"
//               id="description"
//               name="description"
//               rows={3}
//               required
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Enter course description"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="btn btn-primary w-100"
//             disabled={loading}
//           >
//             {loading ? "Enrolling..." : "Enroll Course"}
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

// Interfaces
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

interface Enrollment {
  _id: string;
  courseId: Course | string;
}

export default function AddEnrolledCourseForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    studentId: "",
    teacherId: "",
    courseId: "",
    instructor: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [studentEnrollments, setStudentEnrollments] = useState<string[]>([]);

  // Check admin login
  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      setMessage("❌ Please login as admin to access this page.");
      router.push("/auth/adminLogin");
    } else {
      setPageLoading(false);
    }
  }, [router]);

  // Fetch teachers
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth")
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error("❌ Failed to fetch teachers", err));
  }, []);

  // Fetch students
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("❌ Failed to fetch students", err));
  }, []);

  // Fetch courses
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("❌ Failed to fetch courses", err));
  }, []);

  // Fetch student enrollments when studentId changes
  useEffect(() => {
    if (formData.studentId) {
      axios
        .get(`http://localhost:5000/api/enrolledCourses/student/${formData.studentId}`)
        .then((res) => {
          const enrolledCourseIds = res.data.map((e: Enrollment) =>
            typeof e.courseId === "object" ? e.courseId._id : e.courseId
          );
          setStudentEnrollments(enrolledCourseIds);
        })
        .catch((err) => {
          console.error("❌ Failed to fetch student enrollments", err);
          setStudentEnrollments([]);
        });
    }
  }, [formData.studentId]);

  // Validate MongoDB ObjectId
  const validateObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

  // Handle input changes
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    if (name === "teacherId") {
      const teacher = teachers.find((t) => t._id === value);
      if (teacher) updatedForm.instructor = teacher.username;
    }

    if (name === "courseId") {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${value}`);
        if (res.status === 200) {
          updatedForm.description = res.data.description;
        }
      } catch (err) {
        console.error("❌ Failed to fetch course description");
      }
    }

    setFormData(updatedForm);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { studentId, teacherId, courseId, instructor, description } = formData;

    if (!studentId || !teacherId || !courseId) {
      setMessage("❌ Please select Student, Teacher, and Course.");
      setLoading(false);
      return;
    }

    if (
      !validateObjectId(studentId.trim()) ||
      !validateObjectId(teacherId.trim()) ||
      !validateObjectId(courseId.trim())
    ) {
      setMessage("❌ Invalid IDs. All ObjectIds must be 24 characters long.");
      setLoading(false);
      return;
    }

    if (!instructor?.trim() || !description?.trim()) {
      setMessage("❌ Instructor and Description cannot be empty.");
      setLoading(false);
      return;
    }

    if (studentEnrollments.includes(courseId)) {
      setMessage("❌ Student is already enrolled in this course.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/enrolledCourses", {
        studentId,
        teacherId,
        courseId,
        instructor,
        description,
      });

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Course enrolled successfully!");
        setFormData({
          studentId: "",
          teacherId: "",
          courseId: "",
          instructor: "",
          description: "",
        });
        setStudentEnrollments([]);
      } else {
        setMessage(`❌ Unexpected response status: ${res.status}`);
      }
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "❌ Something went wrong during course enrollment."
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: 500 }}>
        <h4 className="mb-3 text-center">Enroll Student to Course</h4>

        {message && (
          <div
            className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="studentId" className="form-label">Select Student</label>
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

          <div className="mb-3">
            <label htmlFor="teacherId" className="form-label">Select Teacher</label>
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

          <div className="mb-3">
            <label htmlFor="courseId" className="form-label">Select Course</label>
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
              placeholder="Enter instructor"
              disabled
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Course Description</label>
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
