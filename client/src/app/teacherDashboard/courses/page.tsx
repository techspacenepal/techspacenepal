// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dropdown } from "react-bootstrap";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import { ToastContainer } from "react-toastify";

// // interface CourseWithCount {
// //   courseId: string;
// //   title: string;
// //   image?: string;
// //   status?: string;
// //   studentCount: number;
// // }

// interface Student {
//   _id: string;
//   username: string;
// }

// interface CourseWithCount {
//   courseId: string;
//   title: string;
//   image?: string;
//   status?: string;
//   studentCount: number;
//   students?: Student[]; // students array थपियो
// }

// export default function TeacherCourseList() {
//   const [teacherId, setTeacherId] = useState<string | null>(null);
//   const [courses, setCourses] = useState<CourseWithCount[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ Get teacherId from localStorage
//   useEffect(() => {
//     const id = localStorage.getItem("teacherId");
//     if (id && id !== "undefined") {
//       setTeacherId(id);
//     } else {
//       setError("❌ Teacher ID not found.");
//       setLoading(false);
//     }
//   }, []);

//   // ✅ Fetch enrolled courses + student counts
//   useEffect(() => {
//     if (!teacherId) return;

//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
//         );
//         setCourses(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("❌ Failed to load courses.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [teacherId]);

//   if (loading)
//     return <div className="text-center mt-5 text-primary">Loading...</div>;

//   if (error) return <div className="text-danger text-center mt-4">{error}</div>;

//  const handleDelete = async (courseId: string) => {
//   console.log("Deleting course:", courseId); // 👀 Debug

//   try {
//     const res = await axios.delete(`http://localhost:5000/api/teacherCourses/${courseId}`);
//     console.log("✅ Deleted:", res.data);

//     // Optionally remove from UI
//     setCourses(prev => prev.filter(course => course.courseId !== courseId));
//   } catch (err: any) {
//     console.error("❌ Delete failed:", err.response?.data || err.message);
//   }
// };

//   return (
//     <div className="container py-4">
//       <ToastContainer position="top-right" />
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold">📚 Your Courses</h2>
//           <p className="text-muted">See all assigned courses with students.</p>
//         </div>

//       </div>

//       <div className="table-responsive" style={{ overflow: "visible" }}>
//         <table className="table table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Status</th>
//               <th>Title</th>
//               <th>Students</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course.courseId}>
//                 <td>
//                   <span
//                     className={`badge bg-${
//                       course.status === "Published" ? "secondary" : "success"
//                     }`}
//                   >
//                     {course.status || "Public"}
//                   </span>
//                 </td>

//                 <td className="d-flex align-items-center">
//                   {course.image ? (
//                     <img
//                       src={`http://localhost:5000${course.image}`}
//                       alt={course.title}
//                       style={{
//                         width: "60px",
//                         height: "40px",
//                         objectFit: "cover",
//                         borderRadius: "4px",
//                         marginRight: "12px",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       className="bg-secondary text-white d-flex justify-content-center align-items-center"
//                       style={{
//                         width: "60px",
//                         height: "40px",
//                         marginRight: "12px",
//                         borderRadius: "4px",
//                         fontSize: "0.8rem",
//                       }}
//                     >
//                       No Image
//                     </div>
//                   )}
//                   {course.title}
//                 </td>

//                 <td>
//                   {/* Student count */}
//                   {course.studentCount}

//                   {/* चाहिँदा student हरुको नाम पनि देखाउन सक्नुहुन्छ */}
//                   {/* {course.students && course.students.length > 0 && (
//                     <ul className="list-unstyled small mt-1">
//                       {course.students.map((student) => (
//                         <li key={student._id}>{student.username}</li>
//                       ))}
//                     </ul>
//                   )} */}

//                   {course.students && course.students.length > 0 && (
//   <ul className="list-unstyled small mt-1">
//     {course.students.map((student, index) => (
//       <li key={`${student._id}-${index}`}>{student.username}</li>
//     ))}
//   </ul>
// )}

//                 </td>

//                 <td className="text-end">
//                   <Dropdown align="end" autoClose="outside">
//                     <Dropdown.Toggle variant="light" size="sm">
//                       ⋮
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         as={Link}
//                         href={`/teacherDashboard/courses/${course.courseId}`}
//                       >
//                         View
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         className="text-danger"
//                         onClick={() => handleDelete(course.courseId)}
//                       >
//                         Delete
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Dropdown } from "react-bootstrap";
// import Link from "next/link";
// import toast, { Toaster } from "react-hot-toast";
// import Cookies from "js-cookie";

