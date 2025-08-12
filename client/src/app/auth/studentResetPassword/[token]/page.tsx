
"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // ✅ import router

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ use router

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReset = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/students/reset-password", form);
      toast.success("Password reset successful!");

      // ✅ Success पछी login पेजमा पठाउने (थोरै delay सहित)
      setTimeout(() => {
        router.push("/auth/studentLogin");
      }, 100);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Toaster position="top-right" />
      <form onSubmit={handleReset} className="p-4 card shadow w-100" style={{ maxWidth: 400 }}>
        <h4 className="mb-3 text-center">Reset Password</h4>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="form-control mb-2"
          value={form.otp}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="form-control mb-3"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
