"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Service {
  _id: string;
  title: string;
  desc: string;
  icon: string;
}

export default function ManageServices() {
  const router = useRouter();
  // const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", desc: "", icon: "" });
  //const [editingId, setEditingId] = useState(null);
  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [pageLoading, setPageLoading] = useState(true);
  // const formRef = useRef(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      toast.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    const token = Cookies.get("adminToken");

    setTimeout(() => {
      if (!token) {
        toast.error("Please login to access this page");
        router.push("/auth/adminLogin");
      } else {
        fetchServices();
        setPageLoading(false);
      }
    }, 1000);
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/services/${editingId}`,
          form
        );
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

  const handleDelete = async (id: string) => {
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

  const handleEdit = (service: Service) => {
    setForm({
      title: service.title,
      desc: service.desc,
      icon: service.icon,
    });
    setEditingId(service._id);

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  if (pageLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
      <h2 className="mb-4">Manage Services</h2>
      <div ref={formRef}>
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
            placeholder="Icon URL"
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
      </div>

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