// interface Student {
//   _id: string;
//   username: string;
// }

// interface CourseWithCount {
//   courseId: string;
//   title: string;
//   image?: string;
//   status?: string;
//   studentCount: number;
//   students?: Student[];
// }

// export default function TeacherCourseList() {
//   const [teacherId, setTeacherId] = useState<string | null>(null);
//   const [courses, setCourses] = useState<CourseWithCount[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");


//   const [publishingId, setPublishingId] = useState<string | null>(null);


//   // ✅ Get teacher ID from localStorage
//   useEffect(() => {
//     const id = localStorage.getItem("teacherId");
//     if (id && id !== "undefined") {
//       setTeacherId(id);
//     } else {
//       setError("❌ Teacher ID not found.");
//       setLoading(false);
//     }
//   }, []);

//   // ✅ Fetch courses + students
//   useEffect(() => {
//     if (!teacherId) return;

//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
//         );
//         setCourses(res.data);
//       } catch (err) {
//         console.error(err);
//         setError("❌ Failed to load courses.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [teacherId]);

//   // ✅ Delete handler
//   // const handleDelete = async (courseId: string) => {
//   //   try {
//   //     await axios.delete(`http://localhost:5000/api/teacherCourses/${courseId}`);
//   //     toast.success("🗑️ Course deleted");
//   //     setCourses((prev) => prev.filter((c) => c.courseId !== courseId));
//   //   } catch (err: any) {
//   //     console.error("Delete failed:", err);
//   //     toast.error("❌ Could not delete course");
//   //   }
//   // };

//   // ✅ Publish handler
//   // const handlePublish = async (courseId: string) => {
//   //   try {
//   //     const token = Cookies.get("teacherToken");
//   //     await axios.put(
//   //       `http://localhost:5000/api/courses/publish/${courseId}`,
//   //       {},
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     toast.success("✅ Course published!");

//   //     // Update status locally
//   //     setCourses((prev) =>
//   //       prev.map((course) =>
//   //         course.courseId === courseId
//   //           ? { ...course, status: "published" }
//   //           : course
//   //       )
//   //     );
//   //   } catch (err) {
//   //     console.error("❌ Publish failed:", err);
//   //     toast.error("Failed to publish course.");
//   //   }
//   // };

//   /// today code
//   //   const handlePublish = async (courseId: string) => {
//   //   try {
//   //     const token = Cookies.get("teacherToken");

//   //     await axios.put(
//   //       `http://localhost:5000/api/courses/publish/${courseId}`,
//   //       {},
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );

//   //     toast.success("✅ Course published!");

//   //     // 🎯 फेरि backend बाट course डेटा लिनुहोस्
//   //     const res = await axios.get(
//   //       `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
//   //     );
//   //     setCourses(res.data); // नयाँ status सहितको data set गरिन्छ
//   //   } catch (err) {
//   //     console.error("❌ Publish failed:", err);
//   //     toast.error("Failed to publish course.");
//   //   }
//   // };

//   const handlePublish = async (courseId: string) => {
//     const token = Cookies.get("teacherToken");
//     const teacherId = localStorage.getItem("teacherId");

//     try {
//        setPublishingId(courseId);
//       // ✅ Update only the teacher's course
//       await axios.put(
//         `http://localhost:5000/api/teacherCourses/publish/${teacherId}/${courseId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.success("✅ Course published!");

//       // ✅ Reload courses with updated status
//       const res = await axios.get(
//         `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
//       );
//       setCourses(res.data);
//     } catch (err) {
//       console.error("❌ Publish failed:", err);
//       toast.error("❌ Failed to publish course.");
//     }
//     finally {
//       setPublishingId(null);
//     }
//   };

//   if (loading)
//     return <div className="text-center mt-5 text-primary">Loading...</div>;
//   if (error) return <div className="text-danger text-center mt-4">{error}</div>;

//   return (
//     <div className="container py-4">
//       <Toaster position="top-right" />
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h2 className="fw-bold">📚 Your Courses</h2>
//           <p className="text-muted">See all assigned courses with students.</p>
//         </div>
//       </div>

//       <div className="table-responsive" style={{ overflow: "visible" }}>
//         <table className="table table-hover align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>Status</th>
//               <th>Title</th>
//               <th>Students</th>
//               <th className="text-end">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course) => (
//               <tr key={course.courseId}>
//                 {/* ✅ Status badge */}
//                 <td>
//                   <span
//                     className={`badge ${
//                       course.status?.toLowerCase() === "published"
//                         ? "bg-success"
//                         : "bg-warning text-dark"
//                     }`}
//                   >
//                     {course.status
//                       ? course.status.charAt(0).toUpperCase() +
//                         course.status.slice(1)
//                       : "Draft"}
//                   </span>
//                 </td>

