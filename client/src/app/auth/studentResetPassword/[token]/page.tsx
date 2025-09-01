
"use client";

import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ use router
  const [showPassword, setShowPassword] = useState(false);
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
    <>
      <section>
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
          <Toaster position="top-right" />
          <form
            onSubmit={handleReset}
            className="p-4 card shadow-sm w-100 rounded"
            style={{ maxWidth: 400 }}
          >
            {/* Heading */}
            <h4 className="mb-3 text-center text-success">Reset Password</h4>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="form-control pe-5"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <FaEnvelope
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                />
              </div>
            </div>

            {/* OTP */}
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                OTP <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                className="form-control"
                value={form.otp}
                onChange={handleChange}
                required
              />
            </div>

            {/* New Password */}
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password <span className="text-danger">*</span>
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  className="form-control pe-5"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  role="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>

            {/* Back Link */}
            <div className="text-center">
              <Link
                href="/auth/studentForgotPassword"
                className="text-decoration-none d-inline-flex align-items-center gap-1"
              >
                <i className="bi bi-arrow-left"></i> Back to Forgot Password
              </Link>
            </div>

          </form>
        </div>
      </section>

    </>
  );
}
