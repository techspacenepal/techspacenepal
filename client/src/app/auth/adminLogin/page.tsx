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
  const { login } = useAuth();

  // 🔐 Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    const token = Cookies.get("adminToken") || Cookies.get("teacherToken");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (user.role === "admin") {
        router.push("/auth/Dashboard/adminDashboard");
      } else if (user.role === "teacher") {
        router.push("/auth/Dashboard/teacherDashboard");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      console.log("Login response data:", data);
      login(data.token, {
        username: data.username,
        role: data.role,
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          email: data.email,
          role: data.role,
        })
      );

      if (data.role === "admin") {
        Cookies.set("adminToken", data.token, {
          expires: 30,
          secure: true,
          sameSite: "strict",
        });

        localStorage.setItem("adminToken", data.token);
        console.log(
          "Admin token saved:",
          Cookies.get("adminToken"),
          localStorage.getItem("adminToken")
        );
      } else if (data.role === "teacher") {
        Cookies.set("teacherToken", data.token, {
          expires: 30,
          secure: true,
          sameSite: "strict",
        });

        localStorage.setItem("teacherToken", data.token);
        localStorage.setItem("teacherId", data.userId);
        console.log(
          "Teacher token saved:",
          Cookies.get("teacherToken"),
          localStorage.getItem("teacherToken")
        );
      }

      toast.success("Login successful!");

      setTimeout(() => {
        if (data.role === "admin") {
          router.push("/auth/Dashboard/adminDashboard");
        } else if (data.role === "teacher") {
          router.push("/auth/Dashboard/teacherDashboard");
        } else {
          router.push("/auth/Dashboard/userDashboard");
        }
      }, 200);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };
  // Fetch logo
  const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/logo")
      .then((res) => setLogo(res.data))
      .catch(() => console.error("Failed to load logo"));
  }, []);
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 px-3">
      <Toaster position="top-right" />

<div className="card shadow-sm p-4 w-100 animated-outline" style={{ maxWidth: "400px" }}>
        <div className="text-center mb-3">
          <Link className="navbar-brand" href="/">
            {logo && (
              <Image
                src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                alt="Logo"
                width={150}
                height={0}
                unoptimized={true}
                style={{ width: "120px", height: "60px", objectFit: "contain" }}
              />
            )}
          </Link>
          <p className="text-muted">Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">
              Email address <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#999",
                  pointerEvents: "none",
                }}
              >
                <i className="fa fa-envelope" />
              </span>
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
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
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </span>
            </div>
          </div>

          {/* Submit Button */}
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

          {/* Forgot Password Link */}
          <div className="text-end mb-2">
            <Link href="/auth/forgot-password" className="text-danger">
              Forgot Password?
            </Link>
          </div>

          {/* Back to Home */}
          {/* Back to Home */}
          <p className="text-center">
            <Link
              href="/"
              className="text-primary text-decoration-none d-inline-flex align-items-center"
            >
              <i className="fa fa-home me-2"></i>
              Back to Home
            </Link>
          </p>


        </form>

      </div>
      
    </div>
  );
};

export default AdminLoginPage;
