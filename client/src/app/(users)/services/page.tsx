
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

export default function Page() {
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
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(1.2rem, 2vw + 0.5rem, 2.2rem)", // 👈 responsive font-size
              letterSpacing: "1px",
              color: "#1e293b",
            }}
          >
            IT services offered by Tech Space Nepal
          </h2>
        </div>

        {/* Desktop & Tablet */}
        <Row className="g-4 d-none d-md-flex">
          {services.map((service, index) => (
            <Col key={index} xs={12} sm={6} lg={4}>
              <div
                className="card h-100 shadow-sm rounded overflow-hidden p-4 services-card-hover d-flex flex-column service-card"
                style={{
                  border: "0.3px solid #dee2e6",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.5s ease",
                  backgroundColor: "#fff",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0, 0, 0, 0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 10px rgba(0, 0, 0, 0.08)";
                }}
              >

                {/* ICON - top-left */}
                <div
                  style={{

                    fontSize: "3rem",
                    color: "black",
                  }}
                  dangerouslySetInnerHTML={{ __html: service.icon }}
                />

                {/* Title */}
                <Link
                  href={`/services/${slugify(service.title)}`}
                  className="fw-bold pt-3 services-tittle-color text-decoration-none"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800, // 👈 bold font
                    letterSpacing: "0.5px",
                    textTransform: "capitalize",
                    lineHeight: "1.4",
                    color: "#111827", // clean black
                  }}
                >
                  {service.title}
                </Link>

                {/* Description */}
                <p
                  className="text-muted small mb-0"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    color: "#475569",
                    fontWeight: 400,
                    marginTop: "0.5rem",
                  }}
                >
                  {service.desc.split(" ").slice(0, 15).join(" ")}
                </p>

                {/* Button */}
                <div className="pt-3 mt-auto">
                  <Link
                    href={`/services/${slugify(service.title)}`}
                    className=" text-decoration-none d-inline-flex align-items-center gap-1"
                    style={{
                      color: "#2563eb",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  >
                    <span>Read more</span>
                  </Link>
                </div>
              </div>
            </Col>
          ))}

         
        </Row>

        {/* Mobile Scroll */}
        <div className="d-md-none overflow-x-auto px-2">
          <div className="d-flex flex-nowrap gap-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="card flex-shrink-0 shadow-sm rounded overflow-hidden p-4 services-card-hover d-flex flex-column service-card"
                style={{
                  width: "320px",
                  minHeight: "360px",
                  border: "0.3px solid #dee2e6",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                  transition: "box-shadow 0.5s ease",
                  backgroundColor: "#fff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* ICON */}
                <div
                  style={{ fontSize: "2.5rem", color: "black" }}
                  dangerouslySetInnerHTML={{ __html: service.icon }}
                />

                {/* Title */}
                <Link
                  href={`/services/${slugify(service.title)}`}
                  className="fw-bold pt-3 services-tittle-color text-decoration-none"
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    textTransform: "capitalize",
                    lineHeight: "1.4",
                    color: "#111827",
                  }}
                >
                  {service.title}
                </Link>

                {/* Description */}
                <p
                  className="text-muted small mb-0"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    color: "#475569",
                    fontWeight: 400,
                    marginTop: "0.5rem",
                  }}
                >
                  {service.desc.split(" ").slice(0, 35).join(" ")}
                </p>

                {/* Button */}
                <div className="pt-3">
                  <Link
                    href={`/services/${slugify(service.title)}`}
                    className=" text-decoration-none d-inline-flex align-items-center gap-1"
                    style={{
                      color: "#2563eb",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                    }}
                  >
                    <span>Read more</span>
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

