
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

interface Student {
  _id: string;
  username: string;
}

interface CourseWithCount {
  courseId: string;
  title: string;
  image?: string;
  status?: string;
  studentCount: number;
  students?: Student[];
}

export default function TeacherCourseList() {
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [publishingId, setPublishingId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("teacherId");
    if (id && id !== "undefined") {
      setTeacherId(id);
    } else {
      setError("❌ Teacher ID not found.");
      setLoading(false);
    }
  }, []);

  const fetchCourses = async () => {
    if (!teacherId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
      );
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!teacherId) return;
    fetchCourses();
  }, [teacherId]);

  // Check for publish trigger from CourseDetailsPage
  useEffect(() => {
    const flag = localStorage.getItem("coursePublished");
    if (flag === "true") {
      localStorage.removeItem("coursePublished");
      fetchCourses();
      toast.success("✅ Course status updated!");
    }
  }, []);

  const handlePublish = async (courseId: string) => {
    const token = Cookies.get("teacherToken");
    const teacherId = localStorage.getItem("teacherId");

    try {
      setPublishingId(courseId);
      await axios.put(
        `http://localhost:5000/api/teacherCourses/publish/${teacherId}/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("✅ Course published!");

      await fetchCourses();
    } catch (err) {
      console.error("❌ Publish failed:", err);
      toast.error("❌ Failed to publish course.");
    } finally {
      setPublishingId(null);
    }
  };

  if (loading)
    return <div className="text-center mt-5 text-primary">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-4">{error}</div>;

  return (
    <div className="container py-4">
      <Toaster position="top-right" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">📚 Your Courses</h2>
          <p className="text-muted">See all assigned courses with students.</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Students</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId}>
                <td>
                  <span
                    className={`badge ${
                      course.status?.toLowerCase() === "published"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {course.status ? course.status.toUpperCase() : "DRAFT"}
                  </span>
                </td>
                <td className="d-flex align-items-center">
                  {course.image ? (
                    <img
                      src={`http://localhost:5000${course.image}`}
                      alt={course.title}
                      style={{
                        width: "60px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginRight: "12px",
                      }}
                    />
                  ) : (
                    <div
                      className="bg-secondary text-white d-flex justify-content-center align-items-center"
                      style={{
                        width: "60px",
                        height: "40px",
                        marginRight: "12px",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                      }}
                    >
                      No Image
                    </div>
                  )}
                  {course.title}
                </td>
                <td>
                  {course.studentCount}
                  {/* {course.students?.length > 0 && (
                    <ul className="list-unstyled small mt-1">
                      {course.students.map((student, idx) => (
                        <li key={student._id + idx}>{student.username}</li>
                      ))}
                    </ul>
                  )} */}

                  {Array.isArray(course.students) &&
                    course.students.length > 0 && (
                      <ul className="list-unstyled small mt-1">
                        {course.students.map((student, idx) => (
                          <li key={student._id + idx}>{student.username}</li>
                        ))}
                      </ul>
                    )}
                </td>
                <td className="text-end">
                  <Dropdown align="end" autoClose="outside">
                    <Dropdown.Toggle variant="light" size="sm">
                      ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        href={`/auth/Dashboard/teacherDashboard/courses/${course.courseId}`}
                      >
                        View
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handlePublish(course.courseId)}
                        disabled={course.status === "published"}
                      >
                        📢 Publish
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
