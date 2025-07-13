'use client';

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

interface EnrolledCourse {
  _id: string;
  studentId: any;
  teacherId: any;
  instructor: string;
  courseId: {
    _id: string;
    title: string;
    instructor: string;
    coursesdescription?: string;
    image?: string;
    duration?: number; 
  };
  progress?: number;
}


export function CourseCard({ course }: { course: EnrolledCourse }) {
  const courseInfo = course.courseId;

  const imageUrl = courseInfo?.image
    ? `http://localhost:5000${encodeURI(courseInfo.image)}`
    : 'https://placehold.co/600x400.png';

  console.log('🟢 Course Object:', course);
  console.log('🖼️ Final Image URL:', imageUrl);

  return (
   <Link href={{
    pathname: `/studentdashboard/courses/${courseInfo._id}`,
    query: {
      teacherId: course.teacherId,  
    },
  }}
      className="card h-100 shadow-sm hover-shadow transition-transform text-decoration-none text-dark d-flex flex-column"
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          overflow: 'hidden',
          borderTopLeftRadius: '.25rem',
          borderTopRightRadius: '.25rem',
        }}
      >
        <img
          src={imageUrl}
          alt={courseInfo.title}
          className="img-fluid"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderTopLeftRadius: '.25rem',
            borderTopRightRadius: '.25rem',
          }}
        />
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column flex-grow-1">
        <h5 className="card-title text-truncate">{courseInfo.title}</h5>
        <p className="card-subtitle text-muted mb-2 small">By {course.instructor}</p>
        

        <p
          className="card-text flex-grow-1 text-truncate"
          style={{
            WebkitLineClamp: 3,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {courseInfo.coursesdescription}
        </p>

        {/* Progress bar */}
        <div className="mb-2">
          <small className="text-muted d-flex justify-content-between">
            <span>Progress</span>
            <span>{course.progress || 0}%</span>
          </small>
          <div className="progress" style={{ height: '8px' }}>
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

        {/* View Button */}
        {/* <div className="btn btn-outline-primary w-100 mt-auto d-flex align-items-center justify-content-center">
          <BookOpen className="me-2" size={16} />
          View Course
        </div> */}
      </div>
    </Link>
  );
}




// 'use client';

// import Link from 'next/link';

// export interface Course {
//   _id: string;
//   title: string;
//   instructor: string;
//     teacherId: string;
//   coursesdescription?: string;
//   image?: string;
//   duration?: number;
// }

// interface CourseCardProps {
//   course: Course;
//   progress?: number;
// }

// export function CourseCard({ course, progress = 0 }: CourseCardProps) {
//   const imageUrl = course.image
//     ? `http://localhost:5000${encodeURI(course.image)}`
//     : 'https://placehold.co/600x400.png';

//   return (
//   <Link
//   href={{
//     pathname: `/studentdashboard/courses/${course._id}`,
//     query: {
//       teacherId: course.teacherId, 
//     },
//   }}
//   className="card h-100 shadow-sm hover-shadow transition-transform text-decoration-none text-dark d-flex flex-column"
//   style={{ cursor: 'pointer' }}
// >

//       {/* Image */}
//       <div
//         style={{
//           position: 'relative',
//           paddingBottom: '56.25%',
//           height: 0,
//           overflow: 'hidden',
//           borderTopLeftRadius: '.25rem',
//           borderTopRightRadius: '.25rem',
//         }}
//       >
//         <img
//           src={imageUrl}
//           alt={course.title}
//           className="img-fluid"
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//             borderTopLeftRadius: '.25rem',
//             borderTopRightRadius: '.25rem',
//           }}
//         />
//       </div>

//       {/* Card Body */}
//       <div className="card-body d-flex flex-column flex-grow-1">
//         <h5 className="card-title text-truncate">{course.title}</h5>
//         <p className="card-subtitle text-muted mb-2 small">By {course.instructor}</p>

//         <p
//           className="card-text flex-grow-1 text-truncate"
//           style={{
//             WebkitLineClamp: 3,
//             display: '-webkit-box',
//             WebkitBoxOrient: 'vertical',
//             overflow: 'hidden',
//           }}
//         >
//           {course.coursesdescription}
//         </p>

//         {/* Progress bar */}
//         <div className="mb-2">
//           <small className="text-muted d-flex justify-content-between">
//             <span>Progress</span>
//             <span>{progress}%</span>
//           </small>
//           <div className="progress" style={{ height: '8px' }}>
//             <div
//               className="progress-bar"
//               role="progressbar"
//               style={{ width: `${progress}%` }}
//               aria-valuenow={progress}
//               aria-valuemin={0}
//               aria-valuemax={100}
//             />
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }
