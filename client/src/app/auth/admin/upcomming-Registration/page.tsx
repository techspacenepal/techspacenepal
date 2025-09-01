"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface Registration {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  date: string;
  time: string;
}

export default function RegisteredClassesDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail"); 
      const res = await axios.get(
        `http://localhost:5000/api/upcommingregistrations?email=${userEmail}`
      );
      setRegistrations(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch registrations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/upcommingregistrations/${id}`);
      setRegistrations(registrations.filter((reg) => reg._id !== id));
      toast.success("Registration deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete registration.");
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;

  return (
    <div className="container py-5">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h4 className="mb-4">
        Upcoming Classes Registrations Submitted ({registrations.length})
      </h4>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>SN</th>
              <th>Course</th>
              <th>Date</th>
              <th>Time</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((reg, index) => (
                <tr key={reg._id}>
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>{reg.course}</td>
                  <td>{new Date(reg.date).toLocaleDateString("en-GB")}</td>
                  <td>{reg.time}</td>
                  <td>{reg.fullName}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phone}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(reg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  No registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
