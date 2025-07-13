
"use client";

import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function Notifications() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Step 1: Fetch student ID from profile
  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const token = Cookies.get("studentToken");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/students/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudentId(res.data._id);
      } catch (error) {
        console.error("Error fetching student profile", error);
      }
    };

    fetchStudentId();
  }, []);

  // ✅ Step 2: Fetch both notifications & announcements
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("studentToken");
        if (!token || !studentId) return;

        // Fetch student notifications
        const notifyRes = await axios.get(
          `http://localhost:5000/api/notifications/student/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allNotifications = notifyRes.data;

        const notifyKey = `lastSeenStudentNotify_${studentId}`;
        const notifyLastSeen = localStorage.getItem(notifyKey);
        const notifyLastSeenDate = notifyLastSeen ? new Date(notifyLastSeen) : new Date(0);
        const newNotifies = allNotifications.filter(
          (n: any) => new Date(n.createdAt) > notifyLastSeenDate
        );

        setNotifications(allNotifications);

        // Fetch announcements (general)
        const announceRes = await axios.get("http://localhost:5000/api/announcements", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allAnnouncements = announceRes.data;
        const annKey = `lastSeenAnnouncementTime_${studentId}`;
        const annLastSeen = localStorage.getItem(annKey);
        const annLastSeenDate = annLastSeen ? new Date(annLastSeen) : new Date(0);
        const newAnnounces = allAnnouncements.filter(
          (a: any) => new Date(a.date || a.createdAt) > annLastSeenDate
        );

        setAnnouncements(allAnnouncements);

        // Total unread count
        setUnreadCount(newNotifies.length + newAnnounces.length);
      } catch (err) {
        console.error("Error fetching notifications or announcements", err);
      }
    };

    if (studentId) fetchData();
  }, [studentId]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen && studentId) {
      localStorage.setItem(`lastSeenStudentNotify_${studentId}`, new Date().toISOString());
      localStorage.setItem(`lastSeenAnnouncementTime_${studentId}`, new Date().toISOString());
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative me-3" ref={dropdownRef}>
      <button className="btn btn-light position-relative" onClick={toggleDropdown}>
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
          style={{ width: "350px", maxHeight: "450px", overflowY: "auto" }}
        >
          <h6 className="mb-2 text-success">🔔 My Notifications</h6>
          {notifications.length > 0 ? (
            notifications.map((notify) => (
              <div key={notify._id} className="mb-2 border-bottom pb-2">
                <strong>{notify.title}</strong>
                <div>{notify.message}</div>
                <small className="text-muted d-block mt-1">
                  {new Date(notify.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-muted fst-italic">No personal notifications.</p>
          )}

          <hr className="my-3" />

          <h6 className="mb-2 text-primary">📢 Announcements</h6>
          {announcements.length > 0 ? (
            announcements.map((a) => (
              <div key={a._id} className="mb-2 border-bottom pb-2">
                <strong>{a.title}</strong>
                <div className="text-muted small">{a.author}</div>
                <small className="text-muted d-block mt-1">
                  {new Date(a.date || a.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-muted fst-italic">No recent announcements.</p>
          )}
        </div>
      )}
    </div>
  );
}
