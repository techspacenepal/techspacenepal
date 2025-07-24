"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Submission {
  studentName: string;
  studentEmail: string;
  videoTitle: string;
  submittedAt: string;
  fileUrls: string[];
}

interface CourseSubmission {
  courseId: string;
  courseTitle: string;
  submissions: Submission[];
}

export default function AdminAssignmentSubmissions() {
  const [allSubmissions, setAllSubmissions] = useState<CourseSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/assignments/submissions/all"
        );
        setAllSubmissions(res.data.data);
      } catch (err) {
        console.error("❌ Failed to fetch admin submissions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading)
    return <div className="text-center mt-5 text-primary">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold text-dark border-bottom pb-2">
        Assignment Submissions by Course
      </h3>

      {allSubmissions.length === 0 ? (
        <div className="alert alert-info">No submissions found.</div>
      ) : (
        allSubmissions.map((course) => (
          <div
            key={course.courseId}
            className="mb-5 p-3 border rounded shadow-sm bg-light"
          >
            <h5 className="mb-3 text-uppercase text-danger fw-bold d-flex align-items-center">
              Course: <span className="ms-2">{course.courseTitle}</span>
            </h5>

            {course.submissions.length === 0 ? (
              <div className="alert alert-warning">
                No submissions for this course.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped align-middle">
                   <thead className="table-success text-dark">
                    <tr>
                      <th>S.N</th>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Video Title</th>
                      <th>Submitted At</th>
                      <th>Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.submissions.map((s, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold">{idx + 1}</td>
                        <td>{s.studentName}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {s.studentEmail}
                          </span>
                        </td>
                        <td>{s.videoTitle}</td>
                        <td>
                          <small className="text-muted">
                            {new Date(s.submittedAt).toLocaleString()}
                          </small>
                        </td>
                        <td>
                          {s.fileUrls.map((url, i) => (
                            <div key={i}>
                              <a
                                href={
                                  url.startsWith("http")
                                    ? url
                                    : `http://localhost:5000${url}`
                                }
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-sm btn-outline-danger me-2 mb-1"
                              >
                                {url.startsWith("http")
                                  ? `🔗 View Link ${i + 1}`
                                  : `📄 View File ${i + 1}`}
                              </a>
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
