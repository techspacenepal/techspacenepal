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
  number?: string;
  role: string;
  isBlocked: boolean;
  createdAt?: string;
}

const StudentRegisterPage: React.FC = () => {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      const sorted = res.data.sort(
        (a: Student, b: Student) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      );
      setStudents(sorted);
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

  const filteredStudents = students.filter((student) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      student.username.toLowerCase().includes(lowerSearch) ||
      student.email.toLowerCase().includes(lowerSearch) ||
      student.role.toLowerCase().includes(lowerSearch) ||
      student._id.toLowerCase().includes(lowerSearch) ||
      student.number?.toLowerCase().includes(lowerSearch)
    );
  });

  const handleBlockToggle = async (userId: string) => {
    try {
      const token = Cookies.get("adminToken");
      if (!token) {
        toast.error("Unauthorized action");
        return;
      }

      setLoadingIds((prev) => [...prev, userId]);

      const res = await axios.put(
        `http://localhost:5000/api/students/block/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      setStudents((prev) =>
        prev.map((student) =>
          student._id === userId
            ? { ...student, isBlocked: !student.isBlocked }
            : student
        )
      );
    } catch (error: any) {
      console.error("Block toggle failed:", error);
      toast.error(
        error?.response?.data?.message || "Failed to block/unblock user"
      );
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== userId));
    }
  };

  if (pageLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh", paddingTop: "50px" }}
      >
        <img
          src="/logo.png"
          alt="Loading..."
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Toaster position="top-right" />

      <h3 className="fw-bold mb-4 text-center text-primary">
        Student Management
      </h3>

      <div className="mb-3" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search username, email, role, number ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive bg-white shadow rounded">
        <table className="table table-bordered table-hover align-middle text-center mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registered</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-muted py-3">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student._id}</td>
                  <td>{student.username}</td>
                  <td>{student.email}</td>
                  <td>{student.number || "-"}</td>{" "}
                  {/* ✅ FIXED: Show number here */}
                  <td className="text-capitalize">{student.role}</td>
                  <td>
                    <span
                      className={`badge ${
                        student.isBlocked ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {student.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td>
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                 
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRegisterPage;