//                 {/* ✅ Course title with image */}
//                 <td className="d-flex align-items-center">
//                   {course.image ? (
//                     <img
//                       src={`http://localhost:5000${course.image}`}
//                       alt={course.title}
//                       style={{
//                         width: "60px",
//                         height: "40px",
//                         objectFit: "cover",
//                         borderRadius: "4px",
//                         marginRight: "12px",
//                       }}
//                     />
//                   ) : (
//                     <div
//                       className="bg-secondary text-white d-flex justify-content-center align-items-center"
//                       style={{
//                         width: "60px",
//                         height: "40px",
//                         marginRight: "12px",
//                         borderRadius: "4px",
//                         fontSize: "0.8rem",
//                       }}
//                     >
//                       No Image
//                     </div>
//                   )}
//                   {course.title}
//                 </td>

//                 {/* ✅ Student count and names */}
//                 <td>
//                   {course.studentCount}
//                   {course.students && course.students.length > 0 && (
//                     <ul className="list-unstyled small mt-1">
//                       {course.students.map((student, index) => (
//                         <li key={`${student._id}-${index}`}>
//                           {student.username}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </td>

//                 {/* ✅ Dropdown Actions */}
//                 <td className="text-end">
//                   <Dropdown align="end" autoClose="outside">
//                     <Dropdown.Toggle variant="light" size="sm">
//                       ⋮
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         as={Link}
//                         href={`/teacherDashboard/courses/${course.courseId}`}
//                       >
//                         View
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         onClick={() => handlePublish(course.courseId)}
//                       >
//                         📢 Publish
//                       </Dropdown.Item>

//                       {/* delete button */}
//                       {/* <Dropdown.Item
//                         className="text-danger"
//                         onClick={() => handleDelete(course.courseId)}
//                       >
//                         Delete
//                       </Dropdown.Item> */}
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </td>
//               </tr>
//             ))}
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
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

interface Student {
  _id: string;
  username: string;
}

interface CourseWithCount {
  courseId: string;
  title: string;
  image?: string;
  status?: string;
  studentCount: number;
  students?: Student[];
}

export default function TeacherCourseList() {
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [publishingId, setPublishingId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    if (id && id !== "undefined") {
      setTeacherId(id);
    } else {
      setError("❌ Teacher ID not found.");
      setLoading(false);
    }
  }, []);

  const fetchCourses = async () => {
    if (!teacherId) return;
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

  useEffect(() => {
    if (!teacherId) return;
    fetchCourses();
  }, [teacherId]);

  // Check for publish trigger from CourseDetailsPage
  useEffect(() => {
    const flag = localStorage.getItem("coursePublished");
    if (flag === "true") {
      localStorage.removeItem("coursePublished");
      fetchCourses();
      toast.success("✅ Course status updated!");
    }
  }, []);

  const handlePublish = async (courseId: string) => {
    const token = Cookies.get("teacherToken");
    const teacherId = localStorage.getItem("teacherId");

    try {
      setPublishingId(courseId);
      await axios.put(
        `http://localhost:5000/api/teacherCourses/publish/${teacherId}/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("✅ Course published!");

      await fetchCourses();
    } catch (err) {
      console.error("❌ Publish failed:", err);
      toast.error("❌ Failed to publish course.");
    } finally {
      setPublishingId(null);
    }
  };

  if (loading) return <div className="text-center mt-5 text-primary">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-4">{error}</div>;

  return (
    <div className="container py-4">
      <Toaster position="top-right" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">📚 Your Courses</h2>
          <p className="text-muted">See all assigned courses with students.</p>
        </div>
      </div>

      <div className="table-responsive">
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
                <td>
                  <span
                    className={`badge ${
                      course.status?.toLowerCase() === "published"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {course.status ? course.status.toUpperCase() : "DRAFT"}
                  </span>
                </td>
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
                <td>
                  {course.studentCount}
                  {course.students?.length > 0 && (
                    <ul className="list-unstyled small mt-1">
                      {course.students.map((student, idx) => (
                        <li key={student._id + idx}>{student.username}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="text-end">
                  <Dropdown align="end" autoClose="outside">
                    <Dropdown.Toggle variant="light" size="sm">
                      ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} href={`/teacherDashboard/courses/${course.courseId}`}>
                        View
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handlePublish(course.courseId)}
                        disabled={course.status === "published"}
                      >
                        📢 Publish
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
