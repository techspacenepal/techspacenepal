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

const ContactInfoinquiry = () => {
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
                <div>
                    {/* Contact Information Section */}
                    <div className="mb-4">
                        <h3 className="h5 fw-semibold text-dark mb-2">We're Here to Help</h3>
                        <p className="text-secondary mb-3">Contact us anytime through:</p>
                        {/* Email */}
                        <div className="mb-3">
                            <p className="small text-secondary mb-1">Email Address</p>
                            {Array.isArray(info.email) ? (
                                <ul className="list-unstyled">
                                    {info.email.map((mail, idx) => (
                                        <li key={idx} className="mb-1">
                                            <a
                                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(mail)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-decoration-none text-dark hover-text-primary transition-all"
                                            >
                                                <i className="fas fa-envelope me-2 text-primary"></i>{mail}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : info.email ? (
                                <a
                                    href={`mailto:${info.email}`}
                                    className="text-decoration-none text-dark hover-text-primary transition-all"
                                >
                                    <i className="fas fa-envelope me-2 text-primary"></i>{info.email}
                                </a>
                            ) : null}
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <p className="small text-secondary mb-1">Phone Number</p>
                            {Array.isArray(info.phone) ? (
                                <ul className="list-unstyled">
                                    {info.phone.map((num, idx) => (
                                        <li key={idx} className="mb-1">
                                            <a
                                                href={`tel:${num}`}
                                                className="text-decoration-none text-dark hover-text-primary transition-all"
                                            >
                                                <i className="fas fa-phone-alt me-2 text-primary"></i>{num}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : info.phone ? (
                                <a
                                    href={`tel:${info.phone}`}
                                    className="text-decoration-none text-dark hover-text-primary transition-all"
                                >
                                    <i className="fas fa-phone-alt me-2 text-primary"></i>{info.phone}
                                </a>
                            ) : null}
                        </div>

                        {/* WhatsApp */}
                        {info.whatsapp && (
                            <div className="mb-3">
                                <p className="small text-secondary mb-1">WhatsApp</p>
                                <a
                                    href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none text-dark hover-text-success transition-all"
                                >
                                    <i className="fab fa-whatsapp me-2 text-success"></i>{info.whatsapp}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Social Links Section */}
                    <div>
                        <h5 className="fw-bold text-uppercase" style={{ fontSize: '1rem' }}>Follow us On</h5>
                        <div className="d-flex gap-3">
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
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center py-4 bg-white rounded-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {/* CSS for hover effects */}
            <style jsx>{`
      .hover-text-primary:hover {
        color: var(--bs-primary) !important;
      }
      .hover-text-success:hover {
        color: var(--bs-success) !important;
      }
      .transition-all {
        transition: all 0.2s ease;
      }
      
    `}</style>
        </>
    );
};

export default ContactInfoinquiry;
