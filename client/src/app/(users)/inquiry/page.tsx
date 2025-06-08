

"use client";

import React, { useState, useEffect } from "react";
import { CgMail } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SendInquiry() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);


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
    } catch (err) {
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

  return (
    <div className="container py-5">
       {/* Toast container */}
            <ToastContainer position="top-right" autoClose={3000} />

      <div className="row">
        {/* Left Section */}
        <div className="col-md-6 mb-4 px-4">
          <h4 className="mb-3 fw-bold">Get In Touch</h4>
          <p className="text-muted">Contact us directly for quick interaction.</p>

          <div className="row py-3">
            <div className="col-sm-6 mb-3">
              <h6>📱 Viber/Whatsapp</h6>
              <p className="mb-0">+977-9841002000</p>
            </div>
            <div className="col-sm-6 mb-3">
              <h6>📞 Contact</h6>
              <p className="mb-0">
                +977-981-0938993<br />
                +977-981-0938993<br />
                +977-9827598918
              </p>
            </div>
          </div>

          <div className="row py-3">
            <div className="col-sm-6 mb-3">
              <h6>☎️ Hotline</h6>
              <p className="mb-0">+977-9810938993</p>
            </div>
            <div className="col-sm-6 mb-3">
              <h6><CgMail /> Email</h6>
              <p className="mb-0">
                tachspace@gmail.com<br />
                hr@techspacenepal.com<br />
                support@techspacenepal.com<br />
                inquiry@techspacenepal.com
              </p>
            </div>
          </div>

          <h5 className="mt-4 fw-bold">Upcoming Classes</h5>
          <div className="d-flex gap-3 overflow-auto">
            {[
              { title: "📘 Digital Marketing 360°", time: "05:30 PM - 07:00 PM" },
              { title: "💾 SQL Server Training", time: "10:00 AM - 11:30 AM" },
              { title: "📱 Social Media Marketing", time: "05:30 PM - 07:00 PM" },
            ].map((cls, i) => (
              <div key={i} className="card shadow-sm" style={{ width: "150px" }}>
                <div className="card-body">
                  <h6>{cls.title}</h6>
                  <p className="small mb-0">🕒 {cls.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 px-4">
          <h4 className="mb-3">Course Inquiry</h4>
          <p>
            Please submit your details via the form below. Our support team will
            get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Course <span className="text-danger">*</span>
              </label>
              <select name="course" className="form-select" required>
                <option value="">Choose a Course...</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input name="fullName" type="text" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input name="email" type="email" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Mobile <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">+977</span>
                <input
                  name="phone"
                  type="text"
                  value={mobile}
                  onChange={handleMobileChange}
                  className="form-control"
                  maxLength={10}
                  placeholder="98XXXXXXXX"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Message <span className="text-danger">*</span>
              </label>
              <textarea name="message" className="form-control" rows={3} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
