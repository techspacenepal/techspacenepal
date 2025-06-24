// "use client";

// import { Bell } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// export function Notifications() {
//   const [announcements, setAnnouncements] = useState<any[]>([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Dropdown reference for click outside detection
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Fetch announcements and calculate unread count
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const token = Cookies.get("adminToken");
//         if (!token) return;

//         const res = await axios.get("http://localhost:5000/api/announcements", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const all = res.data;

//         // Get the last seen time from local storage
//         const lastSeen = localStorage.getItem("lastSeenAnnouncementTime");
//         const lastSeenDate = lastSeen ? new Date(lastSeen) : new Date(0);

//         // Filter announcements posted after last seen
//         const recent = all.filter((a: any) => {
//           const postedDate = new Date(a.date);
//           return postedDate > lastSeenDate;
//         });

//         setAnnouncements(all);
//         setUnreadCount(recent.length); // 🔴 Show red badge count
//       } catch (err) {
//         console.error("Error fetching announcements", err);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);

//     // When opened, mark all as seen (clear red count)
//     if (!dropdownOpen) {
//       localStorage.setItem("lastSeenAnnouncementTime", new Date().toISOString());
//       setUnreadCount(0);
//     }
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false);
//       }
//     };

//     // Add and clean up event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="position-relative me-3" ref={dropdownRef}>
//       {/* 🔔 Notification bell icon */}
//       <button
//         className="btn btn-light position-relative"
//         onClick={toggleDropdown}
//       >
//         <Bell size={22} />
//         {/* 🔴 Red badge with unread count */}
//         {unreadCount > 0 && (
//           <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* 📋 Dropdown showing announcements */}
//       {dropdownOpen && (
//         <div
//           className="position-absolute end-0 mt-2 p-3 bg-white border rounded shadow-sm z-10"
//           style={{ width: "300px" }}
//         >
//           <h6 className="mb-2">Recent Announcements</h6>
//           {announcements.length > 0 ? (
//             announcements.map((a: any) => (
//               <div key={a._id} className="mb-2 border-bottom pb-2">
//                 <strong>{a.title}</strong>
//                 <div className="text-muted small">{a.author}</div>
//               </div>
//             ))
//           ) : (
//             <p className="text-muted small">No recent announcements.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface NotificationsProps {
  userId: string;  // student/user id
}

export function Notifications({ userId }: NotificationsProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = Cookies.get("adminToken");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/announcements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const all = res.data;

        // Use user-specific last seen key
        const lastSeenKey = `lastSeenAnnouncementTime_${userId}`;
        const lastSeen = localStorage.getItem(lastSeenKey);
        const lastSeenDate = lastSeen ? new Date(lastSeen) : new Date(0);

        const recent = all.filter((a: any) => {
          const postedDate = new Date(a.date);
          return postedDate > lastSeenDate;
        });

        setAnnouncements(all);
        setUnreadCount(recent.length);
      } catch (err) {
        console.error("Error fetching announcements", err);
      }
    };

    fetchAnnouncements();
  }, [userId]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);

    if (!dropdownOpen) {
      const lastSeenKey = `lastSeenAnnouncementTime_${userId}`;
      localStorage.setItem(lastSeenKey, new Date().toISOString());
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative me-3" ref={dropdownRef}>
      <button
        className="btn btn-light position-relative"
        onClick={toggleDropdown}
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div
          className="position-absolute end-0 mt-2 p-3 bg-white border rounded shadow-sm z-10"
          style={{ width: "300px" }}
        >
          <h6 className="mb-2">Recent Announcements</h6>
          {announcements.length > 0 ? (
            announcements.map((a: any) => (
              <div key={a._id} className="mb-2 border-bottom pb-2">
                <strong>{a.title}</strong>
                <div className="text-muted small">{a.author}</div>
              </div>
            ))
          ) : (
            <p className="text-muted small">No recent announcements.</p>
          )}
        </div>
      )}
    </div>
  );
}
