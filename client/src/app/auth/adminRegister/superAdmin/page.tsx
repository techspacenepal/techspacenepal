"use client";

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GithubIcon, HomeIcon } from "lucide-react";

import { FcGoogle } from "react-icons/fc"; // Google Icon from react-icons

import { signInWithPopup } from "firebase/auth";
import {
  auth,
  githubProvider,
  googleProvider,
} from "@/firebaseconfigurations/config";

const AdminRegisterPage: React.FC = () => {
  const router = useRouter();
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
      setTimeout(() => router.push("/auth/adminLogin"), 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // const handleFirebaseGoogleLogin = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const user = result.user;
  //     console.log("User info:", user);
  //     toast.success("Firebase Google login successful!");

  //     // You might want to send `user.email` to your backend as well for registration/login
  //     setTimeout(() => {
  //       router.push("/Dashboard/adminDashboard");
  //     }, 1500);
  //   } catch (error) {
  //     console.error("Firebase error:", error);
  //     toast.error("Firebase Google login failed!");
  //   }
  // };

  ///----------------------------new code

  const handleFirebaseGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      toast.success("  Google login successful!");

      // Send to backend to get user role
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          email: user.email,
          name: user.displayName,
        }
      );

      const userRole = data.role;

      if (userRole === "admin") {
        router.push("/Dashboard/adminDashboard");
      } else {
        router.push("/Dashboard/userDashboard");
      }
    } catch (error) {
      console.error("Firebase error:", error);
      toast.error("Firebase Google login failed!");
    }
  };

  //-----Github login
  const handleFirebaseGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      toast.success(" GitHub login successful!");

      // Send to backend to get user role
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          email: user.email,
          name: user.displayName,
        }
      );

      const userRole = data.role;

      if (userRole === "admin") {
        router.push("/Dashboard/adminDashboard");
      } else {
        router.push("/Dashboard/userDashboard");
      }
    } catch (error) {
      console.error("Firebase error:", error);
      toast.error("Firebase Google login failed!");
    }
  };

  //--------------------------

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Toaster position="top-right" />
      <div
        className="card shadow p-4"
        style={{ maxWidth: "500px", width: "100%" }}
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
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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

        <div className="d-flex gap-3 my-3 justify-content-center align-items-center">
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
        </div>

        <p className="text-center">
          Already have an account?{" "}
          <Link href="/auth/adminLogin" className="text-primary fw-medium">
            Login here
          </Link>
        </p>

        <p className="text-center">
          Or go to{" "}
          <Link
            href="/"
            className="text-danger fw-medium d-inline-flex align-items-center"
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
