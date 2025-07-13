// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Cookies from "js-cookie";

// interface EnrolledStudent {
//   studentId: string;
//   name: string;
//   email: string;
//   enrolledDate: string;
// }

// interface CourseInfo {
//   title: string;
//   description?: string;
//   status?: string; // 'draft' or 'published'
// }

// export default function CourseDetailsPage() {
//   const { id: courseId } = useParams();
//   const [teacherId, setTeacherId] = useState<string | null>(null);
//   const [students, setStudents] = useState<EnrolledStudent[]>([]);
//   const [course, setCourse] = useState<CourseInfo | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const id = localStorage.getItem("teacherId");
//     if (id && id !== "undefined") {
//       setTeacherId(id);
//     } else {
//       setError("❌ Teacher ID not found.");
//       setLoading(false);
//     }
//   }, []);

//   // const fetchData = async () => {
//   //   try {

//   //     //courseRes
//   //     const [studentsRes, courseRes] = await Promise.all([
//   //       axios.get(`http://localhost:5000/api/teacherCourses/students/${teacherId}/${courseId}`),
//   //       axios.get(`http://localhost:5000/api/courses/${courseId}`),
//   //     ]);

//   //     setStudents(studentsRes.data);
//   //     setCourse(courseRes.data);
//   //   } catch (err) {
//   //     setError("❌ Failed to load course or students.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchData = async () => {
//   try {
//     const [studentsRes, courseRes] = await Promise.all([
//       axios.get(`http://localhost:5000/api/teacherCourses/students/${teacherId}/${courseId}`),
//       axios.get(`http://localhost:5000/api/teacherCourses/details/${teacherId}/${courseId}`),
//     ]);

//     setStudents(studentsRes.data);
//     setCourse(courseRes.data);  // now status will come from TeacherCourse
//   } catch (err) {
//     setError("❌ Failed to load course or students.");
//   } finally {
//     setLoading(false);
//   }
// };

//   useEffect(() => {
//     if (!teacherId || !courseId) return;
//     fetchData();
//   }, [teacherId, courseId]);

//   // const handlePublish = async () => {
//   //   try {
//   //     const token = Cookies.get("teacherToken");
//   //     const res = await axios.put(
//   //       `http://localhost:5000/api/courses/publish/${courseId}`,
//   //       {},
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );
//   //     alert("✅ Course published!");
//   //     fetchData(); // refresh course status
//   //   } catch (error) {
//   //     console.error("Publish failed", error);
//   //     alert("❌ Failed to publish course");
//   //   }
//   // };

// // const handlePublish = async () => {
// //   const token = Cookies.get("teacherToken");
// //   const teacherId = localStorage.getItem("teacherId");

// //   try {
// //     console.log("🚀 Publishing Course");
// //     console.log("📌 Teacher ID:", teacherId);
// //     console.log("📌 Course ID:", courseId);

// //     const res = await axios.put(
// //   `http://localhost:5000/api/teacherCourses/publish/${teacherId}/${courseId}`,
// //   {},
// //   {
// //     headers: {
// //       Authorization: `Bearer ${token}`, // needed if protect middleware checks token
// //     },
// //   }
// // );

// //     console.log("✅ Publish response:", res.data);
// //     alert("✅ Course published successfully!");
// //     fetchData();
// //   } catch (err: any) {
// //     console.error("❌ Publish failed:", err);
// //     if (err.response) {
// //       console.log("❗ Status Code:", err.response.status);
// //       console.log("❗ Error Data:", err.response.data);
// //     }
// //     alert("❌ Failed to publish course");
// //   }
// // };

// // const handlePublish = async () => {
// //   const token = Cookies.get("teacherToken");
// //   const teacherId = localStorage.getItem("teacherId");

// //   try {
// //     // ✅ Update TeacherCourse
// //     await axios.put(
// //       `http://localhost:5000/api/teacherCourses/publish/${teacherId}/${courseId}`,

// //       {},
// //       {
// //         headers: { Authorization: `Bearer ${token}` },
// //       }
// //     );

// //     // ✅ ALSO update Course model
// //     // await axios.put(
// //     //   `http://localhost:5000/api/courses/publish/${courseId}`,
// //     //   {},
// //     //   {
// //     //     headers: { Authorization: `Bearer ${token}` },
// //     //   }
// //     // );

// //     alert("✅ Course published successfully!");
// //     fetchData(); // refresh data
// //   } catch (err) {
// //     console.error("❌ Publish failed:", err);
// //     alert("❌ Failed to publish course");
// //   }
// // };

// const handlePublish = async () => {
//   const token = Cookies.get("teacherToken");
//   const teacherId = localStorage.getItem("teacherId");

//   try {
//     await axios.put(
//       `http://localhost:5000/api/teacherCourses/publish/${teacherId}/${courseId}`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     alert("✅ Course published successfully!");

//     // ✅ Notify other pages (like TeacherCourseList)
//     localStorage.setItem("coursePublished", "true");

