// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CourseCard } from "@/app/Component/course-card";
// import { useAuth } from "../context/AuthContext";

// interface EnrolledCourse {
//   _id: string;
//   enrolledDate: string;
//   courseId: {
//     _id: string;
//     title: string;
//     description: string;
//     instructor: string;
//     image: string;
//   };
// }

// interface Course {
//   _id: string;
//   title: string;
//   description: string;
//   instructor: string;
//   image: string;
// }

// export default function StudentCourses() {
//   const studentId = useAuth(); // get studentId from context
//   const [courses, setCourses] = useState<EnrolledCourse[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!studentId) return;

//     axios
//       .get(`http://localhost:5000/api/enrolledCourses/${studentId}`)
//       .then((res) => setCourses(res.data))
//       .catch((err) => console.error("Error fetching enrolled courses", err))
//       .finally(() => setLoading(false));
//   }, [studentId]);

//   if (loading) return <div>Loading...</div>;

//   if (courses.length === 0)
//     return <div>You have not enrolled in any courses yet.</div>;

//   return (
//     <div className="container mt-4">
//       <h4 className="mb-3">Your Enrolled Courses</h4>
//       <div className="row g-3">
//         {courses.map((enrolled) => (
//           <div className="col-md-4" key={enrolled._id}>
//             <CourseCard course ={enrolled.courseId} />
//             <p className="mt-2 text-sm text-gray-500">
//               Enrolled on:{" "}
//               {new Date(enrolled.enrolledDate).toLocaleDateString(undefined, {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CourseCard } from "@/app/Component/course-card";
import { useAuth } from "../context/AuthContext";

interface EnrolledCourse {
  _id: string;
  enrolledDate: string;
  studentId: string;
  teacherId: string;
  instructor: string;
  progress?: number;
  courseId: {
    _id: string;
    title: string;
    instructor: string;
    coursesdescription?: string;
    image?: string;
    duration?: number;
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
            {/* <CourseCard course={enrolled.courseId} /> */}
           <CourseCard course={enrolled} />


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
