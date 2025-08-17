
'use client';

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        course: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Only allow numbers and max 10 digits
        if (/^\d{0,10}$/.test(value)) {
            setFormData((prev) => ({
                ...prev,
                mobile: value,
            }));
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate mobile number
        if (!/^9[78]\d{8}$/.test(formData.mobile)) {
            toast.error('Mobile number must start with 97 or 98 and be exactly 10 digits.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            toast.success(data.message || 'Successfully sent contact!');
            setFormData({ name: '', email: '', mobile: '', course: '', message: '' });
        } catch (error: any) {
            toast.error(error.message || 'Failed to send contact');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container py-5">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="row g-4 align-items-start">
                {/* Right Side */}
                <div className="col-lg-7 col-md-6 col-12">

                    <div className="shadow p-4 rounded bg-white">
                        <h4 className="fw-bold text-center mb-4">HAVE ANY QUESTIONS?</h4>
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <input
                                    name="mobile"
                                    type="text"
                                    value={formData.mobile}
                                    onChange={handleMobileChange}
                                    className="form-control"
                                    maxLength={10}
                                    placeholder="98XXXXXXXX"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">-- Select Your Desired Course --</option>
                                    <option value="Python">Python</option>
                                    <option value="UI/UX">UI/UX</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="form-control"
                                    rows={4}
                                    placeholder="Your Message"
                                />
                            </div>
                            <div className="col-12">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                                >
                                    {loading ? 'Sending...' : 'GET IN TOUCH'} <i className="bi bi-send" />
                                </button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

const ContactItem = ({
    icon,
    title,
    lines,
}: {
    icon: string;
    title: string;
    lines: string[];
}) => (
    <div className="mb-4 d-flex">
        <div className="me-3 fs-3 text-primary">
            <i className={`bi ${icon}`} />
        </div>
        <div>
            <h6 className="fw-bold text-uppercase">{title}</h6>
            {lines.map((line, index) => (
                <div key={index} className="text-dark small">
                    {line}
                </div>
            ))}
        </div>
    </div>
);

export default ContactSection;


