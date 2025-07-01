"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

const AdminLoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth(); // 🧠 Custom AuthContext बाट login function

  // 🔐 Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 📤 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🛠️ Login API call
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      // ✅ Set auth context, cookies, and localStorage
      login(data.token, data.role);
      Cookies.set("adminToken", data.token);
      localStorage.setItem("adminToken", data.token);

      localStorage.setItem("teacherId", data.userId);

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          email: data.email,
          role: data.role,
        })
      );

      // 🎉 Notify and redirect based on role
      toast.success("Login successful!");
      // setTimeout(() => {
      //   router.push(data.role === "admin" ? "/Dashboard/adminDashboard" : "/Dashboard/userDashboard");
      // }, 100);

      setTimeout(() => {
        if (data.role === "admin") {
          router.push("/Dashboard/adminDashboard");
        } else if (data.role === "teacher") {
          router.push("/teacherDashboard");
        } else {
          router.push("/Dashboard/userDashboard");
        }
      }, 100);
    } catch (error: any) {
      // ❌ Error handling
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove auto-redirect logic to prevent automatic login bypassing form
  // useEffect(() => {
  //   const token = Cookies.get("adminToken");
  //   if (token) {
  //     router.push("/Dashboard/adminDashboard");
  //   }
  // }, []);

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
      <Toaster position="top-right" />

      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "400px" }}>
        {/* 🖼️ Logo and Heading */}
        <div className="text-center mb-3">
          <Image src="/logo.jpg" alt="Logo" width={90} height={80} />
          <p className="text-muted">Please login to continue</p>
        </div>

        {/* 🔐 Login Form */}
        <form onSubmit={handleSubmit}>
          {/* 📧 Email Input */}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* 🔑 Password Input */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              {/* 👁️ Toggle password visibility */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </span>
            </div>
          </div>

          {/* 🔘 Submit Button */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-danger" disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>

          {/* 🔗 Forgot Password Link */}
          <div className="text-end mb-2">
            <Link
              href="/auth/forgot-password"
              className="text-danger text-decoration-none"
            >
              Forgot Password?
            </Link>
          </div>

          {/* 🔗 Back to home */}
          <p className="text-center">
            <Link href="/" className="text-primary text-decoration-none">
              ← Back to Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
