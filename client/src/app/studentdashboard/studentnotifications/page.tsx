"use client";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function SendNotificationForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setResponseMsg("");
  setIsSuccess(false);

  if (!title.trim() || !message.trim()) {
    setResponseMsg("Please fill in both title and message.");
    return;
  }

  const token = Cookies.get("studentToken");
  console.log("[Frontend] Token from cookie:", token);  // Debug print token value

  if (!token) {
    setResponseMsg("You must be logged in as a student.");
    return;
  }

  setLoading(true);
  try {
    const res = await axios.post(
      "http://localhost:5000/api/notifications/student",
      { title, message },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setResponseMsg(res.data.message);
    setIsSuccess(true);
    setTitle("");
    setMessage("");
  } catch (error: any) {
    console.error("[Frontend] Error sending notification:", error);
    setResponseMsg(
      error.response?.data?.message || "Error sending notification. Please try again."
    );
    setIsSuccess(false);
  }
  setLoading(false);
};


  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Send Notification to Institute</h2>
      {responseMsg && <div className="alert alert-info">{responseMsg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Notification Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            className="form-control"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
}
