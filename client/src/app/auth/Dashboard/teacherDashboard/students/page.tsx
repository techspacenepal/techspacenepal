
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

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const router = useRouter();

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) return setLoading(false);

    axios
      .get(
        `http://localhost:5000/api/enrolledCourses/students/teacher/${teacherId}`
      )
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error loading students", err))
      .finally(() => setLoading(false));
  }, []);

  // Group students by course
  const studentsByCourse: Record<string, Student[]> = students.reduce(
    (acc, student) => {
      const course = student.courseTitle || "Unknown Course";
      if (!acc[course]) acc[course] = [];
      acc[course].push(student);
      return acc;
    },
    {} as Record<string, Student[]>
  );

  // Extract unique course titles
  const courseTitles = Array.from(
    new Set(students.map((s) => s.courseTitle || "Unknown Course"))
  );

  // Filter logic
  const filteredStudentsByCourse =
    selectedCourse === "All"
      ? studentsByCourse
      : { [selectedCourse]: studentsByCourse[selectedCourse] || [] };

  return (
    <div className="container my-5">
      <header className="mb-4">
        <h1 className="display-4 fw-bold">Student Roster</h1>
        <p className="lead text-secondary">
          Students enrolled in your courses, grouped by course.
        </p>
      </header>

      {/* Button Filter UI */}
      <div className="mb-4 d-flex flex-wrap gap-2">
        <button
          className={`btn btn-${
            selectedCourse === "All" ? "primary" : "outline-primary"
          }`}
          onClick={() => setSelectedCourse("All")}
        >
          All
        </button>
        {courseTitles.map((title) => (
          <button
            key={title}
            className={`btn btn-${
              selectedCourse === title ? "primary" : "outline-primary"
            }`}
            onClick={() => setSelectedCourse(title)}
          >
            {title}
          </button>
        ))}
      </div>

      {/* Content */}
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
        Object.entries(filteredStudentsByCourse).map(
          ([courseTitle, courseStudents]) => (
            <div
              key={courseTitle}
              className="card shadow-sm mb-5 border-primary"
            >
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{courseTitle}</h5>
                <small>
                  {courseStudents.length} student
                  {courseStudents.length > 1 ? "s" : ""}
                </small>
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
                    {courseStudents.map((student) => (
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
                            <small className="fw-semibold">
                              {student.progress}%
                            </small>
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="dropdown">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul
                              className="dropdown-menu dropdown-menu-end shadow-sm rounded-2 p-2"
                              style={{ minWidth: "200px" }}
                            >
                              <li>
                                <button
                                  className="dropdown-item d-flex align-items-center gap-2"
                                  onClick={() =>
                                    router.push(
                                      `/teacherDashboard/students/${student.id}`
                                    )
                                  }
                                >
                                  <i className="bi bi-person-lines-fill"></i>{" "}
                                  View Profile
                                </button>
                              </li>

                              <li>
                                <button className="dropdown-item d-flex align-items-center gap-2">
                                  <i className="bi bi-journal-text"></i> Manage Grades
                                </button>
                              </li>

                              <li>
                                <hr className="dropdown-divider my-1" />
                              </li>

                              <li className="text-center">
                                <button
                                  className="btn btn-sm btn-outline-primary w-100"
                                  onClick={() =>
                                    window.open(
                                      `https://mail.google.com/mail/?view=cm&fs=1&to=${student.email}`,
                                      "_blank"
                                    )
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
          )
        )
      )}
    </div>
  );
}
