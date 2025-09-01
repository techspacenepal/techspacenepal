'use client'

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';

interface Service {
    title: string;
}
interface PaymentLogo {
    _id: string;
    name: string;
    img: string;
    modalImage?: string;
}
const BASE_URL = "http://localhost:5000/api";

const Footer = () => {

    const getBrandColor = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "facebook":
                return "#1877F2"; // Facebook blue
            case "whatsapp":
                return "#25D366"; // WhatsApp green
            case "instagram":
                return "#E1306C"; // Instagram pink
            case "twitter":
                return "#1DA1F2"; // Twitter blue
            case "linkedin":
                return "#0077B5"; // LinkedIn blue
            case "youtube":
                return "#FF0000"; // YouTube red
            default:
                return "#6b7280"; // Neutral gray fallback
        }
    };

    // State to hold logo data
    const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);

    // Contact & social info state
    const [info, setInfo] = useState<{
        address: string;
        email: string;
        phone: string;
        whatsapp: string;
        socialLinks: Record<string, string>;
    } | null>(null);

    // Services fetched from backend
    const [services, setServices] = useState<Service[]>([]);

    // State for showing scroll-to-top button
    const [showButton, setShowButton] = useState(false);



    // Hide footer for specific paths (replace or add your logic)
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
   const hideHeader =
  pathname === "/auth/adminLogin" ||
  pathname === "/auth/studentLogin";

