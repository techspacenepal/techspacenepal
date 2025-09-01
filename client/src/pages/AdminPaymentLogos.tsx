'use client';

import React, { useEffect, useState, ChangeEvent, useRef } from 'react'; // ✅ useRef added
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface FooterPaymentLogo {
  _id: string;
  name: string;
  img: string;
  modalImage?: string;
}

export default function AdminFooterPanel() {
  const [logos, setLogos] = useState<FooterPaymentLogo[]>([]);
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [selectedLogoId, setSelectedLogoId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [modalImageFile, setModalImageFile] = useState<File | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const [copyrightText, setCopyrightText] = useState('');
  const [loadingCopyright, setLoadingCopyright] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null); // ✅ form ref

  const fetchData = async () => {
    try {
      const [logosRes, copyrightRes] = await Promise.all([
        axios.get('http://localhost:5000/api/footer/payment-logos'),
        axios.get('http://localhost:5000/api/footer/copyright'),
      ]);
      setLogos(logosRes.data);
      if (copyrightRes.data && copyrightRes.data.text) {
        setCopyrightText(copyrightRes.data.text);
      }
    } catch {
      toast.error('Failed to load footer data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImgFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgFile(e.target.files[0]);
    }
  };

  const handleModalImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setModalImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setName('');
    setModalImageFile(null);
    setImgFile(null);
    setSelectedLogoId(null);
    setEditMode(false);
  };

  const handleSubmitLogo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter logo name');
      return;
    }

    if (!imgFile && !editMode) {
      toast.error('Please select an image to upload');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (modalImageFile) formData.append('modalImage', modalImageFile);
      if (imgFile) formData.append('img', imgFile);

      if (editMode && selectedLogoId) {
        await axios.put(`http://localhost:5000/api/footer/payment-logos/${selectedLogoId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Payment logo updated');
      } else {
        await axios.post('http://localhost:5000/api/footer/payment-logos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Payment logo added');
      }

      resetForm();
      fetchData();
    } catch {
      toast.error('Failed to save payment logo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLogo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment logo?')) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/footer/payment-logos/${id}`);
      toast.success('Payment logo deleted');
      if (selectedLogoId === id) resetForm();
      fetchData();
    } catch {
      toast.error('Failed to delete payment logo');
    } finally {
      setLoading(false);
    }
  };

  const handleEditLogo = (logo: FooterPaymentLogo) => {
    setSelectedLogoId(logo._id);
    setName(logo.name);
    setModalImageFile(null);
    setImgFile(null);
    setEditMode(true);

    // ✅ Scroll to form
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleUpdateCopyright = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!copyrightText.trim()) {
      toast.error('Copyright text cannot be empty');
      return;
    }

    setLoadingCopyright(true);
    try {
      await axios.put('http://localhost:5000/api/footer/copyright', {
        text: copyrightText,
      });
      toast.success('Copyright updated');
    } catch {
      toast.error('Failed to update copyright');
    } finally {
      setLoadingCopyright(false);
    }
  };

  return (
    <div className="container my-4">
      <Toaster />
      <h2 className="mb-4">Footer Admin Panel</h2>

      {/* Copyright Edit Form */}
      <form onSubmit={handleUpdateCopyright} className="mb-5">
        <label htmlFor="copyrightText" className="form-label fw-semibold">
          Edit Footer Copyright Text
        </label>
        <textarea
          id="copyrightText"
          className="form-control mb-3"
          rows={2}
          value={copyrightText}
          onChange={(e) => setCopyrightText(e.target.value)}
          disabled={loadingCopyright}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loadingCopyright}
        >
          {loadingCopyright ? 'Saving...' : 'Save Copyright'}
        </button>
      </form>

      {/* Payment Logos Add/Edit Form */}
      <form ref={formRef} onSubmit={handleSubmitLogo} className="mb-4"> {/* ✅ Added ref */}
        <h4>{editMode ? 'Edit' : 'Add New'} Payment Logo</h4>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Payment Logo Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name of payment logo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="modalImageFile" className="form-label">
            Modal Image (optional) {editMode ? '(leave empty to keep current)' : ''}
          </label>
          <input
            id="modalImageFile"
            type="file"
            className="form-control"
            onChange={handleModalImageFileChange}
            accept="image/*"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imgFile" className="form-label">
            Payment Logo Image {editMode ? '(leave empty to keep current)' : ''}
          </label>
          <input
            id="imgFile"
            type="file"
            className="form-control"
            onChange={handleImgFileChange}
            accept="image/*"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (editMode ? 'Updating...' : 'Adding...') : editMode ? 'Update' : 'Add'}
        </button>
        {editMode && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h4>Existing Payment Logos</h4>
      <div className="row">
        {logos.length === 0 && <p>No payment logos added yet.</p>}
        {logos.map((logo) => (
          <div key={logo._id} className="col-6 col-md-3 mb-3 text-center">
            <p className="fw-semibold">{logo.name}</p>

            <img
              src={`http://localhost:5000/uploads/${logo.img}`}
              alt={logo.name}
              width={80}
              height={30}
              className="rounded bg-white p-1 mb-2"
              style={{ objectFit: 'contain', cursor: 'pointer' }}
            />

            {logo.modalImage && (
              <img
                src={`http://localhost:5000/uploads/${logo.modalImage}`}
                alt={`${logo.name} Modal`}
                width={80}
                height={60}
                className="rounded bg-white p-1 mb-2"
                style={{ objectFit: 'contain', cursor: 'pointer' }}
              />
            )}

            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => handleEditLogo(logo)}
              disabled={loading}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteLogo(logo._id)}
              disabled={loading}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
