'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'http://localhost:5000/api';

interface ContactInfoType {
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    socialLinks: Record<string, string>;
}

const getBrandColor = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'facebook':
            return '#1877F2';
        case 'whatsapp':
            return '#25D366';
        case 'instagram':
            return '#E1306C';
        case 'twitter':
            return '#1DA1F2';
        case 'linkedin':
            return '#0077B5';
        case 'youtube':
            return '#FF0000';
        default:
            return '#6b7280';
    }
};

const ContactPage = () => {
    const [info, setInfo] = useState<ContactInfoType | null>(null);

    useEffect(() => {
        axios
            .get(`${BASE_URL}/contact-info`)
            .then((res) => setInfo(res.data))
            .catch((err) => console.error('Error fetching contact info:', err));
    }, []);


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
    const [coursesList, setCoursesList] = useState<{ _id: string; title: string }[]>([]); // ✅ move state outside handleSubmit

    // ✅ Fetch courses once when component mounts
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/courses")
            .then((res: { data: { _id: string; title: string }[] }) => setCoursesList(res.data))
            .catch((err: any) => console.error("Failed to fetch courses", err));
    }, []);


    return (
        <>

            <section className='py-5'>
                <div className="container">
                    <ToastContainer position="top-right" autoClose={3000} />
                    {info ? (
                        <div className="row g-4">
                            <div className="col-lg-6">
                                {/* Contact Information - Simple Clean Card with Outline */}
                                <div className="p-4 border rounded-3 shadow-sm bg-white">
                                    {/* Company Address */}
                                    <div className="mb-4 pb-3 border-bottom">
                                        <h3 className="h6 fw-bold text-dark mb-2">Our Office</h3>
                                        <p className="mb-1 fw-semibold text-primary">TechSpace Nepal Pvt. Ltd.</p>
                                        <p className="mb-0 text-muted small">{info.address}</p>
                                    </div>

                                    {/* Office Hours */}
                                    <div className="mb-4 pb-3 border-bottom">
                                        <h3 className="h6 fw-bold text-dark mb-2">Office Hours</h3>
                                        <div className="d-flex align-items-center gap-2 text-muted small">
                                            <i className="far fa-clock text-primary"></i>
                                            <span>Sun - Fri | 06:30 AM - 07:30 PM</span>
                                        </div>
                                    </div>

                                    {/* Phone Numbers */}
                                    <div className="mb-4 pb-3 border-bottom">
                                        <h3 className="h6 fw-bold text-dark mb-2">Call Us</h3>
                                        <div>
                                            {Array.isArray(info.phone) ? (
                                                <ul className="list-unstyled mb-0">
                                                    {info.phone.map((num, idx) => (
                                                        <li key={idx} className="mb-2">
                                                            <a
                                                                href={`tel:${num}`}
                                                                className="text-decoration-none text-muted small d-flex align-items-center gap-2"
                                                            >
                                                                <i className="fas fa-phone-alt text-primary"></i>
                                                                <span>{num}</span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : info.phone ? (
                                                <a
                                                    href={`tel:${info.phone}`}
                                                    className="text-decoration-none text-muted small d-flex align-items-center gap-2"
                                                >
                                                    <i className="fas fa-phone-alt text-primary"></i>
                                                    <span>{info.phone}</span>
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* Social Media */}
                                    <div className="mb-4 pb-3 border-bottom">
                                        <h3 className="h6 fw-bold text-dark mb-2">Follow Us</h3>
                                        <div className="d-flex gap-3 ps-1">
                                            {Object.entries(info.socialLinks || {}).map(([platform, url]) =>
                                                url && (
                                                    <a
                                                        key={platform}
                                                        href={url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-muted small"
                                                    >
                                                        <i className={`fab fa-${platform} fa-lg`}></i>
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* WhatsApp */}
                                    {info.whatsapp && (
                                        <div>
                                            <h3 className="h6 fw-bold text-dark mb-2">Message Us</h3>
                                            <a
                                                href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-decoration-none text-muted small d-flex align-items-center gap-2"
                                            >
                                                <i className="fab fa-whatsapp text-success"></i>
                                                <span>{info.whatsapp}</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* Contact Form Column */}
                            <div className="col-lg-6">
                                <div
                                    className="p-3 bg-white rounded-4 h-100"
                                    style={{
                                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                        borderLeft: "4px solid #FF6B00",
                                    }}
                                >
                                    <div className="text-center mb-4">
                                        <h3 className="fw-bold mb-2" style={{ color: "#1a365d" }}>
                                            HAVE ANY QUESTIONS?
                                        </h3>
                                        <p className="text-muted small">
                                            Fill out the form and our team will get back to you within 24 hours
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        {/* Name */}
                                        <div className="mb-3">
                                            <label
                                                className="form-label fw-semibold small"
                                                style={{ display: "block" }}
                                            >
                                                Name <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Your name"
                                                required
                                                style={{
                                                    padding: "12px 15px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ced4da",
                                                    transition: "all 0.2s ease-in-out",
                                                }}
                                                onFocus={(e) =>
                                                (e.target.style.boxShadow =
                                                    "0 0 0 3px rgba(255,107,0,0.25)")
                                                }
                                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="mb-3">
                                            <label
                                                className="form-label fw-semibold small"
                                                style={{ display: "block" }}
                                            >
                                                Email <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Your Email"
                                                required
                                                style={{
                                                    padding: "12px 15px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ced4da",
                                                    transition: "all 0.2s ease-in-out",
                                                }}
                                                onFocus={(e) =>
                                                (e.target.style.boxShadow =
                                                    "0 0 0 3px rgba(255,107,0,0.25)")
                                                }
                                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                                            />
                                        </div>

                                        {/* Mobile */}
                                        <div className="mb-3">
                                            <label
                                                className="form-label fw-semibold small"
                                                style={{ display: "block" }}
                                            >
                                                Mobile <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <div className="input-group">
                                                <span
                                                    className="input-group-text"
                                                    style={{
                                                        borderRadius: "8px 0 0 8px",
                                                        backgroundColor: "#f8f9fa",
                                                        fontSize: "14px",
                                                        padding: "10px 12px",
                                                    }}
                                                >
                                                    +977
                                                </span>
                                                <input
                                                    name="mobile"
                                                    type="text"
                                                    value={formData.mobile}
                                                    onChange={handleMobileChange}
                                                    className="form-control"
                                                    maxLength={10}
                                                    placeholder="98XXXXXXXX"
                                                    required
                                                    style={{
                                                        borderRadius: "0 8px 8px 0",
                                                        padding: "12px 15px",
                                                        border: "1px solid #ced4da",
                                                        transition: "all 0.2s ease-in-out",
                                                    }}
                                                    onFocus={(e) =>
                                                    (e.target.style.boxShadow =
                                                        "0 0 0 3px rgba(255,107,0,0.25)")
                                                    }
                                                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                                                />
                                            </div>
                                        </div>

                                        {/* Course */}
                                        <div className="mb-3">
                                            <label
                                                className="form-label fw-semibold small"
                                                style={{ display: "block" }}
                                            >
                                                Course <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <select
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                className="form-select"
                                                required
                                                style={{
                                                    padding: "12px 15px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ced4da",
                                                    transition: "all 0.2s ease-in-out",
                                                }}
                                                onFocus={(e) =>
                                                (e.target.style.boxShadow =
                                                    "0 0 0 3px rgba(255,107,0,0.25)")
                                                }
                                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                                            >
                                                <option value="">Choose a Course...</option>
                                                {coursesList.map((c) => (
                                                    <option key={c._id} value={c.title}>
                                                        {c.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div className="mb-3">
                                            <label
                                                className="form-label fw-semibold small"
                                                style={{ display: "block" }}
                                            >
                                                Message <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="form-control"
                                                rows={3}
                                                placeholder="Your Message"
                                                style={{
                                                    padding: "12px 15px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #ced4da",
                                                    transition: "all 0.2s ease-in-out",
                                                    resize: "none",
                                                }}
                                                onFocus={(e) =>
                                                (e.target.style.boxShadow =
                                                    "0 0 0 3px rgba(255,107,0,0.25)")
                                                }
                                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn d-flex align-items-center justify-content-center gap-2 border-0 mx-auto"
                                            style={{
                                                borderRadius: "8px",
                                                fontWeight: "600",
                                                padding: "14px 24px",
                                                fontSize: "16px",
                                                background: loading ? "#94a3b8" : "linear-gradient(135deg, #0057d8 0%, #003d9e 100%)",
                                                color: "#ffffff",
                                                boxShadow: "0 4px 6px rgba(0, 87, 216, 0.2)",
                                                transition: "all 0.3s ease",
                                                position: "relative",
                                                overflow: "hidden"
                                            }}
                                            onMouseEnter={(e) => !loading && (e.currentTarget.style.boxShadow = "0 6px 8px rgba(0, 87, 216, 0.3)")}
                                            onMouseLeave={(e) => !loading && (e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 87, 216, 0.2)")}
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>GET IN TOUCH</span>
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        style={{ transition: "transform 0.3s ease" }}
                                                        className="hover-arrow"
                                                    >
                                                        <path
                                                            d="M5 12H19M19 12L12 5M19 12L12 19"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </>
                                            )}
                                        </button>

                                    </form>
                                </div>
                            </div>


                        </div>


                    ) : (
                        <div className="d-flex justify-content-center align-items-center py-4 bg-white rounded-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>


            <section className='bg-light py-1'>
                <div className="container">
                    {info ? (
                        <div className="row py-3 pb-0 mb-0">
                            <div className="col-12">
                                <h2 className="h3 fw-bold mb-4 text-dark text-center">
                                    Connect With The Right Experts
                                </h2>
                            </div>

                            {/* Dynamic Admin Emails */}
                            {Array.isArray(info.email) ? (
                                info.email.map((mail, idx) => {
                                    // Determine department based on email
                                    let department = "General Inquiry";
                                    let description = "For any general inquiries";
                                    let borderColor = "border-primary";

                                    if (mail.includes("support")) {
                                        department = "Customer Support";
                                        description = "For assistance with classes or services";
                                        borderColor = "border-success";
                                    } else if (mail.includes("hr")) {
                                        department = "Placement Assistance";
                                        description = "For employment opportunities";
                                        borderColor = "border-warning";
                                    } else if (mail.includes("inquiry")) {
                                        department = "Course Inquiry";
                                        description = "About IT training courses";
                                        borderColor = "border-purple";
                                    }

                                    return (
                                        <div
                                            key={idx}
                                            className="col-12 col-md-6 col-lg-3 mb-4 d-flex text-center"
                                        >
                                            <div
                                                className={`p-4 bg-white rounded-3 border-start border-4 ${borderColor} w-100`}
                                                style={{
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
                                                }}
                                            >
                                                <h3 className="h5 fw-semibold mb-2 text-dark">
                                                    {department}
                                                </h3>
                                                <p className="text-muted mb-2 small">{description}</p>
                                                <a
                                                    href={`mailto:${mail}`}
                                                    className="text-primary fw-medium d-inline-flex align-items-center gap-2"
                                                >
                                                    <i className="fas fa-envelope"></i>
                                                    {mail}
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : info.email ? (
                                <div className="col-12 col-md-6 col-lg-3 mb-4 d-flex">
                                    <div className="p-4 bg-white rounded-3 shadow-sm border-start border-4 border-primary w-100">
                                        <h3 className="h5 fw-semibold mb-2 text-dark">General Inquiry</h3>
                                        <p className="text-muted mb-2 small">For any general inquiries</p>
                                        <a
                                            href={`mailto:${info.email}`}
                                            className="text-primary fw-medium d-inline-flex align-items-center gap-2"
                                        >
                                            <i className="fas fa-envelope"></i>
                                            {info.email}
                                        </a>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center py-4 bg-white rounded-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className='py-5'>
                <div className="container">
                    {/* Google Map */}
                    <div className="row">
                        <h1 className='text-center pb-2 text-dark'>Visit our Location</h1>
                        <div className="col-12">
                            <div className="shadow rounded overflow-hidden" style={{
                                height: "400px", border: "0.4px solid #dee2e6",
                                boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                            }} >

                                <iframe
                                    className="w-100 h-100 p-3 "
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.857769381814!2d82.71303557536291!3d27.844909476104018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3997a5ea32a3ffff%3A0x53534073c7b7de95!2sRapti%20Rural%20Municipality!5e0!3m2!1sen!2snp!4v1755415291343!5m2!1sen!2snp"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>







        </>
    );
};

export default ContactPage;
