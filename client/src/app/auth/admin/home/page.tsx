'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import StatsAdminPanel from '../counter/page';

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
    <div className="container mt-4">
      <Toaster />
      <h2 className="mb-3">Slide Admin Panel</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="form-control mb-2" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="form-control mb-2" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="form-control mb-2" />
        <button type="submit" className="btn btn-primary">{editingId ? 'Update' : 'Upload'}</button>
      </form>
      <div className="row">
        {slides.map(slide => (
          <div className="col-md-4 mb-3" key={slide._id}>
            <div className="card">
              <Image src={`${BASE_URL}${slide.src}`} alt={slide.title} className="card-img-top" width={400} height={250} />
              <div className="card-body">
                <h5 className="card-title">{slide.title}</h5>
                <p className="card-text">{slide.description}</p>
                <button onClick={() => handleEdit(slide)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDelete(slide._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <section>
      <div className="container">
        <div className="row">
          <StatsAdminPanel/>
        </div>
      </div>
    </section>
    </>
  );
}








