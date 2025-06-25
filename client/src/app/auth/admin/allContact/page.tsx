// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// interface Contact {
//   _id: string;
//   name: string;
//   email: string;
//   mobile: string;
//   course: string;
//   message?: string;
//   createdAt: string;
// }

// const ContactTable = () => {
//   const [inquiries, setInquiries] = useState<Contact[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchInquiries = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/contact');
//       const allInquiries: Contact[] = res.data.inquiries || res.data;

//       const sorted = allInquiries.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );

//       setInquiries(sorted);
//     } catch (err) {
//       toast.error('Failed to fetch contact');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this Contact?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/contact/${id}`);
//       setInquiries((prev) => prev.filter((inq) => inq._id !== id));
//       toast.success('Contact deleted');
//     } catch {
//       toast.error('Delete failed');
//     }
//   };

//   const filteredInquiries = inquiries.filter((inq) =>
//     [inq.name, inq.mobile, inq.email, inq.course]
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
//      <div className="row align-items-center mb-4 g-3">
//   {/* Heading: col-12 on mobile, col-6 on md+ */}
//   <div className="col-12 col-md-6">
//     <h2 className="text-primary fw-bold m-0">Any questions</h2>
//   </div>

//   {/* Search input: col-12 on mobile, col-6 on md+ */}
//   <div className="col-12 col-md-6">
//     <div className="input-group">
//       <span className="input-group-text bg-white">
//         <i className="bi bi-search" />
//       </span>
//       <input
//         type="text"
//         className="form-control"
//         placeholder="Search by name, mobile, email, course..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   </div>
// </div>


//       {loading ? (
//         <p>Loading...</p>
//       ) : filteredInquiries.length === 0 ? (
//         <p className="text-muted">No contact found.</p>
//       ) : (
//         <div className="table-responsive bg-white rounded shadow-sm">
//           <table className="table table-bordered table-hover align-middle mb-0">
//             <thead className="table-primary text-center">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Email</th>
//                 <th>Course</th>
//                 <th>Message</th>
//                 <th>Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredInquiries.map((inq, idx) => (
//                 <tr key={inq._id} className="text-center">
//                   <td>{idx + 1}</td>
//                   <td>{inq.name}</td>
//                   <td>{inq.mobile}</td>
//                   <td>{inq.email}</td>
//                   <td>{inq.course}</td>
//                   <td>{inq.message || '-'}</td>
//                   <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(inq._id)}
//                       className="btn btn-sm btn-danger"
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

// export default ContactTable;



'use client'; // 👉 This marks the file as a client-side component in Next.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// 🔐 Define TypeScript interface for a Contact item
interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  course: string;
  message?: string;
  createdAt: string;
}

const ContactTable = () => {
  // 🔄 State for all contacts, loading status, and search input
  const [inquiries, setInquiries] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 📦 Fetch contact inquiries from backend API
  const fetchInquiries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contact');
      const allInquiries: Contact[] = res.data.inquiries || res.data;

      // 📅 Sort by most recent
      const sorted = allInquiries.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setInquiries(sorted);
    } catch (err) {
      toast.error('Failed to fetch contact');
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete a contact inquiry
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this Contact?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      toast.success('Contact deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  // 🔍 Filter inquiries based on search input
  const filteredInquiries = inquiries.filter((inq) =>
    [inq.name, inq.mobile, inq.email, inq.course]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // 🚀 Fetch inquiries on initial render
  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="container py-5">
      {/* 📣 Toast notification container */}
      <Toaster />

      {/* 🔷 Top section: Heading and Search Input */}
      <div className="row align-items-center mb-4 g-3">
        <div className="col-12 col-md-6">
          <h2 className="text-primary fw-bold m-0">Any Questions</h2>
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

      {/* 🧾 Table or Loading/Error Messages */}
      {loading ? (
        // ⏳ Loading Spinner
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredInquiries.length === 0 ? (
        // 🚫 No Data Found
        <p className="text-muted">No contact found.</p>
      ) : (
        // 📊 Responsive Table
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-bordered table-hover align-middle mb-0">
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
                  <td className="text-capitalize">{inq.name}</td>
                  <td>{inq.mobile}</td>
                  <td className="text-lowercase">{inq.email}</td>
                  <td>{inq.course}</td>
                  {/* Shortened message with tooltip for full */}
                  <td title={inq.message}>{inq.message?.slice(0, 30) || '-'}</td>
                  {/* Formatted date */}
                  <td>{new Date(inq.createdAt).toLocaleDateString('en-GB')}</td>
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

export default ContactTable;
