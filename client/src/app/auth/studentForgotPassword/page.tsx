"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/students/forgot-password",
        {
          email,
        }
      );

      toast.success(data.message || "OTP sent to your email");

      // Store the email to use during OTP verification
      localStorage.setItem("resetEmail", email);

      // Redirect to verify-otp page
      // ✅ Redirect to verify OTP page
      setTimeout(() => {
        router.push("/auth/studentResetPassword/[token]");
      }, 100);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Toaster position="top-right" />
      <form
        onSubmit={handleSendOTP}
        className="p-4 card shadow w-100"
        style={{ maxWidth: 400 }}
      >
        <h4 className="mb-3 text-center text-danger">Forgot Password</h4>

        <input
          type="email"
          placeholder="Enter your email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-danger w-100"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
