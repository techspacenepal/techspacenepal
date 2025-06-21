"use client";

import { PageHeader } from "@/app/Component/page-header";
import { BookOpen, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      router.push("/auth/studentLogin");
    }
  }, []);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = Cookies.get("adminToken");
        console.log("🧪 Token from cookie:", token);


        // Student profile
        const { data: studentData } = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudent(studentData);

        // ✅ Fetch only that student's enrolled courses
        const { data: courseData } = await axios.get(
          `http://localhost:5000/api/enrolledCourses/${studentData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnrolledCourses(courseData);
      } catch (error) {
        console.error("Failed to fetch student or enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!student) return <p>Failed to load student data</p>;

  // ✅ Completed course count (from real enrolledCourses)
  const completedCourses = enrolledCourses.filter(
    (c: any) => c.progress === 100
  );

  // ✅ Average progress
  const averageProgress =
    enrolledCourses.length > 0
      ? Math.round(
          enrolledCourses.reduce((sum: number, c: any) => sum + (c.progress || 0), 0) /
            enrolledCourses.length
        )
      : 0;

  // ✅ In progress
  const coursesInProgress = enrolledCourses.filter(
    (c: any) => c.progress < 100 && c.progress > 0
  );

  return (
    <div className="container py-4">
      <PageHeader
        title={`Welcome back, ${student.username?.split(" ")[0]}!`}
        description="Here's a quick overview of your academic progress and important updates."
      />

      <div className="row g-4">
        {/* Enrolled courses */}
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

        {/* Completed courses */}
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

        {/* Average progress */}
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

      {/* In progress courses */}
      <div className="row g-4 mt-4">
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
                        <h6 className="mb-1">{course.name}</h6>
                        <small className="text-muted">
                          {course.progress}% complete
                        </small>
                      </div>
                      <Link
                        href={`/Dashboard/student/courses/${course._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Course
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <p className="small text-muted">No courses currently in progress.</p>
              )}
            </div>
          </div>
        </div>

        {/* Announcement section (optional) */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header">
              <h5 className="mb-1">Recent Announcements</h5>
              <small className="text-muted">Stay updated with the latest news.</small>
            </div>
            <div className="card-body">
              <p>Coming soon or integrate real announcements here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
