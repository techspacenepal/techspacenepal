'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const ContactInfo = () => {
  const [info, setInfo] = useState<ContactInfoType | null>(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/contact-info`)
      .then((res) => setInfo(res.data))
      .catch((err) => console.error('Error fetching contact info:', err));
  }, []);

return (
  <>
    {info ? (
      <>
        {/* =========================
            Old design (Desktop ≥992px)
            untouched
        ========================== */}
        <div className="d-none d-lg-block">
          {/* 🔴 your full old design code here (exactly as it is) */}
        </div>

        {/* =========================
            New Clean Design (<992px)
        ========================== */}
        <div className="d-block d-lg-none py-3 border-top">
          <h5 className="fw-bold text-uppercase mb-3" style={{ fontSize: "1rem", color: "#2d3748" }}>
            Contact
          </h5>

          <ul className="list-unstyled mb-4" style={{ fontSize: "0.95rem" }}>
            {/* Email(s) */}
            {Array.isArray(info.email)
              ? info.email.map((mail, idx) => (
                  <li key={idx} className="mb-2 d-flex align-items-center">
                    <i className="fas fa-envelope me-2"></i>
                    <a href={`mailto:${mail}`} className="text-decoration-none text-dark">
                      {mail}
                    </a>
                  </li>
                ))
              : info.email && (
                  <li className="mb-2 d-flex align-items-center">
                    <i className="fas fa-envelope me-2"></i>
                    <a href={`mailto:${info.email}`} className="text-decoration-none text-dark">
                      {info.email}
                    </a>
                  </li>
                )}

            {/* Phone(s) */}
            {Array.isArray(info.phone)
              ? info.phone.map((num, idx) => (
                  <li key={idx} className="mb-2 d-flex align-items-center">
                    <i className="fas fa-phone-alt me-2"></i>
                    <a href={`tel:${num}`} className="text-decoration-none text-dark">
                      {num}
                    </a>
                  </li>
                ))
              : info.phone && (
                  <li className="mb-2 d-flex align-items-center">
                    <i className="fas fa-phone-alt me-2"></i>
                    <a href={`tel:${info.phone}`} className="text-decoration-none text-dark">
                      {info.phone}
                    </a>
                  </li>
                )}

            {/* WhatsApp */}
            {info.whatsapp && (
              <li className="mb-2 d-flex align-items-center">
                <i className="fab fa-whatsapp me-2"></i>
                <a
                  href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  {info.whatsapp}
                </a>
              </li>
            )}
          </ul>

          {/* Social */}
          <h6 className="fw-bold text-uppercase mb-2" style={{ fontSize: "0.95rem", color: "#2d3748" }}>
            Follow Us
          </h6>
          <div className="d-flex gap-3">
            {Object.entries(info.socialLinks || {}).map(([platform, url]) =>
              url ? (
                <a key={platform} href={url} target="_blank" rel="noreferrer" className="text-dark fs-5">
                  <i className={`fab fa-${platform}`}></i>
                </a>
              ) : null
            )}
          </div>
        </div>
      </>
    ) : (
      <p style={{ color: "#4a5568" }}>Loading contact information...</p>
    )}
  </>
);

};

export default ContactInfo;
