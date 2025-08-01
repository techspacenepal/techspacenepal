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
    <div className="container mt-5">
      {/* 🔔 My Notifications */}
     <section className="mb-5">
  <h2 className="mb-3 fw-bold text-danger"> Notifications from Your Teacher</h2>
  {notifications.length > 0 ? (
    <ul className="list-group">
      {notifications.map((notify) => (
        <li key={notify._id} className="list-group-item">
          <div className="d-flex justify-content-between align-items-center">
            <strong>{notify.title}</strong>
            <small className="text-muted">
              {new Date(notify.createdAt || notify.date).toLocaleString()}
            </small>
          </div>
          <div className="text-muted">This message was sent by your teacher</div>
          <div className="mt-1">{notify.message}</div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-muted fst-italic">No notifications from your teacher at the moment.</p>
  )}
</section>


      <hr className="my-5" />

      {/* 📢 General Announcements */}
      <section>
        <h2 className="mb-3 fw-bold text-primary">📢 General Announcements</h2>
        {announcements.length > 0 ? (
          <ul className="list-group">
            {announcements.map((ann) => (
              <li key={ann._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{ann.title}</strong>
                  <small className="text-muted">
                    {new Date(ann.date ?? ann.createdAt ?? "").toLocaleDateString()}
                  </small>
                </div>
                <div className="text-muted">By {ann.author}</div>
                <div className="mt-1">{ann.content}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted fst-italic">No announcements found.</p>
        )}
      </section>
    </div>
  );
}
