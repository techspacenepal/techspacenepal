'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type About = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  phone?: string;
  email?: string;
};

// ✅ BASE URL for backend
const BASE_URL = 'http://localhost:5000/api';

export default function AboutAdminPanel() {
  const [aboutData, setAboutData] = useState<About[]>([]);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    phone: string;
    email: string;
    image: File | null;
  }>({
    title: '',
    description: '',
    phone: '',
    email: '',
    image: null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/about`);
      setAboutData(res.data);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('phone', formData.phone);
      form.append('email', formData.email);
      if (formData.image) {
        form.append('image', formData.image);
      }

      if (editingId) {
        await axios.put(`${BASE_URL}/about/${editingId}`, form);
        toast.success('About section updated');
      } else {
        await axios.post(`${BASE_URL}/about`, form);
        toast.success('About section added');
      }

      setFormData({
        title: '',
        description: '',
        phone: '',
        email: '',
        image: null,
      });
      setEditingId(null);
      fetchAbout();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (item: About) => {
    setFormData({
      title: item.title,
      description: item.description,
      phone: item.phone || '',
      email: item.email || '',
      image: null,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`${BASE_URL}/about/${id}`);
        toast.success('Deleted successfully');
        fetchAbout();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary fw-bold text-center">Manage About Section</h2>

      {/* Form */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <form
            onSubmit={handleSubmit}
            className="mb-5 bg-light p-3 rounded shadow-sm"
            id="aboutForm"
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control form-control-lg"
                rows={4}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-semibold">
                Phone <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control form-control-lg"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label fw-semibold">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
              {editingId && (
                <small className="text-muted d-block mt-1">
                  Leave empty to keep the current image
                </small>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>

      {/* Display Cards */}
      <div className="row g-4">
        {aboutData.map((item: About) => (
          <div className="col-12 col-md-6 col-lg-4" key={item._id}>
            <div className="border rounded shadow-sm h-100 d-flex flex-column">
              {item.imageUrl && (
                <img
                  src={item.imageUrl ? `http://localhost:5000${item.imageUrl}` : undefined}
                  alt={item.title}
                  className="img-fluid rounded-top"
                  style={{ objectFit: 'cover', objectPosition: 'center top', height: '180px', width: '100%' }}
                />
              )}
              <div className="p-3 flex-grow-1 d-flex flex-column">
                <h5 className="text-primary fw-bold mb-2">{item.title}</h5>
                <p className="text-muted flex-grow-1" style={{ whiteSpace: 'pre-wrap' }}>
                  {item.description}
                </p>

                <div className="mb-3">
                  <p className="mb-1">
                    <strong>📞 Phone: </strong>
                    <a href={`tel:${item.phone}`} className="text-decoration-none">
                      {item.phone}
                    </a>
                  </p>
                  <p className="mb-0">
                    <strong>📧 Email: </strong>
                    <a href={`mailto:${item.email}`} className="text-decoration-none">
                      {item.email}
                    </a>
                  </p>
                </div>

                <div className="d-flex gap-2">
                  <button
                    onClick={() => {
                      handleEdit(item);
                      // Scroll to form smoothly on edit
                      const formElement = document.getElementById('aboutForm');
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        setTimeout(() => {
                          const firstInput = formElement.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
                          firstInput?.focus();
                        }, 500);
                      }
                    }}

                    className="btn btn-sm btn-outline-warning"
                    type="button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" />

    </div>
  );

}
