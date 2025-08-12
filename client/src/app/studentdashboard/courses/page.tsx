// "use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { CourseCard } from '@/app/Component/course-card';
// import { PageHeader } from '@/app/Component/page-header';

// interface Course {
//   _id: string;
//   name: string;
//   instructor: string;
//   description: string;
//   teacherId?: string;  // यदि छ भने
//   thumbnail?: string;
//   progress?: number;
// }

// interface Video {
//   _id: string;
//   title: string;
//   url: string;
// }

// export default function CoursesPage() {
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [studentId, setStudentId] = useState<string>("");
//   const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [videoLoading, setVideoLoading] = useState(false);

//   useEffect(() => {
//     const fetchStudentCourses = async () => {
//       try {
//         const token = Cookies.get("adminToken");

//         const { data: studentData } = await axios.get(
//           "http://localhost:5000/api/students/profile",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setStudentId(studentData._id);

//         const { data: courseData } = await axios.get(
//           `http://localhost:5000/api/enrolledCourses/${studentData._id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setCourses(courseData);
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentCourses();
//   }, []);

//   // When course changes, fetch videos for that course and teacher
//   useEffect(() => {
//     const fetchVideos = async () => {
//       if (!selectedCourseId) return;

//       // Find teacherId for selected course from courses array
//       const selectedCourse = courses.find(c => c._id === selectedCourseId);
//       if (!selectedCourse || !selectedCourse.teacherId) {
//         console.warn("No teacherId found for selected course");
//         setVideos([]);
//         return;
//       }

//       try {
//         setVideoLoading(true);
//         const { data } = await axios.get(
//           `http://localhost:5000/api/teacherCourses/videos/${selectedCourseId}`,
//           {
//             params: { teacherId: selectedCourse.teacherId },
//           }
//         );
//         setVideos(data);
//       } catch (error) {
//         console.error("Error fetching videos:", error);
//         setVideos([]);
//       } finally {
//         setVideoLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [selectedCourseId, courses]);

//   return (
//     <div className="container py-4">
//       <PageHeader
//         title="My Courses"
//         description="Access all your enrolled courses and track your learning progress."
//       />

//       {loading ? (
//         <p>Loading courses...</p>
//       ) : courses.length > 0 ? (
//         <>
//           <div className="row g-4">
//             {courses.map((course) => (
//               <div
//                 key={course._id}
//                 className={`col-md-4 cursor-pointer ${
//                   selectedCourseId === course._id ? "border border-primary" : ""
//                 }`}
//                 onClick={() => setSelectedCourseId(course._id)}
//               >
//                 <CourseCard course={course} />
//               </div>
//             ))}
//           </div>

//           <hr />

//           {/* <h3>Videos for selected course:</h3>
//           {videoLoading ? (
//             <p>Loading videos...</p>
//           ) : videos.length > 0 ? (
//             <ul>
//               {videos.map((video) => (
//                 <li key={video._id}>{video.title}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No videos available for this course.</p>
//           )} */}
//         </>
//       ) : (
//         <div className="text-center text-muted">
//           <p>You are not enrolled in any courses yet.</p>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { CourseCard } from '@/app/Component/course-card';
import { PageHeader } from '@/app/Component/page-header';

interface EnrolledCourse {
  _id: string;
  studentId: string;
  teacherId: string;
  instructor: string;
  courseId: {
    _id: string;
    title: string;
    instructor: string;
    description?: string;
    image?: string;
    duration?: number;
  };
  progress?: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const token = Cookies.get('studentToken');
        const { data: studentData } = await axios.get(
          'http://localhost:5000/api/students/profile',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStudentId(studentData._id);

        const { data: courseData } = await axios.get(
          `http://localhost:5000/api/enrolledCourses/${studentData._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCourses(courseData);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentCourses();
  }, []);

  return (
    <div className="container py-4">
      <PageHeader
        title="My Courses"
        description="Access all your enrolled courses and track your learning progress."
      />

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length > 0 ? (
        <div className="row g-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className={`col-md-4 cursor-pointer ${
                selectedCourseId === course.courseId._id ? 'border border-primary' : ''
              }`}
              onClick={() => setSelectedCourseId(course.courseId._id)}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted">
          <p>You are not enrolled in any courses yet.</p>
        </div>
      )}
    </div>
  );
}
