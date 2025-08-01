"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react"; // Optional icon

interface NotificationItem {
  _id: string;
  name: string;
  title: string;           // title field थपियो
  message?: string;
  createdAt: string;
  type: "student_notification";
}

const AllStudentNotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("superadminToken") ||
        localStorage.getItem("userToken");

      if (!token) {
        console.warn("No admin token found. Redirecting to login.");
        window.location.href = "/auth/adminLogin";
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/student/notifications/student/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading)
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading student notifications...</p>
      </div>
    );

  if (error)
    return (
      <div className="container py-5 text-danger text-center">
        <strong>{error}</strong>
      </div>
    );

  return (
    <div className="container py-4" style={{ maxWidth: "800px" }}>
      <div className="d-flex align-items-center mb-4">
        <Bell size={28} className="me-2 text-primary" />
        <h2 className="m-0">All Student Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <div className="alert alert-info">No student notifications found.</div>
      ) : (
        <div className="list-group shadow-sm rounded-3">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className="list-group-item list-group-item-action"
            >
              <div className="d-flex justify-content-between">
                <strong className="text-primary">{notif.name}</strong>
                <small className="text-muted">
                  {new Date(notif.createdAt).toLocaleString("en-GB")}
                </small>
              </div>

              {/* Title */}
              <div className="mt-1 fw-bold">{notif.title}</div>

              {/* Message */}
              <div className="mt-1 text-dark">
                {notif.message ?? <em>No message provided</em>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllStudentNotificationsPage;
