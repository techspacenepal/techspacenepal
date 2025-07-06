// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Mail } from "lucide-react";

// export default function TeacherProfilePage() {
//   const [teacherId, setTeacherId] = useState<string | null>(null);
//   const [teacher, setTeacher] = useState<any>(null);
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const id = localStorage.getItem("teacherId");
//     if (id && id !== "undefined") {
//       setTeacherId(id);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!teacherId) return;

//     const fetchTeacherProfile = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/auth/teacher/${teacherId}`
//         );
//         setTeacher(res.data);
//       } catch (err) {
//         console.error("❌ Teacher not found:", err);
//       }
//     };

//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/teacherCourses/teacher/${teacherId}`
//         );
//         const fetchedCourses = res.data;

//         const coursesWithStudentCount = await Promise.all(
//           fetchedCourses.map(async (course: any) => {
//             const courseId = course?.courseId?._id;

//             if (!courseId) return { ...course, studentCount: 0 };

//             try {
//               const res2 = await axios.get(
//                 `http://localhost:5000/api/enrolledCourses/course/${courseId}/count?teacherId=${teacherId}`
//               );

//               return {
//                 ...course,
//                 studentCount: res2.data.studentCount || 0,
//               };
//             } catch (err) {
//               console.error("❌ Error fetching student count", err);
//               return { ...course, studentCount: 0 };
//             }
//           })
//         );

//         setCourses(coursesWithStudentCount);
//       } catch (err) {
//         console.error("❌ Failed to fetch courses:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeacherProfile();
//     fetchCourses();
//   }, [teacherId]);

//   if (loading) return <p className="text-center mt-5">Loading...</p>;
//   if (!teacher)
//     return <p className="text-danger text-center mt-5">Teacher not found</p>;

//   return (
//     <div className="container py-4">
//       <div className="row g-4">
//         {/* Profile */}
//         <div className="col-md-4">
//           <div className="card text-center shadow-sm">
//             <div className="card-body">
//               {teacher.avatarUrl ? (
//                 <img
//                   src={teacher.avatarUrl}
//                   alt={teacher.username}
//                   className="rounded-circle mb-3"
//                   style={{ width: 96, height: 96, objectFit: "cover" }}
//                 />
//               ) : (
//                 <div
//                   className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
//                   style={{ width: 96, height: 96, fontSize: "1.5rem" }}
//                 >
//                   {teacher.username?.substring(0, 2).toUpperCase()}
//                 </div>
//               )}
//               <h4>{teacher.username}</h4>
//               <p className="text-muted mb-1">ID: {teacher._id}</p>
//               <hr />
//               <div className="d-flex align-items-center justify-content-center mb-2 text-muted">
//                 <Mail className="me-2" size={16} />
//                 <span>{teacher.email}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Courses */}
//         <div className="col-md-8">
//           <h5 className="mb-3 fw-bold">Your Courses</h5>

//           {courses.length > 0 ? (
//             <div className="row row-cols-1 row-cols-md-2 g-3">
//               {courses.map((course: any) => {
//                 const info = course.courseId || {};
//                 return (
//                   <div key={course._id} className="col">
//                     <div className="card h-100 shadow-sm border-0">
//                       {info.thumbnail && (
//                         <img
//                           src={`http://localhost:5000/uploads/${info.thumbnail}`}
//                           className="card-img-top"
//                           style={{ height: 160, objectFit: "cover" }}
//                           alt={info.title}
//                         />
//                       )}
//                       <div className="card-body">
//                         <h6 className="card-title fw-bold">
//                           {info.title || course.name}
//                         </h6>
//                         <span className="badge bg-info text-dark">
//                           Students: {course.studentCount ?? 0}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <p className="text-muted">No courses assigned yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";

export default function TeacherProfilePage() {
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [teacher, setTeacher] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Get teacherId from localStorage
  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    if (id && id !== "undefined") {
      setTeacherId(id);
    } else {
      setLoading(false);
    }
  }, []);

  // 📦 Fetch teacher + enrolled courses (based on EnrolledCourse model)
  useEffect(() => {
    if (!teacherId) return;

    const fetchTeacherProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/teacher/${teacherId}`
        );
        setTeacher(res.data);
      } catch (err) {
        console.error("❌ Teacher not found:", err);
      }
    };

    // const fetchEnrolledCourses = async () => {
    //   try {
    //     const res = await axios.get(
    //       `http://localhost:5000/api/enrolledCourses/teacher/${teacherId}`
    //     );
    //     setCourses(res.data); // Already includes populated courseId and studentCount
    //   } catch (err) {
    //     console.error("❌ Failed to fetch enrolled courses:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };


    const fetchEnrolledCourses = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
    );
    console.log("✅ Profile Enrolled Courses:", res.data);
    setCourses(res.data); // use new structure: title, studentCount, etc.
  } catch (err) {
    console.error("❌ Failed to fetch enrolled courses:", err);
  } finally {
    setLoading(false);
  }
};

    fetchTeacherProfile();
    fetchEnrolledCourses();
  }, [teacherId]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!teacher)
    return <p className="text-danger text-center mt-5">Teacher not found</p>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Profile */}
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              {teacher.avatarUrl ? (
                <img
                  src={teacher.avatarUrl}
                  alt={teacher.username}
                  className="rounded-circle mb-3"
                  style={{ width: 96, height: 96, objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: 96, height: 96, fontSize: "1.5rem" }}
                >
                  {teacher.username?.substring(0, 2).toUpperCase()}
                </div>
              )}
              <h4>{teacher.username}</h4>
              <p className="text-muted mb-1">ID: {teacher.id}</p>
              <hr />
              <div className="d-flex align-items-center justify-content-center mb-2 text-muted">
                <Mail className="me-2" size={16} />
                <span>{teacher.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="col-md-8">
          <h5 className="mb-3 fw-bold">Your Enrolled Courses</h5>

          {courses.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-3">
              {/* {courses.map((course: any) => {
                const info = course.courseId || {}; // populated course
                return (
                  <div key={course._id} className="col">
                    <div className="card h-100 shadow-sm border-0">
                      {info.thumbnail && (
                        <img
                          src={`http://localhost:5000/uploads/${info.thumbnail}`}
                          className="card-img-top"
                          style={{ height: 160, objectFit: "cover" }}
                          alt={info.title}
                        />
                      )}
                      <div className="card-body">
                        <h6 className="card-title fw-bold">
                          {info.title || "Untitled Course"}
                        </h6>
                        <p className="text-muted small mb-2">
                          {info.description?.substring(0, 80)}
                        </p>
                        <span className="badge bg-info text-dark">
                          Students: {course.studentCount ?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })} */}


              {courses.map((course) => (
  <div key={course.courseId} className="col">
    <div className="card h-100 shadow-sm border-0">
      {course.image && (
        <img
          src={`http://localhost:5000${course.image}`}
          className="card-img-top"
          style={{ height: 150, objectFit: "cover" }}
          alt={course.title}
        />
      )}
      <div className="card-body">
        <h6 className="card-title fw-bold">
          {course.title || "Untitled Course"}
        </h6>
        <span className="badge bg-info text-dark">
          Students: {course.studentCount ?? 0}
        </span>
      </div>
    </div>
  </div>
))}

            </div>
          ) : (
            <p className="text-muted">No enrolled courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
