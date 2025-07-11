
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function AddAnnouncementPage() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({ title: "", content: "", author: "" });
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/announcements");
      setAnnouncements(res.data);
    } catch (error) {
      toast.error("Failed to load announcements");
    }
  };

  // ✅ Auth check & load data
  useEffect(() => {
    const token = Cookies.get("adminToken");
    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchAnnouncements();
      }
      setPageLoading(false);
    }, 1000); // shows spinner during auth + load
  }, []);

  // ✅ Full-screen loading spinner
  if (pageLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="multi-spinner"></div>
        <style jsx>{`
          .multi-spinner {
            width: 4rem;
            height: 4rem;
            border: 8px solid transparent;
            border-top: 8px solid red;
            border-right: 8px solid blue;
            border-bottom: 8px solid green;
            border-left: 8px solid orange;
            border-radius: 50%;
            animation: spin 1.2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // ✅ Input Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/announcements", formData);
      toast.success("✅ Announcement posted successfully!");
      setFormData({ title: "", content: "", author: "" });
      fetchAnnouncements();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to post announcement");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      toast.success("Announcement deleted");
      fetchAnnouncements();
    } catch {
      toast.error("Failed to delete announcement");
    }
  };

  // ✅ UI
  return (
    <div className="container py-5">
      <Toaster position="top-right" />

      <div className="card shadow-lg p-4 mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4 text-center text-primary">Post New Announcement</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter announcement title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Content</label>
            <textarea
              name="content"
              className="form-control"
              placeholder="Enter announcement content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="e.g., Admin Office"
              value={formData.author}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Announcement"}
            </button>
          </div>
        </form>
      </div>

      {/* Announcements List */}
      <div className="mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="mb-3">All Announcements</h3>
        {announcements.length === 0 ? (
          <p className="text-muted">No announcements yet.</p>
        ) : (
          announcements.map((ann) => (
            <div key={ann._id} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{ann.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {new Date(ann.date).toLocaleString()} by {ann.author}
                </h6>
                <p className="card-text">{ann.content}</p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(ann._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
