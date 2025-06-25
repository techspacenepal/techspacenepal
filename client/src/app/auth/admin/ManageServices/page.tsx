"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", desc: "", icon: "" });
  const [editingId, setEditingId] = useState(null); // for tracking editing item

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/services/${editingId}`, form);
        toast.success("Service updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/services", form);
        toast.success("Service added successfully!");
      }
      setForm({ title: "", desc: "", icon: "" });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${id}`);
        toast.success("Service deleted!");
        fetchServices();
      } catch {
        toast.error("Failed to delete!");
      }
    }
  };

  const handleEdit = (service) => {
    setForm({
      title: service.title,
      desc: service.desc,
      icon: service.icon,
    });
    setEditingId(service._id);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Manage Services</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Service Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="form-control mb-3"
          placeholder="Service Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder='Enter icon HTML like <i class="bi bi-code-slash"></i>'
          value={form.icon}
          onChange={(e) => setForm({ ...form, icon: e.target.value })}
          required
        />

        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Service" : "Add Service"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", desc: "", icon: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h4>Existing Services</h4>
      <div className="row g-4">
        {services.map((service) => (
          <div key={service._id} className="col-md-4">
            <div className="p-4 bg-white shadow-sm h-100 text-center rounded-4">
              {/* 👇 Render icon from icon code input */}
              <div
                className="mb-3"
                style={{ fontSize: "2.5rem", color: "#007bff" }}
                dangerouslySetInnerHTML={{ __html: service.icon }}
              />
              <h5 className="fw-bold">{service.title}</h5>
              <p className="text-muted small">{service.desc}</p>
              <div className="d-flex justify-content-center gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
