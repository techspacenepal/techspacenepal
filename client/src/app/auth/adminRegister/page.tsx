


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "lucide-react";
import Cookies from "js-cookie";
import { number } from "zod";

const AdminRegisterPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      toast.error("Please login first!");
      router.push("/auth/adminLogin");
    }
  }, []);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isStrongPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const isValidNepaliNumber = (number: string) => {
    return /^(98|97)\d{8}$/.test(number);
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

    if (!isValidNepaliNumber(number)) {
      toast.error("Enter a valid Nepali phone number (10 digits starting with 98/97)");
      setLoading(false);
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error("Password must be 8+ chars with uppercase, lowercase, number, and symbol");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        fullName,
        username,
        email,
        number,
        password,
        role,
      });

      toast.success("Registration successful! Please login.");
      setTimeout(() => router.push("/auth/adminLogin"), 100);
    } catch (error: any) {
      const msg = error.response?.data?.message;
      if (msg?.includes("username")) {
        toast.error("Username already exists. Please choose another.");
      } else {
        toast.error(msg || "Registration failed!");
      }
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
    <>
      <section className="bg-light d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="row justify-content-center">
            {/* Smaller and responsive form width */}
            <div className="col-lg-5 col-md-7 col-sm-10">
              <div className="card shadow-sm rounded" style={{
                border: "0.5px solid #dee2e6",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
              }}>
                {/* Reduced padding for smaller height */}
                <div className="card-body p-3 p-md-4">
                  {/* Logo */}
                  <div className="text-center mb-3">
                    <Link href="/" className="d-inline-block">
                      {logo && (
                        <Image
                          src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                          alt="Logo"
                          width={110}
                          height={55}
                          unoptimized
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </Link>
                    <p className="fw-semibold text-muted mt-2 mb-0" style={{ fontSize: "14px" }}>
                      Please sign in to access your account
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="needs-validation">
                    {/* Full Name */}
                    <div className="mb-2">
                      <label className="form-label fw-semibold small">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Username */}
                    <div className="mb-2">
                      <label className="form-label fw-semibold small">
                        Username <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-3"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                      <label className="form-label fw-semibold small">
                        Email <span className="text-danger">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type="email"
                          className="form-control rounded-3 pe-5"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                        />
                        <i
                          className="bi bi-envelope position-absolute"
                          style={{
                            top: "50%",
                            right: "14px",
                            transform: "translateY(-50%)",
                            color: "#aaa",
                          }}
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="mb-2">
                      <label className="form-label fw-semibold small">
                        Mobile Number <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white rounded-start-3">
                          <img
                            src="https://flagcdn.com/w20/np.png"
                            alt="Nepal Flag"
                            style={{ width: "16px", height: "16px", marginRight: "6px" }}
                          />
                          +977
                        </span>
                        <input
                          type="text"
                          className="form-control rounded-end-3"
                          value={number}
                          onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d{0,10}$/.test(input)) {
                              setNumber(input);
                            }
                          }}
                          placeholder="Enter your mobile number"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-2">
                      <label className="form-label fw-semibold small">
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control rounded-3 pe-5"
                          value={password}
                          placeholder="Enter your password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <i
                          className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "14px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#888",
                          }}
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                      <label className="form-label fw-semibold small">
                        Role <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select rounded-3"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-danger w-100 rounded-3 fw-semibold py-2"
                      disabled={loading}
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </form>

                  {/* Links */}
                  <div className="d-flex flex-column align-items-center mt-4" style={{ fontSize: "14px" }}>
                    <p className="mb-2">
                      Already have an account?{" "}
                      <Link
                        href="/auth/adminLogin"
                        className="text-primary fw-semibold text-decoration-none"
                      >
                        Login here
                      </Link>
                    </p>

                    <p className="mb-0 d-flex justify-content-center align-items-center gap-1" style={{ fontSize: "14px" }}>
                      Or go to
                      <Link
                        href="/"
                        className="text-danger fw-semibold d-flex align-items-center text-decoration-none"
                      >
                        <HomeIcon size={16} className="me-1" />
                        <span>Home</span>
                      </Link>
                    </p>


                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};

export default AdminRegisterPage;
