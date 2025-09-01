"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "lucide-react";

const StudentRegisterPage: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isStrongPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!/^(98|97|96)[0-9]{8}$/.test(number)) {
      toast.error("Enter valid 98/97/96 number");
      setLoading(false);
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number, and symbol"
      );
      setLoading(false);
      return;
    }

    try {

      const usernameCheck = await axios.get(`http://localhost:5000/api/students/check-username/${username}`);
      if (usernameCheck.data.exists) {
        toast.error("Username already exits. Try a different one.");
        setLoading(false);
        return;
      }
    } catch (checkError) {
      toast.error("Failed to verify username uniqueness.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students/register", {
        fullName,
        username,
        email,
        number,
        password,
        role: "student",
      });

      toast.success("Registration successful! Please login.");
      setTimeout(() => router.push("/auth/studentLogin"), 100);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };


  const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);


  // Fetch logo data on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/logo")
      .then(res => setLogo(res.data))
      .catch(() => console.error("Failed to load logo"));
  }, []);

  return (
    <>
      <section className="py-5 bg-light min-vh-100 d-flex align-items-center">
        <div className="container">
          <Toaster position="top-right" />
          <div className="card shadow-sm mx-auto w-100 col-lg-8 rounded"
            style={{
              maxWidth: "570px",
              border: "0.5px solid #dee2e6",
              boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
            }}>
            <div className="card-body p-4">
              {/* Logo + subtitle */}
              <div className="text-center mb-4">
                <Link className="navbar-brand" href="/">
                  {logo && (
                    <Image
                      src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                      alt="Logo"
                      width={180}
                      height={80}
                      unoptimized
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </Link>
                <p
                  className="fw-semibold text-muted small"
                  style={{
                    fontSize: "clamp(0.8rem, 1.2vw, 1.2rem)"
                  }}
                >
                  Create your student account to begin your learning journey.
                </p>

              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row">
                  {/* Full Name */}
                  <div className="mb-3 col-12 col-lg-6">
                    <label className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Username */}
                  <div className="mb-3 col-12 col-lg-6">
                    <label className="form-label">
                      Username <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Number */}
                <div className="mb-3">
                  <label className="form-label">
                    Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={number}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,10}$/.test(input)) setNumber(input);
                    }}
                    required
                  />
                </div>

                {/* Password */}
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
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "12px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "#6c757d",
                      }}
                    >
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                    </span>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  type="submit"
                  className="btn btn-danger w-100 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              {/* Footer links */}
              <p className="text-center mt-4 mb-2">
                Already have an account?{" "}
                <Link
                  href="/auth/studentLogin"
                  className="text-primary fw-semibold text-decoration-none"
                >
                  Login here
                </Link>
              </p>

              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex align-items-center justify-content-center gap-2 mb-0">
                  <span>Go back to</span>
                  <Link
                    href="/"
                    className="text-danger fw-semibold d-inline-flex align-items-center text-decoration-none"
                  >
                    <HomeIcon className="me-1" size={18} />
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default StudentRegisterPage;
