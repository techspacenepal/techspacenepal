'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import StatsAdminPanel from '../counter/page';
import LogoAdmin from '../headerlogo/page';

const BASE_URL = 'http://localhost:5000';

interface Slide {
  _id: string;
  title: string;
  description: string;
  src: string;
  type: string;
}

export default function AdminSlidePanel() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchSlides = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/slide`);
      setSlides(res.data);
    } catch (err) {
      toast.error('Failed to fetch slides');
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.image) data.append('file', formData.image);

    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/api/slide/${editingId}`, data);
        toast.success('Slide updated successfully');
      } else {
        await axios.post(`${BASE_URL}/api/slide/upload`, data);
        toast.success('Slide uploaded successfully');
      }
      setFormData({ title: '', description: '', image: null });
      setEditingId(null);
      fetchSlides();
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const handleEdit = (slide: Slide) => {
    setFormData({ title: slide.title, description: slide.description, image: null });
    setEditingId(slide._id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/api/slide/${id}`);
      toast.success('Deleted successfully');
      fetchSlides();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <>
      <section className='bg-light'>
        <div className="container py-5">
          <Toaster />

          {/* Page Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mx-auto">Slide Admin Panel</h2>
          </div>

          {/* Upload / Edit Form */}
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-sm mb-5"
                style={{
                  border: "0.4px solid #dee2e6",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                }}>
                <div className="card-body">
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        className="form-control"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        Upload Image <span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-12 text-end">
                      <button type="submit" className="btn btn-primary px-4">
                        {editingId ? "Update" : "Upload"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Slides Grid */}
          <div className="row g-4">
            
            {slides.map((slide) => (
              <div className="col-12 col-sm-6 col-lg-4" key={slide._id}>
                <div className="card h-100 shadow-sm" style={{
                  border: "0.4px solid #dee2e6",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                }}>
                  <Image
                    src={`${BASE_URL}${slide.src}`}
                    alt={slide.title}
                    className="card-img-top p-3"
                    width={400}
                    height={250}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-semibold mb-2">{slide.title}</h5>
                    <p className="text-muted small flex-grow-1">{slide.description}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="btn btn-sm btn-outline-warning"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* home counter section  */}
      <StatsAdminPanel />


      {/* header and footer logo */}
      <LogoAdmin />

    </>
  );
}








