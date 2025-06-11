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
const cellStyle = {
  border: "1px solid #dee2e6",
  verticalAlign: "middle",
  padding: "0.75rem",
  backgroundColor: "#fff",
};

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
      <div className="row align-items-center mb-4 g-3">
        {/* Title */}
        <div className="col-12 col-md-6">
          <h2 className="text-primary fw-bold m-0">All Courses Inquiries</h2>
        </div>

        {/* Search Input */}
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


      {loading ? (
        <p>Loading...</p>
      ) : filteredInquiries.length === 0 ? (
        <p className="text-muted">No inquiries found.</p>
      ) : (
       <div className="bg-white rounded-4 shadow border border-2 overflow-hidden">
  <table
    className="table table-striped table-hover align-middle mb-0 w-100"
    style={{
      borderCollapse: "separate",
      borderSpacing: 0,
      tableLayout: "fixed", // fixes column widths
      wordWrap: "break-word",
    }}
  >
    <thead className="bg-primary text-white text-center">
      <tr>
        <th scope="col" style={cellStyle}>#</th>
        <th scope="col" style={cellStyle}>Name</th>
        <th scope="col" style={cellStyle}>Mobile</th>
        <th scope="col" style={cellStyle}>Email</th>
        <th scope="col" style={cellStyle}>Course</th>
        <th scope="col" style={cellStyle}>Message</th>
        <th scope="col" style={cellStyle}>Date</th>
        <th scope="col" style={cellStyle}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredInquiries.map((inq, idx) => (
        <tr key={inq._id} className="text-center">
          <td style={cellStyle}>{idx + 1}</td>
          <td style={cellStyle} className="text-capitalize">{inq.fullName}</td>
          <td style={cellStyle}>{inq.mobile}</td>
          <td style={cellStyle} className="text-lowercase">{inq.email}</td>
          <td style={cellStyle}>{inq.course}</td>
          <td style={cellStyle}>{inq.message || '-'}</td>
          <td style={cellStyle}>
            {new Date(inq.createdAt).toLocaleDateString()}
          </td>
          <td style={cellStyle}>
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

  {/* Responsive style for mobile */}
  <style jsx>{`
    @media (max-width: 768px) {
      table {
        font-size: 13px;
      }

      th,
      td {
        white-space: normal !important;
        word-break: break-word;
      }
    }
  `}</style>
</div>




      )}
    </div>
  );
};

export default InquiryTable;