//     fetchData(); // Refresh current page
//   } catch (err) {
//     console.error("❌ Publish failed:", err);
//     alert("❌ Failed to publish course");
//   }
// };

//   if (loading) return <div className="text-center mt-5 text-primary">Loading...</div>;
//   if (error) return <div className="text-danger text-center mt-4">{error}</div>;

//   return (
//     <div className="container mt-4">
//       <h3 className="mb-3">👨‍🎓 Enrolled Students</h3>

//       <div className="d-flex justify-content-between align-items-center mb-2">
//         <p className="text-muted mb-0">
//           Course: <strong>{course?.title || "Untitled"}</strong>
//         </p>
//         <p className="mb-0">
//           Status:{" "}
//           <span
//             className={`badge ${
//               course?.status === "published" ? "bg-success" : "bg-warning text-dark"
//             }`}
//           >
//             {course?.status?.toUpperCase() || "DRAFT"}
//           </span>
//         </p>
//       </div>

//       {course?.status !== "published" && (
//         <button className="btn btn-success btn-sm mb-3" onClick={handlePublish}>
//           📢 Publish Course
//         </button>
//       )}

//       {students.length === 0 ? (
//         <p className="text-muted">No students enrolled in this course.</p>
//       ) : (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Enrolled Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student, index) => (
//               <tr key={student.studentId}>
//                 <td>{index + 1}</td>
//                 <td>{student.name}</td>
//                 <td>{student.email}</td>
//                 <td>{new Date(student.enrolledDate).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import TeachersVideoUploadForm from "@/app/Component/teachersVideoUpload";

interface EnrolledStudent {
  studentId: string;
  name: string;
  email: string;
  enrolledDate: string;
}

interface CourseInfo {
  title: string;
  description?: string;
  status?: string;
}

export default function CourseDetailsPage() {
  // const { id: courseId } = useParams();
  const params = useParams() as { id: string };
  const courseId = params.id;
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [students, setStudents] = useState<EnrolledStudent[]>([]);
  const [course, setCourse] = useState<CourseInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    if (id && id !== "undefined") {
      setTeacherId(id);
    } else {
      setError("❌ Teacher ID not found.");
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, courseRes] = await Promise.all([
        axios.get(
          `http://localhost:5000/api/teacherCourses/students/${teacherId}/${courseId}`
        ),
        axios.get(
          `http://localhost:5000/api/teacherCourses/details/${teacherId}/${courseId}`
        ),
      ]);
      setStudents(studentsRes.data);
      setCourse(courseRes.data);
    } catch (err) {
      setError("❌ Failed to load course or students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!teacherId || !courseId) return;
    fetchData();
  }, [teacherId, courseId]);

  const handlePublish = async () => {
    const token = Cookies.get("teacherToken");
    const teacherId = localStorage.getItem("teacherId");

    try {
      await axios.put(
        `http://localhost:5000/api/teacherCourses/publish/${teacherId}/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("coursePublished", "true");
      alert("✅ Course published successfully!");
      fetchData();
    } catch (err) {
      console.error("❌ Publish failed:", err);
      alert("❌ Failed to publish course");
    }
  };

  if (loading)
    return <div className="text-center mt-5 text-primary">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-3">👨‍🎓 Enrolled Students</h3>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="text-muted mb-0">
          Course: <strong>{course?.title || "Untitled"}</strong>
        </p>
        <p className="mb-0">
          Status:{" "}
          <span
            className={`badge ${
              course?.status === "published"
                ? "bg-success"
                : "bg-warning text-dark"
            }`}
          >
            {course?.status?.toUpperCase() || "DRAFT"}
          </span>
        </p>
      </div>

      {course?.status !== "published" && (
        <button className="btn btn-success btn-sm mb-3" onClick={handlePublish}>
          📢 Publish Course
        </button>
      )}

      {students.length === 0 ? (
        <p className="text-muted">No students enrolled in this course.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrolled Date</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.studentId}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{new Date(student.enrolledDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ------------------ Video Upload Section ------------------ */}
      {/* ------------------ Video Upload Section ------------------ */}
      <hr className="my-4" />
      <h5>📹 Course Video Upload</h5>

      {/* {course?.status !== "published" ? (
        <p className="alert alert-warning">
          ⚠️ You must <strong>publish</strong> the course before uploading
          videos.
        </p>
      ) : (
        <TeachersVideoUploadForm
          teacherId={teacherId!}
          courseId={courseId as string}
        />
      )} */}

      {course?.status !== "published" ? (
        <p className="alert alert-warning">
          ⚠️ You must <strong>publish</strong> the course before uploading
          videos.
        </p>
      ) : students.length === 0 ? (
        <p className="alert alert-danger">
          ⚠️ No students enrolled. Please wait until at least one student is
          enrolled to upload videos.
        </p>
      ) : (
        <TeachersVideoUploadForm
          teacherId={teacherId!}
          courseId={courseId as string}
        />
      )}
    </div>
  );
}
