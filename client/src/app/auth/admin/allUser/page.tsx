'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageLoading, setPageLoading] = useState(true); // 🌀 for full-page loader
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/users');
      const allUsers: User[] = res.data.users || res.data;

      const sorted = allUsers.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setUsers(sorted);
    } catch (err) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = Cookies.get('adminToken'); // 🍪 use cookie
      await axios.delete(`http://localhost:5000/api/auth/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success('User deleted');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const filteredUsers = users.filter((user) =>
    [user.username, user.email, user.role]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const token = Cookies.get('adminToken');

    setTimeout(() => {
      if (!token) {
        toast.error('Please login to access this page');
        router.push('/auth/adminLogin');
      } else {
        fetchUsers();
      }
      setPageLoading(false);
    }, 1000);
  }, []);

  // 🌀 Full-page spinner on first load
  if (pageLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
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
      <div className="row align-items-center mb-4 g-3">
        {/* Heading: col-12 on mobile, col-6 on md+ */}
        <div className="col-12 col-md-6">
          <h2 className="text-primary fw-bold m-0">All Registered Users</h2>
        </div>

        {/* Input: col-12 on mobile, col-6 on md+ */}
        <div className="col-12 col-md-6">
          <div className="input-group w-100">
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
        </div>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-bordered table-hover align-middle  mb-0">
            <thead className="table-primary text-center">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id} className="text-center">
                  <td>{idx + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;