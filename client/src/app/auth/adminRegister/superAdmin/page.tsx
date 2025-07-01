"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {  HomeIcon } from "lucide-react";
import Cookies from "js-cookie";

const AdminRegisterPage: React.FC = () => {


   const router = useRouter();

    // ✅ Check for adminToken and redirect to login if not found     hide search bar in register page 
  useEffect(() => {
    const token = Cookies.get("adminToken");
    if (!token) {
      toast.error("Please login first!");
      router.push("/auth/adminLogin");
    }
  }, []);
  

  ///-------authorixed code 
  // useEffect(() => {
  //   const token = Cookies.get("adminToken");
  //   const role = Cookies.get("userRole");

  //       console.log("Token:", token); // Debugging purpose
  //   console.log("Role:", role);


  //   if (!token) {
  //     toast.error("Token missing!");
  //     router.push("/auth/adminLogin");
  //     return;
  //   }

  //   if (role !== "admin") {
  //     toast.error("Unauthorized access!");
  //     router.push("/auth/adminLogin");
  //   }
  // }, []);



  ///----------------------------


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);

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

    if (!isStrongPassword(password)) {
      toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number, and symbol"
      );
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        role,
      });

      toast.success("Registration successful! Please login.");
      setTimeout(() => router.push("/auth/adminLogin"), 100);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

 
  const [showPassword, setShowPassword] = useState(false);
  //--------------------------

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <Toaster position="top-right" />
      <div
        className="card shadow p-4 w-100"
        style={{ maxWidth: "500px" }}
      >
        <div className="text-center mb-3">
          <Image src="/logo.jpg" alt="Logo" width={90} height={80} />
          <p className="fw-bold text-muted mt-2">
            Please sign in to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
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
                <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>
            <select
              className="form-select"
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
            className="btn btn-danger w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* <div className="d-flex gap-3 my-3 justify-content-center align-items-center flex-wrap">
          <button
            className="btn btn-outline-danger d-flex justify-content-center align-items-center"
            onClick={handleFirebaseGoogleLogin}
            type="button"
          >
            <FcGoogle size={24} />
          </button>

          <button
            className="btn btn-outline-danger d-flex justify-content-center align-items-center"
            onClick={handleFirebaseGithubLogin}
            type="button"
          >
            <GithubIcon size={22} />
          </button>
        </div> */}

        <p className="text-center mt-3 ">
          Already have an account?{" "}
          <Link href="/auth/adminLogin" className="text-primary fw-medium text-decoration-none">
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

export default AdminRegisterPage;
