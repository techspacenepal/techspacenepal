

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { PageHeader } from "@/app/Component/page-header";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

interface CourseEntry {
  _id: string;
  courseId: {
    _id: string;
    title: string;
  };
  progress: number;
}

export default function GradebookPage() {
  const [grades, setGrades] = useState<CourseEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const getGradeFromProgress = (progress: number): string => {
    if (progress >= 90) return "A+";
    if (progress >= 80) return "A";
    if (progress >= 70) return "B";
    if (progress >= 60) return "C";
    if (progress >= 50) return "D";
    return progress > 0 ? "F" : "In Progress";
  };

  const getBadgeClass = (grade: string) => {
    if (grade.startsWith("A")) return "bg-primary text-white";
    if (grade.startsWith("B")) return "bg-secondary text-white";
    if (grade.startsWith("C")) return "bg-warning text-dark";
    if (grade.startsWith("D") || grade.startsWith("F")) return "bg-danger text-white";
    return "bg-light text-dark";
  };

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const token = Cookies.get("studentToken");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/students/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const studentId = res.data._id;

        const enrolledRes = await axios.get(
          `http://localhost:5000/api/enrolledCourses/${studentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setGrades(enrolledRes.data);
      } catch (err) {
        console.error("Failed to load gradebook:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return (
    <div className="container py-4">
      <PageHeader
        title="Gradebook"
        description="Track your academic performance and progress across all courses."
      />

      {loading ? (
        <p>Loading gradebook...</p>
      ) : grades.length > 0 ? (
        <table className="table table-hover align-middle">
          <caption className="text-muted">A summary of your course grades and progress.</caption>
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Course Name</th>
              <th className="text-center">Grade</th>
              <th className="text-center" style={{ width: "30%" }}>
                Progress
              </th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((entry) => {
              const grade = getGradeFromProgress(entry.progress || 0);
              return (
                <tr key={entry._id}>
                  <td className="fw-semibold">{entry.courseId.title}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${getBadgeClass(grade)} text-uppercase px-3 py-2 fs-6`}
                      style={{ fontSize: "0.75rem" }}
                    >
                      {grade}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <div className="progress" style={{ width: "70%", height: "10px" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: `${entry.progress || 0}%` }}
                          aria-valuenow={entry.progress || 0}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <small className="text-muted">{entry.progress || 0}%</small>
                    </div>
                  </td>
                  <td className="text-center">
                    {entry.progress === 100 ? (
                      <div className="text-success d-flex justify-content-center align-items-center gap-1">
                        <CheckCircle size={16} />
                        Completed
                      </div>
                    ) : entry.progress > 0 ? (
                      <div className="text-info d-flex justify-content-center align-items-center gap-1">
                        <Clock size={16} />
                        In Progress
                      </div>
                    ) : (
                      <div className="text-secondary d-flex justify-content-center align-items-center gap-1">
                        <TrendingUp size={16} />
                        Not Started
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center border rounded p-5" style={{ height: "16rem" }}>
          <p className="fs-5 text-muted">No grade information available yet.</p>
        </div>
      )}
    </div>
  );
}
