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
    <>

      <section>
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
          <Toaster position="top-right" />
          <form
            onSubmit={handleSendOTP}
            className="p-4 card shadow-sm w-100 border rounded"
            style={{ maxWidth: 400 }}
          >
            {/* Heading */}
            <div className="text-center mb-4">
              <h4 className="fw-bold text-danger mb-1">Forgot Password</h4>
              <p className="text-muted small mb-0">
                Enter your email to receive an OTP
              </p>
            </div>

            {/* Email Input */}
            <div className="mb-3 position-relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                style={{ paddingRight: "40px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "14px",
                  transform: "translateY(-50%)",
                  color: "#999",
                  pointerEvents: "none",
                }}
              >
                <i className="fa fa-envelope" />
              </span>
            </div>

            {/* Submit Button */}
            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-danger fw-semibold shadow-sm"
                style={{ borderRadius: "10px" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>

            {/* Back to Login */}
            <p className="text-center mb-0">
              <a
                href="/auth/studentLogin"
                className="text-decoration-none d-inline-flex align-items-center gap-1"
                style={{ color: "#0d6efd" }}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Back to Login
              </a>
            </p>


          </form>
        </div>
      </section>


    </>
  );
}
