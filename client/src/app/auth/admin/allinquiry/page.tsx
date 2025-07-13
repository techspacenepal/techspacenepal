'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// 👉 Inquiry interface for type safety
interface Inquiry {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  course: string;
  message?: string;
  createdAt: string;
}

const InquiryTable = () => {
  const router = useRouter();

  // 🔄 State declarations
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true); // for table data
  const [pageLoading, setPageLoading] = useState(true); // for URL load
  const [searchTerm, setSearchTerm] = useState('');

  // 🔐 Check login token
  useEffect(() => {
    const token = Cookies.get('adminToken');
    setTimeout(() => {
      if (!token) {
        toast.error('Please login to access this page');
        router.push('/auth/adminLogin');
      } else {
        fetchInquiries(); // only fetch if token exists
      }
      setPageLoading(false);
    }, 1000);
  }, []);

  // 📦 Fetch inquiries from backend
  const fetchInquiries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/inquiry');
      const allInquiries: Inquiry[] = res.data.inquiries || res.data;

      // Sort by most recent
      const sorted = allInquiries.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setInquiries(sorted);
    } catch (err) {
      toast.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete inquiry
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/inquiry/${id}`);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      toast.success('Inquiry deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  // 🔍 Filter inquiries by search term
  const filteredInquiries = inquiries.filter((inq) =>
    [inq.fullName, inq.mobile, inq.email, inq.course]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 🌀 Full-page loader
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

      {/* 🔷 Header & Search Row */}
      <div className="row align-items-center mb-4 g-3">
        <div className="col-12 col-md-6">
          <h2 className="text-primary fw-bold m-0">All Courses Inquiries</h2>
        </div>
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, mobile, email, course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 🧾 Loading, Empty, or Table */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <p className="text-muted">No inquiries found.</p>
      ) : (
        <div className="bg-white rounded-4 shadow  border-2 overflow-auto">
          <table
            className="table table-striped table-hover align-middle mb-0 w-100"
            style={{
              borderCollapse: 'separate',
              borderSpacing: 0,
              tableLayout: 'fixed',
              wordWrap: 'break-word',
            }}
          >
            <thead className="bg-primary text-white text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Course</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inq, idx) => (
                <tr key={inq._id} className="text-center">
                  <td>{idx + 1}</td>
                  <td className="text-capitalize">{inq.fullName}</td>
                  <td>{inq.mobile}</td>
                  <td className="text-lowercase">{inq.email}</td>
                  <td>{inq.course}</td>
                  <td title={inq.message}>{inq.message?.slice(0, 30) || '-'}</td>
                  <td>{new Date(inq.createdAt).toLocaleString('en-GB')}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(inq._id)}
                      className="btn btn-sm btn-outline-danger"
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

export default InquiryTable;
