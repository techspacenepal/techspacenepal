"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
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


// Function to parse device info
// function parseDeviceInfo(userAgent: string) {
//   if (!userAgent) return "Unknown Device";

 
//   const parser = new UAParser.UAParser(userAgent);
//   const device = parser.getDevice();  // device.vendor, device.model, device.type
//   const os = parser.getOS();           // os.name, os.version
//   const browser = parser.getBrowser(); // browser.name, browser.version

//   // Compose a readable device name:
//   let deviceName = "";

//   if (device.vendor && device.model) {
//     deviceName = `${device.vendor} ${device.model}`;  // e.g. "Apple iPhone"
//   } else if (device.type) {
//     deviceName = device.type.charAt(0).toUpperCase() + device.type.slice(1); // e.g. "Tablet", "Mobile"
//   } else {
//     deviceName = "Desktop";
//   }

//   return `${deviceName} - ${browser.name} (${os.name})`;
// }
function parseDeviceInfo(userAgent: string) {
  if (!userAgent) return "Unknown Device";

  const parser = new UAParser.UAParser(userAgent);
  const device = parser.getDevice();      // { vendor, model, type }
  const os = parser.getOS();              // { name, version }
  const browser = parser.getBrowser();    // { name, version }

  let deviceName = "";

  if (device.vendor && device.model) {
    // For mobile devices (e.g. Apple iPhone, Samsung SM-G991B)
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
  const { studentId } = useParams() as { studentId: string };

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sessions, setSessions] = useState<LoginSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  // Fetch student details
  useEffect(() => {
    if (studentId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/students/${studentId}`)
        .then((res) => {
          setStudent(res.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching student:", err);
          setError("Failed to load student");
        })
        .finally(() => setLoading(false));
    }
  }, [studentId]);

  // Fetch login sessions (devices)
  useEffect(() => {
    if (studentId) {
      setLoadingSessions(true);
      axios
        .get(`http://localhost:5000/api/students/${studentId}/login-sessions`)
        .then((res) => {
          setSessions(res.data);
        })
        .catch((err) => {
          console.error("Failed to load login sessions", err);
        })
        .finally(() => setLoadingSessions(false));
    }
  }, [studentId]);

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
              {/* Avatar Display */}
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
