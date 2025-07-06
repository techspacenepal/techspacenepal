// 'use client'
// import Link from "next/link";
// import React from "react";

// interface Course {
//   _id: string;
//   name: string;
//   instructor: string;
//   description: string;
//   thumbnail?: string;
//   progress?: number;
// }

// interface CourseDetailPageProps {
//   params: {
//     courseId: string;
//   };
// }

// export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
//   console.log("Server Course ID:", params.courseId); // Debug

//   const res = await fetch(`http://localhost:5000/api/courses/${params.courseId}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     return (
//       <div className="container mt-4">
//         <h2>Course not found</h2>
//       </div>
//     );
//   }

//   const course: Course = await res.json();

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-3">{course.name}</h1>

//       {course.thumbnail && (
//         <img
//           src={`http://localhost:5000/uploads/${course.thumbnail}`}
//           alt={course.name}
//           className="img-fluid mb-3"
//           style={{ maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
//         />
//       )}

//       <p><strong>Instructor:</strong> {course.instructor}</p>
//       <p><strong>Description:</strong> {course.description}</p>

//       {course.progress !== undefined && (
//         <>
//           <p><strong>Progress:</strong> {course.progress}%</p>
//           <div className="progress" style={{ height: "8px" }}>
//             <div
//               className="progress-bar bg-success"
//               style={{ width: `${course.progress}%` }}
//             ></div>
//           </div>
//         </>
//       )}
//       <Link href={`/Dashboard/student/courses/${course._id}`}>
//   <div className="card">...</div>
// </Link>
//     </div>
//   );
// }



// app/studentdashboard/courses/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { updateQuizProgress, updateVideoProgress } from '@/utils/progressHelpers';

export default function CourseProgressPage() {
  const { id } = useParams(); // courseId
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollment = async () => {
      const token = Cookies.get('studentToken');
      if (!token) return;

      const profileRes = await axios.get('http://localhost:5000/api/students/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const studentId = profileRes.data._id;

      const enrolledRes = await axios.get(
        `http://localhost:5000/api/enrolledCourses/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const matched = enrolledRes.data.find((e: any) => e.courseId._id === id);
      setEnrollment(matched);
      setLoading(false);
    };

    fetchEnrollment();
  }, [id]);

  const handleVideoWatch = async () => {
    if (!enrollment) return;
    const res = await updateVideoProgress(enrollment._id, 10);
    setEnrollment(res.data.enrolled);
  };

  const handleQuizPass = async () => {
    if (!enrollment) return;
    const res = await updateQuizProgress(enrollment._id, 20);
    setEnrollment(res.data.enrolled);
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (!enrollment) return <div className="container mt-5">Enrollment not found</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-3">{enrollment.courseId?.title}</h3>

      <p>
        <strong>Progress:</strong> {enrollment.progress || 0}%
      </p>
      <p>
        <strong>Start Date:</strong>{' '}
        {enrollment.startDate
          ? new Date(enrollment.startDate).toLocaleDateString()
          : 'Not started yet'}
      </p>

      {/* Buttons */}
      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-primary" onClick={handleVideoWatch}>
          🎬 Watch Video (+10%)
        </button>
        <button className="btn btn-success" onClick={handleQuizPass}>
          ✅ Pass Quiz (+20%)
        </button>
      </div>

      {/* Certificate */}
      {enrollment.progress === 100 && enrollment.certificateUrl && (
  <div className="mt-4">
    <a
      href={`http://localhost:5000${enrollment.certificateUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success"
    >
      🏆 Download Certificate
    </a>
  </div>
)}

    </div>
  );
}
