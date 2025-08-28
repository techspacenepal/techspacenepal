'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function LogoAdmin() {
    const [logo, setLogo] = useState<{ _id: string; imageUrl: string } | null>(null);
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/logo') // ✅ localhost
            .then((res) => setLogo(res.data))
            .catch(() => toast.error("Failed to load logo"));
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return toast.error("Please select a logo");

        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post('http://localhost:5000/api/logo', formData); // ✅ localhost
            setLogo(res.data);
            setImage(null);
            toast.success("Logo uploaded successfully!");
        } catch {
            toast.error("Upload failed");
        }
    };

    const handleDelete = async () => {
        if (!logo) return;
        try {
            await axios.delete(`http://localhost:5000/api/logo/${logo._id}`); // ✅ localhost
            setLogo(null);
            toast.success("Logo deleted successfully!");
        } catch {
            toast.error("Delete failed");
        }
    };

    return (

        <section className="py-5 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="card border shadow-sm rounded p-4">
                            <h3 className="text-center fw-bold text-uppercase mb-4">
                                Header and Footer Logo Upload Panel
                            </h3>

                            <div className="row g-4 align-items-center">
                                {/* ==== Form Section ==== */}
                                <div className="col-lg-6 col-md-12">
                                    <form onSubmit={handleUpload} className="px-2">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="image"
                                                className="form-label fw-semibold"
                                            >
                                                Select New Logo <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setImage(e.target.files?.[0] || null)
                                                }
                                                className="form-control"
                                                id="image"
                                                required
                                            />
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-primary px-5"
                                            >
                                                {logo ? "Replace Logo" : "Upload Logo"}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* ==== Logo Preview Section ==== */}
                                <div className="col-lg-6 col-md-12">
                                    <div className="card shadow-sm rounded p-4 h-100 d-flex justify-content-center">
                                        {logo ? (
                                            <div className="text-center">
                                                <Image
                                                    src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                                                    alt="Uploaded Logo"
                                                    width={140}
                                                    height={140}
                                                    className="rounded-circle border border-3 border-primary p-2 bg-white"
                                                    unoptimized
                                                />
                                                <div className="mt-3">
                                                    <button
                                                        className="btn btn-outline-danger btn-sm px-4"
                                                        onClick={handleDelete}
                                                    >
                                                        <i className="bi bi-trash me-1"></i> Delete Logo
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-center text-muted mb-0">
                                                No logo uploaded yet
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    );
}
