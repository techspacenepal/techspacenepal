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
    const hideHeader = pathname === "/auth/adminLogin";
    const hideFooter = pathname === "/auth/adminRegister/superAdmin";


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
                className="text-white pt-5 pb-3 bg-success"
                style={{
                    fontFamily: "'Poppins', sans-serif", // ✅ modern font family
                }}
            >
                <div className="container">
                    <div className="row text-start gy-4">
                        {/* Left - About & Logo */}
                        <div className="col-md-4">
                            <a href="/">
                                {logo ? (
                                    <Image
                                        className="d-block"
                                        src={`http://localhost:5000/uploads/${logo.imageUrl}`}
                                        alt="Logo"
                                        width={160}
                                        height={80}
                                        unoptimized={true}
                                        style={{
                                            objectFit: "cover",
                                            width: "160px",
                                            height: "80px",
                                        }}
                                    />
                                ) : (
                                    <span>Loading logo...</span>
                                )}
                            </a>
                            <p
                                style={{
                                    textAlign: "justify",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.7",
                                    fontWeight: 400,
                                    color: "#e0e0e0",
                                }}
                            >
                                Tech Space Nepal promises to offer every course in the most professional way,
                                delivering the best value for your money with expert instructors and hands-on training.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-6 col-md-2">
                            <h5
                                className="fw-bold text-uppercase mb-3"
                                style={{
                                    fontSize: "1.1rem",
                                    color: "#fff",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Company
                            </h5>
                            <ul className="list-unstyled">
                                {[
                                    { href: "/", text: "Home" },
                                    { href: "/about-us", text: "About Us" },
                                    { href: "/services", text: "Our Services" },
                                    { href: "/courses", text: "Courses" },
                                    { href: "/success-gallery", text: "Success Gallery" },
                                    { href: "/our-team", text: "Our Team" },
                                    { href: "/contact", text: "Contact Us" },
                                ].map((link) => (
                                    <li key={link.href} className="mb-2">
                                        <a
                                            href={link.href}
                                            className="text-decoration-none"
                                            style={{
                                                fontSize: "0.95rem",
                                                fontWeight: 500,            // ✅ slightly bolder for clarity
                                                color: "#e0e0e0",
                                                textTransform: "capitalize", // ✅ clean capitalization
                                                transition: "all 0.3s ease", // ✅ smooth hover
                                                display: "inline-block",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = "#FFD700"; // ✅ blue hover
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = "#e0e0e0";
                                            }}
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="col-6 col-md-3">
                            <h5
                                className="fw-bold text-uppercase mb-3"
                                style={{
                                    fontSize: "1.1rem",
                                    color: "#fff",
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Additional Links
                            </h5>
                            <ul className="list-unstyled">
                                {[
                                    { href: "/testimonial", text: "Testimonials" },
                                    { href: "/upcomming-classes", text: "Upcoming Classes" },
                                    { href: "/blog", text: "Blog" },
                                    { href: "", text: "Student Portal" },
                                ].map((link) => (
                                    <li key={link.href} className="mb-2">
                                        <a
                                            href={link.href}
                                            className="text-decoration-none"
                                            style={{
                                                fontSize: "0.95rem",
                                                fontWeight: 500,
                                                color: "#e0e0e0",
                                                textTransform: "capitalize",
                                                transition: "all 0.3s ease",
                                                display: "inline-block",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.color = "#FFD700";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.color = "#e0e0e0";
                                            }}
                                        >
                                            {link.text}
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
                                        <h5
                                            className="fw-bold text-uppercase mb-3"
                                            style={{
                                                fontSize: "1.1rem",
                                                color: "#fff",
                                                letterSpacing: "0.5px",
                                            }}
                                        >
                                            Contact Us
                                        </h5>
                                        <ul className="list-unstyled ps-0">
                                            <li className="mb-2" style={{ fontSize: "0.95rem", color: "#e0e0e0", fontWeight: 400 }}>
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                {info.address}
                                            </li>
                                            <li className="mb-2" style={{ fontSize: "0.95rem" }}>
                                                <i className="fas fa-envelope me-2"></i>
                                                <a
                                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(info.email)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                    style={{
                                                        fontWeight: 500,
                                                        color: "#e0e0e0",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                                                    onMouseOut={(e) => (e.currentTarget.style.color = "#e0e0e0")}
                                                >
                                                    {info.email}
                                                </a>
                                            </li>
                                            <li className="mb-2" style={{ fontSize: "0.95rem" }}>
                                                <i className="fas fa-phone me-2"></i>
                                                <a
                                                    href={`tel:${info.phone}`}
                                                    className="text-decoration-none"
                                                    style={{
                                                        fontWeight: 500,
                                                        color: "#e0e0e0",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                                                    onMouseOut={(e) => (e.currentTarget.style.color = "#e0e0e0")}
                                                >
                                                    {info.phone}
                                                </a>
                                            </li>
                                            <li className="mb-2" style={{ fontSize: "0.95rem" }}>
                                                <i className="fab fa-whatsapp me-2"></i>
                                                <a
                                                    href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                    style={{
                                                        fontWeight: 500,
                                                        color: "#e0e0e0",
                                                        transition: "all 0.3s ease",
                                                    }}
                                                    onMouseOver={(e) => (e.currentTarget.style.color = "#FFD700")}
                                                    onMouseOut={(e) => (e.currentTarget.style.color = "#e0e0e0")}
                                                >
                                                    {info.whatsapp}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <h5
                                        className="fw-bold text-uppercase mb-3"
                                        style={{
                                            fontSize: "1.1rem",
                                            color: "#fff",
                                            letterSpacing: "0.5px",
                                        }}
                                    >
                                        Follow us On
                                    </h5>
                                    <div className="d-flex flex-wrap gap-2">
                                        {Object.entries(info.socialLinks || {}).map(([platform, url]) =>
                                            url ? (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-decoration-none"
                                                >
                                                    <div
                                                        className="p-2 rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "40px",
                                                            height: "40px",
                                                            transition: "0.3s",
                                                            cursor: "pointer",
                                                            backgroundColor: getBrandColor(platform),
                                                            color: "#fff",
                                                            fontSize: "1rem",
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
                            className="text-center text-md-start"
                            style={{
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                color: "#bfbfbf",
                                letterSpacing: "0.3px",
                            }}
                        >
                            {copyright || "© 2025 techspacenepal.com. All rights reserved."}
                        </small>

                        {/* Payment Logos (unchanged) */}
                        <div className="d-flex align-items-center flex-wrap justify-content-center gap-3">
                            <span
                                className="fw-semibold text-uppercase"
                                style={{ fontSize: "0.9rem", color: "#e0e0e0", letterSpacing: "0.5px" }}
                            >
                                We Accept:
                            </span>
                            {paymentLogos.map((p) => (
                                <div
                                    key={p._id}
                                    className="d-flex align-items-center justify-content-center bg-white shadow-sm rounded-3"
                                    style={{
                                        width: "100px",
                                        height: "50px",
                                        cursor: "pointer",
                                        transition: "transform 0.3s ease",
                                    }}
                                    onClick={() =>
                                        p.modalImage &&
                                        setActiveImage(`http://localhost:5000/uploads/${p.modalImage}`)
                                    }
                                >
                                    <img
                                        src={`http://localhost:5000/uploads/${p.img}`}
                                        alt={p.name}
                                        className="img-fluid"
                                        style={{
                                            maxHeight: "30px",
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Modal (unchanged) */}
                    {activeImage && (
                        <Modal show onHide={() => setActiveImage(null)} centered size="sm">
                            <Modal.Header closeButton className="bg-light border-0">
                                <Modal.Title className="text-danger">QR Code Preview</Modal.Title>
                            </Modal.Header>
                            <Modal.Body
                                className="bg-light rounded d-flex justify-content-center align-items-center"
                                style={{ minHeight: "60vh" }}
                            >
                                <div>
                                    <img
                                        src={activeImage}
                                        alt="QR Code Preview"
                                        className="img-fluid"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            display: "block",
                                            margin: "0 auto",
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
