"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  progress: number;
  courseTitle?: string;
}

export default function StudentsProgress() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) return setLoading(false);

    axios
      .get(`http://localhost:5000/api/enrolledCourses/students/teacher/${teacherId}`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error loading students", err))
      .finally(() => setLoading(false));
  }, []);

  // Group students by courseTitle
  const studentsByCourse: Record<string, Student[]> = students.reduce(
    (acc, student) => {
      const course = student.courseTitle || "Unknown Course";
      if (!acc[course]) acc[course] = [];
      acc[course].push(student);
      return acc;
    },
    {} as Record<string, Student[]>
  );

  // Get only first course
  const firstCourseTitle = Object.keys(studentsByCourse)[0];
  const firstCourseStudents = studentsByCourse[firstCourseTitle] || [];

  return (
    <div className="container my-1">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <div className="mt-2">Loading...</div>
        </div>
      ) : students.length === 0 ? (
        <div className="alert alert-info text-center">
          No students enrolled yet.
        </div>
      ) : (
        <div className="card shadow-sm mb-2 border-primary">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{firstCourseTitle}</h5>
            <div className="d-flex align-items-center gap-3">
              <small>
                {firstCourseStudents.length} student
                {firstCourseStudents.length > 1 ? "s" : ""}
              </small>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => router.push("/teacherDashboard/students")}
              >
                View All
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th style={{ minWidth: "140px" }}>Progress</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {firstCourseStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="d-flex align-items-center gap-3">
                      <img
                        src={
                          student.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            student.name
                          )}&background=0D8ABC&color=fff&rounded=true`
                        }
                        alt={student.name}
                        className="rounded-circle"
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                        }}
                      />
                      <span className="fw-semibold">{student.name}</span>
                    </td>
                    <td>{student.email}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          className="progress flex-grow-1"
                          style={{ height: "10px", borderRadius: "5px" }}
                        >
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: `${student.progress}%` }}
                            aria-valuenow={student.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <small className="fw-semibold">{student.progress}%</small>
                      </div>
                    </td>
                    <td className="text-end">
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                router.push(`/teacherDashboard/students/${student.id}`)
                              }
                            >
                              View Profile
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item">Manage Grades</button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                (window.location.href = `mailto:${student.email}`)
                              }
                            >
                              Send Message
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
