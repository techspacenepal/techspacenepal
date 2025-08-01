"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter,  } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import * as UAParser from "ua-parser-js";

interface Student {
  _id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  avatarUrl?: string;
  joinDate?: string;
  number?: string;
  status?: "active" | "inactive" | "graduated";
}

interface LoginSession {
  _id: string;
  deviceInfo: string;
  ipAddress: string;
  loginAt: string;
  isActive?: boolean;
}

function parseDeviceInfo(userAgent: string) {
  if (!userAgent) return "Unknown Device";

  const parser = new UAParser.UAParser(userAgent);
  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  let deviceName = "";

  if (device.vendor && device.model) {
    deviceName = `${device.vendor} ${device.model}`;
  } else if (device.type === "mobile") {
    deviceName = "Mobile Device";
  } else if (device.type === "tablet") {
    deviceName = "Tablet";
  } else if (!device.type && os.name === "Windows") {
    deviceName = "Windows Desktop or Laptop";
  } else if (!device.type && os.name === "Mac OS") {
    deviceName = "MacBook or iMac";
  } else {
    deviceName = "Desktop";
  }

  const osName = os.name || "Unknown OS";
  const browserName = browser.name || "Unknown Browser";

  return `${deviceName} | ${browserName} (${osName})`;
}

export default function StudentDetailPage() {

  const router = useRouter();
  const params = useParams() as { studentId?: string | string[] } | null;
const studentId = params && !Array.isArray(params.studentId) ? params.studentId : "";


  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sessions, setSessions] = useState<LoginSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

useEffect(() => {
  console.log("useEffect triggered");
  console.log("studentId:", studentId);

  if (!studentId) {
    console.warn("No studentId found, skipping fetch");
    return;
  }
  
  const token = Cookies.get("adminToken");
   const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("adminToken:", token);

 if (!token || user?.role !== "admin") {
    console.warn("No token found, redirecting to adminLogin");
    router.push("/auth/adminLogin");
    return;
  }

  // Fetch student details
  axios
    .get(`http://localhost:5000/api/students/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("Student data fetched:", res.data);
      setStudent(res.data);
      setError(null);
    })
    .catch((err) => {
      console.error("Error fetching student:", err);
      if (err.response?.status === 401) {
        console.warn("Unauthorized, redirecting to adminLogin");
        router.push("/auth/adminLogin");
      } else {
        setError("Failed to load student");
      }
    })
    .finally(() => {
      console.log("Student fetch finished");
      setLoading(false);
    });

  // Fetch login sessions (devices)
  axios
    .get(`http://localhost:5000/api/students/${studentId}/login-sessions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("Login sessions fetched:", res.data);
      setSessions(res.data);
    })
    .catch((err) => {
      console.error("Failed to load login sessions", err);
      if (err.response?.status === 401) {
        console.warn("Unauthorized, redirecting to adminLogin");
        router.push("/auth/adminLogin");
      }
    })
    .finally(() => {
      console.log("Login sessions fetch finished");
      setLoadingSessions(false);
    });
}, [studentId, router]);


  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "success";
    if (progress >= 60) return "info";
    if (progress >= 40) return "warning";
    return "danger";
  };

  const getStatusBadge = (status?: string) => {
    const statusColors = {
      active: "success",
      inactive: "secondary",
      graduated: "primary",
    };
    return statusColors[status as keyof typeof statusColors] || "secondary";
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p className="text-muted">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <strong>Error:</strong> {error || "Student not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Left Profile Card */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm text-center">
            <div className="card-body">
              {student.avatarUrl ? (
                <img
                  src={
                    student.avatarUrl.startsWith("http")
                      ? student.avatarUrl
                      : `http://localhost:5000${student.avatarUrl}`
                  }
                  alt={student.name}
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-primary text-white fw-bold d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    fontSize: "2.5rem",
                  }}
                >
                  {student.name?.substring(0, 2).toUpperCase()}
                </div>
              )}

              <h4 className="mb-1">{student.name}</h4>
              <p className="text-muted">{student.email}</p>

              {student.status && (
                <span
                  className={`badge bg-${getStatusBadge(student.status)} mb-2`}
                >
                  {student.status.charAt(0).toUpperCase() +
                    student.status.slice(1)}
                </span>
              )}

              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() =>
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${student.email}`,
                    "_blank"
                  )
                }
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* Right Details */}
        <div className="col-lg-8">
          {/* Course Progress Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">Course Progress</h5>
            </div>
            <div className="card-body">
              <h6>{student.course}</h6>
              <div className="progress" style={{ height: "8px" }}>
                <div
                  className={`progress-bar bg-${getProgressColor(
                    student.progress
                  )}`}
                  style={{ width: `${student.progress}%` }}
                  role="progressbar"
                />
              </div>
              <small className="text-muted mt-1 d-block">
                {student.progress}% Complete
              </small>
            </div>
          </div>

          {/* Student Info Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">Student Info</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <Info label="Full Name" value={student.name} />
                <Info
                  label="Email"
                  value={student.email}
                  isLink={`mailto:${student.email}`}
                />
                <Info label="Course" value={student.course} />
                <Info label="Progress" value={`${student.progress}%`} />
                {student.number && (
                  <Info
                    label="Phone"
                    value={student.number}
                    isLink={`tel:${student.number}`}
                  />
                )}
                {student.joinDate && (
                  <Info
                    label="Join Date"
                    value={new Date(student.joinDate).toLocaleDateString()}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Login Sessions (Devices) Card */}
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">Recent Login Devices</h5>
            </div>
            <div className="card-body">
              {loadingSessions ? (
                <p>Loading devices...</p>
              ) : sessions.length === 0 ? (
                <p className="text-muted">No login device data available.</p>
              ) : (
                <ul className="list-group">
                  {sessions.map((session) => (
                    <li key={session._id} className="list-group-item">
                      <strong>Device:</strong> {parseDeviceInfo(session.deviceInfo)} <br />
                      <strong>IP:</strong> {session.ipAddress} <br />
                      <small className="text-muted">
                        Logged in at: {new Date(session.loginAt).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  isLink,
  color = "primary",
}: {
  label: string;
  value: string;
  isLink?: string;
  color?: "primary" | "danger" | "warning" | "success" | "info" | "secondary";
}) {
  return (
    <div className="col-md-6">
      <div className={`border-start border-4 ps-3 border-${color}`}>
        <small className="text-muted text-uppercase fw-bold">{label}</small>
        <div className="fw-semibold">
          {isLink ? (
            <a href={isLink} className="text-decoration-none">
              {value}
            </a>
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
}