const hideFooter =
  pathname === "/auth/adminRegister/superAdmin" ||
  pathname === "/auth/studentRegister";



    const [paymentLogos, setPaymentLogos] = useState<PaymentLogo[]>([]);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [copyright, setCopyright] = useState('');

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const [logosRes, copyrightRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/footer/payment-logos'),
                    axios.get('http://localhost:5000/api/footer/copyright'),
                ]);

                setPaymentLogos(logosRes.data || []);
                if (copyrightRes.data?.text) {
                    setCopyright(copyrightRes.data.text);
                }
            } catch (err) {
                console.error('Failed to load footer data:', err);
            }
        };

        fetchFooterData();
    }, []);
    // Fetch contact info on mount
    useEffect(() => {
        axios
            .get(`${BASE_URL}/contact-info`)
            .then((res) => setInfo(res.data))
            .catch((err) => console.error("Error fetching contact info:", err));
    }, []);

    // Fetch logo on mount
    useEffect(() => {
        axios
            .get(`${BASE_URL}/logo`)
            .then((res) => setLogo(res.data))
            .catch(() => console.error("Failed to load logo"));
    }, []);

    // Fetch services on mount
    useEffect(() => {
        axios
            .get(`${BASE_URL}/services`)
            .then((res) => setServices(res.data))
            .catch((err) => console.error("Error loading services:", err));
    }, []);

    // Show scroll to top button after scrolling down 200px
    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Scroll to top handler
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Close payment modal
    const handleClose = () => setActiveImage(null);

    // Helper: generate slug from title
    const generateSlug = (title: string) =>
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

    // If on pages where footer or header is hidden, return null
    if (hideHeader || hideFooter) return null;

    return (
        <>
            <footer
                className="text-white pt-5 pb-3 bg-dark"
                style={{
                    background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="container">
                    <div className="row text-start">
                        {/* Left - About & Logo */}
                        <div className="col-md-4 mb-4">
                            <a href="/" style={{ paddingLeft: 0, display: 'inline-block' }}>
                                {logo ? (
                                    <Image
                                        className="d-block mx-auto mb-3 bg-light"
                                        src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                                        alt="Logo"
                                        width={160}
                                        height={80}
                                        unoptimized={true}
                                        style={{
                                            objectFit: 'contain',
                                            width: '160px',
                                            height: '80px',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                ) : (
                                    <span>Loading logo...</span>
                                )}
                            </a>

                            <p
                                className="text-white"
                                style={{
                                    textAlign: 'justify',
                                    paddingLeft: 0,
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    fontWeight: 400,
                                    textTransform: 'capitalize',
                                }}
                            >
                                Tech Space Nepal promises to offer every course in the most professional way,
                                delivering the best value for your money with expert instructors and hands-on training.
                            </p>
                        </div>

                        {/* Middle - Quick Links */}
                        <div className="col-md-2 mb-4">
                            <h5 className="fw-bold text-uppercase" style={{ fontSize: '1.1rem' }}>Quick Links</h5>
                            <ul className="list-unstyled">
                                {[
                                    { href: '/', text: 'Home' },
                                    { href: '/about-us', text: 'About Us' },
                                    { href: '/services', text: 'Our Services' },
                                    { href: '/courses', text: 'Courses' },
                                    { href: '/success-gallery', text: 'Success Gallery' },
                                    { href: '/testimonial', text: 'Testimonials' },
                                    { href: '/our-team', text: 'Our Team' },
                                    { href: '/blog', text: 'Blog' },
                                    { href: '/contact', text: 'Contact' },
                                ].map((link) => (
                                    <li key={link.href} style={{ marginBottom: '0.5rem' }}>
                                        <a
                                            href={link.href}
                                            className="text-white text-decoration-none text-capitalize"
                                            style={{
                                                fontSize: '0.95rem',
                                                fontWeight: 400,
                                            }}
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="col-md-3 mb-4">
                            <h5 className="fw-bold text-uppercase" style={{ fontSize: '1.1rem' }}>Our Services</h5>
                            <ul className="list-unstyled">
                                {services.map((service, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.5rem' }}>
                                        <a
                                            href={`/services/${generateSlug(service.title)}`}
                                            className="text-white text-decoration-none text-capitalize"
                                            style={{
                                                fontSize: '0.95rem',
                                                fontWeight: 400,
                                            }}
                                        >
                                            {service.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact & Social */}
                        <div className="col-md-3">
                            {info ? (
                                <>
                                    <div className="mb-4">
                                        <h5 className="fw-bold text-uppercase" style={{ fontSize: '1.1rem' }}>Contact Us</h5>
                                        <ul className="list-unstyled" style={{ paddingLeft: 0 }}>
                                            <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                {info.address}
                                            </li>
                                            <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                                <i className="fas fa-envelope me-2"></i>
                                                <a
                                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(info.email)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white text-decoration-none"
                                                    style={{ fontWeight: 400 }}
                                                >
                                                    {info.email}
                                                </a>
                                            </li>
                                            <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                                <i className="fas fa-phone me-2"></i>
                                                <a
                                                    href={`tel:${info.phone}`}
                                                    className="text-white text-decoration-none"
                                                    style={{ fontWeight: 400 }}
                                                >
                                                    {info.phone}
                                                </a>
                                            </li>
                                            <li style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                                <i className="fab fa-whatsapp me-2"></i>
                                                <a
                                                    href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white text-decoration-none"
                                                    style={{ fontWeight: 400 }}
                                                >
                                                    {info.whatsapp}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <h5 className="fw-bold text-uppercase" style={{ fontSize: '1.1rem' }}>Follow us On</h5>
                                    <div className="d-flex gap-3 mb-3">
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
                                                            width: "40px",
                                                            height: "40px",
                                                            transition: "0.3s",
                                                            cursor: "pointer",
                                                            backgroundColor: getBrandColor(platform),
                                                            color: "#fff",
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
                        </div>
                        
                    </div>

                    {/* Bottom footer row */}
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between pt-3 border-top mt-4 gap-3">
                        <small
                            className="text-white text-center text-md-start"
                            style={{ fontSize: '0.85rem', fontWeight: 500 }}
                        >
                            {copyright || '© 2025 techspacenepal.com. All rights reserved.'}
                        </small>

                        {/* Payment Logos */}
                        <div className="d-flex align-items-center flex-wrap justify-content-center gap-3">
                            <span
                                className="fw-semibold text-white text-uppercase"
                                style={{ fontSize: '0.9rem' }}
                            >
                                We Accept:
                            </span>
                            {paymentLogos.map((p) => (
                                <img
                                    key={p._id}
                                    src={`http://localhost:5000/uploads/${p.img}`}
                                    alt={p.name}
                                    width={80}
                                    height={30}
                                    className="rounded bg-white p-1"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        p.modalImage &&
                                        setActiveImage(`http://localhost:5000/uploads/${p.modalImage}`)
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    {/* Payment Modal */}
                    {activeImage && (
                        <Modal show onHide={() => setActiveImage(null)} centered size="sm">
                            <Modal.Header closeButton className="bg-light border-0">
                                <Modal.Title className="text-danger">QR Code Preview</Modal.Title>
                            </Modal.Header>
                            <Modal.Body
                                className="bg-light rounded d-flex justify-content-center align-items-center"
                                style={{ minHeight: '60vh' }}
                            >
                                <div>
                                    <img
                                        src={activeImage}
                                        alt="QR Code Preview"
                                        className="img-fluid"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            display: 'block',
                                            margin: '0 auto',
                                        }}
                                    />
                                </div>
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
            </footer>


            {/* Scroll to Top Button */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="btn btn-primary shadow d-flex justify-content-center align-items-center"
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 1000,
                        width: "45px",
                        height: "45px",
                        fontSize: "20px",
                        backgroundColor: "#2563EB",
                        color: "#fff",
                        border: "none",
                    }}
                    aria-label="Scroll to top"
                >
                    <i className="bi bi-arrow-up"></i>
                </button>

            )}
        </>
    );
};

export default Footer;
