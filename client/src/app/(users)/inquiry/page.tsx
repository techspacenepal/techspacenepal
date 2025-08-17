"use client";

import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ import axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = 'http://localhost:5000/api';

interface Course {
  _id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

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
export default function SendInquiry() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [coursesList, setCoursesList] = useState<{ _id: string; title: string }[]>([]); // ✅ move state outside handleSubmit

  // ✅ Fetch courses once when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res: { data: { _id: string; title: string }[] }) => setCoursesList(res.data))
      .catch((err: any) => console.error("Failed to fetch courses", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const course = (form.elements.namedItem("course") as HTMLSelectElement).value;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    if (!/^9[78]\d{8}$/.test(mobile)) {
      toast.error("Mobile number must start with 97 or 98 and be exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, fullName, email, mobile, message }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Inquiry sent successfully!");
        form.reset();
        setMobile("");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);
    }
  };

  const [info, setInfo] = useState<ContactInfoType | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/contact-info`)
      .then((res) => setInfo(res.data))
      .catch((err) => console.error('Error fetching contact info:', err));
  }, []);





  return (
    <>
      <section className="py-5 bg-light">
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="container">
          <div className="row g-4">
            {/* Left Section - Contact Info */}
            <div className="col-12 col-lg-5">
              <div className="card h-100 shadow-sm border-0 bg-inquiry">
                {info ? (
                  <div className="card-body">
                    <h5 className="fw-bold mb-3 text-primary">We're Here to Help</h5>
                    <p className="text-muted small mb-4">
                      Contact us anytime through the following channels:
                    </p>

                    {/* Email */}
                    <div className="mb-3">
                      <h6 className="text-secondary small mb-2">Email Address</h6>
                      {Array.isArray(info.email) ? (
                        <ul className="list-unstyled">
                          {info.email.map((mail, idx) => (
                            <li key={idx}>
                              <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(mail)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none text-dark d-flex align-items-center mb-1"
                              >
                                <i className="fas fa-envelope text-primary me-2"></i>
                                {mail}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : info.email ? (
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(info.email)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-dark d-flex align-items-center"
                        >
                          <i className="fas fa-envelope text-primary me-2"></i>
                          {info.email}
                        </a>
                      ) : null}
                    </div>


                    {/* Phone */}
                    <div className="mb-3">
                      <h6 className="text-secondary small mb-2">Phone Number</h6>
                      {Array.isArray(info.phone) ? (
                        <ul className="list-unstyled">
                          {info.phone.map((num, idx) => (
                            <li key={idx}>
                              <a
                                href={`tel:${num}`}
                                className="text-decoration-none text-dark d-flex align-items-center mb-1"
                              >
                                <i className="fas fa-phone-alt text-primary me-2"></i>
                                {num}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        info.phone && (
                          <a
                            href={`tel:${info.phone}`}
                            className="text-decoration-none text-dark d-flex align-items-center"
                          >
                            <i className="fas fa-phone-alt text-primary me-2"></i>
                            {info.phone}
                          </a>
                        )
                      )}
                    </div>

                    {/* WhatsApp */}
                    {info.whatsapp && (
                      <div className="mb-4">
                        <h6 className="text-secondary small mb-2">WhatsApp</h6>
                        <a
                          href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-dark d-flex align-items-center"
                        >
                          <i className="fab fa-whatsapp text-success me-2"></i>
                          {info.whatsapp}
                        </a>
                      </div>
                    )}

                    {/* Social Links */}
                    <h6 className="fw-bold text-uppercase small mb-3">Follow Us</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {Object.entries(info.socialLinks || {}).map(
                        ([platform, url]) =>
                          url && (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                              style={{ width: "38px", height: "38px" }}
                            >
                              <i className={`fab fa-${platform}`}></i>
                            </a>
                          )
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-center align-items-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="col-12 col-lg-7" >
              <div className="card shadow-sm h-100"
                style={{
                  border: "0.4px solid #dee2e6",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                }}>
                <div className="card-body">
                  <h4 className="fw-bold mb-3 text-dark">Course Inquiry</h4>
                  <p className="text-muted small mb-4">
                    Please submit your details via the form below. Our support team will
                    get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Course Dropdown */}
                    <div className="mb-3">
                      <label className="form-label">Course *</label>
                      <select
                        name="course"
                        className="form-select"
                        required
                        style={{ borderRadius: "6px" }}
                      >
                        <option value="">Choose a Course...</option>
                        {coursesList.map((c) => (
                          <option key={c._id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Full Name */}
                    <div className="mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="mb-3">
                      <label className="form-label">Mobile *</label>
                      <div className="input-group">
                        <span className="input-group-text">+977</span>
                        <input
                          type="text"
                          name="phone"
                          value={mobile}
                          onChange={handleMobileChange}
                          className="form-control"
                          maxLength={10}
                          placeholder="98XXXXXXXX"
                          required
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-3">
                      <label className="form-label">Message *</label>
                      <textarea
                        name="message"
                        className="form-control"
                        rows={4}
                        required
                      ></textarea>
                    </div>

                    <div className="text-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="fw-semibold btn d-inline-flex align-items-center" style={{
                          backgroundColor: '#0057d8',
                          color: '#ffffff',
                          fontWeight: '500',
                          padding: '12px 17px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '16px',
                          textDecoration: 'none',
                          gap: '8px'
                        }}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Inquiry <i className="bi bi-arrow-right ms-2"></i>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );


}
