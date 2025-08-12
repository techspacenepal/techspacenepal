
"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";

interface Service {
    icon: string;
    title: string;
    desc: string;
}

const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function ServicesSection() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/services").then((res) => {
            setServices(res.data);
        });
    }, []);

    return (




        <section className="py-5 bg-light">
            <Container>
                <div className="text-center mb-5">
                    <h2
                        className="fw-bold text-uppercase"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '1.8rem',
                            letterSpacing: '1px',
                            color: '#1e293b',
                        }}
                    >
                        IT services offered by Tech Space Nepal
                    </h2>

                </div>

                {/* Desktop & Tablet */}
                <Row className="g-4 d-none d-md-flex">
                    {services.slice(0, 6).map((service, index) => (
                        <Col key={index} xs={12} sm={6} lg={4}>
                            <div
                                className="card h-100 rounded overflow-hidden p-4 services-card-hover d-flex flex-column"
                                style={{
                                    border: "0.3px solid #dee2e6",
                                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                                    transition: "box-shadow 0.7s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = "0 0 35px rgba(0, 0, 0, 0.25)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "0 0 8px rgba(0, 0, 0, 0.1)";
                                }}
                            >
                                {/* ICON - top-left */}
                                <div
                                    className="mx-auto d-flex align-items-center justify-content-center service-icon rounded-circle"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        fontSize: '2rem',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: service.icon }}
                                />

                                {/* Title */}
                                <Link href={`/services/${slugify(service.title)}`}
                                    className="fw-semibold text-center pt-3 services-tittle-color text-decoration-none"
                                    style={{
                                        fontSize: '1.50rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.6px',
                                        textTransform: 'capitalize',
                                        lineHeight: '1.4',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    {service.title}
                                </Link>

                                {/* Description */}
                                <p
                                    className="text-muted small mb-0 text-center"
                                    style={{
                                        fontFamily: "'Roboto', sans-serif",
                                        fontSize: '1rem',
                                        lineHeight: '1.7',
                                        color: '#475569',
                                        fontWeight: 400,
                                        textTransform: 'capitalize',
                                        letterSpacing: '0.1px',
                                        wordSpacing: '0.1px',
                                        marginTop: '0.5rem',
                                        textShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
                                    }}
                                >
                                    {service.desc.split(' ').slice(0, 15).join(' ')}
                                </p>

                                {/* Push button to bottom */}
                                <div className="mt-auto pt-3 mx-auto">
                                    <Link
                                        href={`/services/${slugify(service.title)}`} className="services-btn text-decoration-none">
                                        <p>Read more</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            ></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>


                        </Col>
                    ))}
                    <div className="text-center mt-5 pb-0">
                        <Link
                            href="/services"
                            className="btn d-inline-flex align-items-center"
                            style={{
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
                            View All Services <i className="bi bi-arrow-right" style={{ fontSize: '18px' }}></i>
                        </Link>
                    </div>
                </Row>

                {/* Mobile Scroll */}
                <div className="d-md-none overflow-x-auto px-2">
                    <div className="d-flex flex-nowrap gap-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 text-center rounded p-3 services-card-hover"
                                style={{
                                    width: '345px',
                                    border: "0.3px solid #dee2e6",
                                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                                    transition: "box-shadow 0.7s ease",
                                }}

                            >

                                <div
                                    className="mx-auto d-flex align-items-center justify-content-center service-icon rounded-circle"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        fontSize: '2rem',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: service.icon }}
                                />
                                <Link
                                    href={`/services/${slugify(service.title)}`}
                                    className="fw-semibold text-center pt-3 services-tittle-color text-decoration-none"
                                    style={{
                                        fontSize: '1.50rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.6px',
                                        textTransform: 'capitalize',
                                        lineHeight: '1.4',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    {service.title}
                                </Link>

                                {/* Description */}
                                <p
                                    className="text-muted small mb-0 text-center"
                                    style={{
                                        fontFamily: "'Roboto', sans-serif",
                                        fontSize: '1rem',
                                        lineHeight: '1.7',
                                        color: '#475569',
                                        fontWeight: 400,
                                        textTransform: 'capitalize',
                                        letterSpacing: '0.1px',
                                        wordSpacing: '0.1px',
                                        marginTop: '0.5rem',
                                        textShadow: '0 1px 1px rgba(0, 0, 0, 0.05)',
                                    }}
                                >
                                    {service.desc.split(' ').slice(0, 15).join(' ')}
                                </p>
                                {/* Push button to bottom */}
                                <div className="mt-auto pt-3 mx-auto d-flex justify-content-center">
                                    <Link
                                        href={`/services/${slugify(service.title)}`} className="services-btn text-decoration-none mb-0">
                                        <p className="mb-0">Read more</p>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            ></path>
                                        </svg>
                                    </Link>
                                </div>


                            </div>
                        ))}
                    </div>
                </div>

            </Container>
        </section>


    );
}

