"use client";

import { PageHeader } from "@/app/Component/page-header";
import { BookOpen, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import DownloadCertificate from "../Component/DownloadCertificate";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function DashboardPage() {
  // 🔐 States for authentication and user data
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const router = useRouter();

  // 🔐 Redirect to login if no token
  useEffect(() => {
    const token = Cookies.get("studentToken");
    if (!token) {
      router.push("/auth/studentLogin");
    }
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements");
      const today = new Date().toISOString().split("T")[0];

      const todaysAnnouncements = res.data.filter((ann: Announcement) =>
        ann.date.startsWith(today)
      );

      setAnnouncements(todaysAnnouncements);
    } catch (error) {
      console.error("Failed to fetch announcements", error);
    }
  };

  useEffect(() => {
    fetchStudent();
    fetchAnnouncements();
  }, []);

  // Fetch function बाहिर निकालियो ताकि retry मा पनि चलाउन सकियोस्
  const fetchStudent = async () => {
    try {
      const token = Cookies.get("studentToken");
      console.log("🧪 Token from cookie:", token);

      const authHeaders = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 👤 Fetch student profile
      const { data: studentData } = await axios.get(
        "http://localhost:5000/api/students/profile",
        authHeaders
      );
      setStudent(studentData);

      // 📚 Fetch student's enrolled courses
      const { data: courseData } = await axios.get(
        `http://localhost:5000/api/enrolledCourses/${studentData._id}`,
        authHeaders
      );
      setEnrolledCourses(courseData);

      setError(null); // Clear error on success
    } catch (error: any) {
      console.error("Failed to fetch student or courses:", error);

      const message = error?.response?.data?.message || "Failed to load data.";
      setError(message);

      // ❌ Handle expired or invalid token
      if (
        message.toLowerCase().includes("expired") ||
        message.toLowerCase().includes("not authorized")
      ) {
        Cookies.remove("studentToken");
        localStorage.removeItem("studentToken");
        localStorage.removeItem("user");
        router.push("/auth/studentLogin");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  // Error UI with Retry button
  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchStudent();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Failed to load student data</p>;

  // ✅ Calculate stats
  const completedCourses = enrolledCourses.filter(
    (c: any) => c.progress === 100
  );
  const averageProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce(
            (sum: number, c: any) => sum + (c.progress || 0),
            0
          ) / enrolledCourses.length
        )
      : 0;
  const coursesInProgress = enrolledCourses.filter(
    (c: any) => c.progress > 0 && c.progress < 100
  );

  return (
    <div className="container py-4">
      {/* 👋 Header */}
      <PageHeader
        title={`Welcome back, ${student.username?.split(" ")[0]}!`}
        description="Here's a quick overview of your academic progress and important updates."
      />

      {/* 📊 Stats Cards */}
      <div className="row g-4">
        {/* 🔢 Enrolled */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Courses Enrolled</h6>
              <BookOpen className="text-muted" size={20} />
            </div>
            <div className="card-body">
              <h2 className="fw-bold">{enrolledCourses.length}</h2>
              <p className="small text-muted mb-0">Keep up the great work!</p>
            </div>
          </div>
        </div>

        {/* ✅ Completed */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Completed Courses</h6>
              <CheckCircle className="text-muted" size={20} />
            </div>
            <div className="card-body">
              <h2 className="fw-bold">{completedCourses.length}</h2>
              <p className="small text-muted mb-0">
                Congratulations on your achievements!
              </p>
            </div>
          </div>
        </div>

        {/* 📈 Average */}
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Average Progress</h6>
              <TrendingUp className="text-muted" size={20} />
            </div>
            <div className="card-body">
              <h2 className="fw-bold">{averageProgress}%</h2>
              <p className="small text-muted mb-0">
                Across all enrolled courses.
              </p>
            </div>
          </div>
        </div>
      </div>

      {completedCourses.length > 0 && (
        <div className="alert alert-success mt-3">
          🎉 You’ve completed {completedCourses.length} course(s). Don’t forget
          to download your certificates!
        </div>
      )}

      {/* 🎓 Completed Courses & Certificate Download */}
      <div className="row g-2 mt-2">
        <div className="col-md-12">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-1">🎓 Completed Courses</h5>
              <small className="text-muted">
                Download your course certificates here.
              </small>
            </div>
            <div className="card-body">
              {/* {completedCourses.length === 0 ? (
          <p className="small text-muted">No completed courses yet.</p>
        ) : (
          completedCourses.map((course: any) => (
            <div
              key={course._id}
              className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded"
            >
              <div>
                <h6 className="mb-1">{course.courseId?.title || "Untitled Course"}</h6>
                <small className="text-muted">100% completed</small>
              </div>
              <a
                href={`http://localhost:5000/api/certificates/${course.studentId}/${course.courseId._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-sm"
              >
                🎓 Download Certificate
              </a>
            </div>
          ))
        )} */}

              {completedCourses.length === 0 ? (
                <p className="small text-muted">No completed courses yet.</p>
              ) : (
                completedCourses.map((course: any) => (
                  <div
                    key={course._id}
                    className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded"
                  >
                    <div>
                      <h6 className="mb-1">
                        {course.courseId?.title || "Untitled Course"}
                      </h6>
                      <small className="text-muted">100% completed</small>
                    </div>
                    <DownloadCertificate
                      studentId={course.studentId}
                      courseId={course.courseId._id}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📚 In Progress Courses */}
      <div className="row g-2 mt-2">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-1">Courses In Progress</h5>
              <small className="text-muted">
                Continue your learning journey with these courses.
              </small>
            </div>
            <div className="card-body">
              {coursesInProgress.length > 0 ? (
                <>
                  {coursesInProgress.map((course: any) => (
                    <div
                      key={course._id}
                      className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded hover-shadow"
                      style={{ cursor: "pointer" }}
                    >
                      <div>
                        <h6 className="mb-1">
                          {course.courseId?.title || "Untitled Course"}
                        </h6>

                        <small className="text-muted">
                          {course.progress}% complete
                        </small>
                      </div>
                      <Link
                        href={{
                          pathname: `/studentdashboard/courses/${course.courseId._id}`,
                          query: {
                            teacherId: course.teacherId,
                          },
                        }}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Course
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <p className="small text-muted">
                  No courses currently in progress.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 📢 Optional Announcements */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-1">Recent Announcements</h5>
              <small className="text-muted">
                Stay updated with the latest news.
              </small>
            </div>
            <div className="card-body">
              <p>Coming soon or integrate real announcements here.</p>
              {announcements.length === 0 ? (
                <p className="small text-muted">No announcements today.</p>
              ) : (
                announcements.map((ann) => (
                  <div key={ann._id} className="mb-3">
                    <h6 className="mb-1">{ann.title}</h6>
                    <small className="text-muted">
                      {new Date(ann.date).toLocaleTimeString()}
                    </small>
                    <p className="mb-1">{ann.content}</p>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
