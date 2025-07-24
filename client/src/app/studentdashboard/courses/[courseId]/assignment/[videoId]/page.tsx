"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface VideoType {
  _id: string;
  title: string;
  assignmentUrl?: string;
  teacherId?: string;
  courseId?: string;
  submissions?: { studentId: string }[];
}

export default function AssignmentPage() {
  const { courseId, videoId } = useParams() as {
    courseId: string;
    videoId: string;
  };
  const router = useRouter();

  const [studentId, setStudentId] = useState<string | null>(null);
  const [video, setVideo] = useState<VideoType | null>(null);
  const [allVideos, setAllVideos] = useState<VideoType[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [teacherId, setTeacherId] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("studentId");
    if (id) setStudentId(id);
    else toast.error("Student not logged in");
  }, []);

  const fetchTeacher = async () => {
    if (!studentId || !courseId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students/teacher/${studentId}/${courseId}`
      );
      setTeacherId(res.data.teacherId);
    } catch {
      toast.error("Failed to fetch teacher");
    }
  };

  const fetchVideo = async () => {
    try {
      const token = Cookies.get("studentToken");
      const res = await axios.get(
        `http://localhost:5000/api/videos/${videoId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVideo(res.data.video);
    } catch {
      toast.error("Failed to fetch video");
    }
  };

  const fetchAllVideos = async () => {
    try {
      const token = Cookies.get("studentToken");
      const res = await axios.get(`http://localhost:5000/api/videos`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { courseId, teacherId },
      });
      setAllVideos(res.data.videos || []);
    } catch {
      toast.error("Failed to fetch video list");
    }
  };

  useEffect(() => {
    if (studentId && courseId) fetchTeacher();
  }, [studentId, courseId]);

  useEffect(() => {
    if (teacherId && courseId) fetchAllVideos();
  }, [teacherId, courseId]);

  useEffect(() => {
    if (videoId) fetchVideo();
  }, [videoId]);

  const hasSubmitted = (v: VideoType | null) =>
    v?.submissions?.some((s) => s.studentId === studentId);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!file || !studentId) return toast.error("Missing file or student info");

  //   try {
  //     const token = Cookies.get("studentToken");
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("studentId", studentId);
  //     formData.append("courseId", courseId);
  //     formData.append("videoId", videoId);

  //     await axios.post(
  //       "http://localhost:5000/api/assignments/submit",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     toast.success("Assignment submitted!");
  //     setFile(null);
  //     await fetchVideo();
  //     await fetchAllVideos();
  //   } catch (err: any) {
  //     toast.error(err?.response?.data?.message || "Submission failed.");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !fileUrl)
      return toast.error("Please upload a file or enter a URL");
    if (!studentId) return toast.error("Missing student info");

    try {
      const token = Cookies.get("studentToken");
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (fileUrl) formData.append("fileUrl", fileUrl);
      formData.append("studentId", studentId);
      formData.append("courseId", courseId);
      formData.append("videoId", videoId);

      await axios.post(
        "http://localhost:5000/api/assignments/submit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Assignment submitted!");
      setFile(null);
      setFileUrl("");
      await fetchVideo();
      await fetchAllVideos();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <div className="container py-1">
      <Toaster />
      <h2 className="mb-4 fw-bold" style={{ color: "#e63946" }}>
        Assignment Submission
      </h2>
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-4 mb-5">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-white border-bottom fw-semibold">
              Assignment List
            </div>
            <div
              className="list-group list-group-flush overflow-auto"
              style={{ maxHeight: "600px" }}
            >
              {allVideos.map((v) => (
                <Link
                  key={v._id}
                  href={`/studentdashboard/courses/${courseId}/assignment/${v._id}`}
                  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                    v._id === videoId ? "active" : ""
                  }`}
                >
                  <span>{v.title}</span>
                  {hasSubmitted(v) && (
                    <span className="badge bg-success">✓</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-8">
          {/* Assignment Title */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h5
                  className="card-title mb-1"
                  style={{ textTransform: "uppercase" }}
                >
                  {video?.title || "Select Assignment"}
                </h5>
                {/* <small className="text-muted">Due: TBA • Course : {courseId}</small> */}
              </div>
              {hasSubmitted(video) && (
                <span className="badge bg-success">✓ Submitted</span>
              )}
            </div>
          </div>

          {/* Assignment Preview */}
          {/* <div
            className="card mb-2 shadow-sm"
            style={{ width: "100%", minHeight: "250px", maxHeight: "500px" }}
          >
            <div
              className="card-body"
              style={{
                height: "400px",
                overflow: "hidden",
              }}
            >
              {video?.assignmentUrl ? (
                <>
                  {video.assignmentUrl.match(/\.(jpg|jpeg|png|webp)$/) && (
                    <img
                      src={`http://localhost:5000${video.assignmentUrl}`}
                      alt="Assignment"
                      className="img-fluid rounded"
                      style={{ maxHeight: "100%", objectFit: "contain" }}
                    />
                  )}
                  {video.assignmentUrl.match(/\.pdf$/) && (
                    <iframe
                      src={`http://localhost:5000${video.assignmentUrl}`}
                      style={{ width: "100%", height: "100%" }}
                      className="border rounded"
                    />
                  )}
                  {video.assignmentUrl.match(/\.(mp4|webm)$/) && (
                    <video
                      controls
                      className="w-100 rounded"
                      style={{ height: "100%", objectFit: "contain" }}
                    >
                      <source
                        src={`http://localhost:5000${video.assignmentUrl}`}
                      />
                    </video>
                  )}
                  {!video.assignmentUrl.match(
                    /\.(jpg|jpeg|png|webp|pdf|mp4|webm)$/
                  ) && (
                    <a
                      href={`http://localhost:5000${video.assignmentUrl}`}
                      className="btn btn-outline-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View File
                    </a>
                  )}
                </>
              ) : (
                <p className="text-muted">No assignment file available.</p>
              )}
            </div>
          </div> */}

          <div
            className="card-body"
            style={{ height: "400px", overflow: "hidden" }}
          >
            {video?.assignmentUrl ? (
              <>
                {video.assignmentUrl.startsWith("http") ? (
                  <a
                    href={video.assignmentUrl}
                    className="btn btn-outline-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    🔗 Open Assignment
                  </a>
                ) : video.assignmentUrl.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                  <img
                    src={`http://localhost:5000${video.assignmentUrl}`}
                    alt="Assignment"
                    className="img-fluid rounded"
                    style={{ maxHeight: "100%", objectFit: "contain" }}
                  />
                ) : video.assignmentUrl.match(/\.pdf$/i) ? (
                  <iframe
                    src={`http://localhost:5000${video.assignmentUrl}`}
                    style={{ width: "100%", height: "100%" }}
                    className="border rounded"
                  />
                ) : video.assignmentUrl.match(/\.(mp4|webm)$/i) ? (
                  <video
                    controls
                    className="w-100 rounded"
                    style={{ height: "100%", objectFit: "contain" }}
                  >
                    <source
                      src={`http://localhost:5000${video.assignmentUrl}`}
                    />
                  </video>
                ) : (
                  <a
                    href={`http://localhost:5000${video.assignmentUrl}`}
                    className="btn btn-outline-secondary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    📎 Download / Open Assignment
                  </a>
                )}
              </>
            ) : (
              <p className="text-muted">No assignment file available.</p>
            )}
          </div>

          {/* Submission Form */}
          <div className="card shadow-sm">
            <div className="card-header bg-white fw-semibold">
              Submit Your Assignment
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="file-url" className="form-label">
                    Or Enter Assignment URL
                  </label>
                  <input
                    type="text"
                    id="file-url"
                    className="form-control"
                    placeholder="e.g. https://drive.google.com/..."
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    disabled={hasSubmitted(video)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="file-upload" className="form-label">
                    Upload File
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className="form-control"
                    accept=".pdf,.jpg,.jpeg,.png,.ppt,.docx,.mp4"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    disabled={hasSubmitted(video)}
                  />
                  <small className="text-muted"></small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={hasSubmitted(video) || (!file && !fileUrl)}
                >
                  {hasSubmitted(video)
                    ? "Already Submitted"
                    : "Submit Assignment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
