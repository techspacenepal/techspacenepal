"use client";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const services = [
  {
    title: "UI/UX Website Designing",
    desc: "Layouts that both provide your clients with the information they need and provide a positive first impression.",
    icon: "/icons/ui-ux.png",
  },
  {
    title: "CMS development",
    desc: "Any complicated function you can imagine can be programmed specifically.",
    icon: "/icons/cms.png",
  },
  {
    title: "Domain Registration",
    desc: "We established ourselves as a major provider of domain registration services for both Nepal [.np] and international top level domains.",
    icon: "/icons/domain.png",
  },
  {
    title: "Web Hosting",
    desc: "We have been offering website hosting services by leveraging cutting-edge technology and giving great support for many years.",
    icon: "/icons/hosting.png",
  },
  {
    title: "Search Engine Optimization",
    desc: "Our first objective is to optimize your website so that it appears at the top of Google searches.",
    icon: "/icons/seo.png",
  },
  {
    title: "Social Media marketing",
    desc: "Development of digital marketing tactics that we employ professionally to assist our clients in increasing income.",
    icon: "/icons/marketing.png",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Best Services</h2>
          <p className="text-muted">
            With more than 16 years of expertise in this industry, we can
            provide with anything you need, from a simple landing page to a
            comprehensive multipage website.
          </p>
        </div>

        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} xs={12} sm={6} lg={4}>
              <div className={`p-4 bg-white shadow-sm text-center h-100 rounded-4 cardHover`}>
                <img
                  src={service.icon}
                  alt={service.title}
                  className="mb-3"
                  style={{ width: 60, height: 60, objectFit: "contain" }}
                />
                <h5 className="fw-bold">{service.title}</h5>
                <p className="text-muted small">{service.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
