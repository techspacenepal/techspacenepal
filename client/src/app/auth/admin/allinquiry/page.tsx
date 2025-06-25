// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// interface Inquiry {
//   _id: string;
//   fullName: string;
//   email: string;
//   mobile: string;
//   course: string;
//   message?: string;
//   createdAt: string;
// }


// const InquiryTable = () => {
//   const [inquiries, setInquiries] = useState<Inquiry[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchInquiries = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/inquiry');
//       const allInquiries: Inquiry[] = res.data.inquiries || res.data;

//       const sorted = allInquiries.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );

//       setInquiries(sorted);
//     } catch (err) {
//       toast.error('Failed to fetch inquiries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/inquiry/${id}`);
//       setInquiries((prev) => prev.filter((inq) => inq._id !== id));
//       toast.success('Inquiry deleted');
//     } catch {
//       toast.error('Delete failed');
//     }
//   };

//   const filteredInquiries = inquiries.filter((inq) =>
//     [inq.fullName, inq.mobile, inq.email, inq.course]
//       .filter(Boolean)
//       .join(' ')
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   useEffect(() => {
//     fetchInquiries();
//   }, []);

//   return (
//     <div className="container py-5">
//       <Toaster />
//       <div className="row align-items-center mb-4 g-3">
//         {/* Title */}
//         <div className="col-12 col-md-6">
//           <h2 className="text-primary fw-bold m-0">All Courses Inquiries</h2>
//         </div>

//         {/* Search Input */}
//         <div className="col-12 col-md-6">
//           <div className="input-group">
//             <span className="input-group-text bg-white">
//               <i className="bi bi-search" />
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by name, mobile, email, course..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>


//       {loading ? (
//         <p>Loading...</p>
//       ) : filteredInquiries.length === 0 ? (
//         <p className="text-muted">No inquiries found.</p>
//       ) : (
//         <div className="bg-white rounded-4 shadow border border-2 overflow-auto">
//           <table
//             className="table table-striped table-hover align-middle mb-0 w-100"
//             style={{
//               borderCollapse: "separate",
//               borderSpacing: 0,
//               tableLayout: "fixed",
//               wordWrap: "break-word",
//             }}
//           >
//             <thead className="bg-primary text-white text-center">
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Mobile</th>
//                 <th scope="col">Email</th>
//                 <th scope="col">Course</th>
//                 <th scope="col">Message</th>
//                 <th scope="col">Date</th>
//                 <th scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredInquiries.map((inq, idx) => (
//                 <tr key={inq._id} className="text-center">
//                   <td>{idx + 1}</td>
//                   <td className="text-capitalize">{inq.fullName}</td>
//                   <td>{inq.mobile}</td>
//                   <td className="text-lowercase">{inq.email}</td>
//                   <td>{inq.course}</td>
//                   <td>{inq.message || '-'}</td>
//                   <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(inq._id)}
//                       className="btn btn-sm btn-outline-danger"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>


//         </div>





//       )}
//     </div>
//   );
// };

// export default InquiryTable;



'use client'; // Next.js client-side component declaration

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

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
  // ✅ State declarations
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔄 Fetch inquiries from backend
  const fetchInquiries = async () => {
    try {
      // Use environment variable instead of hardcoded URL
      const res = await axios.get('http://localhost:5000/api/inquiry');
      const allInquiries: Inquiry[] = res.data.inquiries || res.data;

      // Sort inquiries by newest first
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

  // 📦 Fetch data on component mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="container py-5">
      <Toaster /> {/* Toast notification container */}

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

      {/* 🔄 Loading, Empty State, or Table */}
      {loading ? (
        // 🔄 Loading spinner
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredInquiries.length === 0 ? (
        // ❌ No inquiries found
        <p className="text-muted">No inquiries found.</p>
      ) : (
        // ✅ Table of inquiries
        <div className="bg-white rounded-4 shadow border border-2 overflow-auto">
          <table
            className="table table-striped table-hover align-middle mb-0 w-100"
            style={{
              borderCollapse: "separate",
              borderSpacing: 0,
              tableLayout: "fixed",
              wordWrap: "break-word",
            }}
          >
            <thead className="bg-primary text-white text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Email</th>
                <th scope="col">Course</th>
                <th scope="col">Message</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
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
                  {/* Show first 30 chars of message only */}
                  <td title={inq.message}>{inq.message?.slice(0, 30) || '-'}</td>
                  {/* Format date to readable format */}
                  <td>{new Date(inq.createdAt).toLocaleString('en-GB')}</td>
                  <td>
                    {/* Delete button */}
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
