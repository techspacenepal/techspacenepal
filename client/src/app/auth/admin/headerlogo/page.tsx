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
        <div className="container my-5">
            <Toaster />
            <div className="card shadow p-4 rounded-4">
                <h3 className="text-center text-uppercase mb-4 fw-bold">Logo Upload Panel</h3>

                {logo && (
                    <div className="text-center mb-4">
                        <Image
                            src={`http://localhost:5000/uploads/${logo.imageUrl}`} // imageUrl अब केवल filename भएकोले सही URL हुन्छ
                            alt="Uploaded Logo"
                            width={120}
                            height={120}
                            className="rounded-circle border p-2"
                            unoptimized={true}
                        />


                        <div className="mt-3">
                            <button className="btn btn-danger btn-sm px-4" onClick={handleDelete}>
                                Delete Logo
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleUpload} className="text-center">
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label fw-semibold">
                            Select New Logo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            className="form-control"
                            id="image"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary px-5">
                        {logo ? 'Replace Logo' : 'Upload Logo'}
                    </button>
                </form>
            </div>
        </div>
    );
}
