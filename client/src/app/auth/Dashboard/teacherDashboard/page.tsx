"use client";

import Link from "next/link";
import { instructor, students } from "@/lib/placeholder-data";
import { ArrowRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import StudentsProgress from "./progress/page";


interface EnrolledCourse {
  courseId: string;
  title: string;
  image?: string;
  status?: string;
  studentCount: number;
}

export default function DashboardPage() {
  const [username, setUsername] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const colors = ["bg-danger", "bg-warning", "bg-primary", "bg-success"];
  const [circleColor, setCircleColor] = useState("bg-danger");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check adminToken
  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      router.push("/auth/adminLogin");
    }
  }, [router]);

  // Load teacher info from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const savedTeacherId = localStorage.getItem("teacherId");

    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username || "Instructor");

      if (savedTeacherId) {
        setTeacherId(savedTeacherId);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch enrolled courses by teacherId
  useEffect(() => {
    if (!teacherId) return;

    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
        );
        setEnrolledCourses(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch enrolled courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [teacherId]);

  // Fetch total students
  // // 📚 Fetch enrolled courses and compute total
  useEffect(() => {
    if (!teacherId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/teacherCourses/teacher/${teacherId}/enrollments`
        );
        const courseList = res.data;
        setEnrolledCourses(courseList);

        // ✅ Compute total students from all course entries
        const total = courseList.reduce(
          (sum: number, course: any) => sum + (course.studentCount || 0),
          0
        );
        setTotalStudents(total);
      } catch (err) {
        console.error("❌ Error fetching enrolled data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  const getCustomInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length < 2) return name.charAt(0).toUpperCase();
    const firstLetter = parts[0][0]?.toUpperCase() || "";
    const secondLetter = parts[1][0]?.toUpperCase() || "";
    return firstLetter + secondLetter;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h1 className="h3">Welcome back, {username}</h1>
        <p className="text-muted">
          Here's a snapshot of your teaching dashboard.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        {/* Total Courses */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Total Courses</h6>
                <h4>{enrolledCourses.length}</h4>
                <small className="text-muted">courses you are teaching</small>
              </div>
            </div>
          </div>
        </div>

        {/* Total Students */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Total Students</h6>
                <h4>{totalStudents}</h4>
                <small className="text-muted">Students in your courses</small>
              </div>
              <div className="bg-light rounded-circle p-2">
                <Users className="text-secondary" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <div
                  className={`rounded-circle text-white d-flex align-items-center justify-content-center fw-bold ${circleColor}`}
                  style={{ width: 50, height: 50 }}
                >
                  {getCustomInitials(username)}
                </div>
                <div>
                  <strong>{username}</strong>
                  <div className="text-muted small">{instructor.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="row g-4">
        {/* My Courses */}
         <div className="col-lg-6">
      <div className="card shadow-sm" style={{ maxWidth: 600 }}>
        <div className="card-header bg-white">
          <h5 className="mb-0">My Courses</h5>
          <small className="text-muted">An overview of your courses.</small>
        </div>
        <div className="card-body">
          {enrolledCourses.length === 0 ? (
            <p className="text-muted">No enrolled courses yet.</p>
          ) : (
            enrolledCourses.slice(0, 3).map((course) => (
              <div
                key={course.courseId}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div>
                  <Link
                    href={`/teacherDashboard/courses/${course.courseId}`}
                    className="fw-semibold text-decoration-none"
                  >
                    {course.title}
                  </Link>
                  <div className="text-muted small">
                    {course.studentCount} students
                  </div>
                </div>
                <span
                  className={`badge rounded-pill ${
                    course.status?.toLowerCase() === "published"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {course.status
                    ? course.status.charAt(0).toUpperCase() + course.status.slice(1)
                    : "Draft"}
                </span>
              </div>
            ))
          )}
          <Link
            href="/teacherDashboard/courses"
            className="btn btn-outline-primary w-100 mt-3 d-flex align-items-center justify-content-center"
          >
            View All Courses <ArrowRight className="ms-2" size={16} />
          </Link>
        </div>
      </div>
    </div>

        {/* Student Activity (Optional Static Placeholder) */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Student Activity</h5>
              <small className="text-muted">
                Track the latest progress of your students.
              </small>
            </div>
            <div>
              <StudentsProgress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
