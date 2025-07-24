"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Submission {
  studentName: string;
  studentEmail: string;
  videoTitle: string;
  fileUrls: string[];
  submittedAt: string;
}

export default function SubmissionsPage() {
  const params = useParams() as { id: string };
  const id = params.id;
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTeacherId = localStorage.getItem("teacherId");
    if (storedTeacherId) setTeacherId(storedTeacherId);
  }, []);

  useEffect(() => {
    if (!teacherId || !id) return;

    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/assignments/submissions/${teacherId}/${id}`
        );
        setSubmissions(res.data.submissions || []);
      } catch (err) {
        console.error("❌ Failed to fetch submissions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [teacherId, id]);

  if (loading)
    return <div className="text-center mt-5 text-primary">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold text-dark border-bottom pb-2">
        Assignment Submissions
      </h3>

      {submissions.length === 0 ? (
        <div className="alert alert-info">No assignments submitted yet.</div>
      ) : (
        <div className="p-3 border rounded bg-light shadow-sm">
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
                {submissions.map((s, i) => (
                  <tr key={i}>
                    <td className="fw-bold">{i + 1}</td>
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
                      {s.fileUrls.map((url, index) => (
                        <a
                          key={index}
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
                            ? `🔗 View Link ${index + 1}`
                            : `📄 View File ${index + 1}`}
                        </a>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
