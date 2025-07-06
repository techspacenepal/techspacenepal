
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// interface Announcement {
//   _id: string;
//   title: string;
//   content: string;
//   date: string;
//   author: string;
// }

// export default function AnnouncementsPage() {
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       const res = await axios.get("http://localhost:5000/api/announcements");
//       setAnnouncements(res.data);
//     };
//     fetchAnnouncements();
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto mt-6 p-4">
//       <h1 className="text-2xl font-bold mb-4">Announcements</h1>
//       {announcements.map((ann) => (
//         <div key={ann._id} className="border p-4 mb-4 rounded shadow">
//           <h2 className="text-lg font-semibold">{ann.title}</h2>
//           <p className="text-sm text-gray-600">
//             {new Date(ann.date).toLocaleDateString()} by {ann.author}
//           </p>
//           <p className="mt-2">{ann.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface Announcement {
  _id: string;
  title: string;
  content?: string;
  message?: string;
  date: string;
  createdAt?: string;
  author: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [notifications, setNotifications] = useState<Announcement[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);

  // ✅ Step 1: Get student ID from profile
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = Cookies.get("studentToken");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/students/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudentId(res.data._id);
      } catch (err) {
        console.error("Error fetching student profile", err);
      }
    };

    fetchStudent();
  }, []);

  // ✅ Step 2: Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements");
        setAnnouncements(res.data);
      } catch (err) {
        console.error("Error fetching announcements", err);
      }
    };

    fetchAnnouncements();
  }, []);

  // ✅ Step 3: Fetch personal notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("studentToken");
        if (!token || !studentId) return;

        const res = await axios.get(
          `http://localhost:5000/api/notifications/student/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching student notifications", err);
      }
    };

    if (studentId) fetchNotifications();
  }, [studentId]);

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 space-y-6">
      {/* 🔔 My Notifications */}
      <section>
        <h1 className="text-2xl font-bold mb-4 text-green-600">🔔 My Notifications</h1>
        {notifications.length > 0 ? (
          notifications.map((notify) => (
            <div key={notify._id} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-lg font-semibold">{notify.title}</h2>
              <p className="text-sm text-gray-600">
                {new Date(notify.createdAt || notify.date).toLocaleString()}
              </p>
              <p className="mt-2">{notify.message}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No personal notifications available.</p>
        )}
      </section>

      <hr className="my-6" />

      {/* 📢 General Announcements */}
      <section>
        <h1 className="text-2xl font-bold mb-4 text-blue-600">📢 General Announcements</h1>
        {announcements.length > 0 ? (
          announcements.map((ann) => (
            <div key={ann._id} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-lg font-semibold">{ann.title}</h2>
              <p className="text-sm text-gray-600">
                {new Date(ann.date || ann.createdAt).toLocaleDateString()} by {ann.author}
              </p>
              <p className="mt-2">{ann.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No announcements found.</p>
        )}
      </section>
    </div>
  );
}

