"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

import { signInWithPopup } from "firebase/auth";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "@/firebaseconfigurations/config";
import { Facebook, GithubIcon } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const StudentLoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/students/login",
        { email, password },
        { withCredentials: true }
      );

      const token = res.data.token;
      if (!token) throw new Error("No token received");

      Cookies.set("studentToken", token, {
        expires: 1,
        path: "/",
        sameSite: "lax",
        secure: false,
      });

      localStorage.setItem("studentToken", token);
      localStorage.setItem("studentId", res.data?.student?._id || res.data?._id);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: res.data.username, role: res.data.role })
      );

      login(token, res.data.role);
      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/studentdashboard");
      }, 300);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: any,
    endpoint: string,
    fallbackName = "User"
  ) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const email = user.email || `${user.uid}@provider.com`;
      const name = user.displayName || fallbackName;

      const { data } = await axios.post(
        `http://localhost:5000/api/students/${endpoint}`,
        { email, name }
      );

      Cookies.set("studentToken", data.token, {
        expires: 1,
        path: "/",
        sameSite: "lax",
        secure: false,
      });

      localStorage.setItem("studentToken", data.token);
      localStorage.setItem("studentId", data?.student?._id || data?._id);
      localStorage.setItem(
        "user",
        JSON.stringify({ username: data.username, role: data.role })
      );

      login(data.token, data.role);
      toast.success(`${endpoint.split("-")[0]} login successful!`);
      setTimeout(() => router.push("/studentdashboard"), 30);
    } catch (error) {
      console.error(`${endpoint} login failed`, error);
      toast.error(`${endpoint} login failed!`);
    }
  };



  // Fetch logo 
  useEffect(() => {
    axios.get("http://localhost:5000/api/logo")
      .then(res => setLogo(res.data))
      .catch(() => console.error("Failed to load logo"));
  }, []);

  return (
    <>

      <section className="bg-light min-vh-100 d-flex align-items-center">
        <div className="container d-flex justify-content-center">
          <Toaster position="top-right" />
          <div
            className="card border shadow-sm w-100 rounded d-flex"
            style={{
              maxWidth: "420px",
              border: "0.5px solid #dee2e6",
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
              height: "auto", // ✅ makes height adjust automatically
              minHeight: "auto", // ✅ prevents forcing big height
            }}
          >
            <div className="card-body p-4">
              {/* Logo + Heading */}
              <div className="text-center mb-4">
                <Link className="navbar-brand d-inline-block mb-3" href="/">
                  {logo ? (
                    <Image
                      src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                      alt="Logo"
                      width={220}
                      height={100}
                      unoptimized={true}
                      style={{
                        width: "180px",
                        height: "80px",
                        objectFit: "contain",
                      }}
                    />
                  ) : null}
                </Link>
                <h4 className="fw-bold mb-0">Student Login</h4>
                <p className="text-muted mb-0">Access your account securely</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      style={{ paddingRight: "40px" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                        color: "#999",
                        pointerEvents: "none",
                      }}
                    >
                      <i className="fa fa-envelope" />
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ paddingRight: "40px" }}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#999",
                      }}
                    >
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                    </span>
                  </div>
                </div>

                {error && <div className="text-danger small mb-3">{error}</div>}

                {/* Login Button */}
                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-danger btn-lg d-flex align-items-center justify-content-center"
                    disabled={loading}
                    style={{ borderRadius: "8px", height: "50px" }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-end mb-3">
                  <Link
                    href="/auth/studentForgotPassword"
                    className="text-danger"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Social Login */}
                <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mb-3">
                  <button
                    className="btn btn-outline-danger rounded d-flex align-items-center justify-content-center p-2"
                    onClick={() => handleSocialLogin(googleProvider, "google-login")}
                    type="button"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <FcGoogle size={24} />
                  </button>
                  <button
                    className="btn btn-outline-danger rounded d-flex align-items-center justify-content-center p-2"
                    onClick={() => handleSocialLogin(githubProvider, "github-login")}
                    type="button"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <GithubIcon size={22} />
                  </button>
                  <button
                    className="btn btn-outline-danger rounded d-flex align-items-center justify-content-center p-2"
                    onClick={() =>
                      handleSocialLogin(facebookProvider, "facebook-login", "FacebookUser")
                    }
                    type="button"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <Facebook size={22} />
                  </button>
                </div>

                {/* Links */}
                <p className="text-center mb-1">
                  <Link
                    href="/"
                    className="d-inline-flex align-items-center text-primary text-decoration-none small"
                    style={{
                      color: '#ffffff',
                      fontWeight: '500',
                      border: 'none',
                      fontSize: '16px',
                      textDecoration: 'none',
                      gap: '8px'
                    }}
                  >
                    <i className="bi bi-arrow-left" style={{ fontSize: '18px' }}></i>
                    Back to Home
                  </Link>
                </p>

                <p className="text-center mb-0">
                  <Link
                    href="/auth/studentRegister"
                    className="d-inline-flex align-items-center text-primary text-decoration-none small"
                    style={{
                      color: '#ffffff',
                      fontWeight: '500',
                      border: 'none',
                      fontSize: '16px',
                      textDecoration: 'none',
                      gap: '8px'
                    }}
                  >
                    Register Now
                    <i className="bi bi-arrow-right" style={{ fontSize: '18px' }}></i>
                  </Link>
                </p>

              </form>

            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default StudentLoginPage;
