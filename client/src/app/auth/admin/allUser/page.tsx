'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/users');
      const allUsers: User[] = res.data.users || res.data;

      const sorted = allUsers.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
    const token = localStorage.getItem('adminToken'); // or from context
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
    fetchUsers();
  }, []);

  return (
    <div className="container py-5">
      <Toaster />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 className="text-primary fw-bold">All Registered Users</h2>

        <div className="input-group w-100 w-md-50">
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

      {loading ? (
        <p>Loading...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-muted">No users found.</p>
      ) : (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-bordered table-hover align-middle">
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