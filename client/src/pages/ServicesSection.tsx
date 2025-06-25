// "use client";
// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";

// const services = [
//   {
//     title: "UI/UX Website Designing",
//     desc: "Layouts that both provide your clients with the information they need and provide a positive first impression.",
//     icon: "/icons/ui-ux.png",
//   },
//   {
//     title: "CMS development",
//     desc: "Any complicated function you can imagine can be programmed specifically.",
//     icon: "/icons/cms.png",
//   },
//   {
//     title: "Domain Registration",
//     desc: "We established ourselves as a major provider of domain registration services for both Nepal [.np] and international top level domains.",
//     icon: "/icons/domain.png",
//   },
//   {
//     title: "Web Hosting",
//     desc: "We have been offering website hosting services by leveraging cutting-edge technology and giving great support for many years.",
//     icon: "/icons/hosting.png",
//   },
//   {
//     title: "Search Engine Optimization",
//     desc: "Our first objective is to optimize your website so that it appears at the top of Google searches.",
//     icon: "/icons/seo.png",
//   },
//   {
//     title: "Social Media marketing",
//     desc: "Development of digital marketing tactics that we employ professionally to assist our clients in increasing income.",
//     icon: "/icons/marketing.png",
//   },
// ];

// export default function ServicesSection() {
//   return (
//     <section className="py-5 bg-light">
//       <Container>
//         <div className="text-center mb-5">
//           <h2 className="fw-bold">Our Best Services</h2>
//           <p className="text-muted">
//             With more than 16 years of expertise in this industry, we can
//             provide with anything you need, from a simple landing page to a
//             comprehensive multipage website.
//           </p>
//         </div>

//         <Row className="g-4">
//           {services.map((service, index) => (
//             <Col key={index} xs={12} sm={6} lg={4}>
//               <div className={`p-4 bg-white shadow-sm text-center h-100 rounded-4 cardHover`}>
//                 <img
//                   src={service.icon}
//                   alt={service.title}
//                   className="mb-3"
//                   style={{ width: 60, height: 60, objectFit: "contain" }}
//                 />
//                 <h5 className="fw-bold">{service.title}</h5>
//                 <p className="text-muted small">{service.desc}</p>
//               </div>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </section>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function ServicesSection() {
  const [services, setServices] = useState([]);

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
        className="fw-bold"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '2.5rem',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        Our Best Services
      </h2>
      <p
        className="text-muted"
        style={{
          fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
          fontSize: '1.125rem',
          maxWidth: '650px',
          margin: 'auto',
          lineHeight: 1.6,
        }}
      >
        Tech Space Nepal, established since 2025, brings cutting-edge IT solutions and top-notch training to empower businesses and individuals.
        With years of expertise, we deliver tailored services from sleek landing pages to full-fledged multipage websites, ensuring quality and innovation at every step.
      </p>
    </div>

    <Row className="g-4">
      {services.map((service, index) => {
        const logoColors = ["#4ADE80", "#3B82F6", "#EF4444", "#F59E0B"]; // green, blue, red, orange
        const color = logoColors[index % logoColors.length];
        return (
          <Col key={index} xs={12} sm={6} lg={4}>
            <div
              className="p-4 bg-white shadow-sm text-center h-100 rounded-4 cardHover"
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                fontFamily: 'Poppins, sans-serif',
                cursor: 'pointer',
                border: `2px solid ${color}`, // outline
              }}
            >
              <div
                className="mb-3 service-icon"
                style={{
                  fontSize: "2.5rem",
                  color: color, // 👈 icon color same as outline
                }}
                dangerouslySetInnerHTML={{ __html: service.icon }}
              />
              <h5
                className="fw-bold"
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#222',
                  letterSpacing: '1.5px',
                  marginBottom: '0.5rem',
                }}
              >
                {service.title}
              </h5>
              <p
                className="text-muted small"
                style={{
                  fontSize: '0.95rem',
                  color: '#555',
                  lineHeight: 1.5,
                  fontWeight: 500,
                  letterSpacing: '0.3px',
                }}
              >
                {service.desc}
              </p>
            </div>
          </Col>
        );
      })}
    </Row>
  </Container>

  <style jsx>{`
    .cardHover:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 30px rgba(0, 123, 255, 0.3);
    }

    .service-icon {
      transition: transform 0.3s, filter 0.3s, color 0.3s;
    }

    .cardHover:hover .service-icon {
      transform: scale(1.15);
      filter: drop-shadow(0 0 4px currentColor); /* uses inline color */
    }
  `}</style>
</section>




  );
}

