"use client";

import React, { useState } from "react";
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

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <Toaster position="top-right" />
      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-3">
          <Image src="/logo.png" alt="Logo" width={90} height={80} />
          <p className="fw-bold text-muted mt-2">
            Create your student account to begin your learning journey. 
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Number</label>
            <input
              type="text"
              className="form-control"
              value={number}
              onChange={(e) => {
                const input = e.target.value;
                // Allow only digits and max 10 characters
                if (/^\d{0,10}$/.test(input)) {
                  setNumber(input);
                }
              }}
              placeholder="Enter 10-digit Nepali number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link
            href="/auth/studentLogin"
            className="text-primary fw-medium text-decoration-none"
          >
            Login here
          </Link>
        </p>

        <p className="text-center">
          Or go to{" "}
          <Link
            href="/"
            className="text-danger fw-medium d-inline-flex align-items-center text-decoration-none"
          >
            <HomeIcon className="me-1" size={18} />
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentRegisterPage;
