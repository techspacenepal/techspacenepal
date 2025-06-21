// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { BookOpen } from "lucide-react";

// interface Course {
//   _id: string;
//   name: string;
//   instructor: string;
//   description?: string;
//   thumbnail?: string;
//   progress?: number; // optional: backend ले नपठाए पनि OK
// }

// export function CourseCard({ course }: { course: Course }) {
//   return (
//     <div className="card h-100 shadow-sm hover-shadow transition-transform">
//       <Link href={`/studentdashboard/courses/${course._id}`}>
//         <div
//           style={{
//             position: "relative",
//             paddingBottom: "56.25%",
//             height: 0,
//             overflow: "hidden",
//           }}
//         >
//           <img
//             src={
//               course.thumbnail
//                 ? `http://localhost:5000/uploads/${course.thumbnail.replace(
//                     /^\/?uploads\/?/,
//                     ""
//                   )}`
//                 : "https://placehold.co/600x400.png"
//             }
//             alt={course.name}
//             className="img-fluid"
//           />
//         </div>
//       </Link>
//       <div className="card-body d-flex flex-column">
//         <Link href={`/studentdashboard/courses/${course._id}`}>
//           <h5 className="card-title text-truncate">{course.name}</h5>
//         </Link>
//         <p className="card-subtitle text-muted mb-2 small">
//           By {course.instructor}
//         </p>
//         <p
//           className="card-text flex-grow-1 text-truncate"
//           style={{
//             WebkitLineClamp: 3,
//             display: "-webkit-box",
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//           }}
//         >
//           {course.description}
//         </p>

//         {/* Progress bar (optional) */}
//         <div className="mb-2">
//           <small className="text-muted d-flex justify-content-between">
//             <span>Progress</span>
//             <span>{course.progress || 0}%</span>
//           </small>
//           <div className="progress" style={{ height: "8px" }}>
//             <div
//               className="progress-bar"
//               role="progressbar"
//               style={{ width: `${course.progress || 0}%` }}
//               aria-valuenow={course.progress || 0}
//               aria-valuemin={0}
//               aria-valuemax={100}
//             />
//           </div>
//         </div>

//         <Link href={`/studentdashboard/courses/${course._id}`}>
//           <button className="btn btn-outline-primary w-100 mt-auto d-flex align-items-center justify-content-center">
//             <BookOpen className="me-2" size={16} />
//             View Course
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }




import Link from "next/link";
import { BookOpen } from "lucide-react";

interface Course {
  _id: string;
  name: string;
  instructor: string;
  description?: string;
  thumbnail?: string;
  progress?: number;
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/studentdashboard/courses/${course._id}`}
      className="card h-100 shadow-sm hover-shadow transition-transform text-decoration-none text-dark d-flex flex-column"
      style={{ cursor: "pointer" }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 ratio
          height: 0,
          overflow: "hidden",
          borderTopLeftRadius: ".25rem",
          borderTopRightRadius: ".25rem",
        }}
      >
        <img
          src={
            course.thumbnail
              ? `http://localhost:5000/uploads/${course.thumbnail.replace(
                  /^\/?uploads\/?/,
                  ""
                )}`
              : "https://placehold.co/600x400.png"
          }
          alt={course.name}
          className="img-fluid"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: ".25rem", borderTopRightRadius: ".25rem" }}
        />
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column flex-grow-1">
        <h5 className="card-title text-truncate">{course.name}</h5>
        <p className="card-subtitle text-muted mb-2 small">By {course.instructor}</p>
        <p
          className="card-text flex-grow-1 text-truncate"
          style={{
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.description}
        </p>

        {/* Progress bar */}
        <div className="mb-2">
          <small className="text-muted d-flex justify-content-between">
            <span>Progress</span>
            <span>{course.progress || 0}%</span>
          </small>
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${course.progress || 0}%` }}
              aria-valuenow={course.progress || 0}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* View Course Button styled as a div for visual only */}
        <div className="btn btn-outline-primary w-100 mt-auto d-flex align-items-center justify-content-center">
          <BookOpen className="me-2" size={16} />
          View Course
        </div>
      </div>
    </Link>
  );
}


