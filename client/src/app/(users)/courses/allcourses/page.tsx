"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  duration: string;
  category: string;
  image: string;
}

export default function AllCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [animate, setAnimate] = useState<boolean>(false);

  const slugify = (text: string | undefined | null) =>
    text
      ? text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      : "";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((r) => setCourses(r.data));
  }, []);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      if (selectedCategory === "All") setFilteredCourses(courses);
      else
        setFilteredCourses(
          courses.filter((c) => c.category === selectedCategory)
        );
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedCategory, courses]);

  const categories: string[] = [
    "All",
    ...new Set(courses.map((c) => c.category)),
  ];

  return (
    <div className="container my-5">
      <div className="text-center text-lg-start">
        <h2
          className="fw-bold mb-3"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
        >
          Start Learning: Popular IT Courses
        </h2>
        <p
          className="text-muted mx-auto mx-lg-0"
          style={{
            maxWidth: "800px",
            fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
            lineHeight: "1.7",
          }}
        >
          Tech Space Nepal provides expert-led IT courses designed for career
          growth and real-world skills.
        </p>
      </div>

      <div
        className="mb-5 d-flex flex-nowrap justify-content-start gap-3 overflow-auto px-2 border-bottom pb-2"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="bg-transparent border-0 fw-semibold px-3 py-2 text-nowrap"
            style={{
              color: selectedCategory === cat ? "#0d6efd" : "#333",
              fontSize: "1rem",
              transition: "color 0.3s ease",
              whiteSpace: "nowrap",
              fontWeight: selectedCategory === cat ? "600" : "500",
              letterSpacing: "0.5px",
              textTransform: "capitalize",
            }}
          >
            <span style={{ position: "relative", display: "inline-block" }}>
              {cat}
              {selectedCategory === cat && (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: -2,
                    height: "2px",
                    width: "100%",
                    backgroundColor: "#0d6efd",
                    borderRadius: "1px",
                    transition: "width 0.3s ease",
                  }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="course-scroll-wrapper">
        <div className="row g-4 flex-nowrap flex-md-wrap">
          {filteredCourses.length === 0 && (
            <p className="text-center w-100 text-muted">No courses found.</p>
          )}

          {filteredCourses.slice(0, 8).map((c, idx) => {
            const slug = slugify(c.title);
            return (
              <div
                key={c._id}
                className={`col-10 col-sm-6 col-md-4 col-lg-3 course-col ${
                  animate ? "fade-slide-in" : ""
                }`}
                style={{ "--delay": `${idx * 100}ms` } as React.CSSProperties}
              >
                <div
                  className="card h-100 rounded-2 overflow-hidden transition-courses"
                  style={{
                    border: "0.3px solid #dee2e6",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <Link href={`/courses/${slug}`}>
                      <img
                        src={`http://localhost:5000${c.image}`}
                        alt={c.title}
                        className="card-img-top p-3"
                        style={{
                          height: 200,
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
                          borderRadius: "1.3rem",
                          cursor: "pointer",
                        }}
                      />
                    </Link>
                    <span
                      className="badge bg-danger text-white fw-semibold position-absolute"
                      style={{
                        top: "1.5rem",
                        right: "1.5rem",
                        padding: "0.5rem 1rem",
                        boxShadow: "0 0 10px rgba(0,0,0,0.07)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {c.duration}
                    </span>
                  </div>

                  <div
                    className="card-body d-flex flex-column justify-content-between pt-0"
                    style={{ minHeight: "117px" }}
                  >
                    <Link
                      href={`/courses/${slug}`}
                      className="text-decoration-none"
                    >
                      <h5
                        className="card-title mb-2"
                        style={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          color: "#1a1a1a",
                          textTransform: "capitalize",
                          cursor: "pointer",
                        }}
                      >
                        {c.title}
                      </h5>
                    </Link>

                    <div className="d-flex align-items-center justify-content-between pb-0">
                      <Link
                        href={`/inquiry?courseId=${
                          c._id
                        }&title=${encodeURIComponent(c.title)}`}
                        className="cta text-decoration-none"
                      >
                        <span className="hover-underline-animation">
                          {" "}
                          Apply now{" "}
                        </span>
                        <i className="bi bi-arrow-right"></i>
                      </Link>

                      <Link
                        href={`/courses/${slug}`}
                        className="courses-btn-viewdetails p-0"
                      >
                        <span> View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {filteredCourses.length > 8 && (
        <div className="text-center mt-5 pb-0">
          <Link
            href="/courses"
            // target="_blank"
            // rel="noopener noreferrer"
            className="btn d-inline-flex align-items-center"
            style={{
              backgroundColor: "#0057d8",
              color: "#ffffff",
              fontWeight: "500",
              padding: "12px 17px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              textDecoration: "none",
              gap: "8px",
            }}
          >
            Explore All Courses{" "}
            <i className="bi bi-arrow-right" style={{ fontSize: "18px" }}></i>
          </Link>
        </div>
      )}
    </div>
  );
}
