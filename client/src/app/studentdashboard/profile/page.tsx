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
        const profileRes = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const studentData = profileRes.data;
        setStudent(studentData);

        const courseRes = await axios.get(
          `http://localhost:5000/api/enrolledCourses/${studentData._id}`
        );

        setCourses(
          courseRes.data.map((course: any) => ({
            ...course,
            courseInfo: course.courseId,
          }))
        );
      } catch (error) {
        console.error("❌ Error fetching profile or courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  if (loading) return <p className="text-center py-5 fs-5">Loading...</p>;
  if (!student)
    return <p className="text-center py-5 fs-5">Student not found</p>;

  return (
    <div className="container py-5" style={{ maxWidth: "960px" }}>
      <PageHeader
        title="👤 My Profile"
        description="View your personal details & enrolled courses."
      />

      <div className="row g-5 mt-4">
        {/* Profile Card */}
        <aside className="col-md-5">
          <div
            className="card border-0 shadow-lg rounded-4 p-4 text-center position-relative"
            style={{ backgroundColor: "#f7f9fc" }}
          >
            {/* Avatar */}
            {student.avatarUrl ? (
              <img
                src={student.avatarUrl}
                alt={student.username}
                className="rounded-circle mx-auto mb-3  border-3 border-primary shadow-sm"
                style={{ width: "130px", height: "130px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="rounded-circle bg-primary text-white mx-auto d-flex align-items-center justify-content-center mb-3 shadow"
                style={{
                  width: "130px",
                  height: "130px",
                  fontSize: "3rem",
                  fontWeight: "700",
                }}
              >
                {student.username?.substring(0, 2).toUpperCase()}
              </div>
            )}

            {/* Username & ID */}
            <h2 className="fw-bold mb-1">{student.username}</h2>
            <p className="text-muted fs-6 mb-3">
              <small>
                ID: <code>{student._id}</code>
              </small>
            </p>

            {/* Email and Join Date */}
            <div className="d-flex flex-column gap-2 text-muted fs-6 mb-4">
              <div className="d-flex align-items-center gap-2 justify-content-center">
                <Mail size={18} className="text-primary" />
                <span>{student.email}</span>
              </div>
              <div className="d-flex align-items-center gap-2 justify-content-center">
                <CalendarDays size={18} className="text-primary" />
                <span>
                  Joined: {new Date(student.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary btn-sm shadow-sm px-4">
                Edit Profile
              </button>
              <button className="btn btn-outline-primary btn-sm shadow-sm px-4">
                Settings
              </button>
            </div> */}
          </div>
        </aside>

        {/* Enrolled Courses */}
        {/* Enrolled Courses */}
        <section className="col-md-7">
          <h4 className="mb-4 fw-semibold text-primary">
            🎓 My Enrolled Courses
          </h4>

          {courses.length > 0 ? (
            <div
              className="d-flex flex-wrap justify-content-start"
              style={{ gap: "1.5rem" }}
            >
              {courses.map((course) => (
                <article
                  key={course._id}
                  tabIndex={0}
                  aria-label={`Course: ${course.courseInfo?.title}`}
                  style={{
                    flex: "1 1 100%",
                    maxWidth: "100%",
                    minWidth: "300px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="card rounded-4 shadow border-0 overflow-hidden d-flex flex-row"
                    style={{
                      transition: "box-shadow 0.3s ease",
                      height: "160px",
                    }}
                    tabIndex={-1}
                  >
                    {/* Left: Image */}
                    <div
                      className="flex-shrink-0 position-relative"
                      style={{
                        width: "160px",
                        height: "160px",
                        overflow: "hidden",
                      }}
                    >
                      {course.courseInfo?.image ? (
                        <>
                          <img
                            src={`http://localhost:5000${course.courseInfo.image}`}
                            alt={course.courseInfo.title}
                            style={{
                              width: "160px",
                              height: "160px",
                              objectFit: "cover",
                              transition: "transform 0.3s ease",
                            }}
                          />
                          <span
                            className="badge bg-primary position-absolute top-2 start-2"
                            style={{
                              fontSize: "0.75rem",
                              padding: "0.4em 0.7em",
                              borderRadius: "0.6rem",
                              zIndex: 2,
                            }}
                          >
                            Enrolled
                          </span>
                        </>
                      ) : (
                        <div
                          className="bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                          style={{
                            width: "160px",
                            height: "160px",
                            fontSize: "1.3rem",
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Right: Text content */}
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title fw-bold text-primary mb-2">
                        {course.courseInfo?.title || "Untitled"}
                      </h5>
                      <p className="mb-1 small text-muted fst-italic">
                        Instructor:{" "}
                        <span className="fw-semibold text-dark">
                          {course.instructor}
                        </span>
                      </p>
                      <p
                        className="text-muted small flex-grow-1 mb-3"
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {course.description || "No description available."}
                      </p>
                      <div className="d-flex justify-content-between align-items-center text-muted small border-top pt-2">
                        <span className="fst-italic">
                          Course: {course.courseInfo?.title}
                        </span>
                        <span>
                          Enrolled:{" "}
                          {course.createdAt
                            ? new Date(course.createdAt).toLocaleDateString()
                            : course.enrolledDate
                            ? new Date(course.enrolledDate).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Hover & focus effect */}
                    <style jsx>{`
                      .card:hover img {
                        transform: scale(1.05);
                      }
                      .card:hover {
                        box-shadow: 0 0.75rem 1.5rem rgba(78, 84, 200, 0.3);
                      }
                      .card:focus-visible {
                        outline: 3px solid #4e54c8;
                        outline-offset: 4px;
                        box-shadow: 0 0 10px #4e54c8;
                      }
                    `}</style>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-muted fst-italic">
              You have not enrolled in any courses yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
