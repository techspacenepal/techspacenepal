


"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface Student {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const StudentRegisterPage: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [pageLoading, setPageLoading] = useState(true); // full page loader

  const isStrongPassword = (password: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to load student list");
    }
  };

  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchStudents();
      }
      setPageLoading(false);
    }, 1000);
  }, []);

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
      await axios.post("http://localhost:5000/api/students/register", {
        username,
        email,
        password,
        role: "student",
      });

      toast.success("Registration successful!");
      setUsername("");
      setEmail("");
      setPassword("");
      fetchStudents();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // 🌀 Full-page loader
  if (pageLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="multi-spinner"></div>
        <style jsx>{`
          .multi-spinner {
            width: 4rem;
            height: 4rem;
            border: 8px solid transparent;
            border-top: 8px solid red;
            border-right: 8px solid blue;
            border-bottom: 8px solid green;
            border-left: 8px solid orange;
            border-radius: 50%;
            animation: spin 1.2s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Toaster position="top-right" />

      {/* ✅ Student List Table */}
      <div className="card shadow mx-auto" style={{ maxWidth: "800px" }}>
        <div className="card-header bg-primary text-white fw-bold">
          Registered Students
        </div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-3">
                    No students found.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student._id}</td>
                    <td>{student.username}</td>
                    <td>{student.email}</td>
                    <td>{student.role}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔒 Optional Registration Form (Uncomment if needed)
      <form onSubmit={handleSubmit}>
        ...
      </form> */}
    </div>
  );
};

export default StudentRegisterPage;
