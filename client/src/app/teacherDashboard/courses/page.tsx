// 'use client'
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dropdown } from "react-bootstrap";
// import Link from "next/link";

// export default function CourseListBootstrap() {
//   const [teacherId, setTeacherId] = useState<string | null>(null);
//   const [teacherCourses, setTeacherCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Teacher ID localStorage बाट लिन्छ
//   useEffect(() => {
//     const id = localStorage.getItem("teacherId");
//     if (id && id !== "undefined") {
//       setTeacherId(id);
//     } else {
//       setError("Teacher ID not found.");
//       setLoading(false);
//     }
//   }, []);

//   // Teacher को courses fetch गर्छ
//   useEffect(() => {
//     if (!teacherId) return;

//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/teacherCourses/teacher/${teacherId}`);
//         setTeacherCourses(res.data);
//       } catch (err) {
//         setError("Failed to load courses.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [teacherId]);

//   if (loading) return <div className="text-center mt-5 text-primary">Loading...</div>;
//   if (error) return <div className="text-danger text-center mt-4">{error}</div>;

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold">Courses</h2>
//           <p className="text-muted">Manage your assigned courses here.</p>
//         </div>
//         <Link href="/teacherDashboard/courses/create" className="btn btn-primary">
//           + Create Course
//         </Link>
//       </div>

//       <div className="table-responsive" style={{ overflow: "visible", position: "relative" }}>
//         <table className="table table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Status</th>
//               <th> Title</th>
//               <th>Students</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teacherCourses.map((course: any) => {
//               const courseInfo = course.courseId || {};
//               const title = courseInfo.title || course.name || "Untitled";
//               const status = courseInfo.status || "Published";
//               const studentCount = courseInfo.studentCount || 0;
//               const imageUrl = courseInfo.image; // backend बाट आउने image filename/path

//               return (
//                 <tr key={course._id}>
//                   <td>
//                     <span className={`badge bg-${status === "Published" ? "success" : "secondary"}`}>
//                       {status}
//                     </span>
//                   </td>

//                   {/* Image र Title */}
//                   <td className="d-flex align-items-center">
                    
//                       <div
//                         style={{
//                           width: "60px",
//                           height: "40px",
                          
//                           display: "inline-block",
//                           borderRadius: "4px",
//                           marginRight: "12px",
//                         }}
//                       />
                    
//                     {title}
//                   </td>

//                   <td>{studentCount}</td>
//                   <td className="text-end" style={{ position: "relative" }}>
//                     <Dropdown align="end" autoClose="outside">
//                       <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${course._id}`}>
//                         ⋮
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu
//                         container={document.body}
//                         style={{ zIndex: 1050 }}
//                         aria-labelledby={`dropdown-${course._id}`}
//                       >
//                         <Dropdown.Item as={Link} href={`/courses/${courseInfo._id || "#"}`}>
//                           View
//                         </Dropdown.Item>
//                         <Dropdown.Item>Edit</Dropdown.Item>
//                         <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";

interface CourseWithCount {
  courseId: string;
  title: string;
  image?: string;
  status?: string;
  studentCount: number;
}

export default function TeacherCourseList() {
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Get teacherId from localStorage
  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    if (id && id !== "undefined") {
      setTeacherId(id);
    } else {
      setError("❌ Teacher ID not found.");
      setLoading(false);
    }
  }, []);

  // ✅ Fetch enrolled courses + student counts
  useEffect(() => {
    if (!teacherId) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
        );
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [teacherId]);

  if (loading)
    return <div className="text-center mt-5 text-primary">Loading...</div>;

  if (error)
    return <div className="text-danger text-center mt-4">{error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">📚 Your Courses</h2>
          <p className="text-muted">See all assigned courses with students.</p>
        </div>
        <Link href="/teacherDashboard/courses/create" className="btn btn-primary">
          + Create Course
        </Link>
      </div>

      <div className="table-responsive" style={{ overflow: "visible" }}>
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Students</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                {/* ✅ Status */}
                <td>
                  <span
                    className={`badge bg-${course.status === "Published" ? "success" : "secondary"}`}
                  >
                    {course.status || "Public"}
                  </span>
                </td>

                {/* ✅ Course title + image */}
                <td className="d-flex align-items-center">
                  {course.image ? (
                    <img
                      src={`http://localhost:5000${course.image}`}
                      alt={course.title}
                      style={{
                        width: "60px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginRight: "12px",
                      }}
                    />
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex justify-content-center align-items-center"
                      style={{
                        width: "60px",
                        height: "40px",
                        marginRight: "12px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                      }}
                    >
                      No Image
                    </div>
                  )}
                  {course.title}
                </td>

                {/* ✅ Student count */}
                <td>{course.studentCount}</td>

                {/* ✅ Action dropdown */}
                <td className="text-end">
                  <Dropdown align="end" autoClose="outside">
                    <Dropdown.Toggle variant="light" size="sm">
                      ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        href={`/courses/${course.courseId}`}
                      >
                        View
                      </Dropdown.Item>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item className="text-danger">
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

