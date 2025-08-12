
//  course anushar notification jane 

// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// export default function TeacherNotificationForm() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [selectedCourseId, setSelectedCourseId] = useState("");
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const teacherId = localStorage.getItem("teacherId");
//         if (!teacherId) return;

//         const res = await axios.get(
//           `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
//         );
//         setCourses(res.data);
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedCourseId) {
//       alert("Please select a course.");
//       return;
//     }

//     try {
//     const token = Cookies.get("teacherToken") || Cookies.get("adminToken");


//       if (!token) {
//         alert("Missing auth token");
//         return;
//       }

//       await axios.post(
//         "http://localhost:5000/api/notifications/sendToCourse",
//         {
//           courseId: selectedCourseId,
//           title,
//           message,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );


//       alert("✅ Notification sent to all students in selected course.");
//       setTitle("");
//       setMessage("");
//       setSelectedCourseId("");
//     } catch (error) {
//       console.error("❌ Failed to send notification:", error);
//       alert("❌ Failed to send notification");
//     }
//   };

//   return (
//     <div className="container py-5" style={{ maxWidth: 600 }}>
//       <h3 className="mb-4">📣 Send Notification to All Students in a Course</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="courseSelect" className="form-label">
//             Select Course
//           </label>
//           <select
//             id="courseSelect"
//             className="form-select"
//             value={selectedCourseId}
//             onChange={(e) => setSelectedCourseId(e.target.value)}
//             required
//           >
//             <option value="">-- Select Course --</option>
//             {courses.map((course) => (
//               <option key={course._id} value={course._id}>
//                 {course.title}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-3">
//           <label htmlFor="titleInput" className="form-label">
//             Title
//           </label>
//           <input
//             id="titleInput"
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="messageInput" className="form-label">
//             Message
//           </label>
//           <textarea
//             id="messageInput"
//             className="form-control"
//             rows={4}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           🚀 Send Notification
//         </button>
//       </form>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function TeacherNotificationForm() {
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const teacherId = localStorage.getItem("teacherId");
        if (!teacherId) return;

        const res = await axios.get(
          `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
        );
        setCourses(res.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourseId) {
      alert("Please select a course.");
      return;
    }

    try {
      const token = Cookies.get("teacherToken") || Cookies.get("adminToken");
      console.log("Sending token:", token);
      if (!token) {
        alert("Missing auth token");
        return;
      }

        await axios.post(
  "http://localhost:5000/api/teacherNotifications/sendToCourse",
  {
    courseId : selectedCourseId,
    title,
    message,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("teacherToken")}`,
    },
  }
);


      alert("✅ Notification sent to all students in selected course.");
      setTitle("");
      setMessage("");
      setSelectedCourseId("");
    } catch (error) {
      console.error("❌ Failed to send notification:", error);
      alert("❌ Failed to send notification");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <h3 className="mb-4">📣 Send Notification to All Students in a Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseSelect" className="form-label">
            Select Course
          </label>
          <select
            id="courseSelect"
            className="form-select"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="titleInput" className="form-label">
            Title
          </label>
          <input
            id="titleInput"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="messageInput" className="form-label">
            Message
          </label>
          <textarea
            id="messageInput"
            className="form-control"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          🚀 Send Notification
        </button>
      </form>
    </div>
  );
}
