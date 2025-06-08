'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInquiries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/inquiry');
      const allInquiries: Inquiry[] = res.data.inquiries || res.data;

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

  const filteredInquiries = inquiries.filter((inq) =>
    [inq.fullName, inq.mobile, inq.email, inq.course]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="container py-5">
      <Toaster />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <h2 className="text-primary fw-bold"> All Courses Inquiries</h2>

        <div className="input-group w-100 w-md-50">
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

      {loading ? (
        <p>Loading...</p>
      ) : filteredInquiries.length === 0 ? (
        <p className="text-muted">No inquiries found.</p>
      ) : (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-primary text-center">
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
                  <td>{inq.fullName}</td>
                  <td>{inq.mobile}</td>
                  <td>{inq.email}</td>
                  <td>{inq.course}</td>
                  <td>{inq.message || '-'}</td>
                  <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(inq._id)}
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

export default InquiryTable;
