// "use client";
// // import { useEffect, useState } from "react";
// import axios from "axios";

// interface Course {
//   _id: string;
//   name: string;
//   instructor: string;
//   description: string;
//   studentId: string;
//   createdAt: string;
//   thumbnailUrl?: string;
// }

// interface Props {
//   studentId: string;
// }

// export default function EnrolledCoursesList({ studentId }: Props) {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   if (!studentId) return;

//   console.log("Fetching for studentId:", studentId); // 🧪

//   axios
//     .get(`http://localhost:5000/api/enrolledCourses/${studentId}`)
//     .then((res) => {
//       console.log("Courses fetched:", res.data); // 🧪
//       setCourses(res.data);
//       setLoading(false);
//     })
//     .catch((err) => {
//       console.error("Error fetching courses:", err);
//       setLoading(false);
//     });
// }, [studentId]);


//   return (
//     <div className="container mt-5">
//       <h4 className="mb-3">Enrolled Courses</h4>
//       {loading ? (
//         <p>Loading...</p>
//       ) : courses.length > 0 ? (
//         courses.map((course) => (
//           <div key={course._id} className="card mb-3 shadow-sm">
//             <div className="card-body">
//               <h5 className="card-title">{course.name || "Unnamed Course"}</h5>
//               <h6 className="card-subtitle text-muted mb-2">
//                 Instructor: {course.instructor || "Unknown"}
//               </h6>
//               <p className="card-text">{course.description || "No description."}</p>
//               {course.thumbnailUrl && (
//                 <img
//                   src={`http://localhost:5000/${course.thumbnailUrl}`}
//                   alt="thumbnail"
//                   className="img-fluid rounded mb-2"
//                   style={{ maxWidth: "200px" }}
//                 />
//               )}
//               <p className="text-muted small">Enrolled ID: {course._id}</p>
//               <p className="text-muted small">
//                 Enrolled At: {new Date(course.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-muted">No enrolled courses found.</p>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourseCard } from "@/app/Component/course-card"; // your course card component
import { useAuth } from "../context/AuthContext"; // your auth context

interface EnrolledCourse {
  _id: string;
  enrolledDate: string; // new field
  courseId: {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    image: string;
  };
}

export default function StudentCourses() {
  const studentId = useAuth(); // get studentId from context
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:5000/api/enrolledCourses/${studentId}`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching enrolled courses", err))
      .finally(() => setLoading(false));
  }, [studentId]);

  if (loading) return <div>Loading...</div>;

  if (courses.length === 0)
    return <div>You have not enrolled in any courses yet.</div>;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Your Enrolled Courses</h4>
      <div className="row g-3">
        {courses.map((enrolled) => (
          <div className="col-md-4" key={enrolled._id}>
            <CourseCard course={enrolled.courseId} />
            <p className="mt-2 text-sm text-gray-500">
              Enrolled on:{" "}
              {new Date(enrolled.enrolledDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
