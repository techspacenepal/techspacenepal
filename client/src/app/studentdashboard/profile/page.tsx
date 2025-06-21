

"use client";

import { PageHeader } from "@/app/Component/page-header";
import { CalendarDays, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const [student, setStudent] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = Cookies.get("adminToken");

        // ✅ Step 1: Get student profile using token
        const profileRes = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const studentData = profileRes.data;
        setStudent(studentData);

        // ✅ Step 2: Get enrolled courses by student._id
        const courseRes = await axios.get(
          `http://localhost:5000/api/enrolledCourses/${studentData._id}`
        );

        setCourses(courseRes.data);
      } catch (error) {
        console.error("❌ Error fetching profile or courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className="container py-4">
      <PageHeader
        title="My Profile"
        description="View and manage your personal information."
      />

      <div className="row g-4">
        {/* Profile Section */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={student.username}
                  className="rounded-circle mb-3"
                  style={{ width: "96px", height: "96px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-3 mx-auto"
                  style={{
                    width: "96px",
                    height: "96px",
                    fontSize: "1.5rem",
                    color: "white",
                  }}
                >
                  {student.username?.substring(0, 2).toUpperCase()}
                </div>
              )}

              <h4>{student.username}</h4>
              <p className="text-muted mb-2">ID: {student._id}</p>
              <hr />
              <div className="d-flex align-items-center justify-content-center mb-2">
                <Mail className="me-2 text-muted" />
                <span>{student.email}</span>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <CalendarDays className="me-2 text-muted" />
                <span>
                  Joined: {new Date(student.createdAt).toDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="col-md-8">
          <h5 className="mb-3">My Enrolled Courses</h5>

          {courses.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {courses.map((course) => (
                <div key={course._id} className="col">
                  <div className="card border-0 shadow-sm h-100 rounded-3 overflow-hidden">
                    <div className="row g-0 h-100">
                      {course.thumbnail && (
                        <div className="col-md-4 d-flex align-items-center">
                          <img
                            src={`http://localhost:5000/uploads/${course.thumbnail}`}
                            alt={course.name}
                            className="img-fluid w-100 h-100 object-fit-cover"
                          />
                        </div>
                      )}
                      <div
                        className={course.thumbnail ? "col-md-8" : "col-12"}
                      >
                        <div className="card-body">
                          <h5 className="card-title fw-bold">
                            {course.name}
                          </h5>
                          <p className="mb-1 text-secondary">
                            <strong>Instructor:</strong> {course.instructor}
                          </p>
                          <p className="text-muted small mb-2">
                            {course.description}
                          </p>
                          <hr className="my-2" />
                          <div className="d-flex justify-content-between text-muted small">
                            <span>ID: {course._id}</span>
                            <span>
                              Enrolled:{' '}
                              {new Date(course.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">You have not enrolled in any courses yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}



