


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
//   console.log("Course ID:", params.courseId);

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
//     </div>
//   );
// }



import Link from "next/link";
import React from "react";

interface Course {
  _id: string;
  name: string;
  instructor: string;
  description: string;
  thumbnail?: string;
  progress?: number;
}

interface CourseDetailPageProps {
  params: {
    courseId: string;
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  console.log("Server Course ID:", params.courseId); // Debug

  const res = await fetch(`http://localhost:5000/api/courses/${params.courseId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="container mt-4">
        <h2>Course not found</h2>
      </div>
    );
  }

  const course: Course = await res.json();

  return (
    <div className="container mt-4">
      <h1 className="mb-3">{course.name}</h1>

      {course.thumbnail && (
        <img
          src={`http://localhost:5000/uploads/${course.thumbnail}`}
          alt={course.name}
          className="img-fluid mb-3"
          style={{ maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
        />
      )}

      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Description:</strong> {course.description}</p>

      {course.progress !== undefined && (
        <>
          <p><strong>Progress:</strong> {course.progress}%</p>
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </>
      )}
      <Link href={`/Dashboard/student/courses/${course._id}`}>
  <div className="card">...</div>
</Link>
    </div>
  );
}
