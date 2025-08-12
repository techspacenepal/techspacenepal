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
  imageUrl?: string;
  content?: string;
  heading?: string;
}

export default function ManageServices() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    icon: "",
    heading: "",
    content: "",
    imageFile: null as File | null, // store file here
  });

  const [services, setServices] = useState<Service[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const formRef = useRef<HTMLDivElement | null>(null);

  // ===== Ref =====
  const editorRef = useRef<HTMLDivElement>(null);


  // ===== Handle paste in contentEditable =====
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, html);
  };

  // ===== Update editor content when form changes =====
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = form.content || "";
    }
  }, [form.content]);
  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("desc", form.desc);
    formData.append("icon", form.icon);
    formData.append("heading", form.heading);
    // formData.append("content", form.content);
    formData.append("content", editorRef.current?.innerHTML || "");


    if (form.imageFile) {
      formData.append("image", form.imageFile); // backend expects 'image'
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/services/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Service updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Service added successfully!");
      }

      setForm({
        title: "",
        desc: "",
        icon: "",
        heading: "",
        content: "",
        imageFile: null,
      });
      setEditingId(null);
      fetchServices();
    } catch {
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
      heading: service.heading || "",
      content: service.content || "",
      imageFile: null,
    });
    setEditingId(service._id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  if (pageLoading) {
    return <div>Loading...</div>;
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
            name="title"
            onChange={handleChange}
            required
          />
          <textarea
            className="form-control mb-3"
            placeholder="Service Description"
            value={form.desc}
            name="desc"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Icon HTML"
            value={form.icon}
            name="icon"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Heading"
            value={form.heading}
            name="heading"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setForm((prev) => ({ ...prev, imageFile: file }));
            }}
          />
          {/* <textarea
            className="form-control mb-3"
            placeholder="Service Content"
            value={form.content}
            name="content"
            onChange={handleChange}
            required
          /> */}

          <div className="mb-2">
            <label className="form-label fw-bold">Services content *</label>
            <div
              ref={editorRef}
              className="form-control editor"
              data-placeholder="content"

              contentEditable
              onPaste={handlePaste}
              style={{ minHeight: '250px', overflowY: 'auto' }}
              suppressContentEditableWarning={true}
            ></div>
          </div>


          <button type="submit" className="btn btn-primary">
            {editingId ? "Update Service" : "Add Service"}
          </button>
        </form>
      </div>

      <h4>Existing Services</h4>
      <div className="row g-4">
        {services.map((service) => (
          <div key={service._id} className="col-md-4">
            <div className="p-4 bg-white shadow-sm h-100 text-center rounded-4">
              <div
                dangerouslySetInnerHTML={{ __html: service.icon }}
                style={{ fontSize: "2.5rem", color: "#007bff" }}
              />
              <h5>{service.title}</h5>
              <p>{service.desc}</p>
              {service.heading && <h4>{service.heading}</h4>}
              {service.imageUrl && (
                <img
                  src={`http://localhost:5000${service.imageUrl}`}
                  alt={service.title}
                  style={{ maxWidth: "200px", borderRadius: "8px" }}
                  className="mb-3"
                />
              )}
              {service.content &&


                <div
                  className="text-muted"
                  style={{ maxHeight: "100px", overflowY: "auto" }}
                  dangerouslySetInnerHTML={{
                    __html: service.content || ""
                  }}
                ></div>
              }
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
