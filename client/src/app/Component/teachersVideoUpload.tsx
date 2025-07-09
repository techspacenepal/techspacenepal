"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

interface Video {
  _id: string;
  videoUrl: string;
  uploadedAt: string;
  title: string;
}

export default function TeachersVideoUploadForm({
  teacherId,
  courseId,
}: {
  teacherId: string;
  courseId: string;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!courseId) return;
    fetchVideos();
  }, [courseId]);

  // 👇 fetchVideos function
  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/teacherCourses/videos/${courseId}?teacherId=${teacherId}`
      );
      setVideos(res.data);
    } catch (error) {
      toast.error("Failed to load videos");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile && !videoUrl) {
      toast.error("Please select either a file or enter a video URL");
      return;
    }

    const token = Cookies.get("teacherToken");
    const formData = new FormData();

    if (selectedFile) {
      formData.append("video", selectedFile);
    } else {
      formData.append("videoUrl", videoUrl);
    }
    formData.append("title", title);

    setUploading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/teacherCourses/upload/${teacherId}/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Video uploaded successfully");
      setVideoUrl("");
      setSelectedFile(null);
      fetchVideos(); // refresh list
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (videoId: string) => {
    const token = Cookies.get("teacherToken");
    const confirmed = confirm("Are you sure you want to delete this video?");
    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/teacherCourses/videos/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Video deleted");
      fetchVideos(); // refresh list
    } catch (error) {
      toast.error("Failed to delete video");
      console.error(error);
    }
  };

  const [studentCount, setStudentCount] = useState(0);

useEffect(() => {
  const fetchStudentCount = async () => {
    const res = await axios.get(`http://localhost:5000/api/enrolledCourses/count/${courseId}`);
    setStudentCount(res.data.count);
  };

  fetchStudentCount();
}, [courseId]);


  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleUpload} className="mt-4 border p-3 rounded">
        <h5>🎥 Upload or Link a Course Video</h5>

        <div className="mb-3">
          <label>📝 Video Title:</label>
          <input
            type="text"
            placeholder="Enter video title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label>📁 Upload Video File:</label>
          <input
            type="file"
            accept="video/*"
            className="form-control"
            onChange={(e) => {
              setSelectedFile(e.target.files?.[0] || null);
              setVideoUrl("");
            }}
          />
        </div>

        <div className="mb-3">
          <label>🔗 Or Paste Video URL:</label>
          <input
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            className="form-control"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
              setSelectedFile(null);
            }}
          />
        </div>

        {/* <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? "Uploading..." : "⬆️ Upload Video"}
        </button> */}

        <button className="btn btn-primary" disabled={studentCount === 0}>
          Upload Video
        </button>
        {studentCount === 0 && (
          <p className="text-danger mt-2">
            ⚠️ No student enrolled yet. Upload not allowed.
          </p>
        )}
      </form>

      <hr className="my-4" />

      <h5>Uploaded Videos</h5>
      {videos.length === 0 && <p>No videos uploaded yet.</p>}
      <div className="d-flex flex-wrap gap-3">
        {videos.map((video) => {
          const isExternal = video.videoUrl.startsWith("http");

          return (
            <div
              key={video._id}
              className="border rounded p-2"
              style={{ maxWidth: "320px" }}
            >
              <p className="fw-bold mb-2">{video.title}</p>

              {isExternal ? (
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video.videoUrl}
                </a>
              ) : (
                <video width="320" height="180" controls>
                  <source
                    src={`http://localhost:5000${video.videoUrl}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}

              <p className="text-muted mt-1" style={{ fontSize: "0.8rem" }}>
                Uploaded: {new Date(video.uploadedAt).toLocaleString()}
              </p>

              <button
                onClick={() => handleDelete(video._id)}
                className="btn btn-sm btn-danger"
              >
                🗑️ Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
