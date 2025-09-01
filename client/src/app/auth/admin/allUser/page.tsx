"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// 🔰 Common user interface
interface User {
  _id: string;
  fullName: string;
  username: string;
  number: string;
  email: string;
  role: string;
  createdAt?: string; 
}

export default function UserManagementPage() {
  
  const [users, setUsers] = useState<User[]>([]); // all users from /api/auth/users
  const [students, setStudents] = useState<User[]>([]); // students from /api/students
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "teachers" | "students">(
    "users"
  );
  const router = useRouter();

  // ✅ Fetch both users and students
  useEffect(() => {
    const token = Cookies.get("adminToken");
    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchUsers();
        fetchStudents(); 
      }
      setPageLoading(false);
    }, 1000);
  }, []);

  // ✅ Fetch users from /api/auth/users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      const allUsers: User[] = res.data.users || res.data;
      const sorted = allUsers.sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setUsers(sorted);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch students from /api/students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      // Some students might not have createdAt — add default value
      const studentList: User[] = res.data.map((s: any) => ({
        ...s,
        createdAt: s.createdAt || new Date().toISOString(),
      }));
      setStudents(studentList);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  // ✅ Delete any user
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = Cookies.get("adminToken");
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setStudents((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // ✅ Filtered lists
  const filteredUsers = users.filter((user) =>
    [user.username, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredTeachers = users.filter(
    (user) =>
      user.role === "teacher" &&
      [user.username, user.email]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter((user) =>
    [user.username, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 🌀 Full page loading spinner
  if (pageLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
      <Toaster />

      {/* 🔁 Tabs */}
      <div className="mb-4">
        <button
          className={`btn me-2 ${
            activeTab === "users" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("users")}
        >
          All Users
        </button>
        <button
          className={`btn me-2 ${
            activeTab === "teachers" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => setActiveTab("teachers")}
        >
          Teachers
        </button>
        <button
          className={`btn ${
            activeTab === "students" ? "btn-warning" : "btn-outline-warning"
          }`}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>
      </div>

      {/* 🔍 Search */}
      <div className="input-group mb-4">
        <span className="input-group-text bg-white">
          <i className="bi bi-search" />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by username, email, role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🔽 Tabs Content */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {activeTab === "users" && (
            <div>
              <h4 className="text-primary mb-3">All Users</h4>
              {filteredUsers.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <UserTable
                  data={filteredUsers}
                  handleDelete={handleDelete}
                  showId={false}
                />
              )}
            </div>
          )}

          {activeTab === "teachers" && (
            <div>
              <h4 className="text-success mb-3">Teachers</h4>
              {filteredTeachers.length === 0 ? (
                <p>No teachers found.</p>
              ) : (
                <UserTable
                  data={filteredTeachers}
                  handleDelete={handleDelete}
                  showId={true}
                />
              )}
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <h4 className="text-warning mb-3">Students</h4>
              {filteredStudents.length === 0 ? (
                <p>No students found.</p>
              ) : (
                <UserTable
                  data={filteredStudents}
                  handleDelete={handleDelete}
                  showId={true}
                  hideActions={true} // ✅ Hide delete button
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function UserTable({
  data,
  handleDelete,
  showId,
  hideActions = false, 
}: {
  data: User[];
  handleDelete: (id: string) => void;
  showId: boolean;
  hideActions?: boolean;
}) {
  return (
    <div className="table-responsive bg-white rounded shadow-sm">
      <table className="table table-bordered table-hover align-middle mb-0">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            {showId && <th>ID</th>}
            <th>Full Name</th>
            <th>Username</th>
            <th>Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date</th>
            {!hideActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr key={user._id} className="text-center">
              <td>{idx + 1}</td>
              {showId && <td>{user._id}</td>}
              <td>{user.fullName}</td>
              <td>{user.username}</td>
               <td>{user.number}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt || "").toLocaleDateString()}</td>
              {!hideActions && (
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
