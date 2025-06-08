"use client";
import { CgMail } from "react-icons/cg";


import React, { useState } from "react";

export default function SendInquiry() {
  const [showAlternate, setShowAlternate] = useState(false);

  const toggleAlternate = () => {
    setShowAlternate((prev) => !prev);
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* ...Left Section here (same as before)... */}
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
        +977-9827598918<br />
        +977-
      </p>
    </div>
  </div>
<div className="row py-3">
  <div className="col-sm-6 mb-3">
    <h6>☎️ Hotline</h6>
    <p className="mb-0">+977-9810938993</p>
  </div>

  <div className="col-sm-6 mb-3 ">
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
    <div className="card shadow-sm" style={{ width: "150px" }}>
      <div className="card-body">
        <h6>📘 Digital Marketing 360°</h6>
        <p className="small mb-0">🕒 05:30 PM - 07:00 PM</p>
      </div>
    </div>
    <div className="card shadow-sm" style={{ width: "150px" }}>
      <div className="card-body">
        <h6>💾 SQL Server Training</h6>
        <p className="small mb-0">🕒 10:00 AM - 11:30 AM</p>
      </div>
    </div>
    <div className="card shadow-sm" style={{ width: "150px" }}>
      <div className="card-body">
        <h6>📱 Social Media Marketing</h6>
        <p className="small mb-0">🕒 05:30 PM - 07:00 PM</p>
      </div>
    </div>
  </div>
</div>


        {/* Right Section */}
        <div className="col-md-6 px-4 ">
          <h4 className="mb-3">Course Inquiry</h4>
          <p>Please submit your details via the form below. Our support team will get back to you as soon as possible.</p>

          <form>
            {/* Course */}
            <div className="mb-3">
              <label className="form-label">
                Course <span className="text-danger">*</span>
              </label>
              <select className="form-select" required>
                <option value="">Choose a Course...</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label">
                Full Name <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" placeholder="Your Name" required />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">
                Email address <span className="text-danger">*</span>
              </label>
              <input type="email" className="form-control" placeholder="Your Email" required />
            </div>

            {/* Mobile Number */}
            <div className="mb-3 ">
              <label className="form-label">
                Mobile Number <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text">+977</span>
                <input type="tel" className="form-control" placeholder="9841002000" required />
              </div>
            </div>

            {/* Message */}
            <div className="mb-3">
              <label className="form-label">
                Message <span className="text-danger">*</span>
              </label>
              <textarea className="form-control" rows={3} placeholder="Tell us about you" required></textarea>
            </div>

            {/* Toggle Button */}
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <label className="form-label mb-0">Have an alternate number?</label>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={toggleAlternate}
              >
                {showAlternate ? "Hide" : "Add"}
              </button>
            </div>

           

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
            >
              Send Inquiry <i className="bi bi-arrow-right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}