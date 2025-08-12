import React from "react";
import axios from "axios";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface Service {
  _id: string;
  title: string;
  desc: string;
  icon: string;
  imageUrl?: string;
  heading?: string;
  content?: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const res = await axios.get<Service[]>("http://localhost:5000/api/services");

  const service = res.data.find((s) => slugify(s.title) === slug);

  if (!service) {
    return <div className="p-5">Service not found</div>;
  }

  return (
    <>
      <section
        style={{
          background: "linear-gradient(135deg, #0f2747 0%, #0a1c35 100%)",
        }}
        className="py-5 py-md-5"
      >
        <div className="container align-items-center">
          <h1
            className="text-center fw-bold typing-animation"
            style={{
              fontSize: "2.5rem",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {service.title}
          </h1>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              <nav aria-label="breadcrumb" className="mb-3">
                <ul
                  style={{
                    display: "flex",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  <li>
                    <Link href="/" style={{ textDecoration: "none", color: "#000" }}>
                      HOME
                    </Link>
                  </li>
                  <FaChevronRight
                    style={{ margin: "0 8px", fontSize: "10px", color: "#aaa" }}
                  />
                  <li>
                    <Link href="/services" style={{ textDecoration: "none", color: "#000" }}>
                      SERVICES
                    </Link>
                  </li>
                  <FaChevronRight
                    style={{ margin: "0 8px", fontSize: "10px", color: "#aaa" }}
                  />
                  <li style={{ color: "#aaa" }}>{service.title}</li>
                </ul>
              </nav>

              <p className="mb-4">{service.desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center text-lg-start">
            <div className="col-12 col-lg-9">
              {service.heading && (
                <h2 className="fw-bold mb-4" style={{ color: "#004d40" }}>
                  {service.heading}
                </h2>
              )}

              <div className="position-relative mb-4">
                <img
                  src={`http://localhost:5000${service.imageUrl}`}
                  alt={service.heading || service.title}
                  className="img-fluid rounded shadow"
                  style={{
                    maxWidth: "100%",
                  }}
                />
              </div>

              {service.content &&
                <p
                  className="text-muted"
                  dangerouslySetInnerHTML={{
                    __html: service.content || ""
                  }}
                ></p>
              }
              <div className="row justify-content-center">
                <div className="col-12 col-lg-9">
                  <h1
                    className="fw-bold text-center mb-4"
                    style={{
                      color: "#005a4c",
                      fontSize: "2rem",
                      lineHeight: "1.3",
                    }}
                  >
                    Interested in starting a project <br /> with us?
                  </h1>
                  <div className="text-center">
                    <Link className="services-inquery-btn" href="/inquiry">
                      Send Inquiry
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

}
