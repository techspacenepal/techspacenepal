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
                return "#1877F2";
            case "whatsapp":
                return "#25D366";
            case "instagram":
                return "#E1306C";
            case "twitter":
                return "#1DA1F2";
            case "linkedin":
                return "#0077B5";
            case "youtube":
                return "#FF0000";
            default:
                return "#6b7280";
        }
    };

    const [logo, setLogo] = useState<{ imageUrl: string } | null>(null);
    const [info, setInfo] = useState<{
        address: string;
        email: string | string[];
        phone: string | string[];
        whatsapp: string;
        socialLinks: Record<string, string>;
    } | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [showButton, setShowButton] = useState(false);
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";


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

    useEffect(() => {
        axios.get(`${BASE_URL}/contact-info`)
            .then(res => setInfo(res.data))
            .catch(err => console.error("Error fetching contact info:", err));
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URL}/logo`)
            .then(res => setLogo(res.data))
            .catch(() => console.error("Failed to load logo"));
    }, []);

    useEffect(() => {
        axios.get(`${BASE_URL}/services`)
            .then(res => setServices(res.data))
            .catch(err => console.error("Error loading services:", err));
    }, []);

    useEffect(() => {
        const handleScroll = () => setShowButton(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
    const handleClose = () => setActiveImage(null);
    const generateSlug = (title: string) =>
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");




    // Use let to allow reassignment if needed
    let hideHeader = false;
    let hideFooter = false;

    // Pages where header should be hidden
    if (
        pathname === "/auth/studentLogin" ||
        pathname === "/auth/studentRegister" ||
        pathname === "/auth/adminLogin" ||
        pathname === "/auth/studentForgotPassword" ||
        pathname === "/auth/studentResetPassword/[token]" ||
        pathname === "/studentdashboard" ||
        pathname === "/studentdashboard/profile" ||
        pathname === "/studentdashboard/courses" ||
        pathname === "/studentdashboard/gradebook" ||
        pathname === "/studentdashboard/announcements" ||
        pathname === "/studentdashboard/todoList" ||
        pathname === "/auth/Dashboard/teacherDashboard" ||
        pathname === "/auth/Dashboard/teacherDashboard/courses" ||
        pathname === "/auth/Dashboard/teacherDashboard/students" ||
        pathname === "/auth/Dashboard/teacherDashboard/grades" ||
        pathname === "/auth/Dashboard/teacherDashboard/teacherNotification" ||
        pathname === "/auth/Dashboard/teacherDashboard/todolist"
    ) {
        hideHeader = true;
    }

    // Pages where footer should be hidden
    if (
        pathname === "/auth/studentLogin" ||
        pathname === "/auth/studentRegister" ||
        pathname === "/auth/adminRegister/superAdmin"
    ) {
        hideFooter = true;
    }

    // In render
    if (hideHeader || hideFooter) return null;
    return (
        <>
            <footer
                className="text-white pt-5 pb-3 bg-success"
                style={{ fontFamily: "'Poppins', sans-serif" }}
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
                                        unoptimized
                                        style={{ objectFit: "cover", width: "160px", height: "80px" }}
                                    />
                                ) : (
                                    <span>Loading logo...</span>
                                )}
                            </a>
                            <p style={{ textAlign: "justify", fontSize: "0.95rem", lineHeight: "1.7", fontWeight: 400, color: "#e0e0e0" }}>
                                Tech Space Nepal promises to offer every course in the most professional way,
                                delivering the best value for your money with expert instructors and hands-on training.
                            </p>

                            <h5 className="fw-bold text-uppercase mb-3" style={{ fontSize: "1.1rem", color: "#fff", letterSpacing: "0.5px" }}>
                                Follow us On
                            </h5>
                            <div className="d-flex flex-wrap gap-2">
                                {Object.entries(info?.socialLinks || {}).map(([platform, url]) =>
                                    url ? (
                                        <a key={platform} href={url} target="_blank" rel="noreferrer" className="text-decoration-none">
                                            <div
                                                className="p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    transition: "transform 0.3s ease, background-color 0.3s ease",
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
                        </div>

                        {/* Quick Links */}
                        <div className="col-6 col-md-2">
                            <h5 className="fw-bold text-uppercase mb-3" style={{ fontSize: "1.1rem", color: "#fff", letterSpacing: "0.5px" }}>
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
                                    { href: "/contact-us", text: "Contact Us" },
                                ].map((link) => (
                                    <li key={link.href} className="mb-2">
                                        <a
                                            href={link.href}
                                            className="text-decoration-none"
                                            style={{ fontSize: "0.95rem", fontWeight: 500, color: "#e0e0e0", textTransform: "capitalize", transition: "all 0.3s ease", display: "inline-block" }}
                                            onMouseOver={(e) => e.currentTarget.style.color = "#FFD700"}
                                            onMouseOut={(e) => e.currentTarget.style.color = "#e0e0e0"}
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Additional Links */}
                        <div className="col-6 col-md-3">
                            <h5 className="fw-bold text-uppercase mb-3" style={{ fontSize: "1.1rem", color: "#fff", letterSpacing: "0.5px" }}>
                                Additional Links
                            </h5>
                            <ul className="list-unstyled">
                                {[
                                    { href: "/testimonial", text: "Testimonials" },
                                    { href: "/upcomming-classes", text: "Upcoming Classes" },
                                    { href: "/blog", text: "Blog" },
                                    { href: "/auth/studentLogin", text: "Student Portal" },
                                ].map((link) => (
                                    <li key={link.href} className="mb-2">
                                        <a
                                            href={link.href}
                                            className="text-decoration-none"
                                            style={{ fontSize: "0.95rem", fontWeight: 500, color: "#e0e0e0", textTransform: "capitalize", transition: "all 0.3s ease", display: "inline-block" }}
                                            onMouseOver={(e) => e.currentTarget.style.color = "#FFD700"}
                                            onMouseOut={(e) => e.currentTarget.style.color = "#e0e0e0"}
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-md-3">
                            {info ? (
                                <div className="mb-4">
                                    <h5 className="fw-bold text-uppercase mb-3" style={{ fontSize: "1.1rem", color: "#fff", letterSpacing: "0.5px" }}>
                                        Contact Us
                                    </h5>
                                    <ul className="list-unstyled ps-0">
                                        <li className="mb-3 pb-2 border-bottom" style={{ fontSize: "0.95rem", color: "#e0e0e0", fontWeight: 400 }}>
                                            <p className="mb-1 fw-semibold text-light">TechSpace Nepal Pvt. Ltd.</p>
                                            <span style={{ lineHeight: "1.6" }}>{info.address}</span>
                                        </li>

                                        <li className="mb-3 pb-2 border-bottom" style={{ fontSize: "0.95rem" }}>
                                            <p className="fw-semibold mb-1 text-light">Email Address</p>
                                            {Array.isArray(info.email) ? (
                                                info.email.map((mail, idx) => (
                                                    <div key={idx} className="mb-1">
                                                        <a
                                                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(mail)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-decoration-none"
                                                            style={{ fontWeight: 500, color: "#e0e0e0", transition: "all 0.3s ease" }}
                                                            onMouseOver={(e) => e.currentTarget.style.color = "#FFD700"}
                                                            onMouseOut={(e) => e.currentTarget.style.color = "#e0e0e0"}
                                                        >
                                                            {mail}
                                                        </a>
                                                    </div>
                                                ))
                                            ) : info.email ? (
                                                <a
                                                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(info.email)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                    style={{ fontWeight: 500, color: "#e0e0e0", transition: "all 0.3s ease" }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = "#FFD700"}
                                                    onMouseOut={(e) => e.currentTarget.style.color = "#e0e0e0"}
                                                >
                                                    {info.email}
                                                </a>
                                            ) : null}
                                        </li>

                                        <li className="mb-3 pb-2 border-bottom" style={{ fontSize: "0.95rem" }}>
                                            <p className="fw-semibold mb-1 text-light">Telephone Contact</p>
                                            {Array.isArray(info.phone) ? (
                                                info.phone.map((num, idx) => (
                                                    <div key={idx} className="mb-1">
                                                        <a
                                                            href={`tel:${num}`}
                                                            className="text-decoration-none"
                                                            style={{ fontWeight: 500, color: "#e0e0e0", transition: "all 0.3s ease" }}
                                                            onMouseOver={(e) => e.currentTarget.style.color = "#FFD700"}
                                                            onMouseOut={(e) => e.currentTarget.style.color = "#e0e0e0"}
                                                        >
                                                            {num}
                                                        </a>
                                                    </div>
                                                ))
                                            ) : info.phone ? (
                                                <a
                                                    href={`tel:${info.phone}`}
                                                    className="text-decoration-none"
                                                    style={{ fontWeight: 500, color: "#e0e0e0", transition: "all 0.3s ease" }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = "#FFD700"}
                                                    onMouseOut={(e) => e.currentTarget.style.color = "#e0e0e0"}
                                                >
                                                    {info.phone}
                                                </a>
                                            ) : null}
                                        </li>

                                        <li className="mb-3" style={{ fontSize: "0.95rem" }}>
                                            <p className="fw-semibold mb-1 text-light">WhatsApp</p>
                                            {info.whatsapp && (
                                                <a
                                                    href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                    style={{ fontWeight: 500, color: "#e0e0e0", transition: "all 0.3s ease" }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = "#25D366"}
                                                    onMouseOut={(e) => e.currentTarget.style.color = "#e0e0e0"}
                                                >
                                                    {info.whatsapp}
                                                </a>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <p className="text-white">Loading contact info...</p>
                            )}
                        </div>
                    </div>

                    {/* Bottom footer row */}
                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between pt-3 border-top mt-4 gap-3">
                        <small className="text-center text-md-start" style={{ fontSize: "0.85rem", fontWeight: 500, color: "#bfbfbf", letterSpacing: "0.3px" }}>
                            {copyright || "© 2025 techspacenepal.com. All rights reserved."}
                        </small>

                        {/* Payment Logos */}
                        <div className="d-flex align-items-center flex-wrap justify-content-center gap-3">
                            <span className="fw-semibold text-uppercase" style={{ fontSize: "0.9rem", color: "#e0e0e0", letterSpacing: "0.5px" }}>We Accept:</span>
                            {paymentLogos.map((p) => (
                                <div
                                    key={p._id}
                                    className="d-flex align-items-center justify-content-center bg-white shadow-sm rounded-3"
                                    style={{ width: "100px", height: "50px", cursor: "pointer", transition: "transform 0.3s ease" }}
                                    onClick={() => p.modalImage && setActiveImage(`http://localhost:5000/uploads/${p.modalImage}`)}
                                >
                                    <img src={`http://localhost:5000/uploads/${p.img}`} alt={p.name} className="img-fluid" style={{ maxHeight: "30px", maxWidth: "100%", objectFit: "contain" }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Modal */}
                    {activeImage && (
                        <Modal show onHide={() => setActiveImage(null)} centered size="sm">
                            <Modal.Header closeButton className="bg-light border-0">
                                <Modal.Title className="text-danger">QR Code Preview</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="bg-light rounded d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                                <div>
                                    <img src={activeImage} alt="QR Code Preview" className="img-fluid" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", margin: "0 auto" }} />
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
                    style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000, width: "45px", height: "45px", fontSize: "20px", backgroundColor: "#2563EB", color: "#fff", border: "none" }}
                    aria-label="Scroll to top"
                >
                    <i className="bi bi-arrow-up"></i>
                </button>
            )}
        </>
    );
};

export default Footer;
