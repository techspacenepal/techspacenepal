
"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // 👉 import router

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // 👉 initialize router

  const handleSendOTP = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      toast.success("OTP sent to your email");

      // 👉 Redirect after slight delay
      setTimeout(() => {
        router.push("/auth/reset-password/[token]");
      }, 100);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Toaster position="top-right" />
      <form onSubmit={handleSendOTP} className="p-4 card shadow w-100" style={{ maxWidth: 400 }}>
        <h4 className="mb-3 text-center">Forgot Password</h4>
        <input
          type="email"
          placeholder="Enter your email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
