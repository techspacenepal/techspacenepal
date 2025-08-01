"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
  const [inquiries, setInquiries] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  // 🔐 Auth check + delay
  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        toast.error("🔒 Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchInquiries();
      }
      setPageLoading(false);
    }, 1000); 
  }, []);

  // 📦 Fetch contact inquiries
  const fetchInquiries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      const allInquiries: Contact[] = res.data.inquiries || res.data;

      const sorted = allInquiries.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setInquiries(sorted);
    } catch (err) {
      toast.error("Failed to fetch contact");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete a contact inquiry
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Contact?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      toast.success("Contact deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔍 Filter by search term
  const filteredInquiries = inquiries.filter((inq) =>
    [inq.name, inq.mobile, inq.email, inq.course]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

//  if (loading) {
//   return (
//     <div
//        className="d-flex justify-content-center align-items-center"
//       style={{ height: '50vh', paddingTop: '50px' }}
//     >
//       <img
//         src="/logo.png"
//         alt="Loading..."
//         style={{
//           width: "100px",
//           height: "100px",
//           borderRadius: "50%",
//           animation: "spin 1s linear infinite"
//         }}
//       />
//     </div>
//   );
// }


  return (
    <div className="container py-5">
      <Toaster />

      {/* 🔷 Header & Search */}
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
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <p className="text-muted">No contact found.</p>
      ) : (
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
                  <td title={inq.message}>{inq.message?.slice(0, 30) || "-"}</td>
                  <td>{new Date(inq.createdAt).toLocaleDateString("en-GB")}</td>
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
