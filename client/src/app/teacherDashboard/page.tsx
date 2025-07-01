"use client";

import Link from "next/link";
import { instructor, students } from "@/lib/placeholder-data";
import { ArrowRight, Users } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const [username, setUsername] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherCourses, setTeacherCourses] = useState<any[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const colors = ["bg-danger", "bg-warning", "bg-primary", "bg-success"]; // red, orange, blue, green
  const [circleColor, setCircleColor] = useState("bg-danger");
  const [loading, setLoading] = useState(true);

const router = useRouter();
    
  
    useEffect(() => {
      const token = Cookies.get("adminToken");
      if (!token) {
        router.push("/auth/adminLogin");
      }
    }, [router]);

  // Load user info from localStorage on mount
 useEffect(() => {
  const userData = localStorage.getItem("user");
  const savedTeacherId = localStorage.getItem("teacherId");

  if (userData) {
    const parsed = JSON.parse(userData);
    console.log("✅ Parsed User:", parsed);
    setUsername(parsed.username || "Instructor");

    if (savedTeacherId) {
      setTeacherId(savedTeacherId); // ✅ set teacherId correctly
    }
  } else {
    console.log("❌ No user found in localStorage");
    setLoading(false);
  }
}, []);

  // Fetch teacher courses when teacherId is set
  useEffect(() => {
  if (!teacherId) {
    setLoading(false);
    return;
  }
  const fetchTeacherCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/teacherCourses/teacher/${teacherId}`);
      console.log('Fetched teacher courses:', res.data);
      setTeacherCourses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch teacher courses", err);
    } finally {
      setLoading(false);
    }
  };
  fetchTeacherCourses();
}, [teacherId]);


  // Calculate total students count from courses data
  useEffect(() => {
    const total = teacherCourses.reduce((acc, course) => {
      // course.courseId should be populated with studentCount
      return acc + (course.courseId?.studentCount || 0);
    }, 0);
    setTotalStudents(total);
  }, [teacherCourses]);

  // Fix getCustomInitials: use first letter of first two parts
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
        <p className="text-muted">Here's a snapshot of your teaching dashboard.</p>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        {/* Total Courses */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted">Total Courses</h6>
                <h4>{teacherCourses.length}</h4>
                <small className="text-muted">courses managed</small>
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
              <div className="d-flex align-items-center gap-3 ">
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
              {teacherCourses.length === 0 ? (
                <p className="text-muted">You have not created any courses yet.</p>
              ) : (
                teacherCourses.slice(0, 3).map((course) => (
                  <div
                    key={course._id}
                    className="d-flex justify-content-between align-items-center mb-3"
                  >
                    <div>
                      <Link
                        href="/teacherDashboard/courses"
                        className="fw-semibold text-decoration-none"
                      >
                        {course.name}
                      </Link>
                      <div className="text-muted small">
                        {course.courseId?.studentCount ?? 0} students
                      </div>
                    </div>
                    <span className="badge rounded-pill bg-success">Published</span>
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

        {/* Student Activity */}
        <div className="col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Student Activity</h5>
              <small className="text-muted">
                Track the latest progress of your students.
              </small>
            </div>
            <div className="card-body">
              {students.slice(0, 4).map((student) => (
                <div key={student.id} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="rounded-circle"
                        width={32}
                        height={32}
                      />
                      <span className="fw-semibold">{student.name}</span>
                    </div>
                    <span className="text-muted small">{student.progress}% complete</span>
                  </div>
                  <div className="progress mt-2" style={{ height: "6px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${student.progress}%` }}
                      aria-valuenow={student.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
