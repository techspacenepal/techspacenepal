
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

      toast.success(data.message || 'Successfully sent inquiry!');
      setFormData({ name: '', email: '', mobile: '', course: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send inquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="row g-4 align-items-start">
        {/* Left Side */}
        <div className="col-lg-5 col-md-6 col-12">
          <ContactItem
            icon="bi-geo-alt-fill"
            title="Location"
            lines={['Thapagaun-13, New Baneshwor Kathmandu', 'Nepal']}
          />
          <ContactItem
            icon="bi-mortarboard-fill"
            title="Training"
            lines={['01-5244419', 'info@skilltrainingnepal.com']}
          />
          <ContactItem
            icon="bi-person-lines-fill"
            title="Counseling"
            lines={['+977-9813906662', 'info.skilltrainingnepal@gmail.com']}
          />
          <ContactItem
            icon="bi-person-workspace"
            title="Career"
            lines={['01-5244419', 'info@skilltrainingnepal.com']}
          />
          <ContactItem icon="bi-chat-dots" title="Viber" lines={['+977-9813906662']} />
          <ContactItem icon="bi-whatsapp" title="WhatsApp" lines={['+977-9813906662']} />
        </div>

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

      {/* Google Map */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="ratio ratio-16x9 shadow rounded">
            <iframe
              className="p-3 rounded-2xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.774046715432!2d85.34229721506192!3d27.694110882798796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb197acb6cc5e9%3A0x4e3781e57efc09cb!2sSkill%20Training%20Nepal!5e0!3m2!1sen!2snp!4v1663405418475!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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
