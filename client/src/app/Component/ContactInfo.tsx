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
          <div className="py-3">
            <h5 className="fw-bold text-uppercase" style={{ fontSize: '1.1rem' }}>
              Contact:
            </h5>
            <ul className="list-unstyled text-dark" style={{ paddingLeft: 0 }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                <i className="fas fa-envelope me-2"></i>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(info.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark text-decoration-none"
                  style={{ fontWeight: 400 }}
                >
                  {info.email}
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                <i className="fas fa-phone me-2"></i>
                <a
                  href={`tel:${info.phone}`}
                  className="text-dark text-decoration-none"
                  style={{ fontWeight: 400 }}
                >
                  {info.phone}
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                <i className="fab fa-whatsapp me-2"></i>
                <a
                  href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark text-decoration-none"
                  style={{ fontWeight: 400 }}
                >
                  {info.whatsapp}
                </a>
              </li>
            </ul>
          </div>

          <h5 className="fw-bold text-uppercase pt-3 border-top" style={{ fontSize: '1.1rem' }}>Follow us On</h5>
          <div className="d-flex gap-3 mb-3 border-bottom pb-3">
            {Object.entries(info.socialLinks || {}).map(([platform, url]) =>
              url ? (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white text-decoration-none"
                >
                  <div
                    className="border p-2 rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '40px',
                      height: '40px',
                      transition: '0.3s',
                      cursor: 'pointer',
                      backgroundColor: getBrandColor(platform),
                      color: '#fff',
                      fontSize: '1rem',
                    }}
                  >
                    <i className={`fab fa-${platform} fa-lg`}></i>
                  </div>
                </a>
              ) : null
            )}
          </div>
        </>
      ) : (
        <p className="text-white">Loading contact info...</p>
      )}
    </>
  );
};

export default ContactInfo;
